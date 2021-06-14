---
layout: default
---

<article itemscope itemtype="http://schema.org/BlogPosting">
  <h1>
    <a href="/">&uarr;</a>
    Network Profile: {{ page.name }}
  </h1>
  <b><span class="subtitle">{{ page.role }}</span></b>
  <br>
  <a href="https://github.com/{{ page.github }}/">
    <span class="subtitle">{{ page.email }}</span>
  </a>
  <br>
  <span class="subtitle">{{ page.country }}, {{ page.location }}</span>

  {{ content }}


</article>
