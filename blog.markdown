---
layout: page
title: Blog
permalink: /blog/
---

<style>
.blog-feed {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.5rem;
}

.blog-feed__item {
  border-bottom: 1px solid #e6e9f2;
  padding-bottom: 1.5rem;
}

.blog-feed__item:last-child {
  border-bottom: none;
}

.blog-feed__item a {
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 600;
}

.blog-feed__date {
  font-size: 0.9rem;
  color: #7a8091;
  display: block;
  margin-top: 0.2rem;
}
</style>

{% if site.posts.size == 0 %}
<p>No posts published yet. Add Markdown files to the `_posts` directory using the `YYYY-MM-DD-title.md` naming convention.</p>
{% else %}
<ul class="blog-feed">
  {% for post in site.posts %}
  <li class="blog-feed__item">
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="blog-feed__date">{{ post.date | date: "%B %d, %Y" }}</span>
    {% if post.excerpt %}
    <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
{% endif %}
