---
layout: default
title: Minggu Wang
description: AI researcher at Kyushu University working on AI for software engineering, generative vision, and robustness evaluation.
---

{% assign profile = site.data.profile %}
{% assign scholar = site.data.scholar %}
{% assign publications = site.data.publications %}
{% assign email_address = profile.email | replace: '[at]', '@' %}

<section class="hero" data-layout="hero">
  <div class="hero__copy">
    <p class="hero__greeting">{{ profile.greeting }}</p>
    <h1>{{ profile.headline }}</h1>
    <p class="hero__summary" data-role="hero-subtext">{{ profile.summary }}</p>
    <div class="hero__actions">
      <a class="button button--primary" href="{{ '/publications/' | relative_url }}">View publications</a>
      <a class="button" href="mailto:{{ email_address }}">Get in touch</a>
      <a class="button button--quiet" href="{{ profile.cv_url | relative_url }}">Download CV</a>
    </div>
  </div>
  <div class="hero__visual" aria-hidden="true">
    <img src="{{ profile.crest | relative_url }}" alt="" width="816" height="798" decoding="async" fetchpriority="high">
  </div>
</section>

<section class="section" id="research" data-layout="stack">
  <div class="section__heading">
    <div>
      <p class="section-label">Research</p>
      <h2>Questions that connect my work</h2>
    </div>
    <p>I build benchmarks, generative methods, and testing approaches for AI systems whose behavior must be measured—not merely demonstrated.</p>
  </div>
  <div class="research-lanes">
    <article>
      <span>01</span>
      <h3>AI for software engineering</h3>
      <p>Evaluating how language models generate programs, with an emphasis on executable correctness and semantic behavior.</p>
    </article>
    <article>
      <span>02</span>
      <h3>Generative vision</h3>
      <p>Studying controllable image generation and editing while preserving identity, structure, and other important constraints.</p>
    </article>
    <article>
      <span>03</span>
      <h3>Robustness &amp; evaluation</h3>
      <p>Testing model behavior under realistic perturbations and connecting model errors to system-level consequences.</p>
    </article>
  </div>
</section>

<section class="scholar-section" id="publications" aria-labelledby="publications-title" data-layout="full">
  <div class="scholar-header">
    <div>
      <p class="section-label">Research footprint</p>
      <h2 id="publications-title">Selected publications</h2>
      {% if scholar.updated_at %}<p class="scholar-updated">Citation counts from {{ scholar.source }} · updated {{ scholar.updated_at | date: "%b %-d, %Y" }}</p>{% endif %}
    </div>
    <a class="scholar-link" href="{{ '/publications/' | relative_url }}">Complete publication record</a>
  </div>
  <div class="scholar-metrics" aria-label="Google Scholar metrics">
    <div class="scholar-metric"><strong>{{ scholar.citations }}</strong><span>Google Scholar citations</span></div>
    <div class="scholar-metric"><strong>{{ scholar.h_index }}</strong><span>h-index</span></div>
    <div class="scholar-metric"><strong>{{ scholar.i10_index }}</strong><span>i10-index</span></div>
  </div>
  <ol class="publication-list">
    {% for publication in publications %}
      {% if publication.selected %}
        {% assign citation_count = nil %}
        {% for article in scholar.articles %}
          {% if article.title == publication.scholar_title %}{% assign citation_count = article.citations %}{% endif %}
        {% endfor %}
        <li>
          <div class="publication-copy">
            <p class="publication-venue">{{ publication.venue_short }} · {{ publication.year }}</p>
            <a href="{{ publication.doi_url }}" target="_blank" rel="noopener noreferrer">{{ publication.title }}</a>
            <p>{{ publication.authors | join: ", " }} · pp. {{ publication.pages }}</p>
          </div>
          {% if citation_count != nil %}<span class="publication-citations">{{ citation_count }} Scholar citation{% unless citation_count == 1 %}s{% endunless %}</span>{% endif %}
        </li>
      {% endif %}
    {% endfor %}
  </ol>
  <div class="scholar-actions">
    <a class="button button--light" href="{{ site.scholar_url }}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
    <a class="button button--light" href="{{ '/assets/bibliography/publications.bib' | relative_url }}">Download BibTeX</a>
  </div>
</section>

<section class="section" id="writing" data-layout="stack">
  <div class="section__heading">
    <div>
      <p class="section-label">Notebook</p>
      <h2>Research notes</h2>
    </div>
    <p>Short explanations of what I am measuring, why it matters, and what the results leave unresolved.</p>
  </div>
  {% if site.posts.size > 0 %}
  <ol class="writing-list">
    {% for post in site.posts limit:3 %}
    <li>
      <a href="{{ post.url | relative_url }}">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
        <strong>{{ post.title }}</strong>
        <span class="writing-link-label">Read</span>
      </a>
    </li>
    {% endfor %}
  </ol>
  <div class="hero__actions"><a class="button" href="{{ '/blog/' | relative_url }}">All writing</a></div>
  {% else %}
  <div class="empty-state"><strong>The notebook is quiet for now.</strong>New essays and research notes will appear here.</div>
  {% endif %}
</section>

<section class="now-strip" aria-labelledby="now-title">
  <h2 id="now-title">Currently</h2>
  <p>{{ profile.current }}</p>
</section>
