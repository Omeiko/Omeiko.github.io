import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import {
  ArrowUpRight,
  BookOpenText,
  Check,
  CircleAlert,
  FilePenLine,
  FileText,
  GitBranch,
  GraduationCap,
  ImageUp,
  LayoutDashboard,
  LoaderCircle,
  NotebookPen,
  Plus,
  RefreshCw,
  Rocket,
  Save,
  Search,
  Trash2,
  UserRound
} from "lucide-react";
import { api } from "./api.js";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "blog", label: "Writing", icon: NotebookPen },
  { id: "scholar", label: "Scholar", icon: GraduationCap },
  { id: "publish", label: "Publish", icon: Rocket }
];

const today = () => new Date().toISOString().slice(0, 10);

function assetUrl(source) {
  if (!source) return "";
  return source.startsWith("/pics/") ? `/site-assets/${source.slice(6)}` : source;
}

function normalizeJekyllMarkdown(source) {
  return source
    .replace(/{%\s*highlight\s+([^\s%]+).*?%}/g, "```$1")
    .replace(/{%\s*endhighlight\s*%}/g, "```");
}

function emptyPost() {
  return {
    path: "",
    title: "",
    date: today(),
    slug: "",
    categories: [],
    draft: true,
    body: "# Start with one clear idea\n\nWrite your article here."
  };
}

function Notice({ notice, onClose }) {
  if (!notice) return null;
  const Icon = notice.type === "error" ? CircleAlert : Check;
  return (
    <button className={`notice notice--${notice.type}`} onClick={onClose} type="button">
      <Icon size={16} aria-hidden="true" />
      <span>{notice.message}</span>
    </button>
  );
}

function Sidebar({ active, onNavigate, profile, changes }) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-seal">
          {profile?.crest ? <img src={assetUrl(profile.crest)} alt="" /> : <span>MW</span>}
        </div>
        <div>
          <strong>Omeiko</strong>
          <span>Site Manager</span>
        </div>
      </div>

      <nav
        className="sidebar-nav"
        aria-label="Manager sections"
        data-role="nav"
        data-height-px="38"
        data-single-line="true"
      >
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={active === item.id ? "nav-item nav-item--active" : "nav-item"}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{item.label}</span>
              {item.id === "publish" && changes > 0 ? <span className="change-count">{changes}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <strong>Local workspace</strong>
          <span>127.0.0.1 only</span>
        </div>
      </div>
    </aside>
  );
}

function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <header className="section-header">
      <div>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}

function MetricCard({ label, value, detail }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function Overview({ data, onNavigate }) {
  const drafts = data.posts.filter((post) => post.draft).length;
  const published = data.posts.length - drafts;
  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Workspace"
        title={`Good day, ${data.profile.name || "Minggu"}.`}
        description="Your website content, research footprint, and publishing state in one quiet workspace."
        action={<a className="button button--secondary" href={data.siteUrl} target="_blank" rel="noreferrer">Open site <ArrowUpRight size={15} /></a>}
      />

      <div className="metric-grid">
        <MetricCard label="Published" value={published} detail="Blog posts" />
        <MetricCard label="Drafts" value={drafts} detail="Waiting for review" />
        <MetricCard label="Citations" value={data.scholar?.citations ?? "N/A"} detail="Google Scholar" />
        <MetricCard label="Changes" value={data.changes.length} detail="Not yet published" />
      </div>

      <div className="overview-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Recent writing</span>
              <h2>Latest documents</h2>
            </div>
            <button className="text-button" onClick={() => onNavigate("blog")} type="button">Manage</button>
          </div>
          <div className="document-list">
            {data.posts.slice(0, 4).map((post) => (
              <button className="document-row" key={post.path} onClick={() => onNavigate("blog", post.path)} type="button">
                <span className="document-icon"><FileText size={16} /></span>
                <span className="document-copy">
                  <strong>{post.title}</strong>
                  <small>{post.draft ? "Draft" : post.date || "Published"}</small>
                </span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            ))}
            {data.posts.length === 0 ? <p className="empty-copy">Create your first article to begin.</p> : null}
          </div>
        </section>

        <section className="panel panel--accent">
          <span className="section-kicker">Next action</span>
          <h2>{data.changes.length ? "Changes are ready." : "Everything is published."}</h2>
          <p>{data.changes.length ? `${data.changes.length} file changes are waiting for your review.` : "Your local workspace matches the GitHub repository."}</p>
          <button className="button button--dark" onClick={() => onNavigate(data.changes.length ? "publish" : "profile")} type="button">
            {data.changes.length ? "Review changes" : "Edit profile"}
          </button>
        </section>
      </div>
    </div>
  );
}

function Field({ label, hint, children, wide = false }) {
  return (
    <label className={wide ? "field field--wide" : "field"}>
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

function ProfileEditor({ profile, setProfile, onSave, onUpload, busy }) {
  const update = (field, value) => setProfile((current) => ({ ...current, [field]: value }));
  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Identity"
        title="Profile"
        description="Edit the content that introduces you before visitors reach your publications or writing."
        action={<button className="button button--primary" disabled={busy} onClick={onSave} type="button"><Save size={15} /> Save profile</button>}
      />

      <section className="panel form-panel">
        <div className="form-grid">
          <Field label="Display name"><input value={profile.name || ""} onChange={(event) => update("name", event.target.value)} /></Field>
          <Field label="Greeting"><input value={profile.greeting || ""} onChange={(event) => update("greeting", event.target.value)} /></Field>
          <Field label="Headline" wide><input value={profile.headline || ""} onChange={(event) => update("headline", event.target.value)} /></Field>
          <Field label="Introduction" wide><textarea rows="5" value={profile.summary || ""} onChange={(event) => update("summary", event.target.value)} /></Field>
          <Field label="Email"><input type="email" value={profile.email || ""} onChange={(event) => update("email", event.target.value)} /></Field>
          <Field label="Research focus"><input value={profile.research || ""} onChange={(event) => update("research", event.target.value)} /></Field>
          <Field label="Collaboration" wide><input value={profile.collaboration || ""} onChange={(event) => update("collaboration", event.target.value)} /></Field>
          <Field label="Topics" hint="Separate topics with commas." wide>
            <input value={(profile.tags || []).join(", ")} onChange={(event) => update("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
          </Field>
          <Field label="Currently" wide><textarea rows="4" value={profile.current || ""} onChange={(event) => update("current", event.target.value)} /></Field>
        </div>
      </section>

      <section className="panel asset-panel">
        <div>
          <span className="section-kicker">Brand asset</span>
          <h2>Core crest</h2>
          <p>PNG, JPEG, WebP, or GIF. Maximum file size: 5 MB.</p>
        </div>
        <div className="asset-actions">
          <img src={assetUrl(profile.crest)} alt="Current crest" />
          <label className="button button--secondary upload-button">
            <ImageUp size={15} /> Replace image
            <input accept="image/png,image/jpeg,image/webp,image/gif" type="file" onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} />
          </label>
        </div>
      </section>
    </div>
  );
}

function PostList({ posts, selectedPath, search, setSearch, onSelect, onNew }) {
  const filtered = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <aside className="post-list-panel">
      <div className="post-list-toolbar">
        <div className="search-box"><Search size={15} /><input aria-label="Search posts" placeholder="Search writing" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        <button aria-label="New post" className="icon-button" onClick={onNew} type="button"><Plus size={17} /></button>
      </div>
      <div className="post-list-scroll">
        {filtered.map((post) => (
          <button className={selectedPath === post.path ? "post-list-item post-list-item--active" : "post-list-item"} key={post.path} onClick={() => onSelect(post.path)} type="button">
            <span className="post-state">{post.draft ? "Draft" : post.date}</span>
            <strong>{post.title}</strong>
            <small>{post.excerpt || "No preview available"}</small>
          </button>
        ))}
        {filtered.length === 0 ? <p className="empty-copy">No documents found.</p> : null}
      </div>
    </aside>
  );
}

function PostEditor({ post, setPost, onSave, onDelete, busy }) {
  if (!post) {
    return <div className="editor-empty"><BookOpenText size={28} /><h2>Select a document</h2><p>Choose an article from the list or create a new draft.</p></div>;
  }
  const update = (field, value) => setPost((current) => ({ ...current, [field]: value }));
  return (
    <section className="post-editor">
      <div className="editor-toolbar">
        <div className="draft-switch">
          <span>Status</span>
          <button className={post.draft ? "segmented segmented--active" : "segmented"} onClick={() => update("draft", !post.draft)} type="button">
            {post.draft ? "Draft" : "Published"}
          </button>
        </div>
        <div className="toolbar-actions">
          {post.path ? <button aria-label="Delete article" className="icon-button icon-button--danger" onClick={onDelete} type="button"><Trash2 size={16} /></button> : null}
          <button className="button button--primary" disabled={busy} onClick={onSave} type="button"><Save size={15} /> Save</button>
        </div>
      </div>
      <div className="post-meta-grid">
        <Field label="Title" wide><input className="title-input" placeholder="Untitled article" value={post.title} onChange={(event) => update("title", event.target.value)} /></Field>
        <Field label="Publish date"><input type="date" value={post.date || today()} onChange={(event) => update("date", event.target.value)} /></Field>
        <Field label="Slug"><input placeholder="article-url" value={post.slug || ""} onChange={(event) => update("slug", event.target.value)} /></Field>
        <Field label="Categories" wide><input placeholder="research, notes" value={(post.categories || []).join(", ")} onChange={(event) => update("categories", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></Field>
      </div>
      <div className="markdown-label"><FilePenLine size={15} /><span>Markdown</span></div>
      <textarea className="markdown-editor" spellCheck="true" value={post.body} onChange={(event) => update("body", event.target.value)} />
    </section>
  );
}

function BlogManager({ posts, post, setPost, onSelect, onNew, onSave, onDelete, busy }) {
  const [search, setSearch] = useState("");
  return (
    <div className="page-stack page-stack--editor">
      <SectionHeader eyebrow="Editorial" title="Writing" description="Draft, preview, and publish Markdown articles without touching file names or front matter." />
      <div className="writing-workspace">
        <PostList posts={posts} selectedPath={post?.path} search={search} setSearch={setSearch} onSelect={onSelect} onNew={onNew} />
        <PostEditor post={post} setPost={setPost} onSave={onSave} onDelete={onDelete} busy={busy} />
      </div>
    </div>
  );
}

function ScholarManager({ scholar, onRefresh, busy }) {
  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Research footprint"
        title="Google Scholar"
        description="Review the public metrics stored in your site and trigger a secure refresh when needed."
        action={<button className="button button--primary" disabled={busy} onClick={onRefresh} type="button"><RefreshCw className={busy ? "spin" : ""} size={15} /> Refresh data</button>}
      />
      <div className="metric-grid metric-grid--three">
        <MetricCard label="Citations" value={scholar?.citations ?? "N/A"} detail="All time" />
        <MetricCard label="h-index" value={scholar?.h_index ?? "N/A"} detail="All time" />
        <MetricCard label="i10-index" value={scholar?.i10_index ?? "N/A"} detail="All time" />
      </div>
      <section className="panel">
        <div className="panel-heading"><div><span className="section-kicker">Publications</span><h2>Tracked papers</h2></div></div>
        <div className="scholar-list">
          {(scholar?.articles || []).map((article) => (
            <a href={article.link} key={article.link || article.title} target="_blank" rel="noreferrer">
              <span className="paper-citations">{article.citations}</span>
              <span><strong>{article.title}</strong><small>{article.publication || article.year}</small></span>
              <ArrowUpRight size={15} />
            </a>
          ))}
          {!scholar?.articles?.length ? <p className="empty-copy">No Scholar data has been stored yet.</p> : null}
        </div>
      </section>
      <p className="security-note"><GitBranch size={15} /> Without a local `SERPAPI_API_KEY`, refresh starts the secure GitHub Actions workflow instead.</p>
    </div>
  );
}

function PublishManager({ changes, message, setMessage, onRefresh, onPublish, busy }) {
  return (
    <div className="page-stack">
      <SectionHeader eyebrow="Delivery" title="Publish" description="Review exactly what changed before committing and pushing the managed website files." action={<button className="button button--secondary" onClick={onRefresh} type="button"><RefreshCw size={15} /> Check again</button>} />
      <section className="panel publish-panel">
        <div className="publish-status">
          <div className={changes.length ? "publish-symbol publish-symbol--pending" : "publish-symbol"}>{changes.length ? <FilePenLine size={23} /> : <Check size={23} />}</div>
          <div><span className="section-kicker">Repository state</span><h2>{changes.length ? `${changes.length} changes ready` : "No unpublished changes"}</h2><p>{changes.length ? "Review the file list and describe this update before publishing." : "Your managed content matches the repository."}</p></div>
        </div>
        <div className="change-list">
          {changes.map((change) => <code key={change}>{change}</code>)}
        </div>
        <Field label="Commit message" wide><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Update website content" /></Field>
        <button className="button button--dark publish-button" disabled={busy || !changes.length} onClick={onPublish} type="button">
          {busy ? <LoaderCircle className="spin" size={16} /> : <Rocket size={16} />} Commit and push
        </button>
      </section>
      <p className="security-note"><CircleAlert size={15} /> Publishing only stages the profile, Scholar data, posts, drafts, images, and public website pages.</p>
    </div>
  );
}

function HomepagePreview({ profile, scholar, posts }) {
  return (
    <article className="site-preview-card">
      <div className="preview-site-nav"><strong>Minggu Wang</strong><span>About&nbsp;&nbsp; Blog</span></div>
      <div className="preview-home">
        <img className="preview-crest" src={assetUrl(profile.crest)} alt="" />
        <span>{profile.greeting}</span>
        <h2>{profile.headline}</h2>
        <p>{profile.summary}</p>
        <div className="preview-buttons"><b>Email me</b><span>Read the blog</span></div>
      </div>
      <div className="preview-block">
        <h3>What I focus on</h3>
        <p><strong>Research</strong> {profile.research}</p>
        <div className="preview-tags">{(profile.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="preview-scholar">
        <span><b>{scholar?.citations ?? "N/A"}</b>Citations</span>
        <span><b>{scholar?.h_index ?? "N/A"}</b>h-index</span>
        <span><b>{scholar?.i10_index ?? "N/A"}</b>i10-index</span>
      </div>
      <div className="preview-block"><h3>Recent writing</h3>{posts.filter((post) => !post.draft).slice(0, 2).map((post) => <p className="preview-post" key={post.path}>{post.title}<small>{post.date}</small></p>)}</div>
    </article>
  );
}

function ArticlePreview({ post }) {
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(normalizeJekyllMarkdown(post?.body || ""))),
    [post?.body]
  );
  return (
    <article className="site-preview-card article-preview">
      <div className="preview-site-nav"><strong>Minggu Wang</strong><span>Blog</span></div>
      <span className="article-state">{post?.draft ? "Draft preview" : post?.date}</span>
      <h1>{post?.title || "Untitled article"}</h1>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

function PreviewPane({ active, profile, scholar, posts, post, siteUrl }) {
  return (
    <aside className="preview-pane">
      <div className="preview-toolbar">
        <div><span className="preview-dot preview-dot--red" /><span className="preview-dot preview-dot--yellow" /><span className="preview-dot preview-dot--green" /></div>
        <span>Live content preview</span>
        <a href={siteUrl} target="_blank" rel="noreferrer" aria-label="Open published site"><ArrowUpRight size={15} /></a>
      </div>
      <div className="preview-canvas">
        {active === "blog" && post ? <ArticlePreview post={post} /> : <HomepagePreview profile={profile} scholar={scholar} posts={posts} />}
      </div>
    </aside>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState({});
  const [active, setActive] = useState("overview");
  const [post, setPost] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);
  const [commitMessage, setCommitMessage] = useState("Update website content");

  const notify = (message, type = "success") => setNotice({ message, type });

  const load = async () => {
    try {
      const bootstrap = await api.bootstrap();
      setData(bootstrap);
      setProfile(bootstrap.profile);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  useEffect(() => { load(); }, []);

  const navigate = async (section, postPath) => {
    setActive(section);
    if (section === "blog" && postPath) {
      try {
        const result = await api.getPost(postPath);
        setPost(result.post);
      } catch (error) {
        notify(error.message, "error");
      }
    }
  };

  const withBusy = async (operation) => {
    setBusy(true);
    try { await operation(); } catch (error) { notify(error.message, "error"); } finally { setBusy(false); }
  };

  const saveProfile = () => withBusy(async () => {
    const result = await api.saveProfile(profile);
    const status = await api.gitStatus();
    setProfile(result.profile);
    setData((current) => ({ ...current, profile: result.profile, changes: status.changes }));
    notify("Profile saved locally.");
  });

  const uploadProfileAsset = (file) => withBusy(async () => {
    const result = await api.uploadAsset(file);
    setProfile((current) => ({ ...current, crest: result.path }));
    notify("Image uploaded. Save the profile to apply it.");
  });

  const selectPost = async (postPath) => {
    try {
      const result = await api.getPost(postPath);
      setPost(result.post);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const savePost = () => withBusy(async () => {
    const result = await api.savePost(post);
    setPost(result.post);
    const changes = await api.gitStatus();
    setData((current) => ({ ...current, posts: result.posts, changes: changes.changes }));
    notify(result.post.draft ? "Draft saved locally." : "Article saved locally.");
  });

  const deletePost = () => {
    if (!post?.path || !window.confirm(`Delete “${post.title}”? This cannot be undone from the manager.`)) return;
    withBusy(async () => {
      const result = await api.deletePost(post.path);
      setPost(null);
      const changes = await api.gitStatus();
      setData((current) => ({ ...current, posts: result.posts, changes: changes.changes }));
      notify("Article deleted locally.");
    });
  };

  const refreshScholar = () => withBusy(async () => {
    const result = await api.refreshScholar();
    if (result.scholar) setData((current) => ({ ...current, scholar: result.scholar }));
    notify(result.message);
  });

  const refreshGit = async () => {
    try {
      const result = await api.gitStatus();
      setData((current) => ({ ...current, changes: result.changes }));
      notify("Repository status refreshed.");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const publish = () => withBusy(async () => {
    const result = await api.publish(commitMessage);
    setData((current) => ({ ...current, changes: result.changes }));
    notify(result.message);
  });

  if (!data) {
    return <main className="loading-screen"><LoaderCircle className="spin" size={24} /><span>Opening your website workspace…</span><Notice notice={notice} onClose={() => setNotice(null)} /></main>;
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} onNavigate={navigate} profile={profile} changes={data.changes.length} />
      <main className="workspace">
        {active === "overview" ? <Overview data={{ ...data, profile }} onNavigate={navigate} /> : null}
        {active === "profile" ? <ProfileEditor profile={profile} setProfile={setProfile} onSave={saveProfile} onUpload={uploadProfileAsset} busy={busy} /> : null}
        {active === "blog" ? <BlogManager posts={data.posts} post={post} setPost={setPost} onSelect={selectPost} onNew={() => setPost(emptyPost())} onSave={savePost} onDelete={deletePost} busy={busy} /> : null}
        {active === "scholar" ? <ScholarManager scholar={data.scholar} onRefresh={refreshScholar} busy={busy} /> : null}
        {active === "publish" ? <PublishManager changes={data.changes} message={commitMessage} setMessage={setCommitMessage} onRefresh={refreshGit} onPublish={publish} busy={busy} /> : null}
      </main>
      <PreviewPane active={active} profile={profile} scholar={data.scholar} posts={data.posts} post={post} siteUrl={data.siteUrl} />
      <Notice notice={notice} onClose={() => setNotice(null)} />
    </div>
  );
}
