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

  // Render the full interview inner HTML (Harvard-style: italic intro,
  // bold inline speaker labels prefixing regular-weight paragraphs).
  function renderInterview(iv) {
    var html = '';
    html += '<h1 class="iv-title">' + escapeHTML(iv.title) + '</h1>';
    html += '<p class="iv-byline">By ' + escapeHTML(iv.author);
    if (iv.date) html += ' &nbsp;|&nbsp; ' + escapeHTML(iv.date);
    html += '</p>';

    // Intro bio + editorial note, both italic.
    if (iv.intro) html += '<p class="iv-intro">' + formatInline(iv.intro) + '</p>';
    if (iv.note) html += '<p class="iv-intro">' + formatInline(iv.note) + '</p>';

    var qLabel = iv.interviewer || 'Q';
    var aLabelFull = iv.intervieweeFull || iv.intervieweeShort || 'A';
    var aLabelShort = iv.intervieweeShort || aLabelFull;

    if (iv.qa && iv.qa.length) {
      html += '<div class="iv-qa">';
      iv.qa.forEach(function (pair, i) {
        var aLabel = (i === 0) ? aLabelFull : aLabelShort;
        html += '<p class="iv-turn"><strong>' + escapeHTML(qLabel) + ':</strong> ' +
          formatInline(pair.q) + '</p>';
        html += '<p class="iv-turn"><strong>' + escapeHTML(aLabel) + ':</strong> ' +
          formatInline(pair.a) + '</p>';
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
