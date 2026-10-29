---
layout: page
title: Writing
kicker: Notebook
description: Research notes, experiments, and ideas in progress.
permalink: /blog/
prose: false
---

{% if site.posts.size > 0 %}
<ol class="blog-feed">
  {% for post in site.posts %}
  <li class="blog-feed__item">
    <a href="{{ post.url | relative_url }}">
      <time class="blog-feed__date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      <span class="blog-feed__title">{{ post.title }}</span>
      {% if post.excerpt %}<p class="blog-feed__excerpt">{{ post.excerpt | strip_html | truncate: 190 }}</p>{% endif %}
    </a>
  </li>
  {% endfor %}
</ol>
{% else %}
<div class="empty-state">
  <strong>The notebook is quiet for now.</strong>
  New essays and research notes will appear here.
</div>
{% endif %}
