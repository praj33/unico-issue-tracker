const issuesService = require('../services/issues.service');

const getIssues = async (req, res, next) => {
  try {
    const filters = {
      project_id: req.query.project_id,
      priority: req.query.priority,
      status: req.query.status,
      assignee_id: req.query.assignee_id,
      search: req.query.search
    };

    const issues = await issuesService.getAllIssues(filters);

    res.json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    next(error);
  }
};

const getIssueById = async (req, res, next) => {
  try {
    const issue = await issuesService.getIssueById(req.params.id);

    if (!issue) {
      const error = new Error('Issue not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      data: issue
    });
  } catch (error) {
    next(error);
  }
};

const updateIssueStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

    if (!allowedStatuses.includes(status)) {
      const error = new Error('Invalid status value');
      error.statusCode = 400;
      return next(error);
    }

    const updated = await issuesService.updateIssueStatus(req.params.id, status);

    if (!updated) {
      const error = new Error('Issue not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      message: 'Status updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { comment } = req.body;

    if (!comment || comment.trim() === '') {
      const error = new Error('Comment is required');
      error.statusCode = 400;
      return next(error);
    }

    if (comment.length > 1000) {
      const error = new Error('Comment must not exceed 1000 characters');
      error.statusCode = 400;
      return next(error);
    }

    const added = await issuesService.addComment(req.params.id, comment);

    if (!added) {
      const error = new Error('Issue not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      message: 'Comment added successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getStatusCounts = async (req, res, next) => {
  try {
    const counts = await issuesService.getStatusCounts();

    res.json({
      success: true,
      data: counts
    });
  } catch (error) {
    next(error);
  }
};

const createIssue = async (req, res, next) => {
  try {
    const { title, description, project_id, priority, assignee_id, status } = req.body;
    const allowedPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const allowedStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

    const trimmedTitle = title ? String(title).trim() : '';
    const trimmedDescription = description ? String(description).trim() : '';

    if (!trimmedTitle) {
      const error = new Error('Title is required');
      error.statusCode = 400;
      return next(error);
    }

    if (trimmedTitle.length > 255) {
      const error = new Error('Title must not exceed 255 characters');
      error.statusCode = 400;
      return next(error);
    }

    if (!trimmedDescription) {
      const error = new Error('Description is required');
      error.statusCode = 400;
      return next(error);
    }

    if (!project_id || isNaN(Number(project_id))) {
      const error = new Error('Project ID is required and must be a valid number');
      error.statusCode = 400;
      return next(error);
    }

    if (!priority || !allowedPriorities.includes(priority)) {
      const error = new Error('Invalid priority value');
      error.statusCode = 400;
      return next(error);
    }

    if (!assignee_id || isNaN(Number(assignee_id))) {
      const error = new Error('Assignee ID is required and must be a valid number');
      error.statusCode = 400;
      return next(error);
    }

    if (status && !allowedStatuses.includes(status)) {
      const error = new Error('Invalid status value');
      error.statusCode = 400;
      return next(error);
    }

    const issueData = {
      title: trimmedTitle,
      description: trimmedDescription,
      project_id: Number(project_id),
      priority,
      assignee_id: Number(assignee_id),
      status: status || 'Open'
    };

    await issuesService.createIssue(issueData);

    res.json({
      success: true,
      message: 'Issue created successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIssues,
  getIssueById,
  updateIssueStatus,
  addComment,
  getStatusCounts,
  createIssue
};
