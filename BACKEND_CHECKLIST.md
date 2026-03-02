# Backend Compliance Checklist

## ✅ API Endpoints
- [x] GET /issues (with filtering)
- [x] GET /issues/:id (with comments)
- [x] POST /issues
- [x] PATCH /issues/:id/status
- [x] POST /issues/:id/comments
- [x] GET /issues/status-counts

## ✅ Server-Side Validation
- [x] Title required, max 255 chars, trimmed
- [x] Description required, trimmed
- [x] project_id numeric validation with isNaN check
- [x] assignee_id numeric validation with isNaN check
- [x] Priority enum validation (Low/Medium/High/Critical)
- [x] Status enum validation (Open/In Progress/Resolved/Closed)
- [x] Comment max 1000 chars

## ✅ HTTP Status Codes
- [x] 200 for successful GET/PATCH/POST
- [x] 400 for validation errors
- [x] 404 for resource not found
- [x] 500 for server errors (via error handler)

## ✅ Filtering & Queries
- [x] Filter by project_id
- [x] Filter by priority
- [x] Filter by status
- [x] Filter by assignee_id
- [x] Search in title/description (LIKE)
- [x] Dynamic WHERE clause building

## ✅ Database Operations
- [x] Status counts grouped by status
- [x] Comment insertion with FK check
- [x] Project FK validation before insert
- [x] Assignee FK validation before insert
- [x] Issue existence check before status update
- [x] Issue existence check before comment insert

## ✅ Security & Best Practices
- [x] Prepared statements only (no string concatenation)
- [x] Centralized error handler middleware
- [x] CommonJS (require/module.exports)
- [x] Service layer for DB logic
- [x] Controller layer for validation/req-res
- [x] No console.log in production code
- [x] Proper error propagation with next(error)

## ✅ Architecture
- [x] Layered architecture (routes/controllers/services)
- [x] Separation of concerns
- [x] Error handling with statusCode property
- [x] Clean code structure
