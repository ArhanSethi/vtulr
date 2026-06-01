/*
 * blog-data.js — VTULR Blog Post Index
 *
 * ADDING A NEW POST:
 * 1. Add an entry to BLOG_POSTS below
 * 2. Copy blog/post-template.html → blog/your-slug.html
 * 3. Fill in the title, author, date, and body text
 * 4. Optional: add a cover image to blog/images/your-slug.jpg
 * 5. git add . && git commit -m "add: [post title]" && git push
 *    Done — the post appears on the blog index automatically.
 *
 * ENTRY FORMAT:
 * {
 *   slug:    "url-safe-post-name",          // used for /blog/slug.html and image path
 *   title:   "Full Post Title Here",
 *   author:  "First Last",
 *   date:    "Mon DD, YYYY",                // e.g. "Feb 14, 2025"
 *   excerpt: "Two or three sentence teaser shown on the index.",
 *   image:   "/blog/images/slug.jpg"        // optional — omit if no image
 * }
 */

const BLOG_POSTS = [

  // Example (uncomment and fill in when adding a real post):
  // {
  //   slug:    "nvidia-antitrust",
  //   title:   "Too Big To Fail? NVIDIA's Dominance and Rethinking Antitrust Enforcement in the AI Era",
  //   author:  "Jacqueline Rodriguez",
  //   date:    "Feb 14, 2025",
  //   excerpt: "In an era defined by rapid advances in artificial intelligence, the rise of leading chip manufacturers has reshaped both economic and regulatory landscapes.",
  //   image:   "/blog/images/nvidia-antitrust.jpg"
  // },

];
