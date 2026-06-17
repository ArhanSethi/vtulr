/*
 * blog-data.js — VTULR Blog content (single source of truth)
 *
 * This file is the ONLY thing that needs to change to publish, edit, or
 * delete a blog post. The blog index (/blog) and the article renderer
 * (/blog/post.html?slug=...) both read from the BLOG_POSTS array below.
 *
 * HOW TO PUBLISH (the easy way):
 *   1. Go to /admin and log in.
 *   2. Write the article (title, author, cover image, body, footnotes).
 *   3. Click "Download blog-data.js".
 *   4. Replace this file with the downloaded one and commit + push
 *      (or send the downloaded file to whoever manages the repo).
 *   Done — the post appears on the blog automatically.
 *
 * RECORD FORMAT:
 *   {
 *     slug:    "url-safe-name",            // used in /blog/post.html?slug=...
 *     title:   "Article Title",
 *     author:  "First Last",
 *     image:   "data:image/jpeg;base64,…", // cover image, base64
 *     body:    "Text. Use [1] for footnote markers and *text* for italics. Blank lines separate paragraphs.",
 *     footnotes: [ { n: 1, text: "Citation, *italic case names* allowed." } ]
 *   }
 */

const BLOG_POSTS = [

  // No posts yet — publish your first one from /admin.

];

// Make available to browser <script> includes.
if (typeof window !== 'undefined') { window.BLOG_POSTS = BLOG_POSTS; }
