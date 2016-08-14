---
layout: page
title: Contact
long_title: Contact Me
permalink: /contact/
mainnav: true
order: 3
sitemap:
  priority: 0.6
stylesheets:
  - "/css/contact.css"
---

Feel free to contact me regarding work opportunities, website issues / corrections or technical advice.

My CV / résumé is also available on request:

<form id="request-form" method="POST" action="https://formspree.io/{{ site.email }}">
  <label for="email">Your Email:</label>
  <input type="email" name="_replyto" placeholder="your.email@example.com" required="required" />
  <br/>
  <input type="hidden" name="_subject" value="CV Request" />
  <input type="hidden" name="_next" value="{{ site.url }}/thank-you/" />
  <textarea name="message" maxlength="1000" placeholder="Your Message ..." required="required" rows="5" cols="50"></textarea>
  <br/>
  <input type="submit" value="Request CV" />
</form>

Email:
: [{{ site.email }}](mailto:{{ site.email }}?subject=Hello)

<script type="text/javascript" src="https://secure.skypeassets.com/i/scom/js/skype-uri.js"></script>
<div id="SkypeButton_Call_nowisk_1" class="skype-contact">
 <strong>Skype:</strong>
 <script type="text/javascript">
 Skype.ui({
 "name": "chat",
 "element": "SkypeButton_Call_nowisk_1",
 "participants": ["nowisk"],
 "imageSize": 24
 });
 </script>
</div>
