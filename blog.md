---
layout: default
permalink: /blog/
title: Max Base - Blog posts
---

<h1>
	<a href="/">&uarr;</a>
	Blog posts
</h1>

<ul>
  {% for post in site.posts %}
    <li>
      {% assign date_format = site.cayman-blog.date_format | default: "%b %-d, %Y" %}
		<i>{{ post.date | date: date_format }}</i>:
			<a href="{{ post.url | relative_url }}" title="{{ post.title }}">
			{{ post.title | escape }}
		</a>
    </li>
  {% endfor %}
</ul>
