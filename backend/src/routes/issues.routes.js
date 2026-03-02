const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issues.controller');

router.get('/status-counts', issuesController.getStatusCounts);
router.post('/', issuesController.createIssue);
router.get('/', issuesController.getIssues);
router.get('/:id', issuesController.getIssueById);
router.patch('/:id/status', issuesController.updateIssueStatus);
router.post('/:id/comments', issuesController.addComment);

module.exports = router;
