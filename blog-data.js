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
    slug: "responsible-party",
    title: "The Responsible Party is… Not?",
    author: "Arhan Sethi",
    image: "",
    body: `I. Introduction

In February 2024, a 14-year-old named Sewell Setzer III took his own life after spending months in conversation with a Character.AI chatbot. His mother sued. The company's first move was to argue that chatbot outputs are protected speech under the First Amendment, that holding an AI developer liable for what its system says is no different from holding a publisher liable for what it prints.[1]

That argument did not work. But the fact that it was tried at all says something about where AI liability law actually stands, that developers are still figuring out what theory, if any, can make them responsible for the harm their systems cause. So far, no one has a clean answer.

II. Frameworks in Conflict

The problem is not that tort law ignores AI. It is that the frameworks we have were built for a different kind of harm. Negligence requires proving a defendant breached a duty of care, but there is no established legal standard for what "reasonable care" means when you are building a large language model.[2] Strict product liability holds manufacturers responsible for defective products regardless of fault, but courts have historically treated software as a service rather than a product, which cuts off that theory before it starts.[3] Both frameworks assume you can trace harm back to a specific decision by a specific actor. AI complicates that because LLMs are stochastic by design. Businesses deploy systems in contexts that developers never anticipated. Users interact with them in ways nobody planned for. It is as if Achilles had many heels but no single archer, and when the arrow lands, the wound is real, but nobody can agree whose bow fired it.

*Garcia v. Character Technologies* is the first case to seriously test these questions.[4] Judge Anne Conway's May 2025 ruling allowed strict product liability, negligence, and wrongful death claims to proceed, and rejected the First Amendment defense outright. It is a significant win for plaintiffs, and it established something courts had not said before. An AI chatbot can be treated as a product rather than a speaker, but a motion to dismiss ruling only asks whether the claims are plausible. It does not assign liability, and it does not resolve whether AI broadly meets the legal definition of a "product" across jurisdictions.[5]

Meanwhile, the EU answered one of those questions. In 2024, it extended its Product Liability Directive to explicitly cover software, including AI, regardless of whether it is embedded in physical hardware.[6] No equivalent action has happened in the United States. That gap is not a minor detail. It means that a company can build an AI system, deploy it to millions of users, watch it cause documented harm, and face no strict liability exposure, because American courts have not decided whether the thing they built counts as a product.

III. The Black Box Problem

Large language models process inputs through billions of numerical parameters, producing outputs through statistical transformations that resist straightforward interpretation. Unlike traditional software with explicit logical branches, these systems have no clear decision path to trace from input to output. When a model generates a harmful response, developers cannot audit a sequence of steps to identify where the system went wrong. The "black box" problem makes this worse.[7] Even in cases where someone was clearly harmed and an AI system was clearly involved, establishing that a specific design choice caused that specific harm is genuinely difficult. The internal logic of large language models is opaque. Developers cannot always explain why their systems produce a given output. Courts cannot easily apply traditional causation analysis to something that works that way. Plaintiffs end up needing to prove things that may be unprovable.

IV. Legislative and Judicial Responses

Some legislators are trying to build something better. Colorado's SB24-205 places joint responsibility on both AI developers and the businesses deploying AI in high-stakes contexts, employment, lending, and similar decisions, requiring both parties to disclose how the AI is used and to prevent discriminatory outcomes.[8] Senator Blackburn's proposed federal bill would impose a statutory duty of care on developers to address foreseeable risks, while preserving states' ability to enforce their own rules.[9] These are by far not perfect solutions, but they at least address the right problem: assigning responsibility at the points where decisions are actually made, rather than waiting for a victim to file suit and figure out who to name.

The Trump administration's National AI Legislative Framework, released in March 2026, would preempt state-level AI regulation and consolidate rulemaking at the federal level.[10] The stated goal is consistency and reduced friction for developers. The practical effect, if Congress follows the administration's lead without enacting its own substantive protections, could be stripping states of their ability to experiment while replacing that authority with nothing enforceable. That is not a hypothetical concern. It is what happens when preemption is not paired with a federal floor.

V. Conclusion

There is an argument that courts should develop an AI liability doctrine the way tort law has always developed, incrementally, through specific cases, building principles out of hard facts over time. *Garcia* may eventually do that. But "eventually" is doing a lot of work in that sentence. The litigation timeline for a single case runs for years. The pace of AI deployment runs for months. New systems are reaching millions of users faster than any court can process the claims from the last ones. Waiting for case law to catch up is a choice, and it is a choice that costs real people in the meantime.

The current frameworks are not adequate. Negligence lacks a standard. Product liability lacks a threshold. Federal legislation is either stalled or tilted toward industry. What exists is a patchwork of state experiments that may soon be preempted, a handful of cases in early discovery, and a set of genuine doctrinal questions that nobody has resolved. That is not a legal system equipped to handle what is already happening, let alone what comes next.`,
    footnotes: [
      { n: 1, text: "*Garcia v. Character Technologies, Inc.*, No. 6:24-cv-01903 (M.D. Fla. May 21, 2025); Courts Test Platform Liability in Character AI Tragedy, AI CERTS NEWS (Dec. 2025)." },
      { n: 2, text: "Ketan Ramakrishnan, Gregory Smith & Conor Downey, U.S. Tort Liability for Large-Scale Artificial Intelligence Damages: A Primer for Developers and Policymakers (RAND Corp. 2024)." },
      { n: 3, text: "RAND Corp., Liability for Harms from AI Systems: The Application of U.S. Tort Law (2024)." },
      { n: 4, text: "*Garcia v. Character Technologies, Inc.*, No. 6:24-cv-01903 (M.D. Fla. May 21, 2025)." },
      { n: 5, text: "What the Megan Garcia Case Tells Us About AI Liability in the U.S., RAILS BLOG (Nov. 2025)." },
      { n: 6, text: "Liability and Risk Management: When an AI System Causes Harm, SUPER LAWYERS (Feb. 2026)." },
      { n: 7, text: "Artificial Intelligence: The \"Black Box\" of Product Liability, PRODUCT PERSPECTIVE (Apr. 2025)." },
      { n: 8, text: "Colo. Rev. Stat. §§ 6-1-1601 to -1610 (2024)." },
      { n: 9, text: "AI Governance Takes Shape: Breaking Down Washington's Latest AI Frameworks, BROWNSTEIN HYATT FARBER SCHRECK (2025)." },
      { n: 10, text: "Cecilia Kang, White House Unveils AI Policy Aimed at Blocking State Laws, N.Y. TIMES (Mar. 20, 2026)." }
    ]
  },

  {
    slug: "digital-replicas-voice-cloning",
    title: "The Legal Status of Digital Replicas of Deceased Performers & Voice Cloning",
    author: "Tiya Sukhadia",
    image: "https://gammalaw.com/wp-content/uploads/2026/03/03.2026.AI_VoiceCloning.1000px.jpg",
    body: `I. Introduction

Artificial intelligence has rapidly transformed the entertainment and media industry by making a performer's voice, likeness, and mannerisms instantly and convincingly reproducible. Through the use of imitation and advanced editing technologies, digital replication uses prior footage to simulate a person so accurately that audiences begin to believe the artificially generated performances are authentic. This technological development has created new opportunities in film, music, advertising, and historical reconstruction, but it has also generated a serious legal challenge. Existing contract and publicity laws were not designed to account for AI-generated replicas, and as a result, they do not adequately regulate this emerging form of identity exploitation.[1]

California's AB 1836, California's AB 2602, and New York's digital replica law represent meaningful attempts to respond to this problem, but they do so ineffectively by leaving significant uncertainty about consent, scope, and constitutional limits.[2] Therefore legislators should move to make a more uniform, clear and detailed legal framework that protects post-mortem publicity rights while preserving legitimate expressive uses of digital replicas.

II. The Digital Replica Problem

Digital replicas are being used to recreate the voices of deceased singers, generate figures that closely resemble dead actors, and produce performances that appear to come from individuals who are no longer alive. The central problem with these replicas is that the people being represented cannot consent, which raises both publicity and consumer protection concerns.

California's AB 1836 addresses this issue by regulating the unauthorized use of a deceased personality's digital replica.[3] California's AB 2602 also limits contracts that would allow a digital replica to replace a living performer's work without informed consent, reflecting concerns about labor protection and performer autonomy.[4] New York's digital replica law is similar in that it was designed to protect performers from the unconsented commercial use of synthetic versions of their voice or likeness.[5] It is especially significant because it renders certain overbroad digital-replica contract provisions void and unenforceable, showing that lawmakers are increasingly concerned about sweeping future waivers that performers may not fully understand.

As this technology continues to develop, the legal system is left with a difficult question: who owns the commercial afterlife of a performer's identity?[6]

III. Existing Legal Framework

The legal system's responses remain fragmented and do not fully address the central issues. California's AB 1836 and AB 2602 are important starting points for regulating unauthorized AI replication in the entertainment industry. AB 1836 "prohibits the use of digital replicas of deceased performers without the consent of such performer's estate,"[7] while AB 2602 "bars contract provisions that enable the use of digital replicas without the performer's informed consent and proper representation."[8]

New York's digital replica law also limits the enforceability of broad and unclear contract language. The law makes certain contractual provisions "void and unenforceable" if they allow the creation of a "new" performance by digital replica under the wrong conditions.[9] In this way, the law does more than regulate the technology itself; it also addresses issues of consent and performer protection.

Still, major questions remain about constitutional limits, interstate consistency, and the scope of post-mortem publicity rights. California's laws apply to both living and deceased performers, while New York focuses more heavily on the contract terms that govern digital replica rights.

IV. Reform

There should be a clearer and more effective solution to this problem, and it should begin with requiring informed, specific, and voluntary consent. For deceased performers, that consent should come from the proper rights holder or estate authority, supported by more detailed contractual language that explains exactly what is being approved and the scope of that approval.

At the same time, the law should preserve room for legitimate expressive uses. Narrow exceptions should remain available for transformative, documentary, historical, and otherwise constitutionally protected works.[10] Clear disclosure requirements would also strengthen the framework. Audiences should not be misled into believing that a performance is authentic when it is synthetic. Transparency would not solve every legal issue, but it would reduce deception and make the market for digital performances more honest. Together with stronger consent rules, disclosure could help create a more predictable and fair legal environment for both performers and creators.

V. Conclusion

Artificial intelligence has made it possible to recreate performers in ways the law did not anticipate. Digital replicas and voice cloning can now extend a performer's identity beyond death, yet the legal system has responded only in partial ways. Although California and New York have taken important steps, major questions remain unresolved. Without a more uniform framework, the better approach is a balanced legal regime that protects post-mortem publicity rights, preserves legitimate expressive uses, and requires meaningful consent and transparency when synthetic performance is involved.`,
    footnotes: [
      { n: 1, text: "Raising the Dead: Understanding Post-Mortem Rights of Publicity, Documentary.org (Dec. 4, 2022); Robert C. Post & Jennifer E. Rothman, The First Amendment and the Right(s) of Publicity, 130 *Yale L.J.* (Nov. 1, 2020)." },
      { n: 2, text: "California Enacts a Suite of New AI and Digital Replica Laws, Manatt (Sept. 24, 2024); California's New AI Laws Limit Uses of Digital Likeness, Fenwick (Sept. 25, 2024); The Digital Replica Contracts Act: An Evaluation of New York's New Protections for Performing Artists, *Cornell J.L. & Pub. Pol'y* (Feb. 11, 2025)." },
      { n: 3, text: "California Enacts a Suite of New AI and Digital Replica Laws, Manatt, *supra* note 2; California's New AI Laws Limit Uses of Digital Likeness, Fenwick, *supra* note 2." },
      { n: 4, text: "*Id.*" },
      { n: 5, text: "The Digital Replica Contracts Act, *Cornell J.L. & Pub. Pol'y*, *supra* note 2." },
      { n: 6, text: "Raising the Dead, Documentary.org, *supra* note 1." },
      { n: 7, text: "California Enacts a Suite of New AI and Digital Replica Laws, Manatt, *supra* note 2." },
      { n: 8, text: "*Id.*" },
      { n: 9, text: "The Digital Replica Contracts Act, *Cornell J.L. & Pub. Pol'y*, *supra* note 2." },
      { n: 10, text: "Robert C. Post & Jennifer E. Rothman, The First Amendment and the Right(s) of Publicity, *Yale Law Journal*, *supra* note 1." }
    ]
  },

  {
    slug: "civil-society-citizen-engagement",
    title: "Participation on Paper: Civil Society and Citizen Engagement in the United States & Russia",
    author: "Catherina Newnam",
    image: "https://www.thoughtco.com/thmb/qTnKoNtotAbdVonMxEhknUt4brE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/voters-voting-in-polling-place-138711480-87a09f220a71438dbdff698a643c8cf1.jpg",

    body: `I. Introduction

The right to participate in politics exists, at least formally, in many countries. But the reality of that participation varies widely. Elections can be held without being competitive. Civil society organizations can exist without being free. Media can operate without being independent. The gap between political institutions on paper and political institutions in practice is one of the most important distinctions in comparative politics. This gap becomes even wider when the United States and Russia are compared.

This post compares how civil society and citizen participation function across these two political systems, one democratic and one authoritarian. It examines three institutional areas: elections and party competition, civil society organizations, and media regulation — to show how regime type shapes not just whether citizens can participate, but whether that participation carries any real weight. The central argument is straightforward: civil society and citizen participation are far more open and politically meaningful in the United States, while in Russia they are systematically curated by state control, legal repression, and the concentration of power in the executive.

II. Conceptual Framework

Four concepts form this analysis. The first is civil society, which refers to the range of organizations and groups that exist outside the direct control of the state.[1] These organizations serve as intermediaries between citizens and government, giving people structured ways to express opinions, organize collectively, and influence public policy. A functioning civil society is generally understood as a precondition for democratic legitimacy. The second is citizen participation, which describes the different ways individuals attempt to influence political decisions. Participation encompasses voting, campaigning, protesting, petitioning, and engaging with public institutions. But participation is only meaningful when those actions can actually affect outcomes.

The third concept is regime type, which refers to how political power is organized and exercised in a given state.[2] Regime type is not fixed. One of the most significant political processes of the past two decades has been autocratization — sometimes called democratic backsliding — in which formally democratic systems gradually become less open as leaders weaken independent institutions, restrict opposition, and consolidate executive power. Russia's trajectory over the past three decades is a clear illustration of this process. The fourth concept is media regulation, which describes the legal and structural controls that govern how information is produced and distributed. When media is state-controlled, it narrows the range of permissible political discourse and actively suppresses civil society voices before they can gain public traction.

Methodologically, this essay uses the Most-Different Systems Design (MDSD), which compares countries that differ significantly in their background conditions in order to isolate the effect of specific institutional variables.[3] The United States and Russia differ in history, geography, culture, and economic structure. By holding those differences in view and focusing on political institutions, this comparison demonstrates that institutional design — not culture or circumstance — is the primary driver of how open or restricted political participation actually is.

III. Comparative Analysis

A. Elections and Political Competition

In the United States, elections at all levels involve genuine competition. Political parties, independent candidates, and civic organizations can organize, campaign, and contest for office without state interference. Citizens can use formal electoral channels alongside informal ones — joining advocacy groups, donating to campaigns, engaging in public debate — in ways that translate into real policy influence. As the Bush Institute observes, Americans can exercise voice through a wide range of civic organizations, and the country benefits from a structural foundation that includes an independent judiciary, a free press, and an active civil society sector.[4] Freedom House similarly notes the presence of "strong structural safeguards" and a "vigorous press" that allow citizens to challenge power and seek accountability.[5] There are genuine concerns about campaign finance, ballot access, and the influence of money in politics — but the institutional framework still permits meaningful opposition and political contestation.

Russia presents a fundamentally different picture. While elections formally exist, they operate within a system designed to produce predetermined outcomes rather than genuine competition. Freedom House describes Russian political power as concentrated in the presidency and sustained by a controlled media environment and a systematically weakened opposition.[6] The United Nations has characterized key Russian laws as "systematic tools of political repression," directly limiting who can run for office, organize politically, or challenge existing power structures.[7] In this context, elections function less as a mechanism of citizen choice and more as a ritual of legitimation for existing authority.

B. Civil Society Organizations

In the United States, thousands of independent organizations operate across every policy domain — from environmental advocacy to criminal justice reform to immigrant rights — and these organizations regularly influence legislation, litigation, and public opinion. Their independence from state control is legally protected and institutionally reinforced. Even during periods of political polarization or executive overreach, civil society organizations have proven capable of mounting legal challenges, mobilizing public pressure, and sustaining opposition movements over time.

In Russia, civil society is not merely limited — it is actively dismantled. The United Nations has documented how Russian government policy systematically targets independent organizations, particularly those with international ties or oppositional orientations.[8] Organizations can be labeled "foreign agents" under broadly worded legislation, subjecting them to onerous reporting requirements, public stigma, and eventual closure. The space for organized independent political action outside the government has been progressively narrowed to the point of near-elimination.

C. Media Regulation and Information Access

In the United States, constitutional protections for press freedom create a legal foundation for independent journalism. Citizens have access to a wide range of viewpoints — including those sharply critical of the government — and media organizations can investigate and publish without prior restraint. This environment is not without problems: media consolidation, partisan polarization, and the economic fragility of local journalism are all serious concerns. But the structural independence of the press from direct state control remains intact.

In Russia, Human Rights Watch has documented a comprehensive government strategy of "control and increasing isolation" that deploys an "entire arsenal of tools" to regulate communication — including internet censorship, restrictions on virtual private networks, criminal liability for unauthorized speech, and the forced closure of independent outlets.[9] These measures do not merely limit what citizens can say; they shape what citizens can know.

D. The Data

Quantitative evidence reinforces this qualitative picture. The Civil Society Participation Index, produced by V-Dem and visualized through Our World in Data, measures the degree to which citizens actively engage in diverse civic organizations and whether those organizations have meaningful influence over policymakers.[10] On a scale of 0 to 1, with higher scores indicating greater participation and influence, the United States scores 0.96 in 2025 — among the highest in the world. Russia scores 0.20, placing it in the range of highly restricted authoritarian systems. This gap of nearly 0.76 points is not a marginal difference; it reflects a categorical distinction in how political systems relate to their citizens.

IV. Who Gets Left Out

No comparison of this kind is complete without attending to exclusion — the question of who, even within nominally open systems, is effectively denied meaningful participation. In the United States, exclusion operates largely through indirect mechanisms: income inequality, unequal access to the ballot, the disproportionate influence of wealthy donors in campaign finance, and the persistence of structural barriers that fall hardest on Black, Indigenous, and Latino communities. Freedom House notes that while legal protections for political rights formally exist, they are not always enforced equally.[11] Citizens are not formally barred from participating, but many face practical obstacles — from restrictive voter ID laws to polling place closures — that make engagement significantly harder in practice.

In Russia, exclusion is structural rather than incidental. It is written into law and enforced by the state. Independent voices are silenced not by market forces or social inequality but by criminal prosecution, forced exile, and the systematic elimination of the organizations through which dissent might otherwise be channeled. The most politically active segments of Russian civil society — journalists, opposition politicians, human rights lawyers — face arrest, asset seizure, or worse. This is not a failure of the system to live up to its ideals; it is the system functioning as designed.

V. Conclusion

The comparison between the United States and Russia demonstrates that the formal existence of elections, political parties, and civil society organizations tells us very little about whether citizens can actually participate in politics in a meaningful way. What matters is the environment in which those institutions operate: whether people are free to organize, to speak, to access independent information, and to challenge those who hold power.

In the United States, that environment — imperfect and unequal as it is — still preserves the structural conditions for genuine political contestation. Citizens can join organizations, vote in competitive elections, protest, litigate, and access a press that operates independently of state control. These mechanisms do not always work as intended, and they do not serve all citizens equally. But they remain available, and they remain meaningful.

In Russia, those conditions have been progressively eliminated. Independent media has been shuttered or absorbed. Civil society organizations have been labeled enemies of the state. Opposition politicians have been jailed or forced into exile. The institutions of participation exist on paper, but the space in which participation could be free has been closed.

The lesson is not that democracy is easy or that the United States has solved the problem of political inclusion. The lesson is that the institutional conditions under which citizens engage with power are the difference between participation that matters and participation that is merely performed.`,
    footnotes: [
      { n: 1, text: "See generally Robert D. Putnam, *Bowling Alone: The Collapse and Revival of American Community* (Simon & Schuster 2000)." },
      { n: 2, text: "Steven Levitsky & Lucan Way, *Competitive Authoritarianism: Hybrid Regimes After the Cold War* (Cambridge University Press 2010)." },
      { n: 3, text: "Arend Lijphart, *Comparative Politics and the Comparative Method*, 65 Am. Pol. Sci. Rev. 682, 685–86 (1971)." },
      { n: 4, text: "George W. Bush Institute, *Freedom in the World: The Annual Survey of Political Rights and Civil Liberties* (2024)." },
      { n: 5, text: "Freedom House, *Freedom in the World 2025: United States* (2025)." },
      { n: 6, text: "Freedom House, *Freedom in the World 2025: Russia* (2025)." },
      { n: 7, text: "U.N. Human Rights Council, *Report of the Special Rapporteur on the Rights to Freedom of Peaceful Assembly and of Association: Russia* (2023)." },
      { n: 8, text: "*Id.*" },
      { n: 9, text: "Human Rights Watch, *Russia: Events of 2024* (2025)." },
      { n: 10, text: "V-Dem Institute, *Civil Society Participation Index*, *in* Our World in Data (2025)." },
      { n: 11, text: "Freedom House, *supra* note 5." }
    ]
  },

  {
    slug: "icc-us-challenge",
    title: "Power, Politics, and the U.S. Challenge to the International Criminal Court",
    author: "Catherina Newnam",
    image: "https://i0.wp.com/www.justsecurity.org/wp-content/uploads/2022/05/GettyImages-1322530622-scaled.jpg?resize=2048%2C1442&ssl=1",
    body: `I. Introduction

In 2002, the international community created the International Criminal Court (ICC), the world's first permanent court dedicated to prosecuting genocide, war crimes, and crimes against humanity. Founded by the Rome Statute, the ICC was designed to be a pivotal outlet for those seeking justice: it steps in only when a state is genuinely unable or unwilling to prosecute its own. This principle, known as complementarity, was meant to make the Court a last resort rather than a rival to national legal systems.[1]

II. U.S. Non-Membership and Active Resistance

The United States helped draft the Rome Statute but has never ratified it. Beyond non-membership, the U.S. negotiated over a hundred bilateral immunity agreements under which partner countries commit not to surrender American nationals to the ICC.[2] When the Court began examining alleged war crimes involving U.S. agents in Afghanistan, the Trump administration imposed executive sanctions on ICC investigators, including the chief prosecutor, treating a court proceeding as a hostile act.[3] Taken together, these moves reveal a consistent behavior: the United States does not simply decline jurisdiction — it works to ensure that jurisdiction never meaningfully applies to American actors at all.

III. Sovereignty vs. Accountability

Nicole Jones, writing in the *Wisconsin International Law Journal*, argues this posture reflects not a firm opposition to international justice but a strategic effort to secure immunity for American actors while preserving U.S. influence over global institutions.[4] The ICC can, in theory, investigate crimes committed on member-state territory regardless of the perpetrator's nationality, so U.S. non-membership does not automatically shield American personnel.[5] It does, however, mean the U.S. is under no obligation to cooperate or surrender suspects. The result is a jurisdictional standoff: the Court can investigate, but it does not have to comply.

IV. Power Politics and the Limits of Impartiality

Political scientist Alyssa K. Prorok and co-authors, writing in *International Studies Quarterly*, show that this dynamic reflects a broader structural problem. Despite the ICC being founded as a neutral institution, the cases it pursues are shaped by the geopolitical calculations of powerful states.[6] Countries with the leverage to block investigations effectively determine which situations the Court addresses. American obstruction, then, is not abnormal but an illustration of how major powers systematically shape the limits of international law in their own favor.

The damage extends beyond any single prosecution. When the world's most powerful democracy treats international accountability as optional, it signals to every other state that powerful actors can opt out. That signal erodes the norm of universal accountability that the ICC depends on for its legitimacy.

V. A Path Forward

The Open Society Justice Initiative's 2022 report argues that states committed to the ICC can compensate for major power resistance through collective diplomatic action.[7] Every time a coalition of states cooperates with ICC proceedings, issues public support for an investigation, or uses multilateral bodies to reinforce the Court's authority, it strengthens the norm that international accountability is a real expectation. Additionally, due to the ICC's reliance on other national powers, it is important to recognize that the support of the United States would help the court gain credibility.

VI. Conclusion

The United States' relationship with the ICC leaves space for a larger question: can international law hold when the most powerful states refuse to comply? The ICC has survived American resistance and direct sanctions without collapsing. But without meaningful engagement from major powers, global justice remains structurally dependent on political will that powerful individuals can exercise at any moment. That is when the court becomes less focused on justice, and more an organization reliant on permission.`,
    footnotes: [
      { n: 1, text: "Rome Statute of the International Criminal Court art. 17, July 17, 1998, 2187 U.N.T.S. 90 (entered into force July 1, 2002)." },
      { n: 2, text: "Nicole Jones, Sanctioning the ICC: Is This the Right Move for the United States?, 39 *Wis. Int'l L.J.* 175, 185–92 (2022)." },
      { n: 3, text: "Diane E. Rennack & Matthew C. Weed, International Criminal Court: U.S. Sanctions in Response to Investigation of War Crimes in Afghanistan, Cong. Rsch. Serv., Insight No. IN11428 (June 19, 2020)." },
      { n: 4, text: "Jones, *supra* note 2, at 180–82." },
      { n: 5, text: "Nathan M. Hart, Can the International Criminal Court Investigate U.S. Personnel?, Cong. Rsch. Serv., Insight No. LSB10505 (June 30, 2020)." },
      { n: 6, text: "Alyssa K. Prorok, Benjamin J. Appel & Shahryar Minhas, Understanding the Determinants of ICC Involvement: Legal Mandate and Power Politics, 68 *Int'l Stud. Q.* sqae018, at 3–7 (2024)." },
      { n: 7, text: "Open Soc'y Just. Initiative, From Spectators to Champions: How Supportive States Can Promote Cooperation with the International Criminal Court Through Multilateral Bodies 8–14 (Feb. 2022)." }
    ]
  },

  {
    slug: "911-executive-power",
    title: "How 9/11 and the War on Terror Led to the Expansion of Executive Power",
    author: "Tiya Sukhadia",
    image: "https://ctc.westpoint.edu/wp-content/uploads/2019/09/181031-Z-YV608-1012.jpg",
    body: `I. Introduction

The terrorist attacks of 9/11 reshaped American political institutions and triggered one of the most significant expansions of executive power in U.S. history. Scholars explain this expansion in different ways, emphasizing the roles of legal structures, bureaucratic developments, and presidential rhetoric in shaping the post-9/11 security landscape. This review synthesizes how the War on Terror altered federal authority by examining where scholars agree, where they disagree, and what their arguments collectively reveal about the growth of executive power. Together, the literature demonstrates that 9/11 fundamentally transformed the political and institutional foundations of the American government.

II. Institutional Transformation

Peter Amato argued in the *Notre Dame Journal of Legislation* that the Authorizations for Use of Military Force (AUMFs) drastically expanded presidential war-making powers. AUMFs are laws giving the president the power to use "all necessary and appropriate force"[1] without a formal declaration of war. This expansion was because Congress had "taken no effective action to curb executive power in the misuse of the AUMFs"[2] in the ongoing application of the AUMFs. As a result, administrations were able to stretch the meaning of the AUMFs beyond their original intention of authorizing a limited, Congress-approved response to threats after 9/11, leading to expanded executive power.

Ingber builds on Amato's critique by taking a deeper dive into the effects of the expansion of power in the executive branch. Executive power was able to expand through bureaucratic interpretation, and agencies began to reinterpret statutes such as the AUMF to justify uses of executive force. According to Ingber, these actors used bureaucratic interpretation to reshape laws like the AUMF over time, giving the executive branch more power through small, incremental changes rather than major political decisions.[3] Both Amato and Ingber argue that the AUMF played a huge role in growing executive authority, but Ingber goes further by showing how executive-branch lawyers and agencies stretched laws like the AUMF far beyond what Congress originally meant.[5]

Swalwell and Alagood add another perspective by explaining how 9/11 led to major institutional growth across the federal government. The creation of the Department of Homeland Security exemplifies this growth, as it absorbed 22 agencies and expanded domestic surveillance, permanently changing the government's role in national security.[4] Although these institutions were first built to fight al-Qaeda, they eventually shifted toward monitoring domestic extremist threats. Together, their research highlights that post-9/11 structures and laws were flexible enough to grow far beyond their original purpose, creating a long-lasting increase in executive authority.[6]

III. Presidential Rhetoric

Ristevska and Prezelj argue that presidential involvement is what essentially led to the expansion of executive authority. Presidential speeches significantly influenced public attitudes toward terrorism and contributed to the normalization of stronger executive authority. According to their study, Obama and Biden relied on techniques such as balanced framing and more restrained approaches compared to Trump and Bush, who focused on scrutiny and fear.[7] Despite the different approaches, all four presidents still kept the same counterterrorism powers in place.

Swalwell and Alagood support this idea by showing how the meaning of "terrorism" shifted over time. Post-9/11 presidents changed the narrative by using counterterrorism tools that were originally designed for foreign threats and applying them to domestic extremist dangers, which eventually became the main security concern.[8] This shows how presidential rhetoric shifts to match new threats over time, helping strengthen and justify the growth of executive power.

Amato supports this rhetoric using the congressional debates regarding AUMFs and how fear-based political messaging makes Congress hesitant to revise old war-making laws like the AUMF. Framing techniques have also affected legislative incentives and reinforced executive flexibility.[9] The International Crisis Group adds that repeated congressional reluctance to repeal or amend open-ended laws has converted post-9/11 emergency measures into permanent policy foundations. The Crisis Group additionally adds that presidents' public rationale directly encouraged the executive to lead and expand militarized counterterrorism operations at home and abroad because "the statute does in reality give the president a worldwide writ to use force against the groups and individuals deemed by him or her to fall within its ambit."[10]

These operations were justified and normalized through presidential rhetoric, often making the war on terror seem necessary, regardless of the threat shifting from abroad to domestic. The analysis shows how framing not only established legitimacy for executive action, but also discouraged Congressional limits or reforms because of the stretching of laws.[11] The Crisis Group further highlights how presidential narratives keep counterterror operations politically viable and protect the executive branch from oversight or lasting reform.[12] Lastly, Amato provides the political consequences, such as rhetorical pressure that discourages Congress from revising old war-making laws.[13]

IV. Conclusion

The literature demonstrates that the post-9/11 expansion of executive power actually led to a long-term structural transformation of the government rather than a temporary reaction to a crisis. Legal ambiguity, bureaucratic interpretation, institutional growth, and presidential framing have fundamentally altered the legal and political foundations of American governance post-9/11.`,
    footnotes: [
      { n: 1, text: "P. Amato, Re-Imagining the Post-9/11 Authorizations for Use of Military Force in the Era of Emerging Consensus on Reform, 98 *J. Legis.* 1 (2024)." },
      { n: 2, text: "*Id.* at 50." },
      { n: 3, text: "Rebecca Ingber, The Insidious War Powers Status Quo, *Yale L.J. Forum* (Mar. 8, 2024)." },
      { n: 4, text: "E.R.M.S. Walwell & R.K. Alagood, Homeland Security Twenty Years After 9/11: Addressing Evolving Threats, 58 *Harv. J. on Legis.* 2." },
      { n: 5, text: "Ingber, *supra* note 3." },
      { n: 6, text: "Walwell & Alagood, *supra* note 4." },
      { n: 7, text: "T.T. Ristevska & I. Prezelj, Security and Liberty in Post-9/11 US Counterterrorism: A Comparative Analysis of Presidential Rhetoric, 13 *Pol. & Governance* (2025)." },
      { n: 8, text: "Walwell & Alagood, *supra* note 4." },
      { n: 9, text: "Amato, *supra* note 1." },
      { n: 10, text: "Overkill: Reforming the Legal Basis for the U.S. War on Terror, *Int'l Crisis Grp.*" },
      { n: 11, text: "Ristevska & Prezelj, *supra* note 7." },
      { n: 12, text: "Overkill, *Int'l Crisis Grp.*, *supra* note 10." },
      { n: 13, text: "Amato, *supra* note 1." }
    ]
  },

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
