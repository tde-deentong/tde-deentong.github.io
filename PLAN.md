# DeenTong personal site: plan

The working plan for this site. Update it whenever the structure or rules change, so later iterations start from here.

- **Live at:** https://tde-deentong.github.io/
- **Goal:** a job-hunting site. A recruiter should understand what I do, see proof, and know how to reach me within about a minute.
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
- Each row lists the problem, my role, what I built, the result (with numbers where possible), the stack and a link.
- Current candidates, taken from my GitHub:
  - **Heidi25Hack:** voice-driven patient pre-screening (React, FastAPI, GPT-4o-mini, Whisper, MongoDB, Docker).
  - **HyperLearner** (`hack-learner`): an AI learning platform for teachers and students (Next.js, Prisma, Supabase, NextAuth).
  - **NLP_FinalProject:** COMP90042 group project, 2025.
  - **Hackiethon25:** a React widget for the HackMelbourne Widget Challenge.
  - Possible extras: `genai-inte`, `Building-AI-Assistants-with-On-Device-Memory`, `Spatio-Temporal-Data`. The last two are currently empty.
- Each project needs: my role, the result, and a demo or screenshot if I have one.

### Resume (`resume.html`)
- Sections: Summary, Experience, Education, Projects and hackathons (links to Projects), Certifications and courses (links to Learning), and Volunteering and leadership (optional).
- Sections expand when their heading is clicked, so the page stays short on phones.
- A print stylesheet hides the navigation, so printing or saving as PDF from the browser gives a clean resume.
- Skills stay on the Skills tab and aren't repeated here.
- Keep a separate PDF on my computer for job applications that need an upload.

### Skills (`skills.html`)
- Groups are named by the problem they solve, not by tool:
  - *Make agents capable:* agentic design patterns, tool use, RAG, vector databases
  - *Make agents reliable:* evals, tracing, observability, experiments
  - *Work with language and data:* NLP, data analysis
  - *Ship full-stack apps:* React, Next.js, FastAPI, databases, Docker
- Each group lists its tools in one line and links to proof (a project, course or notes).

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

- [ ] Headline, bio and target roles (About)
- [ ] Email (a dedicated address) and LinkedIn URL (About and footer)
- [ ] My role and the result for each project, plus screenshots
- [ ] Resume content: experience, education and any certifications
- [ ] Running races, Runcation trips and photos; a Pilates blurb
- [ ] Decide whether to keep the old `deentong` repo page or redirect it here
- [ ] Reconnect GitHub so changes can be pushed from Claude

## Later ideas

- A "Learning now" line on the About page that updates monthly
- Book covers in Learning once books are added
- A map of Runcation trips
- Notes pages for Agentic AI and RAG on the study-notes site, linked from Learning
