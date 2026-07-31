---
layout: default
title: "Minggu Wang"
description: "AI researcher building reliable multimodal systems."
scholar_profile_id: "1xge3_oAAAAJ"
scholar_profile_url: "https://scholar.google.com/citations?user=1xge3_oAAAAJ"
---

<style>
:root {
  --ink: #1d1d1f;
  --muted: #6e6e73;
  --border: #e5e5ea;
  --accent: #0071e3;
  --paper: #ffffff;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: 0;
}

main.page-content {
  padding-top: 2rem;
}

.intro {
  max-width: 720px;
  margin: 0 auto 2.2rem;
  text-align: center;
}

.intro__crest {
  width: min(220px, 60%);
  margin: 0 auto 1.6rem;
  padding: 0.9rem;
  border-radius: 28px;
  background:
    radial-gradient(circle at top, rgba(36, 84, 255, 0.18), transparent 70%),
    linear-gradient(140deg, #ffffff, #f2f4ff);
  box-shadow:
    0 20px 40px rgba(36, 84, 255, 0.12),
    inset 0 0 0 1px rgba(36, 84, 255, 0.1);
  position: relative;
}

.intro__crest::after {
  content: "";
  position: absolute;
  inset: 8px;
  border-radius: 22px;
  border: 1px dashed rgba(36, 84, 255, 0.18);
  pointer-events: none;
}

.intro__crest img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 18px;
}

.intro__hello {
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.68rem;
  color: var(--muted);
}

.intro h1 {
  margin: 0.5rem 0 0.8rem;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 600;
}

.intro p {
  margin: 0 auto;
  color: var(--muted);
  line-height: 1.7;
}

.intro__links {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.button-link {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.55rem 1.4rem;
  text-decoration: none;
  color: var(--ink);
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.button-link--primary {
  background: var(--ink);
  color: #fff;
  border-color: transparent;
}

.button-link:hover {
  background: #f5f5f7;
  color: var(--ink);
  border-color: #d2d2d7;
}

.button-link--primary:hover {
  background: #0a0a0a;
}

.layout {
  max-width: 880px;
  margin: 0 auto;
  padding: 0 1.25rem 4rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
}

.card {
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.9rem;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
}

.card h2 {
  margin-top: 0;
  font-weight: 600;
}

.scholar-status {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 1rem;
}

.intro__crest {
  width: min(200px, 58%);
  margin: 0 auto 1rem;
  padding: 0.9rem;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 35%, #f7f7f9, #ffffff 70%);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08);
  position: relative;
  display: block;
  text-align: center;
}

.intro__crest img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 999px;
  filter: saturate(1.02);
}

.scholar-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.scholar-metric {
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 0.85rem;
  text-align: center;
}

.scholar-metric__label {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.scholar-metric__value {
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 0.2rem;
}

.scholar-feed {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.9rem;
}

.scholar-feed li {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.85rem;
}

.scholar-feed li strong {
  font-size: 0.95rem;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-list li {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: #f4f6fb;
  font-size: 0.9rem;
  color: var(--muted);
}

.blog-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: grid;
  gap: 1rem;
}

.blog-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.blog-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.blog-item a {
  text-decoration: none;
  font-weight: 600;
  color: var(--ink);
}

.blog-item span {
  display: block;
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 0.2rem;
}

.blog-empty {
  font-style: italic;
  color: var(--muted);
}
</style>

<section class="intro">
  {% assign profile = site.data.profile %}
  <div class="intro__crest">
    <img src="{{ profile.crest | relative_url }}" alt="{{ profile.name }} crest" />
  </div>
  <p class="intro__hello">{{ profile.greeting }}</p>
  <h1>{{ profile.headline }}</h1>
  <p>{{ profile.summary }}</p>
  <div class="intro__links">
    <a class="button-link button-link--primary" href="mailto:{{ profile.email }}">Email me</a>
    <a class="button-link" href="/blog/">Read the blog</a>
    <a class="button-link" href="{{ site.url | default: '/' }}about/">More about me</a>
  </div>
</section>

<div class="layout">
  <section class="card">
    <h2>What I focus on</h2>
    <div class="two-column">
      <div>
        <p><strong>Research ·</strong> {{ profile.research }}</p>
      </div>
      <div>
        <p><strong>Collaboration ·</strong> {{ profile.collaboration }}</p>
      </div>
    </div>
    <ul class="tag-list">
      {% for tag in profile.tags %}
      <li>{{ tag }}</li>
      {% endfor %}
    </ul>
  </section>

  <section class="card">
    <h2>Scholar snapshot</h2>
    {% assign scholar = site.data.scholar %}
    {% if scholar %}
    <p class="scholar-status">Updated automatically from Google Scholar.</p>
    <div class="scholar-metrics">
      <div class="scholar-metric">
        <span class="scholar-metric__label">Citations</span>
        <span class="scholar-metric__value">{{ scholar.citations }}</span>
      </div>
      <div class="scholar-metric">
        <span class="scholar-metric__label">h-index</span>
        <span class="scholar-metric__value">{{ scholar.h_index }}</span>
      </div>
      <div class="scholar-metric">
        <span class="scholar-metric__label">i10-index</span>
        <span class="scholar-metric__value">{{ scholar.i10_index }}</span>
      </div>
    </div>
    <ul class="scholar-feed">
      {% for article in scholar.articles %}
      <li>
        <strong><a href="{{ article.link | escape }}" target="_blank" rel="noopener">{{ article.title }}</a></strong>
        <p>Citations: {{ article.citations }}{% if article.publication %} · {{ article.publication }}{% elsif article.year %} · {{ article.year }}{% endif %}</p>
      </li>
      {% endfor %}
    </ul>
    {% else %}
    <p class="scholar-status">Scholar data will appear after the update workflow runs.</p>
    {% endif %}
    <div class="intro__links" style="justify-content:flex-start;margin-top:1.25rem;">
      <a class="button-link" href="{{ page.scholar_profile_url }}" target="_blank" rel="noopener">View Google Scholar</a>
    </div>
  </section>

  <section class="card">
    <h2>Recent writing</h2>
    {% if site.posts.size == 0 %}
    <p class="blog-empty">No posts yet. Draft your first entry in `_posts/` to populate this feed.</p>
    {% else %}
    <ul class="blog-list">
      {% for post in site.posts limit:3 %}
      <li class="blog-item">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>{{ post.date | date: "%B %d, %Y" }}</span>
        {% if post.excerpt %}
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
    <div class="intro__links" style="justify-content:flex-start;margin-top:1.25rem;">
      <a class="button-link" href="/blog/">View all posts</a>
    </div>
    {% endif %}
  </section>

  <section class="card">
    <h2>Currently</h2>
    <p>{{ profile.current }}</p>
  </section>
</div>
