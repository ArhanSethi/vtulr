/*
 * blog-render.js — Shared rendering helpers for the VTULR blog.
 * Used by blog/post.html (article renderer) and admin.html (live preview).
 *
 * Article data model (see blog-data.js):
 *   {
 *     slug:    "url-safe-name",
 *     title:   "Article Title",
 *     author:  "First Last",
 *     image:   "data:image/jpeg;base64,...",   // cover, base64
 *     body:    "Paragraphs separated by blank lines. Use [1] for footnote markers and *text* for italics.",
 *     footnotes: [ { n: 1, text: "Citation text, *italicized case names* allowed." }, ... ]
 *   }
 */

(function (global) {
  'use strict';

  // Escape HTML special chars so user content can't inject markup.
  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Convert *italic* markers to <em> (after escaping).
  function applyItalics(escaped) {
    return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  // Convert [n] footnote markers to superscript anchor links.
  function applyFootnoteMarkers(html) {
    return html.replace(/\[(\d+)\]/g, function (m, n) {
      return '<sup class="fn-ref"><a id="fnref-' + n + '" href="#fn-' + n +
        '" aria-label="Footnote ' + n + '">' + n + '</a></sup>';
    });
  }

  // Inline formatting: escape, italics, footnote markers.
  function formatInline(text) {
    return applyFootnoteMarkers(applyItalics(escapeHTML(text)));
  }

  // Render the body string into paragraph HTML.
  function renderBody(body) {
    var paragraphs = String(body || '')
      .replace(/\r\n/g, '\n')
      .split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(function (p) { return p.length > 0; });
    return paragraphs.map(function (p) {
      // collapse single newlines inside a paragraph into spaces
      var joined = p.replace(/\n+/g, ' ');
      return '<p>' + formatInline(joined) + '</p>';
    }).join('\n');
  }

  // Render the footnotes section.
  function renderFootnotes(footnotes) {
    if (!footnotes || !footnotes.length) return '';
    var items = footnotes.map(function (fn) {
      var n = fn.n;
      return '<li id="fn-' + n + '" value="' + n + '">' +
        applyItalics(escapeHTML(fn.text)) +
        ' <a class="fn-back" href="#fnref-' + n + '" aria-label="Back to text">↩</a>' +
        '</li>';
    }).join('\n');
    return '<div class="footnotes"><hr><h2 class="footnotes-title">Footnotes</h2><ol>' +
      items + '</ol></div>';
  }

  // Render the full article inner HTML (title, byline, cover, body, footnotes).
  function renderArticle(article) {
    var cover = article.image
      ? '<img class="article-cover" src="' + article.image + '" alt="' + escapeHTML(article.title) + '">'
      : '';
    return '' +
      '<h1 class="article-title">' + escapeHTML(article.title) + '</h1>' +
      '<p class="article-byline">Written By ' + escapeHTML(article.author) + '</p>' +
      cover +
      '<div class="article-body">' + renderBody(article.body) + '</div>' +
      renderFootnotes(article.footnotes);
  }

  global.BlogRender = {
    escapeHTML: escapeHTML,
    formatInline: formatInline,
    renderBody: renderBody,
    renderFootnotes: renderFootnotes,
    renderArticle: renderArticle
  };

})(typeof window !== 'undefined' ? window : this);
