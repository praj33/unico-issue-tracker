# AI Prompt History - Unico Issue Tracker

This document tracks all AI assistance used during the development of the Unico Issue Tracker application.

## Session 1: Backend Foundation Setup

### Prompt 1: Express Server Foundation
**What I asked:** "You are a senior Node.js backend engineer. Create a clean, production-ready Express server foundation using CommonJS (require syntax only, NOT ES modules). Tech Stack: Node.js, Express, cors, dotenv. Project structure: backend/src/ middleware/ errorHandler.js routes/ health.routes.js server.js. Requirements: Use require() syntax everywhere, Load environment variables using dotenv.config(), Enable CORS globally, Use express.json(), Implement GET /health route returning: { status: "ok" }, Create centralized error-handling middleware in middleware/errorHandler.js, Use proper 404 handler, Listen on process.env.PORT || 5000, Separate code by file, Return output separated clearly by file names, Do NOT include business logic, Do NOT include comments explaining basic JavaScript, Make it clean and structured like production code."

**What I got:** Complete Express server foundation with health routes, error handling middleware, and proper project structure

**Context:** Initial backend setup for issue tracker application

### Prompt 2: Issues Module Implementation
**What I asked:** "I am building an Issue Tracker backend using: Node.js, Express, mysql2/promise, CommonJS (require/module.exports only), Layered architecture. Current structure: backend/src/ controllers/ routes/ services/ db/pool.js middleware/errorHandler.js server.js. Do NOT change server.js. Do NOT modify existing files. Only create new files for the Issues module. Database schema: issues (id INT PK AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, project_id INT NOT NULL, priority ENUM('Low','Medium','High','Critical') NOT NULL, status ENUM('Open','In Progress','Resolved','Closed') DEFAULT 'Open', assignee_id INT, created_at TIMESTAMP, updated_at TIMESTAMP) projects (id, name) users (id, name, email). TASK: Create GET /issues endpoint with the following requirements: Filtering via query parameters: project_id, priority, status, assignee_id, search (search in title OR description using LIKE). Must: Use prepared statements only (no string concatenation), Dynamically build WHERE conditions safely, Join projects and users tables, Return project_name and assignee_name, Sort by created_at DESC, Response format: { success: true, count: number, data: [...] }. Architecture rules: Service handles DB queries only, Controller handles req/res only, Route only maps endpoint, No console.log, No unused variables, Clean code, production-ready, CommonJS only"

**What I got:** Complete Issues module with GET /issues endpoint including dynamic filtering, joins, and layered architecture

**Context:** Core functionality for listing and filtering issues with proper database queries

### Prompt 3: Single Issue Retrieval
**What I asked:** "Add a new endpoint: GET /issues/:id. Requirements: Must: Fetch a single issue by id, Join projects and users to include: project_name assignee_name, Must: Fetch all comments for that issue, Ordered by created_at ASC, If issue does not exist: Return 404 error using next(new Error(...)). Architecture: Service handles DB queries, Controller handles req/res, Route maps endpoint, CommonJS only, No console logs, Clean production code, Use prepared statements"

**What I got:** GET /issues/:id endpoint with issue details and associated comments retrieval

**Context:** Individual issue viewing functionality with comments display

### Prompt 4: Status Update Functionality
**What I asked:** "Add a new endpoint: PATCH /issues/:id/status. Requirements: Update ONLY the "status" field of an issue. Allowed status values: 'Open', 'In Progress', 'Resolved', 'Closed'. Validate status server-side. If invalid → return 400 error using next(error). If issue does not exist → return 404 error. Use prepared statements only. Update updated_at automatically (MySQL default ON UPDATE is already set). Architecture: Service handles DB logic only, Controller handles req/res, Route maps endpoint, CommonJS only, No console logs, No extra features. Response format: { success: true, message: "Status updated successfully" }"

**What I got:** PATCH endpoint for updating issue status with proper validation and error handling

**Context:** Status management functionality for issue workflow

### Prompt 5: Comment Addition
**What I asked:** "Add a new endpoint: POST /issues/:id/comments. Requirements: Accept JSON body: { comment: string }, Validate: comment must exist, comment must not be empty, max length 1000 characters, Insert into comments table: (issue_id, comment), If issue does not exist → return 404 error. Use prepared statements only. Architecture: Service handles DB logic only, Controller handles req/res, Route maps endpoint, CommonJS only, No console logs, No extra features. Response format: { success: true, message: "Comment added successfully" }"

**What I got:** POST endpoint for adding comments to issues with validation and FK checks

**Context:** Comment system implementation for issue discussions

### Prompt 6: Status Counts Dashboard
**What I asked:** "Add a new endpoint: GET /issues/status-counts. Requirements: Query must return count of issues grouped by status. Response format: { success: true, data: { Open: number, "In Progress": number, Resolved: number, Closed: number } }. If any status has zero issues, it must still appear with value 0. Use prepared statements. Architecture: Service handles DB logic, Controller handles req/res, Route maps endpoint, CommonJS only, No console logs"

**What I got:** Dashboard endpoint providing issue counts by status for metrics display

**Context:** Dashboard analytics for issue tracking overview

### Prompt 7: Issue Creation
**What I asked:** "Add a new endpoint: POST /issues. Requirements: Accept JSON body: { title: string, description: string, project_id: number, priority: 'Low' | 'Medium' | 'High' | 'Critical', assignee_id: number, status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed' }. Validation (server-side mandatory): title required, max 255 characters, description required, project_id required, must be number, priority required, must be valid enum value, assignee_id required, must be number, status optional, default to 'Open'. If invalid → return 400 using next(error). If project_id does not exist → return 400. If assignee_id does not exist → return 400. Insert into issues table using prepared statements. Architecture: Service handles DB logic only, Controller handles req/res only, Route maps endpoint, CommonJS only, No console logs, No extra features. Response format: { success: true, message: "Issue created successfully" }"

**What I got:** Complete issue creation endpoint with comprehensive validation and FK checks

**Context:** Issue creation functionality for adding new issues to the system

## Session 2: Backend Improvements and Quality Assurance

### Prompt 8: Comprehensive Backend Review
**What I asked:** "You are a senior Node.js backend engineer reviewing my Issue Tracker backend. I already have: GET /issues, GET /issues/:id, POST /issues, PATCH /issues/:id/status, POST /issues/:id/comments, GET /issues/status-counts. Architecture: Express (CommonJS), MySQL, Service layer handles DB, Controller handles validation + req/res, Prepared statements only. Now perform the following improvements and additions. PART 1 — Fix Numeric Validation Robustly: Update createIssue controller validation so that: project_id and assignee_id accept numeric strings (e.g. "1"), Use Number() conversion safely, Reject invalid numbers using isNaN(Number(value)), Trim title and description before validation, Do NOT allow empty strings after trim, Keep enum validation for priority and status, Do NOT use console.log, Use next(error) with proper statusCode, Return only updated createIssue controller function. PART 2 — Improve Service Error Handling: Refactor createIssue service so that: It does NOT return string flags, Instead it throws errors with statusCode: 400 if project not found, 400 if assignee not found, Controller should just call service and return success if no error thrown, Keep prepared statements, Keep FK existence checks, No console logs, Return updated createIssue service function and controller. PART 3 — Add Seed Script: Create a seed function (not CLI script, just SQL insert block) that: Inserts 4 projects, Inserts 5 users, Inserts 12–15 realistic issues across all projects, Mix of priorities, Mix of statuses, Realistic consulting firm examples: Login bug, Performance issue, UI alignment bug, Payment gateway timeout, API rate limiting, Feature request examples, Spread across Open / In Progress / Resolved / Closed, Assign different assignees, Return pure SQL statements only. PART 4 — Final Backend Compliance Checklist: Generate a short checklist verifying: All required endpoints exist, Server-side validation exists, Proper HTTP status codes used, Filtering works, Status counts works, Comment insertion works, FK validation exists, No raw SQL string concatenation, Error handler centralized, CommonJS only, Keep checklist concise and structured. PART 5 — Next Strategic Steps (Full Stack): Give next 5 steps in priority order to complete the full assessment including: Dashboard UI, Issue form, Detail view, Filtering, Status counts display, Commit discipline strategy, ARCHITECTURE.md structure outline, PROMPTS.md structure outline, Keep it execution-focused, not theoretical."

**What I got:** Comprehensive backend improvements including robust validation, error handling refactor, seed data, compliance checklist, and strategic roadmap

**Context:** Backend code quality improvements and preparation for frontend development

## Session 3: Frontend Development

### Prompt 9: React Frontend Foundation
**What I asked:** "You are a senior React full-stack engineer. I have a completed Node.js + Express + MySQL backend for an Issue Tracker. Available API endpoints: GET /issues, GET /issues/:id, POST /issues, PATCH /issues/:id/status, POST /issues/:id/comments, GET /issues/status-counts. Now build a clean React frontend using: React (functional components), React Router, Fetch API (no axios), Simple CSS (no UI libraries), Clean folder structure, No overengineering. PROJECT STRUCTURE: frontend/src/ api/ api.js pages/ Dashboard.jsx IssueDetail.jsx CreateIssue.jsx components/ IssueTable.jsx IssueFilters.jsx StatusCounts.jsx App.jsx main.jsx. REQUIREMENTS: PART 1 — API Layer: Create api.js with functions: getIssues(filters), getIssueById(id), createIssue(data), updateIssueStatus(id, status), addComment(id, comment), getStatusCounts(). Use fetch. Handle JSON parsing. Throw errors if response not ok. PART 2 — Dashboard Page: Dashboard must: Fetch issues on load, Fetch status counts, Show: Status summary cards, Issue table, Include filters: project_id, priority, status, assignee_id, search, Filtering updates query params dynamically, Responsive layout, Loading state, Error state. PART 3 — Issue Detail Page: Route: /issues/:id. Must: Fetch issue details, Show: Title, Description, Project name, Assignee name, Priority, Status, Created date, Status dropdown → PATCH request, Comments list, Add comment form, Loading & error states. PART 4 — Create Issue Page: Route: /create. Must: Form fields: title, description, project_id, priority, assignee_id, status (optional), Client-side validation, Show API validation errors, Redirect to dashboard on success. PART 5 — Routing Setup: App.jsx should define: / → Dashboard, /issues/:id → IssueDetail, /create → CreateIssue. PART 6 — Code Quality Rules: No console.log, No unused variables, Functional components only, Clean, readable code, Minimal but structured CSS, No external UI libraries, Keep everything production clean. PART 7 — Deliverable Format: Return code separated by file names: api/api.js, pages/Dashboard.jsx, pages/IssueDetail.jsx, pages/CreateIssue.jsx, components/IssueTable.jsx, components/IssueFilters.jsx, components/StatusCounts.jsx, App.jsx, main.jsx. Do not include explanations. Return only code blocks separated by file name."

**What I got:** Complete React frontend application with all components, pages, routing, and API integration

**Context:** Full frontend implementation for issue tracker with dashboard, detail views, and creation forms

## Session 4: Final Documentation and Evaluation Preparation

### Prompt 10: Project Evaluation Requirements
**What I asked:** "When Time ends, you must have all of the following ready: GitHub Repository Public repo or private (add the evaluator handle announced at start). Must include: ● ARCHITECTURE.md — Why this stack? Database schema. API endpoints list. Component structure. What you'd improve with more time. ● PROMPTS.md — Your AI prompt history (see below) ● Meaningful commit history — minimum 5 commits showing progression. Video Recording of Complete UI functionality Demo. PROMPTS.md — AI Prompt Log Create this file in your repo root. Document your AI usage throughout the test: What you asked — paste the actual prompt (or key parts). What you got — 1-line summary of what the AI returned"

**What I got:** Comprehensive project documentation including ARCHITECTURE.md, enhanced PROMPTS.md, and evaluation-ready repository structure

**Context:** Final project preparation for evaluation with complete documentation and commit history

---

## Development Summary

**Total AI Interactions:** 10 major prompts
**Backend Endpoints Created:** 6 REST API endpoints
**Frontend Components Created:** 6 React components + 3 pages
**Documentation Files:** 3 comprehensive documentation files
**Code Quality:** Production-ready with proper validation, error handling, and architecture

**Key Technologies Implemented:**
- Backend: Node.js, Express, MySQL, CommonJS
- Frontend: React 18, React Router, Vite
- Architecture: Layered backend, component-based frontend
- Database: Relational schema with proper foreign keys
- Validation: Server-side and client-side validation
- Error Handling: Centralized middleware and proper HTTP status codes

**Project Completion Status:** ✅ Full-stack application ready for evaluation