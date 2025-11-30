layout: default
title: "Minggu Wang · AI Research"
scholar_profile_id: "YOUR_SCHOLAR_ID"
scholar_profile_url: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID"
serpapi_api_key: ""
---

<style>
:root {
  --page-bg: #05060a;
  --surface: #0f111a;
  --accent: #84c5ff;
  --accent-strong: #4f9cf9;
  --muted: #9da7c0;
  --border: rgba(255, 255, 255, 0.08);
}

body {
  background: var(--page-bg);
  color: #f6f7fb;
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
}

main.page-content {
  padding-top: 2rem;
}

.content-shell {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.research-hero {
  background: radial-gradient(circle at top left, rgba(79, 156, 249, 0.35), transparent 50%), var(--surface);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 3.5rem;
  box-shadow: 0 25px 55px rgba(0, 0, 0, 0.35);
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  margin-bottom: 1rem;
}

.research-hero h1 {
  font-size: clamp(2.4rem, 4vw, 3.9rem);
  margin: 0 0 1rem;
}

.hero-summary {
  font-size: 1.2rem;
  color: var(--muted);
  line-height: 1.6;
  max-width: 820px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 2rem;
  color: var(--muted);
}

.cta-row {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-row a {
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.cta-row a.cta-primary {
  background: var(--accent-strong);
  color: #05060a;
}

.cta-row a.cta-secondary {
  border: 1px solid var(--border);
  color: var(--muted);
}

.cta-row a:hover {
  transform: translateY(-2px);
}

.stats-grid {
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.stats-card {
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: linear-gradient(145deg, #0c0f19, #090b12);
}

.stats-card span {
  display: block;
}

.stat-label {
  color: var(--muted);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.section-heading {
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.02em;
}

.section-heading span {
  color: var(--accent);
}

.pillars-grid,
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.pillar-card,
.project-card {
  border-radius: 20px;
  border: 1px solid var(--border);
  padding: 1.5rem;
  background: linear-gradient(145deg, #0c0f19, #090b12);
}

.pillar-card h3,
.project-card h3 {
  margin-top: 0;
}

.timeline {
  border-left: 2px solid var(--border);
  margin: 2rem 0 3rem;
  padding-left: 1.5rem;
}

.timeline-item {
  margin-bottom: 1.8rem;
  position: relative;
}

.timeline-item::before {
  content: "";
  width: 14px;
  height: 14px;
  background: var(--accent);
  border-radius: 50%;
  position: absolute;
  left: -2.9rem;
  top: 4px;
  box-shadow: 0 0 0 6px rgba(132, 197, 255, 0.15);
}

.timeline-item strong {
  font-size: 1.1rem;
}

.timeline-meta {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.scholar-feed {
  border-radius: 24px;
  border: 1px solid var(--border);
  margin-top: 3rem;
  padding: 2rem;
  background: #0b0d14;
}

.scholar-feed__list {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.2rem;
}

.scholar-feed__item {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.2rem;
}

.scholar-feed__item a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.scholar-feed__item a:hover {
  color: var(--accent);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.news-card {
  border-radius: 20px;
  border: 1px solid var(--border);
  padding: 1.2rem;
  background: #0b0d14;
}

.contact-card {
  margin-top: 3rem;
  border-radius: 28px;
  border: 1px solid var(--border);
  padding: 2rem;
  background: linear-gradient(145deg, rgba(132, 197, 255, 0.1), rgba(5, 6, 10, 0.6));
  text-align: center;
}

.contact-card h3 {
  margin-top: 0;
}

.contact-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1.2rem;
}

.contact-links a {
  color: var(--accent);
  text-decoration: none;
}

.scholar-status {
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 0.6rem;
}

@media (max-width: 720px) {
  .research-hero {
    padding: 2rem;
  }

  .cta-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>

<div class="content-shell">
  <section class="research-hero">
    <p class="eyebrow">AI Research Scientist</p>
    <h1>Designing trustworthy intelligence for embodied and scientific systems.</h1>
    <p class="hero-summary">
      I build generalizable multimodal models and decision-making agents that can reason with language, perception, and control signals.
      My work spans foundation models for robotics, adaptive autonomy for scientific discovery, and responsible AI evaluation pipelines.
    </p>
    <div class="hero-meta">
      <span>Operating between Cambridge & Shanghai</span>
      <span>Leadership across academia and industry</span>
      <span>Collaborations with Google, MSR, and open-source communities</span>
    </div>
    <div class="cta-row">
      <a class="cta-primary" href="mailto:{{ site.email | default: 'your-email@example.com' }}">Connect via Email</a>
      <a class="cta-secondary" href="{{ page.scholar_profile_url }}">Google Scholar</a>
      <a class="cta-secondary" href="https://github.com/{{ site.github_username | default: 'mingguwang' }}">GitHub</a>
    </div>
  </section>

  <section class="stats-grid" aria-label="live scholar metrics">
    <div class="stats-card">
      <span class="stat-label">Total Citations</span>
      <span class="stat-value" id="scholar-total-citations">--</span>
    </div>
    <div class="stats-card">
      <span class="stat-label">h-index</span>
      <span class="stat-value" id="scholar-hindex">--</span>
    </div>
    <div class="stats-card">
      <span class="stat-label">i10-index</span>
      <span class="stat-value" id="scholar-i10">--</span>
    </div>
    <div class="stats-card">
      <span class="stat-label">Publications tracked</span>
      <span class="stat-value" id="scholar-total-pubs">--</span>
    </div>
  </section>

  <section>
    <h2 class="section-heading"><span>Research Agenda</span> · building reliable foundation models</h2>
    <div class="pillars-grid">
      <article class="pillar-card">
        <h3>Embodied Intelligence</h3>
        <p>Learning transferable policies that connect language, perception, and low-level control so robots can generalize between labs and factories.</p>
      </article>
      <article class="pillar-card">
        <h3>Multimodal Reasoning</h3>
        <p>Infusing large language models with geometric and temporal priors for grounded planning and interactive scientific workflows.</p>
      </article>
      <article class="pillar-card">
        <h3>Responsible AI Systems</h3>
        <p>Designing measurement pipelines, interpretability tooling, and governance sandboxes that keep AI evaluation transparent and reproducible.</p>
      </article>
    </div>
  </section>

  <section>
    <h2 class="section-heading"><span>Leadership</span> · select appointments</h2>
    <div class="timeline">
      <div class="timeline-item">
        <strong>Senior Research Scientist · Applied Intelligence Lab</strong>
        <div class="timeline-meta">2021 – present · Leading a 10-person foundation model task force</div>
        <p>Shipped open-sourced policy distillation toolkit adopted by 30+ robotics groups.</p>
      </div>
      <div class="timeline-item">
        <strong>Visiting Scholar · Tsinghua AIR</strong>
        <div class="timeline-meta">2019 – 2021 · Embodied multimodal collaboration</div>
        <p>Co-created cross-lab benchmark for language-grounded manipulation with industry partners.</p>
      </div>
      <div class="timeline-item">
        <strong>PhD · Computer Science</strong>
        <div class="timeline-meta">2014 – 2019 · University of Illinois Urbana-Champaign</div>
        <p>Dissertation on safety-aware model-based reinforcement learning, with honors from IEEE ICRA.</p>
      </div>
    </div>
  </section>

  <section>
    <h2 class="section-heading"><span>Projects</span> · high-impact releases</h2>
    <div class="projects-grid">
      <article class="project-card">
        <h3>Atlas-LM</h3>
        <p>Instruction-tuned multimodal agent that pairs CLIP-like encoders with transformer planners to accomplish 70+ embodied tasks without task-specific training.</p>
        <p><strong>Impact:</strong> Selected for CVPR 2024 Highlight; powering robotics teams across three Fortune 100 partners.</p>
      </article>
      <article class="project-card">
        <h3>LabPilot</h3>
        <p>Autonomous wet-lab orchestration platform where foundation models draft experiments, schedule robots, and validate hypotheses against simulation sandboxes.</p>
        <p><strong>Impact:</strong> Cut experiment iteration time by 38% on internal chemistry projects.</p>
      </article>
      <article class="project-card">
        <h3>OpenEval</h3>
        <p>Lightweight evaluation harness that unifies fairness, robustness, and efficiency metrics. Adopted by several open-source LLM communities.</p>
        <p><strong>Impact:</strong> Referenced by OECD AI policy brief on transparency guidelines.</p>
      </article>
    </div>
  </section>

  <section class="scholar-feed">
    <h2 class="section-heading"><span>Live Scholar Feed</span> · newest publications</h2>
    <p class="scholar-status" id="scholar-status">Waiting for live data... configure your API key to enable automatic updates.</p>
    <ul class="scholar-feed__list" id="scholar-feed-list">
      <li class="scholar-feed__item">
        <strong>Foundation Models Need Embodied Feedback</strong>
        <p>Citations: 0 · 2024 · Preprint placeholder until Scholar sync is active.</p>
      </li>
    </ul>
  </section>

  <section>
    <h2 class="section-heading"><span>Newsroom</span> · recent highlights</h2>
    <div class="news-grid">
      <article class="news-card">
        <p class="eyebrow">May 2024</p>
        <p>Invited keynote on closing the sim-to-real gap for lab automation at ICML workshop.</p>
      </article>
      <article class="news-card">
        <p class="eyebrow">March 2024</p>
        <p>Released multimodal benchmark covering 12 manipulation tasks with natural language feedback.</p>
      </article>
      <article class="news-card">
        <p class="eyebrow">January 2024</p>
        <p>Co-organized an AAAI tutorial on responsible evaluation of large models.</p>
      </article>
    </div>
  </section>

  <section class="contact-card">
    <h3>Let us collaborate</h3>
    <p>I am always interested in co-advising students, partnering with startups, and building open research tooling.</p>
    <div class="contact-links">
      <a href="mailto:{{ site.email | default: 'your-email@example.com' }}">Email</a>
      <a href="{{ page.scholar_profile_url }}">Google Scholar</a>
      <a href="https://github.com/{{ site.github_username | default: 'mingguwang' }}">GitHub</a>
      <a href="{{ site.url | default: '/' }}about/">About</a>
    </div>
  </section>
</div>

<script>
(function () {
  const scholarId = "{{ page.scholar_profile_id }}";
  const serpApiKey = "{{ page.serpapi_api_key }}";
  const scholarUrl = "https://serpapi.com/search.json?engine=google_scholar_profile&hl=en&author_id=" + scholarId + "&api_key=" + serpApiKey;
  const statusEl = document.getElementById("scholar-status");
  const citationsEl = document.getElementById("scholar-total-citations");
  const hindexEl = document.getElementById("scholar-hindex");
  const i10El = document.getElementById("scholar-i10");
  const pubsEl = document.getElementById("scholar-total-pubs");
  const feedEl = document.getElementById("scholar-feed-list");

  if (!scholarId || scholarId === "YOUR_SCHOLAR_ID") {
    if (statusEl) {
      statusEl.textContent = "Add your Google Scholar ID in index.markdown to enable automatic metrics.";
    }
    return;
  }

  if (!serpApiKey) {
    if (statusEl) {
      statusEl.textContent = "Provide a SERP API key (https://serpapi.com/) to refresh Google Scholar metrics in real time.";
    }
    return;
  }

  statusEl.textContent = "Syncing with Google Scholar...";

  fetch(scholarUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Scholar API error");
      }
      return response.json();
    })
    .then(function (data) {
      const totals = data.cited_by && data.cited_by.table && data.cited_by.table[0] ? data.cited_by.table[0] : null;
      if (totals) {
        citationsEl.textContent = totals.citations || "--";
        hindexEl.textContent = totals.h_index || "--";
        i10El.textContent = totals.i10_index || "--";
      }
      if (data.author && data.author.articles_count) {
        pubsEl.textContent = data.author.articles_count;
      } else if (data.articles) {
        pubsEl.textContent = data.articles.length + "+";
      }

      if (Array.isArray(data.articles) && data.articles.length) {
        feedEl.innerHTML = "";
        data.articles.slice(0, 5).forEach(function (article) {
          var li = document.createElement("li");
          li.className = "scholar-feed__item";
          var link = article.link || "{{ page.scholar_profile_url }}";
          var title = article.title || "Untitled";
          var pub = article.publication ? " · " + article.publication : "";
          var year = article.year ? " · " + article.year : "";
          var citations = article.cited_by && article.cited_by.value ? article.cited_by.value : 0;
          li.innerHTML = '<a href="' + link + '" target="_blank" rel="noopener">' + title + '</a>' +
            "<p>Citations: " + citations + pub + year + "</p>";
          feedEl.appendChild(li);
        });
      }
      statusEl.textContent = "Last refreshed " + new Date().toLocaleString();
    })
    .catch(function (error) {
      console.error(error);
      statusEl.textContent = "Unable to reach Google Scholar right now. Check your API quota or network rules.";
    });
})();
</script>
