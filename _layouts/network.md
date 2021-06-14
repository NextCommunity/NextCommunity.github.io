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

  <table width="100%" border="0">
    <tr>
      <td>
        <a href="https://github.com/{{ page.github }}/">
          <img src="https://github.com/{{ network.github }}.png?size=80" width="60">
        </a>
      </td>
      <td>
        {{ content }}
      </td>
    </tr>
  </table>

</article>
