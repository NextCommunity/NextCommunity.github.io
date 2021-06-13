---
layout: default
---
<article itemscope itemtype="http://schema.org/BlogPosting">
  <h1>
    <a href="/">&uarr;</a>
    {{ page.title }}
  </h1>
  <span class="subtitle">{{ page.subtitle }}</span>

  {{ content }}

  {% if site.disqus.shortname %}
    {% include disqus_comments.html %}
  {% endif %}

</article>

<div>

{% assign maxRelated = 5 %}
{% assign minCommonTags =  2 %}
{% assign maxRelatedCounter = 0 %}

{% for post in site.posts %}

	{% assign sameTagCount = 0 %}
	{% assign commonTags = '' %}

	{% for tag in post.tags %}
		{% if post.url != page.url %}
			{% if page.tags contains tag %}
				{% assign sameTagCount = sameTagCount | plus: 1 %}
				{% capture tagmarkup %} <span class="label label-default">{{ tag }}</span> {% endcapture %}
				{% assign commonTags = commonTags | append: tagmarkup %}
			{% endif %}
		{% endif %}
	{% endfor %}

	{% if sameTagCount >= minCommonTags %}
		{% if maxRelatedCounter == 0 %}
			<h2>Related Blog posts</h2>
		{% endif %}
		<li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}{{ commonTags }}</a></li>
		{% assign maxRelatedCounter = maxRelatedCounter | plus: 1 %}
		{% if maxRelatedCounter >= maxRelated %}
			{% break %}
		{% endif %}
	{% endif %}

{% endfor %}

</div>

{% if page.comments_id %}
	<h2>Comments</h2>

	{% include comments.html %}
{% else %}
	<h2>Comments</h2>

	<p>Comments are locked for this post.</p>

{% endif %}
