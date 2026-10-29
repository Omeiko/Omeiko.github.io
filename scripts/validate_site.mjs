import fs from "node:fs";
import path from "node:path";

const pages = [
  "_site/index.html",
  "_site/publications/index.html",
  "_site/about/index.html",
  "_site/blog/index.html",
];

const assets = [
  "_site/output/pdf/minggu-wang-cv.pdf",
  "_site/assets/images/social-card.png",
  "_site/assets/bibliography/publications.bib",
  "_site/robots.txt",
];

const failures = [];
const publications = JSON.parse(
  fs.readFileSync("_data/publications.json", "utf8"),
);
const scholar = JSON.parse(fs.readFileSync("_data/scholar.json", "utf8"));
const bibliography = fs.readFileSync(
  "assets/bibliography/publications.bib",
  "utf8",
);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");

  if (!/<title>[^<]+<\/title>/.test(html)) {
    failures.push(`${file}: missing title`);
  }
  if (!/rel="canonical"/.test(html)) {
    failures.push(`${file}: missing canonical URL`);
  }
  if (!/property="og:image"/.test(html)) {
    failures.push(`${file}: missing Open Graph image`);
  }

  const jsonLdBlocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];

  if (!jsonLdBlocks.length) {
    failures.push(`${file}: missing JSON-LD`);
  }

  jsonLdBlocks.forEach((block, index) => {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      failures.push(
        `${file}: invalid JSON-LD block ${index + 1}: ${error.message}`,
      );
    }
  });
}

for (const file of assets) {
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    failures.push(`${file}: missing or empty`);
  }
}

const publicationKeys = new Set();
const publicationDois = new Set();

for (const publication of publications) {
  if (publicationKeys.has(publication.bibtex_key)) {
    failures.push(`Duplicate BibTeX key: ${publication.bibtex_key}`);
  }
  if (publicationDois.has(publication.doi)) {
    failures.push(`Duplicate DOI: ${publication.doi}`);
  }
  publicationKeys.add(publication.bibtex_key);
  publicationDois.add(publication.doi);

  if (!bibliography.includes(`{${publication.bibtex_key},`)) {
    failures.push(`Missing BibTeX entry: ${publication.bibtex_key}`);
  }
  const escapedDoi = publication.doi.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(`doi\\s*=\\s*\\{${escapedDoi}\\}`, "i").test(bibliography)) {
    failures.push(`BibTeX DOI mismatch: ${publication.doi}`);
  }
  if (publication.doi_url !== `https://doi.org/${publication.doi}`) {
    failures.push(`Canonical DOI URL mismatch: ${publication.doi}`);
  }
  if (
    publication.selected &&
    !scholar.articles.some(
      (article) => article.title === publication.scholar_title,
    )
  ) {
    failures.push(`Missing Scholar title match: ${publication.title}`);
  }
}

const htmlFiles = walk("_site").filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const references = [
    ...html.matchAll(/(?:href|src)="([^"]+)"/g),
  ].map((match) => match[1]);

  for (const reference of references) {
    if (
      !reference ||
      reference.startsWith("#") ||
      /^(?:[a-z]+:)?\/\//i.test(reference) ||
      /^(?:mailto|tel|data):/i.test(reference)
    ) {
      continue;
    }

    const cleanReference = reference.split(/[?#]/, 1)[0];
    if (!cleanReference) continue;

    let target = cleanReference.startsWith("/")
      ? path.join("_site", cleanReference.slice(1))
      : path.resolve(path.dirname(file), cleanReference);

    if (cleanReference.endsWith("/")) {
      target = path.join(target, "index.html");
    } else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, "index.html");
    }

    if (!fs.existsSync(target)) {
      failures.push(`${file}: broken local reference ${reference}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated metadata and JSON-LD for ${pages.length} pages.`);
console.log(`Validated ${assets.length} downloadable and SEO assets.`);
console.log(`Validated ${publications.length} publication and citation records.`);
console.log(`Validated local links and assets across ${htmlFiles.length} HTML files.`);
