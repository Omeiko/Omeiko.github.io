import express from "express";
import matter from "gray-matter";
import multer from "multer";
import { existsSync } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const managerRoot = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(managerRoot, "..");
const profilePath = path.join(siteRoot, "_data", "profile.json");
const scholarPath = path.join(siteRoot, "_data", "scholar.json");
const publicationsPath = path.join(siteRoot, "_data", "publications.json");
const bibliographyPath = path.join(siteRoot, "assets", "bibliography", "publications.bib");
const postRoots = [path.join(siteRoot, "_posts"), path.join(siteRoot, "_drafts")];
const port = Number(process.env.MANAGER_API_PORT || 4174);

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));
app.use("/site-assets", express.static(path.join(siteRoot, "pics")));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    const allowed = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
    callback(allowed.has(file.mimetype) ? null : new Error("Only PNG, JPEG, WebP, and GIF images are supported."), allowed.has(file.mimetype));
  }
});

const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    const allowed = file.mimetype === "application/pdf";
    callback(allowed ? null : new Error("Only PDF files are supported."), allowed);
  }
});

function sendError(response, error, status = 500) {
  console.error(error);
  response.status(status).json({ error: error instanceof Error ? error.message : String(error) });
}

async function ensureDirectories() {
  await Promise.all([
    fs.mkdir(path.dirname(profilePath), { recursive: true }),
    fs.mkdir(path.join(siteRoot, "_posts"), { recursive: true }),
    fs.mkdir(path.join(siteRoot, "_drafts"), { recursive: true }),
    fs.mkdir(path.join(siteRoot, "pics"), { recursive: true }),
    fs.mkdir(path.join(siteRoot, "assets", "files"), { recursive: true }),
    fs.mkdir(path.dirname(bibliographyPath), { recursive: true })
  ]);
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJsonAtomic(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, filePath);
}

async function writeTextAtomic(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, value, "utf8");
  await fs.rename(temporaryPath, filePath);
}

function normalizeProfile(input) {
  const textFields = [
    "name", "nickname", "greeting", "headline", "summary", "email", "role", "affiliation",
    "crest", "research", "collaboration", "current", "scholar_url", "openalex_url",
    "conference_url", "github_url", "orcid_url", "dblp_url", "cv_url"
  ];
  const profile = Object.fromEntries(textFields.map((field) => [field, String(input[field] || "").trim()]));
  profile.tags = Array.isArray(input.tags)
    ? input.tags.map((tag) => String(tag).trim()).filter(Boolean).slice(0, 12)
    : [];
  return profile;
}

function normalizePublication(input, index) {
  const title = String(input.title || "").trim();
  if (!title) throw new Error(`Publication ${index + 1} needs a title.`);
  const doi = String(input.doi || "").trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
  const text = (field) => String(input[field] || "").trim();
  const list = (field) => (Array.isArray(input[field]) ? input[field] : String(input[field] || "").split(","))
    .map((value) => String(value).trim()).filter(Boolean);
  return {
    slug: slugify(input.slug || title),
    title,
    scholar_title: text("scholar_title") || title,
    authors: list("authors"),
    venue: text("venue"),
    venue_short: text("venue_short"),
    year: Number.parseInt(input.year, 10) || new Date().getFullYear(),
    pages: text("pages"),
    doi,
    doi_url: doi ? `https://doi.org/${doi}` : "",
    arxiv_url: text("arxiv_url"),
    summary: text("summary"),
    topics: list("topics"),
    bibtex_key: text("bibtex_key"),
    selected: Boolean(input.selected),
    status: text("status") || "Published"
  };
}

function publicationsToBibtex(publications) {
  return `${publications.map((publication) => {
    const key = publication.bibtex_key || `${publication.authors[0]?.split(" ").at(-1)?.toLowerCase() || "paper"}${publication.year}`;
    const pages = publication.pages.replace(/[–—]/g, "--");
    return `@inproceedings{${key},\n` +
      `  author    = {${publication.authors.join(" and ")}},\n` +
      `  title     = {${publication.title}},\n` +
      `  booktitle = {${publication.venue}${publication.venue_short ? ` (${publication.venue_short.replace(/\s+\d{4}$/, "")})` : ""}},\n` +
      `  pages     = {${pages}},\n` +
      `  publisher = {IEEE},\n` +
      `  year      = {${publication.year}},\n` +
      `  doi       = {${publication.doi}},\n` +
      `  url       = {${publication.doi_url}}\n` +
      `}`;
  }).join("\n\n")}\n`;
}

function toSiteRelative(absolutePath) {
  return path.relative(siteRoot, absolutePath).split(path.sep).join("/");
}

function resolvePostPath(relativePath) {
  if (!relativePath || typeof relativePath !== "string") throw new Error("A post path is required.");
  const absolutePath = path.resolve(siteRoot, relativePath);
  const allowed = postRoots.some((root) => absolutePath === root || absolutePath.startsWith(`${root}${path.sep}`));
  if (!allowed) throw new Error("Invalid post path.");
  return absolutePath;
}

function slugify(value) {
  const slug = String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "untitled";
}

function normalizeDate(value) {
  const raw = String(value || "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : new Date().toISOString().slice(0, 10);
}

function normalizeCategories(value) {
  const categories = Array.isArray(value) ? value : String(value || "").split(",");
  return categories.map((category) => String(category).trim()).filter(Boolean).slice(0, 12);
}

async function listPostFiles(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && /\.(md|markdown)$/i.test(entry.name))
      .map((entry) => path.join(directory, entry.name));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function postDate(data, filePath) {
  if (data.date instanceof Date && !Number.isNaN(data.date.valueOf())) return data.date.toISOString().slice(0, 10);
  if (data.date) return String(data.date).slice(0, 10);
  const match = path.basename(filePath).match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : "";
}

function postSlug(filePath, draft) {
  const basename = path.basename(filePath).replace(/\.(md|markdown)$/i, "");
  return draft ? basename : basename.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

async function readPost(filePath, includeBody = true) {
  const source = await fs.readFile(filePath, "utf8");
  const parsed = matter(source);
  const draft = filePath.startsWith(`${postRoots[1]}${path.sep}`);
  const categories = normalizeCategories(parsed.data.categories || parsed.data.category || []);
  const body = parsed.content.trimStart();
  return {
    path: toSiteRelative(filePath),
    title: String(parsed.data.title || postSlug(filePath, draft)),
    date: postDate(parsed.data, filePath),
    categories,
    description: String(parsed.data.description || ""),
    draft,
    slug: postSlug(filePath, draft),
    excerpt: body.replace(/[#>*_`\[\]()!-]/g, " ").replace(/\s+/g, " ").trim().slice(0, 150),
    ...(includeBody ? { body } : {})
  };
}

async function listPosts() {
  const files = (await Promise.all(postRoots.map(listPostFiles))).flat();
  const posts = await Promise.all(files.map((filePath) => readPost(filePath, false)));
  return posts.sort((left, right) => (right.date || "9999").localeCompare(left.date || "9999"));
}

async function savePost(input) {
  const title = String(input.title || "").trim();
  if (!title) throw new Error("Post title is required.");

  const draft = Boolean(input.draft);
  const date = normalizeDate(input.date);
  const slug = slugify(input.slug || title);
  const targetRelativePath = draft ? `_drafts/${slug}.markdown` : `_posts/${date}-${slug}.markdown`;
  const targetPath = resolvePostPath(targetRelativePath);
  const originalPath = input.path ? resolvePostPath(input.path) : null;

  if ((!originalPath || originalPath !== targetPath) && existsSync(targetPath)) {
    const conflict = new Error("A post with this date and slug already exists.");
    conflict.status = 409;
    throw conflict;
  }

  const frontMatter = {
    layout: "post",
    title,
    ...(String(input.description || "").trim() ? { description: String(input.description).trim() } : {}),
    ...(draft ? {} : { date: `${date} 12:00:00 +0900` }),
    categories: normalizeCategories(input.categories)
  };
  const content = matter.stringify(`${String(input.body || "").trimEnd()}\n`, frontMatter);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, content, "utf8");

  if (originalPath && originalPath !== targetPath) await fs.unlink(originalPath);
  return readPost(targetPath, true);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: siteRoot, env: process.env });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      const allowed = options.allowedExitCodes || [0];
      if (allowed.includes(code)) resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
      else reject(new Error(stderr.trim() || stdout.trim() || `${command} exited with code ${code}`));
    });
  });
}

async function gitStatus() {
  const result = await runCommand("git", ["status", "--short"]);
  return result.stdout.split("\n").filter(Boolean);
}

function scholarMetric(table, key) {
  return table.find((row) => row[key])?.[key]?.all || 0;
}

async function refreshScholarLocally(apiKey) {
  const profileId = "1xge3_oAAAAJ";
  const url = new URL("https://serpapi.com/search.json");
  url.search = new URLSearchParams({
    engine: "google_scholar_author",
    hl: "en",
    author_id: profileId,
    api_key: apiKey
  }).toString();
  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok || payload.error) throw new Error(payload.error || `Scholar request failed (${response.status}).`);

  const table = payload.cited_by?.table || [];
  const data = {
    source: "Google Scholar",
    profile_id: profileId,
    profile_url: `https://scholar.google.com/citations?user=${profileId}`,
    updated_at: new Date().toISOString(),
    citations: scholarMetric(table, "citations"),
    h_index: scholarMetric(table, "h_index"),
    i10_index: scholarMetric(table, "i10_index"),
    articles: (payload.articles || []).slice(0, 20).map((article) => ({
      title: article.title || "Untitled",
      link: article.link || "",
      year: article.year || "",
      citations: article.cited_by?.value || 0
    }))
  };
  await writeJsonAtomic(scholarPath, data);
  return data;
}

app.get("/api/health", (_request, response) => response.json({ ok: true }));

app.get("/api/bootstrap", async (_request, response) => {
  try {
    await ensureDirectories();
    response.json({
      profile: await readJson(profilePath, {}),
      scholar: await readJson(scholarPath, null),
      publications: await readJson(publicationsPath, []),
      posts: await listPosts(),
      changes: await gitStatus(),
      siteUrl: "https://minggu.wang"
    });
  } catch (error) {
    sendError(response, error);
  }
});

app.put("/api/profile", async (request, response) => {
  try {
    const profile = normalizeProfile(request.body);
    await writeJsonAtomic(profilePath, profile);
    response.json({ profile });
  } catch (error) {
    sendError(response, error, error.status || 400);
  }
});

app.put("/api/publications", async (request, response) => {
  try {
    if (!Array.isArray(request.body)) throw new Error("Publications must be an array.");
    const publications = request.body.map(normalizePublication);
    await writeJsonAtomic(publicationsPath, publications);
    await writeTextAtomic(bibliographyPath, publicationsToBibtex(publications));
    response.json({ publications });
  } catch (error) {
    sendError(response, error, 400);
  }
});

app.get("/api/post", async (request, response) => {
  try {
    response.json({ post: await readPost(resolvePostPath(request.query.path), true) });
  } catch (error) {
    sendError(response, error, error.code === "ENOENT" ? 404 : 400);
  }
});

app.put("/api/post", async (request, response) => {
  try {
    response.json({ post: await savePost(request.body), posts: await listPosts() });
  } catch (error) {
    sendError(response, error, error.status || 400);
  }
});

app.delete("/api/post", async (request, response) => {
  try {
    await fs.unlink(resolvePostPath(request.query.path));
    response.json({ posts: await listPosts() });
  } catch (error) {
    sendError(response, error, error.code === "ENOENT" ? 404 : 400);
  }
});

app.post("/api/assets", upload.single("asset"), async (request, response) => {
  try {
    if (!request.file) throw new Error("Choose an image to upload.");
    const extension = path.extname(request.file.originalname).toLowerCase() || ".png";
    const basename = slugify(path.basename(request.file.originalname, extension));
    let filename = `${basename}${extension}`;
    let targetPath = path.join(siteRoot, "pics", filename);
    if (existsSync(targetPath)) {
      filename = `${basename}-${Date.now()}${extension}`;
      targetPath = path.join(siteRoot, "pics", filename);
    }
    await fs.writeFile(targetPath, request.file.buffer);
    response.json({ path: `/pics/${filename}` });
  } catch (error) {
    sendError(response, error, 400);
  }
});

app.post("/api/files", documentUpload.single("file"), async (request, response) => {
  try {
    if (!request.file) throw new Error("Choose a PDF to upload.");
    const basename = slugify(path.basename(request.file.originalname, path.extname(request.file.originalname)));
    let filename = `${basename}.pdf`;
    let targetPath = path.join(siteRoot, "assets", "files", filename);
    if (existsSync(targetPath)) {
      filename = `${basename}-${Date.now()}.pdf`;
      targetPath = path.join(siteRoot, "assets", "files", filename);
    }
    await fs.writeFile(targetPath, request.file.buffer);
    response.json({ path: `/assets/files/${filename}` });
  } catch (error) {
    sendError(response, error, 400);
  }
});

app.post("/api/scholar/refresh", async (request, response) => {
  try {
    const apiKey = String(request.body?.apiKey || process.env.SERPAPI_API_KEY || "").trim();
    if (apiKey) {
      const scholar = await refreshScholarLocally(apiKey);
      response.json({ mode: "local", scholar, message: "Scholar data updated locally." });
      return;
    }
    try {
      await runCommand("gh", ["workflow", "run", "update-scholar.yml"]);
      response.json({ mode: "github", message: "GitHub Scholar workflow started." });
    } catch {
      const error = new Error("Enter a SerpApi key for this refresh, set SERPAPI_API_KEY before starting the manager, or run the Scholar workflow from GitHub Actions.");
      error.status = 409;
      throw error;
    }
  } catch (error) {
    sendError(response, error, error.status || 400);
  }
});

app.get("/api/git-status", async (_request, response) => {
  try {
    response.json({ changes: await gitStatus() });
  } catch (error) {
    sendError(response, error);
  }
});

app.post("/api/publish", async (request, response) => {
  try {
    const message = String(request.body.message || "Update website content").trim().slice(0, 120);
    await runCommand("git", [
      "add", "-A", "--",
      ".github", "_config.yml", "_data", "_drafts", "_layouts", "_posts",
      "assets", "output", "pics", "manager", "404.html", "about.markdown",
      "blog.markdown", "index.markdown", "publications.markdown", "robots.txt",
      "scripts", "Gemfile", ".gitattributes", ".gitignore"
    ]);
    const diff = await runCommand("git", ["diff", "--cached", "--quiet"], { allowedExitCodes: [0, 1] });
    if (diff.code === 0) {
      response.json({ published: false, message: "No managed website changes to publish.", changes: await gitStatus() });
      return;
    }
    await runCommand("git", ["commit", "-m", message || "Update website content"]);
    const push = await runCommand("git", ["push"]);
    response.json({ published: true, message: push.stdout || "Changes pushed to GitHub.", changes: await gitStatus() });
  } catch (error) {
    sendError(response, error, 400);
  }
});

const distPath = path.join(managerRoot, "dist");
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((request, response, next) => {
    if (request.method !== "GET" || request.path.startsWith("/api/")) return next();
    response.sendFile(path.join(distPath, "index.html"));
  });
}

app.use((error, _request, response, _next) => sendError(response, error, 400));

app.listen(port, "127.0.0.1", () => {
  console.log(`Omeiko manager API listening on http://127.0.0.1:${port}`);
});
