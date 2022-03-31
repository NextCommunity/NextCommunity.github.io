---
layout: default
permalink: /network/
title: Community of programmers and software engineers
---

<h1>
	<a href="/">&uarr;</a>
	Community of programmers and software engineers
</h1>

Do you want to see yourself here? Click [here](https://github.com/NextCommunity/NextCommunity.github.io){:target="\_blank"} to add your own.

<style type="text/css">
.accounts tr {
  float: left;
  width: 100%;
  list-style: none;
  margin-bottom: 10px;
}
.accounts tr .second {
  font-size: 20px;
}
.accounts tr h1, .accounts tr h2, .accounts tr h3, .accounts tr h4, .accounts tr h5, .accounts tr h6 {
  margin-left: 0px !important;
  padding-left: 0px !important;
  margin-right: 0px !important;
  padding-right: 0px !important;
}
.accounts tr .second * {
  font-size: initial;
}
.accounts h4, .accounts h5, .accounts h6 {
  padding: 0;
  margin: 0;
  background: transparent !important;
  border: 0px !important;
}
.accounts tr a.avatar:hover {
  background: transparent !important;
  border: 0px !important;
}
</style>

## List of members

<table class="accounts" width="100%" border="0">
  {% for network in site.networks %}
  <tr>
    <td width="auto">
       <a href="{{ network.url | relative_url }}" class="avatar">
         <img src="https://github.com/{{ network.github }}.png?size=80" width="60">
       </a>
    </td>
    <td class="second">
      <h4>
        <a href="{{ network.url | relative_url }}">
          {{ network.name }}
        </a>
      </h4>
      <h5>{{ network.role }}</h5>
      <h6>{{ network.country}}, {{ network.location}}</h6>
    </td>
  </tr>
  {% endfor %}
</table>
