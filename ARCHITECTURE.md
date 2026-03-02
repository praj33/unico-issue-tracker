# Unico Issue Tracker - Architecture

## Technology Stack

### Backend
- **Node.js + Express.js**: Fast, lightweight REST API server
- **MySQL**: Relational database for structured issue data with ACID compliance
- **Zod**: Runtime validation for API inputs
- **CORS**: Cross-origin resource sharing for frontend integration

### Frontend  
- **React 18**: Component-based UI with hooks
- **React Router**: Client-side routing
- **Vite**: Fast development server and build tool

### Why This Stack?
- **Proven reliability**: Express.js + MySQL is battle-tested for CRUD applications
- **Developer productivity**: React + Vite provides fast development cycles
- **Minimal complexity**: No unnecessary frameworks or tools
- **Easy deployment**: Standard stack deployable anywhere

## Database Schema

```sql
-- Core entities for issue tracking
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE issues (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id INT,
  priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
  assignee_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assignee_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  issue_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## API Endpoints

### Issues
- `GET /issues` - List issues with optional filters (status, priority, assignee)
- `GET /issues/:id` - Get single issue with comments
- `POST /issues` - Create new issue
- `PATCH /issues/:id/status` - Update issue status
- `POST /issues/:id/comments` - Add comment to issue
- `GET /issues/status-counts` - Get count by status for dashboard

### Users
- `GET /users` - List all users (for assignee dropdown)

### Health
- `GET /health` - API health check

## Component Structure

### Frontend Architecture
```
src/
├── api/
│   └── api.js              # API client functions
├── components/
│   ├── IssueFilters.jsx    # Filter controls
│   ├── IssueTable.jsx      # Issues list table
│   └── StatusCounts.jsx    # Dashboard metrics
├── pages/
│   ├── Dashboard.jsx       # Main issues list
│   ├── IssueDetail.jsx     # Single issue view
│   └── CreateIssue.jsx     # New issue form
├── App.jsx                 # Router setup
└── main.jsx               # React entry point
```

### Backend Architecture
```
src/
├── config/
│   └── db.config.js        # Database configuration
├── controllers/
│   ├── issues.controller.js # Issue business logic
│   └── users.controller.js  # User operations
├── db/
│   └── pool.js             # MySQL connection pool
├── middleware/
│   └── errorHandler.js     # Centralized error handling
├── routes/
│   ├── issues.routes.js    # Issue endpoints
│   ├── users.routes.js     # User endpoints
│   └── health.routes.js    # Health check
├── services/
│   ├── issues.service.js   # Database queries for issues
│   └── users.service.js    # Database queries for users
├── validators/
│   └── users.validator.js  # Input validation schemas
└── server.js              # Express app setup
```

## What I'd Improve With More Time

### Performance
- Add database indexes on frequently queried columns (status, priority, assignee_id)
- Implement Redis caching for status counts and user lists
- Add pagination for large issue lists
- Optimize SQL queries with proper JOINs

### Security
- Add JWT authentication and authorization
- Implement rate limiting per user
- Add input sanitization and SQL injection protection
- HTTPS enforcement and security headers

### User Experience
- Real-time updates using WebSockets
- Drag-and-drop status updates (Kanban board)
- File attachments for issues
- Email notifications for status changes
- Advanced search with full-text indexing

### Code Quality
- Add comprehensive unit and integration tests
- Implement TypeScript for better type safety
- Add API documentation with Swagger/OpenAPI
- Set up CI/CD pipeline with automated testing
- Add logging and monitoring (Winston + structured logs)

### Scalability
- Containerize with Docker
- Add database migrations system
- Implement proper environment configuration
- Add health checks and graceful shutdown
- Consider microservices architecture for larger scale