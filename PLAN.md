# DeenTong personal site: plan

The working plan for this site. Update it whenever the structure or rules change, so later iterations start from here.

- **Live at:** https://tde-deentong.github.io/
- **Goal:** a job-hunting site for an AI Engineer. A recruiter should understand what I do, see proof, and know how to reach me within about a minute.
- **Built with:** plain HTML and one shared stylesheet (`styles.css`). There's no build step, and GitHub Pages serves the files as they are.

## Tabs

| Tab | File | Purpose |
|---|---|---|
| About | `index.html` | Home page: who I am, the roles I want, how to reach me |
| Projects | `projects.html` | 3 to 5 best projects, each with its problem, role, what I built, result and link |
| Resume | `resume.html` | The full resume, shown on the page in expandable sections, with no PDF button |
| Skills | `skills.html` | Skills grouped by the problem they solve, each group linked to proof |
| Learning | `learning.html` | Courses and work-related books, both in progress and completed |
| Outside work | `outside-work.html` | Running (and Runcations), Pilates, and Reading (starting soon) |

There's no Contact tab. Contact details go on the About page and in every page's footer.

## Design rules

- **Look:** the DeenTong look carried over from the `deentong` repo: `logo.svg`, Source Serif 4 for headings, IBM Plex Sans for body text, a warm paper background, blue links and a rust accent. Dark mode follows the visitor's system setting.
- **Navigation:** a tab bar across the top that wraps on phones. The current tab is marked with `aria-current="page"`.
- **Rows, not tables or cards:** Projects and Learning show one item per row, with the image on the left and the text on the right.
- **Placeholders:** anything I still need to write is in `[square brackets]` inside `<span class="todo">`, which shows yellow. Search the files for `class="todo"` to find what's left.
- **Never include:** a phone number, home address, skill percentages, star ratings, logo walls or "coming soon" pages, except the Reading section.

## Page details

### About (`index.html`)
- Headline, two or three sentences on background, the roles I want, Melbourne or remote.
- Buttons for "See my projects" and "View my resume".
- Contact: email, LinkedIn, GitHub.

### Projects (`projects.html`)
- Research, coursework and hackathon projects. Paid work stays on the Resume tab, and Projects links there.
- Each row lists the problem, what I did and the result (with numbers), then the stack and links. Each row has an `id` so other pages can link straight to it.
- Current projects:
  - **Generative augmentation research** (`#research`): University of Melbourne, 2025. Worst-group accuracy rose from 58.9% to 72.8%.
  - **Toothian** (`#toothian`): MedHack 2025, 1st place out of 60+ teams. Private repo, so it links to a demo only.
  - **Climate science fact-checking** (`#fact-check`): COMP90042, 2025. Repo `NLP_FinalProject`.
  - **Heidi for Patients** (`#heidi`): HeidiBuild 2025. Repo `Heidi25Hack`.
  - **ShapeStack stability prediction** (`#shapestack`): 2024.
- Left off for now: HyperLearner (`hack-learner`) and the Hackiethon 2025 widget, since neither is on the resume. Add them back if they get a result worth showing.
- Still needed: a screenshot for each project, demo links for Toothian and Heidi, the month of HeidiBuild, and Heidi's outcome.

### Resume (`resume.html`)
- Sections: Summary, Experience, Education, Projects and hackathons (links to Projects), Certificates (links to Learning), and a one-line Skills summary (links to Skills).
- Experience is newest first, by end date. Deloitte shows its three roles as indented sub-entries. Each employer has an `id` (`#deloitte`, `#capgemini`, `#research`, `#ntro`) that Skills and About link to.
- The source of truth is my resume document. When it changes, update this page to match.
- Sections expand when their heading is clicked, so the page stays short on phones.
- A print stylesheet hides the navigation, so printing or saving as PDF from the browser gives a clean resume.
- The full skills list stays on the Skills tab. Resume only has a one-line summary.
- Keep a separate PDF on my computer for job applications that need an upload.

### Skills (`skills.html`)
- Groups are named by the problem they solve, not by tool: Build agentic AI systems, Ground language models in data, Make LLM output reliable, Process data at scale, Teach machines to see, Train and run models, Ship apps, and Turn needs into requirements.
- Each group lists its tools in one line, then "Where I've used it" links to a resume entry, project or course.
- A closing "Tools I build with" line lists AI coding tools and when I started using each.
- Add a skill only if a link to where it was used can go with it.

### Learning (`learning.html`)
- **Learning now:** in-progress courses.
- **Completed:** courses and books, newest first, with All / Courses / Books filter buttons.
- Each row shows the course image (it links to the course page), title, provider and instructor, a one-line takeaway, the type, the finish month, and a link to notes if I have them.
- Course images are copies saved in `images/`, 640px wide WebP, from each course's own preview image. Don't link to images hosted on another site.
- Work-related books go here. Leisure reading goes in Outside work.

**To add an entry:** copy a `<li class="row">` block, then change the image, links, text and `data-kind` (`course` or `book`). When a course is finished, move its block from Learning now to the top of Completed and change "In progress" to "Finished [Month Year]".

| Title | Provider | Instructor | Status | Takeaway |
|---|---|---|---|---|
| Evaluating AI Agents | DeepLearning.AI with Arize AI | | In progress | Observability, and structuring evaluation into experiments to improve output quality and the path an agent takes |
| Agentic AI | DeepLearning.AI | Andrew Ng | Finished April 2026 | Agentic design patterns, and evaluating and optimizing agentic systems |
| Retrieval Augmented Generation (RAG) | DeepLearning.AI | Zain Hasan | Finished February 2026 | Search techniques and vector databases, plus prompt design, evaluation and deployment |

### Outside work (`outside-work.html`)
- One page with three sections, linked from a small in-page menu:
  - **Running (and Runcations):** races and distances, plus trips planned around races, with a photo each
  - **Pilates:** why I do it and what it's taught me
  - **Reading (starting soon...):** a placeholder until the list starts
- Any section can become its own page if it grows.

## Open items

- [x] Headline, bio and highlights (About)
- [x] Resume content from my resume document
- [x] Projects and Skills rewritten from the resume
- [ ] Target roles and location preference (About)
- [ ] Email (a dedicated address) and LinkedIn URL (About and footer)
- [ ] Project screenshots; demo links for Toothian and Heidi for Patients; HeidiBuild month and outcome
- [ ] Running races, Runcation trips and photos; a Pilates blurb
- [ ] Check whether Deloitte allows the client work details to be public (the 185K-record risk pipeline)
- [ ] Decide whether to keep the old `deentong` repo page or redirect it here
- [ ] Push access from Claude sessions (GitHub access was granted, but the session that built this couldn't push)

## Later ideas

- A "Learning now" line on the About page that updates monthly
- Book covers in Learning once books are added
- A map of Runcation trips
- Notes pages for Agentic AI and RAG on the study-notes site, linked from Learning
