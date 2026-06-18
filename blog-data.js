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

  {
    slug: "transformative-or-infringing",
    title: "Transformative or Infringing? Fair Use Doctrine and the Training of Large Language Models",
    author: "Arhan Sethi",
    image: "https://th-thumbnailer.cdn-si-edu.com/lv3JbwGJ9mrI8LTrhzP01xTskgU=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/af/ac/afac33cd-f4c9-4258-bd83-ea79c5c0152e/42-73700646.jpg",
    body: `I.  Introduction

To build a large language model, you need text. A lot of it. Every major AI developer, OpenAI, Anthropic, and Meta, trained their systems on massive datasets pulled from the internet, books, news archives, and academic publications. Most of it was copyrighted. None of it was licensed. The people who wrote it were not asked, had no idea it happened, and have no legal recourse to do anything about it now.

Now they are suing.

Whether any of this is even legal is the question nobody has fully answered yet, and that question turns specifically on whether training on copyrighted material counts as infringement or qualifies as fair use, the doctrine that lets you use someone's work without permission under certain conditions.[1] The stakes are not small. If training does not qualify, the entire economic model of modern AI development has a serious problem. Courts are starting to rule on it, and so far nobody is winning cleanly.

II.  The Transformative Use Test

That bet may or may not pay off. The doctrine turns on four factors, but the one that does the most work is whether the use is "transformative," meaning whether something new was created rather than the original just being reproduced.[2] AI companies say training is transformative by definition. The people suing them disagree. The analogy they reach for is *Authors Guild v. Google*, the 2015 Second Circuit case that found Google's mass digitization of books for search indexing was transformative fair use.[3] The plaintiffs' counterargument is that the Google case involved indexing, not generating. Google made books searchable. OpenAI made a product that can produce text in the style of, or sometimes verbatim from, the works it trained on. That is a different thing.

III.  Three Courts, Three Answers

Three decisions from 2025 are the first real attempt by courts to work through this distinction. In *Thomson Reuters v. ROSS Intelligence*, a Delaware federal court found that AI training was not fair use, specifically because ROSS used Westlaw's copyrighted headnotes to build a legal research product that directly competed with Westlaw.[4] The commercial substitution was the problem. In *Bartz v. Anthropic* and *Kadrey v. Meta*, courts reached the opposite conclusion, finding that training was sufficiently transformative because the models were using text analytically rather than expressively.[5] None of these cases are identical in their facts, and none of them are binding on each other.

What is starting to emerge is a principle: training as analysis tends to survive fair use scrutiny; training that enables outputs to substitute for the original tends not to. The *Thomson Reuters* case failed because the product competed directly with the source. *Bartz* and *Kadrey* survived because the plaintiffs could not show that Claude or LLaMA outputs replaced the market for the books they trained on.

The distinction between training-as-analysis and market substitution is coherent, but it creates a strange incentive. Under the standard emerging from these decisions, developers can train on almost anything as long as their outputs do not too closely resemble the source material. The harm to creators is not in the training, the argument goes, but in the output. Which means the legal question shifts from "was it okay to use this text" to "how similar is the output," a much harder thing to measure.

IV.  The Output Problem

The NYT lawsuit gets at this directly.[6] The Times filed against OpenAI in late 2023 on a simple argument: ChatGPT can spit out Times articles close enough to the real thing that you would never need to actually visit the site. That is a market harm argument, the fourth fair use factor, and it is probably the strongest one any plaintiff has made so far. In January 2026, the court ordered OpenAI to hand over 20 million ChatGPT conversation logs. What is in those logs is the ballgame.

The U.S. Copyright Office weighed in on all of this in May 2025, releasing a 108-page report that stopped short of recommending legislation but made one finding worth noting: where AI outputs are substantially similar to training inputs, there is a strong infringement argument regardless of how the training process is characterized.[7] The report is nonbinding, but it signals that the "it's just statistics" defense has limits even the government is not willing to fully accept.

V.  Conclusion

What none of this resolves is the compensation question. Even if courts ultimately find that training is fair use in most cases, that finding does not mean creators were treated fairly. A novelist whose work contributed to GPT-4's ability to produce fluid prose received nothing for that contribution. Under current law, that may be entirely legal. It is not obviously right.

The EU's approach under the Digital Single Market Directive is worth looking at here. The DSM Directive allows text and data mining for commercial purposes but requires AI developers to respect an opt-out mechanism, meaning rights holders can affirmatively exclude their works from training datasets.[8] It is not a licensing regime, but it at least acknowledges that creators have a legitimate interest in how their work is used. The United States has nothing equivalent.

The cleanest fix is probably compulsory licensing, the same basic system that governs music covers.[9] Under mechanical licensing, you do not need permission to record someone else's song, but you do have to pay a statutory royalty. Nobody negotiates, the rate is set, everybody knows the rules. Something like that for AI training data would let developers keep building without clearing rights one by one, and it would mean the writer whose novel ended up in a training set actually sees something for it. It is not a perfect solution. Rights holders want control, developers want no obligations. But it is better than the current situation, which is federal judges deciding trillion-dollar questions with a statute written in 1976.

The NYT case will be the defining one. It has the clearest evidence of verbatim output reproduction, the best-resourced plaintiff, and the most prominent defendant. Whatever it holds will either settle the analytical training framework the 2025 cases built, or dismantle it. Given that OpenAI just handed over 20 million conversation logs, it is reasonable to wonder which outcome they are more worried about.`,
    footnotes: [
      { n: 1, text: "17 U.S.C. § 107 (2018)." },
      { n: 2, text: "*Id.*" },
      { n: 3, text: "*Authors Guild v. Google, Inc.*, 804 F.3d 202 (2d Cir. 2015)." },
      { n: 4, text: "*Thomson Reuters Enter. Centre GmbH v. ROSS Intelligence Inc.*, No. 1:20-cv-613 (D. Del. Feb. 11, 2025); Training Data on Trial: AI's First Fair Use Test, IPWATCHDOG (Oct. 2025)." },
      { n: 5, text: "*Bartz v. Anthropic PBC*, No. 5:24-cv-02859 (N.D. Cal. 2025); *Kadrey v. Meta Platforms, Inc.*, No. 3:23-cv-03417 (N.D. Cal. 2025); A Tale of Three Cases: How Fair Use Is Playing Out in AI Copyright Lawsuits, ROPES & GRAY (July 2025)." },
      { n: 6, text: "*N.Y. Times Co. v. Microsoft Corp.*, No. 1:23-cv-11195 (S.D.N.Y. 2023); Court Orders OpenAI to Release 20M ChatGPT Logs in NYT Copyright Suit, WEBPRONEWS (Jan. 2026)." },
      { n: 7, text: "U.S. COPYRIGHT OFFICE, COPYRIGHT AND ARTIFICIAL INTELLIGENCE, PART 3: GENERATIVE AI TRAINING (2025)." },
      { n: 8, text: "Directive (EU) 2019/790 of the European Parliament and of the Council of 17 April 2019 on Copyright in the Digital Single Market, art. 4." },
      { n: 9, text: "*See generally* U.S. COPYRIGHT OFFICE, COMPENDIUM OF U.S. COPYRIGHT OFFICE PRACTICES § 1616 (3d ed. 2021)." }
    ]
  }

];

// Make available to browser <script> includes.
if (typeof window !== 'undefined') { window.BLOG_POSTS = BLOG_POSTS; }
