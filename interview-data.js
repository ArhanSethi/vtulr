/*
 * interview-data.js — VTULR Interviews content (single source of truth)
 *
 * The interviews index (/interviews) and the interview renderer
 * (/interviews/post.html?slug=...) both read from INTERVIEWS below.
 *
 * RECORD FORMAT:
 *   {
 *     slug:    "url-safe-name",
 *     title:   "Interview Title",
 *     author:  "Interviewer Name",
 *     date:    "Spring 2026",
 *     intro:   "Editor's note / bio paragraph. *italics* allowed.",
 *     note:    "Interview conducted Spring 2026. Edited for length and clarity.",
 *     qa: [ { q: "Question text", a: "Answer text. *italics* allowed." } ]
 *   }
 */

const INTERVIEWS = [

  {
    slug: "john-schultz-engineering-and-the-law",
    title: "Reading the Contract: John Schultz on Engineering, the Law, and Building a Career in Civil Construction",
    author: "Catherina Newnam",
    date: "Spring 2026",
    interviewer: "VTULR",
    intervieweeFull: "John Schultz (JS)",
    intervieweeShort: "JS",
    note: "The interview below was conducted in Spring 2026 and has been edited for length and clarity.",
    intro: "John Schultz began his career pouring concrete and laying pipe on PennDOT highway crews before working his way up in Allan Myers, one of the Mid-Atlantic's most prominent heavy civil construction firms. Along the way, he earned a law degree at Temple University's renowned night program while simultaneously running multi-million-dollar jobs during the day, passed the Pennsylvania bar, and served as in-house counsel before returning to operational leadership. Today he sits on the board of FAM, the joint venture behind the $2.5 billion I-66 Transform project in Northern Virginia, and is transitioning into leadership of Allan Myers' Pennsylvania business unit. We spoke with Schultz about the unlikely path that brought a civil engineer into a courtroom.",
    qa: [
      {
        q: "Your grandfather was a civil engineer, you studied civil engineering at Michigan State, and you went straight into construction. At what point did the law start to feel like an interest you needed to pursue?",
        a: "I think I had taken a few classes on contracts as they relate to civil engineering, and that kind of piqued my interest. When I got into the office at Allan Myers and started doing more project engineering work, looking through drawings, helping plan the work, I was also starting to get into contracts. It was just something that always kind of piqued my interest. I've always kind of liked debating and I'm a competitive person. So I found a way to use the contract to help us get paid for things, and I enjoyed that."
      },
      {
        q: "You were working as a laborer on a PennDOT crew when you sat for the LSAT, and you were prepared to leave the company entirely to go to law school full time. What changed that trajectory?",
        a: "I was part of what they used to call the career track program, for recent college grads, where we had to do rotations. My first rotation was working on a crew out in the field, essentially as a laborer on a PennDOT crew. While I was working on that crew, I decided to take the LSATs. I did pretty good on it. I was prepared to actually go back to law school full time and leave Allan Myers. At the time, our president, Dale Wilson, he found out I had applied to law school and got in, and he drove out to see me. He said, is there a way you could maybe go at nights and keep working for the company? We'll help you pay for law school. I didn't really feel like going into any debt at that time, so I agreed to stay on while I went to Temple at nights."
      },
      {
        q: "You were running jobs during the day and riding the train to Temple at night for three and a half years. What did that actually look like on a daily basis?",
        a: "I was getting up at five in the morning to go to work, running the job, and then I would get on a train and take a train about an hour down to the city to go to law school. I would use that time on the train to read, both down there and on the way back. I wouldn't get home from law school until ten-thirty at night, something like that. I did that for three and a half years. Traditionally a night program is four years, but I went through the summers so I was able to shorten it. I couldn't do it now -- I have two young kids. But I would do it again in a heartbeat."
      },
      {
        q: "Most people advancing in a career as quickly as you were would not take on a night law program on top of it. What was driving you to pursue both simultaneously rather than choosing one?",
        a: "I've learned that I'm a little bit of an adrenaline junkie. Not dropping out of airplanes or anything, but I kind of always need to have real hard challenges in front of me. No matter what you do, you're basically going to be solving problems. And having a law degree has helped me really be an expert on how to navigate complex problems. The challenge of learning how to do that and then taking what I learned at law school and bringing it back to work made me better at work, even though it was a lot and it was hard."
      },
      {
        q: "Did having an engineering background shape how you approached legal reasoning and writing once you were actually in the program?",
        a: "An engineering background is like a tremendous background to go to law school. When you learn how to issue-spot and do legal writing, it's very similar to how engineering school sets you up. When you're solving a math problem, it's very similar to how you write, how you do legal writing. So I naturally was kind of good at law school when other people were struggling because I just kind of had the background for it already. I ended up taking a lot of classes with other engineers, and a lot of engineers get into intellectual property law, patent prosecution, trademark law. I got very interested in that. But ultimately I really liked working at Allan Myers and liked the people I worked with, so the thought of leaving to do IP law wasn't something I wanted to do."
      },
      {
        q: "Once you passed the bar and moved into the in-house counsel role, how would you describe the scope of what that work actually required of you?",
        a: "I would call it like a general practitioner, like a family doctor. You're not really specialized in anything, but as the matters come in you deal with them. I was doing a lot of claims and construction law, but I was also doing some corporate law, helping with acquisitions and entity formation. I would also get involved in employment law if we had employment issues. I've never been a sit-down-at-my-desk guy. A lot of my work when I was dealing with claims, I'd go see the project teams, go look at the projects. I even did that when I was working in-house."
      },
      {
        q: "Construction projects involve layered contracts between owners, contractors, subcontractors, and financiers. How does that contractual complexity shape the legal work on a major infrastructure job?",
        a: "It kind of depends on the procurement method. On a traditional bid-build job, we really don't get to negotiate the terms of the contracts, so I wouldn't be involved at the front end. The I-66 job is a whole different animal. When you decide to bid a job as a joint venture, you first have to set up an operating agreement that outlines the responsibilities between partners and establishes the ownership structure. There's also a teaming agreement with your engineers who help you submit a bid. Then we execute a design-build contract with a developer. So you have a ton of different contracts and how they relate. Our lawsuit has a lot to do with how these contracts interrelate with each other."
      },
      {
        q: "You mentioned a several-hundred-million-dollar lawsuit tied to the I-66 project and that you have been deposed three times as corporate representative. What has it been like to sit on the other side of the table as a witness rather than as counsel?",
        a: "We have a very large lawsuit on the I-66 job, several hundred million dollars, where we are seeking damages related to a COVID-19 claim. We had to build that job during the pandemic and we took the position that we incurred a lot of additional costs and we're looking to recover those. The last year and a half I've been spending a significant amount of my time kind of as a lawyer again. I'm reading through expert reports. I've gotten deposed three times because I'm our corporate representative for FAM, so I'm testifying on behalf of the organization. I've taken people's depositions and prepared witnesses. Now I'm actually a witness getting deposed. It's been a very interesting process."
      },
      {
        q: "You left Allan Myers to pursue a general counsel role elsewhere, then came back to take on an operational leadership position rather than a legal one. What did that period of reflection clarify for you about where you wanted your career to go?",
        a: "I did leave the company for not even a year, and I actually did not miss the law as much as I missed working with people every day and helping develop them. Working with somebody who starts their career as a young person and then helping develop them into a project manager or whatever it might be, I really liked that and I missed it. When they gave me that opportunity to come back into operational leadership, I accepted it. I still maintain my Pennsylvania bar license and I'll do some legal work for friends and family, but that's where I'm at."
      },
      {
        q: "Construction law tends to fly under the radar as a field of practice. What do you think law students overlook about what this area actually involves?",
        a: "Your first year of law school, you'll see that construction cases are like half of what you read in contracts. They make up a lot of the body of contract law that you'll learn. And the thing about the law in general is that you're dealing with people. If you're somebody who likes dealing with people, you'll meet some of the most interesting people from all walks of life in construction, all the way down from laborers to upper-level management. There's just such a broad array of people from different walks of life. And if you're somebody that likes to see something get built, that's a byproduct too. You can see how your issues relate to real world items being built."
      }
    ]
  }

];

// Make available to browser <script> includes.
if (typeof window !== 'undefined') { window.INTERVIEWS = INTERVIEWS; }
