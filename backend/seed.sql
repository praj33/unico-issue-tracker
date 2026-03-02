-- Seed data for Unico Issue Tracker

-- Insert Projects
INSERT INTO projects (name) VALUES
('Client Portal Redesign'),
('Payment Gateway Integration'),
('Mobile App Development'),
('Internal CRM System');

-- Insert Users
INSERT INTO users (name, email) VALUES
('Sarah Johnson', 'sarah.johnson@unico.com'),
('Michael Chen', 'michael.chen@unico.com'),
('Emily Rodriguez', 'emily.rodriguez@unico.com'),
('David Kim', 'david.kim@unico.com'),
('Jessica Martinez', 'jessica.martinez@unico.com');

-- Insert Issues
INSERT INTO issues (title, description, project_id, priority, status, assignee_id) VALUES
('Login page not responsive on mobile devices', 'Users report that the login form is cut off on iPhone 12 and Samsung Galaxy devices. Need to fix CSS media queries.', 1, 'High', 'In Progress', 1),
('Dashboard loading time exceeds 5 seconds', 'Performance issue with dashboard queries. Need to optimize database indexes and implement caching strategy.', 1, 'Critical', 'Open', 2),
('User profile image alignment issue', 'Profile images are not centered in the header navigation. Affects Chrome and Firefox browsers.', 1, 'Low', 'Resolved', 3),
('Payment gateway timeout on large transactions', 'Transactions over $10,000 are timing out after 30 seconds. Need to increase timeout and add retry logic.', 2, 'Critical', 'In Progress', 4),
('Credit card validation fails for Amex cards', 'American Express cards are being rejected due to incorrect regex pattern in validation logic.', 2, 'High', 'Open', 5),
('API rate limiting not working correctly', 'Rate limiter allows more requests than configured. Security concern for production deployment.', 2, 'Medium', 'Closed', 1),
('Push notifications not received on iOS', 'iOS users report not receiving push notifications. Android works fine. Issue with APNs certificate.', 3, 'High', 'In Progress', 2),
('App crashes when uploading photos over 5MB', 'Mobile app crashes when users try to upload large images. Need to implement compression before upload.', 3, 'Critical', 'Open', 3),
('Dark mode toggle not persisting', 'User preference for dark mode resets after app restart. Need to save preference to local storage.', 3, 'Low', 'Resolved', 4),
('Add export to CSV feature for reports', 'Clients requesting ability to export customer data to CSV format for external analysis.', 4, 'Medium', 'Open', 5),
('Implement two-factor authentication', 'Security enhancement request to add 2FA using SMS or authenticator app for admin users.', 4, 'High', 'In Progress', 1),
('Email notifications contain broken links', 'Links in automated email notifications return 404 errors. Need to fix URL generation logic.', 4, 'Medium', 'Closed', 2),
('Add bulk delete functionality for records', 'Feature request to allow admins to select and delete multiple records at once instead of one by one.', 4, 'Low', 'Open', 3),
('Search functionality returns irrelevant results', 'Search algorithm needs improvement. Currently only does exact match, should implement fuzzy search.', 1, 'Medium', 'Resolved', 4),
('Session timeout too aggressive', 'Users complain about being logged out too frequently. Current timeout is 15 minutes, should be configurable.', 1, 'Low', 'Closed', 5);
