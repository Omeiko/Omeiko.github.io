---
layout: default
title: "Minggu Wang"
description: "AI researcher building reliable multimodal systems."
---

<style>
:root {
  --ink: #1d2330;
  --muted: #6f778b;
  --border: #e6e9f2;
  --accent: #2454ff;
}

main.page-content {
  padding-top: 2rem;
}

.intro {
  max-width: 700px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.intro__hello {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: var(--accent);
}

.intro h1 {
  margin: 0.4rem 0;
  font-size: clamp(2rem, 5vw, 3rem);
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
  transition: background 0.2s ease, color 0.2s ease;
}

.button-link--primary {
  background: var(--ink);
  color: #fff;
  border-color: transparent;
}

.button-link:hover {
  background: #f5f6ff;
  color: var(--accent);
}

.button-link--primary:hover {
  background: var(--accent);
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
  border-radius: 18px;
  padding: 1.75rem;
  background: #fff;
  box-shadow: 0 10px 25px rgba(31, 42, 77, 0.08);
}

.card h2 {
  margin-top: 0;
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
  <p class="intro__hello">Hello, I’m Minggu</p>
  <h1>AI researcher shaping calm, trustworthy tools.</h1>
  <p>
    I study multimodal models and their applications to scientific discovery. Recently, I have been helping robotics teams
    bring language-to-action systems into real labs, while publishing about evaluation and alignment.
  </p>
  <div class="intro__links">
    <a class="button-link button-link--primary" href="mailto:{{ site.email | default: 'your-email@example.com' }}">Email me</a>
    <a class="button-link" href="/blog/">Read the blog</a>
    <a class="button-link" href="{{ site.url | default: '/' }}about/">More about me</a>
  </div>
</section>

<div class="layout">
  <section class="card">
    <h2>What I focus on</h2>
    <div class="two-column">
      <div>
        <p><strong>Research ·</strong> Multimodal reasoning, embodied autonomy, evaluation frameworks.</p>
      </div>
      <div>
        <p><strong>Collaboration ·</strong> Industry labs, open-source communities, and student mentorships.</p>
      </div>
    </div>
    <ul class="tag-list">
      <li>Robotics</li>
      <li>LLM safety</li>
      <li>Scientific AI</li>
      <li>Open-source</li>
    </ul>
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
    <p>
      Building lightweight eval suites for embodied models, mentoring two graduate students on generalizable manipulation policies,
      and exploring how AI can support sustainable lab workflows.
    </p>
  </section>
</div>
