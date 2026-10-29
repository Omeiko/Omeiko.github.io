---
layout: page
title: About
kicker: Profile
description: Minggu Wang is an AI researcher at Kyushu University working across software engineering, computer vision, and robustness evaluation.
permalink: /about/
prose: false
---

{% assign profile = site.data.profile %}
{% assign email_address = profile.email | replace: '[at]', '@' %}

<div class="about-lead">
  <p>{{ profile.summary }}</p>
  <p>My recent work spans quantum code generation, identity-preserving face editing, and robustness testing for autonomous-driving perception. The common thread is evaluation: defining what correct behavior means and building evidence that a system actually meets it.</p>
</div>

<div class="about-grid">
  <section class="about-row"><h2>Role</h2><p>{{ profile.role }} at {{ profile.affiliation }}.</p></section>
  <section class="about-row"><h2>Research</h2><p>{{ profile.research }}</p></section>
  <section class="about-row"><h2>Collaboration</h2><p>{{ profile.collaboration }}</p></section>
  <section class="about-row"><h2>Currently</h2><p>{{ profile.current }}</p></section>
</div>

<ul class="topic-list" aria-label="Research topics">{% for tag in profile.tags %}<li>{{ tag }}</li>{% endfor %}</ul>

<section class="profile-links" aria-labelledby="profile-links-title">
  <h2 id="profile-links-title">Academic profiles</h2>
  <div>
    <a href="{{ profile.scholar_url }}" target="_blank" rel="noopener noreferrer"><strong>Google Scholar</strong><span>Citations and indexed publications</span></a>
    <a href="{{ profile.openalex_url }}" target="_blank" rel="noopener noreferrer"><strong>OpenAlex</strong><span>Open scholarly identity record</span></a>
    <a href="{{ profile.conference_url }}" target="_blank" rel="noopener noreferrer"><strong>Conference profile</strong><span>Program and author record</span></a>
    <a href="{{ profile.github_url }}" target="_blank" rel="noopener noreferrer"><strong>GitHub</strong><span>Code and public projects</span></a>
    {% if profile.orcid_url != '' %}<a href="{{ profile.orcid_url }}" target="_blank" rel="noopener noreferrer"><strong>ORCID</strong><span>Persistent researcher identifier</span></a>{% endif %}
    {% if profile.dblp_url != '' %}<a href="{{ profile.dblp_url }}" target="_blank" rel="noopener noreferrer"><strong>DBLP</strong><span>Computer science bibliography</span></a>{% endif %}
  </div>
</section>

<div class="about-contact">
  <a class="button button--primary" href="mailto:{{ email_address }}">Email me</a>
  <a class="button" href="{{ '/publications/' | relative_url }}">Publications</a>
  <a class="button" href="{{ profile.cv_url | relative_url }}">Download CV</a>
</div>
