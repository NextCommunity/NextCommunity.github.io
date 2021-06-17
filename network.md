---
layout: default
permalink: /network/
title: Community of programmers and software engineers
---

<h1>
	<a href="/">&uarr;</a>
	Community of programmers and software engineers
</h1>

Do you want to see yourself here? Click [here](https://github.com/BaseMax/NextCommunity){:target="\_blank"} to add your own.

<style type="text/css">
ul.accounts li {
  float: left;
  width: 100%;
  list-style: none;
  margin-bottom: 10px;
}
ul.accounts li img {
  float: left;
  margin-right: 10px;
}
ul.accounts li div {
  float: left;
  font-size: 20px;
}
ul.accounts ul div * {
  font-size: initial;
}
ul.accounts h4, ul.accounts h5, ul.accounts h6 {
  padding: 0;
  margin: 0;
  background: transparent !important;
  border: 0px !important;
}
ul.accounts li a.avatar:hover {
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
    <td>
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
</ul>
