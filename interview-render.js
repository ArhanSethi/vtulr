/*
 * interview-render.js — Shared rendering helpers for VTULR interviews.
 * Used by interviews/post.html (full renderer) and interviews.html (index list).
 */

(function (global) {
  'use strict';

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function applyItalics(escaped) {
    return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function formatInline(text) {
    return applyItalics(escapeHTML(text));
  }

  // Render the full interview inner HTML.
  function renderInterview(iv) {
    var html = '';
    html += '<h1 class="iv-title">' + escapeHTML(iv.title) + '</h1>';
    html += '<p class="iv-byline">By ' + escapeHTML(iv.author);
    if (iv.date) html += ' &nbsp;|&nbsp; ' + escapeHTML(iv.date);
    html += '</p>';
    if (iv.note) html += '<p class="iv-note">' + formatInline(iv.note) + '</p>';
    if (iv.intro) html += '<div class="iv-intro"><p>' + formatInline(iv.intro) + '</p></div>';
    if (iv.qa && iv.qa.length) {
      html += '<div class="iv-qa">';
      iv.qa.forEach(function (pair) {
        html += '<div class="iv-pair">';
        html += '<p class="iv-q">' + formatInline(pair.q) + '</p>';
        html += '<p class="iv-a">' + formatInline(pair.a) + '</p>';
        html += '</div>';
      });
      html += '</div>';
    }
    return html;
  }

  global.InterviewRender = {
    escapeHTML: escapeHTML,
    formatInline: formatInline,
    renderInterview: renderInterview
  };

})(typeof window !== 'undefined' ? window : this);
