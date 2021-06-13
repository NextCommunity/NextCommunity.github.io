---
layout: default
permalink: /draft/
title: Max Base - Draft messages
---

<h1>
	<a href="/">&uarr;</a>
	Life blog (drafts)
</h1>

<ul>
  {% for draft in site.drafts %}
    <li>
      {% assign date_format = site.cayman-blog.date_format | default: "%b %-d, %Y" %}
		<i>{{ draft.date | date: date_format }}</i>: 
			<a href="{{ draft.url | relative_url }}" title="{{ draft.title }}">
			{{ draft.title | escape }}
		</a>
    </li>
  {% endfor %}
</ul>
