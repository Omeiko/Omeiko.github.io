---
layout: page
title: Publications
kicker: Research record
description: Peer-reviewed work in AI for software engineering, generative vision, and robustness evaluation.
permalink: /publications/
prose: false
---

{% assign publications = site.data.publications %}
{% assign scholar = site.data.scholar %}

<div class="publication-intro">
  <p>Formal bibliographic metadata is maintained separately from citation metrics. DOI records define the publication details; citation counts are sourced from Google Scholar and may differ from Crossref or Scopus.</p>
  <div class="publication-tools">
    <a class="button button--primary" href="{{ '/assets/bibliography/publications.bib' | relative_url }}">Download BibTeX</a>
    <a class="button" href="{{ site.scholar_url }}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
    <a class="button" href="{{ site.openalex_url }}" target="_blank" rel="noopener noreferrer">OpenAlex</a>
  </div>
</div>

<div class="publication-summary" aria-label="Publication summary">
  <div><strong>{{ publications.size }}</strong><span>Peer-reviewed papers</span></div>
  <div><strong>{{ scholar.citations }}</strong><span>Scholar citations</span></div>
  <div><strong>{{ scholar.updated_at | date: "%Y-%m-%d" }}</strong><span>Metrics last checked</span></div>
</div>

<ol class="publication-record">
  {% for publication in publications %}
    {% assign citation_count = nil %}
    {% for article in scholar.articles %}
      {% if article.title == publication.scholar_title %}{% assign citation_count = article.citations %}{% endif %}
    {% endfor %}
    <li id="{{ publication.slug }}">
      <div class="publication-record__index">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</div>
      <article>
        <div class="publication-record__meta">
          <span>{{ publication.status }}</span><span>{{ publication.venue_short }}</span><span>{{ publication.year }}</span>
          {% if citation_count != nil %}<span>{{ citation_count }} Scholar citation{% unless citation_count == 1 %}s{% endunless %}</span>{% endif %}
        </div>
        <h2><a href="{{ publication.doi_url }}" target="_blank" rel="noopener noreferrer">{{ publication.title }}</a></h2>
        <p class="publication-record__authors">{{ publication.authors | join: ", " }}</p>
        <p>{{ publication.summary }}</p>
        <p class="publication-record__venue">{{ publication.venue }}, pp. {{ publication.pages }}.</p>
        <ul class="publication-record__topics" aria-label="Paper topics">{% for topic in publication.topics %}<li>{{ topic }}</li>{% endfor %}</ul>
        <div class="publication-record__links">
          <a href="{{ publication.doi_url }}" target="_blank" rel="noopener noreferrer">DOI</a>
          {% if publication.arxiv_url != '' %}<a href="{{ publication.arxiv_url }}" target="_blank" rel="noopener noreferrer">arXiv</a>{% endif %}
          <a href="{{ '/assets/bibliography/publications.bib' | relative_url }}">BibTeX key: {{ publication.bibtex_key }}</a>
        </div>
      </article>
    </li>
  {% endfor %}
</ol>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Publications by Minggu Wang",
  "numberOfItems": {{ publications.size }},
  "itemListElement": [
    {% for publication in publications %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "item": {
        "@type": "ScholarlyArticle",
        "headline": {{ publication.title | jsonify }},
        "datePublished": {{ publication.year | jsonify }},
        "pagination": {{ publication.pages | jsonify }},
        "identifier": {{ publication.doi | prepend: "https://doi.org/" | jsonify }},
        "url": {{ publication.doi_url | jsonify }},
        "isPartOf": {"@type": "PublicationEvent", "name": {{ publication.venue | jsonify }}},
        "author": [{% for author in publication.authors %}{"@type": "Person", "name": {{ author | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}]
      }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
