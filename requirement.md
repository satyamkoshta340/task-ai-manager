## Smart Task Manager with AI Briefing - Technical Task Requirements

[cite_start]This document outlines the requirements for the Full Stack Developer candidate technical task for **Rubico Tech**[cite: 1, 2].

---

### 1. Project Overview
[cite_start]The goal is to build a production-quality, minimal, but functional **Smart Task Manager** web application that integrates a real AI-powered daily briefing feature[cite: 8, 10, 11].

* [cite_start]**Estimated Time:** 1-2 days[cite: 3].
* [cite_start]**Target Experience:** Up to 3 years[cite: 4].

---

### 2. Technical Requirements

#### 2.1 Backend
* [cite_start]**Technology:** TypeScript using **NestJS** or **Express**[cite: 28, 36].
* [cite_start]**Database:** PostgreSQL (via Prisma or TypeORM), MongoDB, or SQLite[cite: 14, 38].
* **API Endpoints:**
    * [cite_start]`POST /tasks`: Create a new task[cite: 13].
    * [cite_start]`GET /tasks`: Retrieve all tasks[cite: 13].
    * [cite_start]`DELETE /tasks/:id`: Delete a specific task[cite: 13].
    * [cite_start]`GET /tasks/summary`: Call a real LLM API (OpenAI, Gemini, etc.) to return a plain-English briefing of pending tasks[cite: 15, 16].
* [cite_start]**Validation:** Implement basic input validation and meaningful error responses[cite: 17].

#### 2.2 Frontend
* [cite_start]**Technology:** TypeScript using **React**, **Next.js**, or **Vue/Nuxt**[cite: 28, 37].
* **Features:**
    * [cite_start]UI to add, view, and delete tasks[cite: 19].
    * [cite_start]A **"Generate Briefing"** button to trigger the AI summary[cite: 20].
    * [cite_start]Graceful handling of loading states and API errors[cite: 21].
    * [cite_start]Clean and usable styling (does not need to be pixel-perfect)[cite: 22].

#### 2.3 AI Integration
* [cite_start]**Model:** OpenAI GPT-4o-mini, Google Gemini Flash, or any publicly available model[cite: 39].
* [cite_start]**Strict Rule:** Must make an **actual LLM API call**; mocked responses are not accepted[cite: 24, 25].
* [cite_start]**Prompting:** You are responsible for the prompt design, which will be discussed in the interview[cite: 26].
* [cite_start]**Resilience:** Handle API failures or rate-limiting gracefully[cite: 26].

---

### 3. Code Quality & Standards
* [cite_start]**Language:** Use **TypeScript** for both frontend and backend[cite: 28].
* [cite_start]**Version Control:** * Provide a Git history with **incremental commits**[cite: 31].
    * [cite_start]Avoid a single "initial commit" dump[cite: 33].
* **Documentation:**
    * [cite_start]A clear `README.md` with step-by-step setup instructions[cite: 29].
    * [cite_start]A `.env.example` file listing required variables (exclude real keys)[cite: 30].
* [cite_start]**Honesty:** If a feature is incomplete, document the trade-offs in the README[cite: 59].

---

### 4. Submission Instructions
* [cite_start]**Format:** Share a GitHub repository link (public or private) with HR[cite: 5, 46].
* [cite_start]**Email Contacts:** Ed.Arun@rubicotech.in and Ethan.Ankur@rubicotech.in[cite: 6].
* **Repository Contents:**
    * [cite_start]All source code for frontend and backend[cite: 49].
    * [cite_start]`README.md` and `.env.example`[cite: 50, 51].
    * [cite_start]Database migration files or seed scripts[cite: 52].
    * [cite_start]A `NOTES.md` or section in README covering what was built, trade-offs made, and future improvements[cite: 53, 54].
    * [cite_start]Output files or chat links if AI tools were used during development[cite: 55].

---

### 5. Bonus Points (Optional)
* [cite_start]Live deployment URL (Vercel, Railway, Render, etc.)[cite: 41].
* [cite_start]User authentication (JWT or session-based)[cite: 42].
* [cite_start]Implementation of a vector database or RAG pattern[cite: 43].
* [cite_start]ESLint or SonarQube configuration[cite: 44].