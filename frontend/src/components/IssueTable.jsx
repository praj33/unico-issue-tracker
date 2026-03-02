import { useNavigate } from 'react-router-dom';

const IssueTable = ({ issues }) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    const colors = {
      Low: '#10b981',
      Medium: '#f59e0b',
      High: '#ef4444',
      Critical: '#dc2626'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: '#3b82f6',
      'In Progress': '#f59e0b',
      Resolved: '#10b981',
      Closed: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f9fafb' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Title</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Project</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Priority</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Status</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr
              key={issue.id}
              onClick={() => navigate(`/issues/${issue.id}`)}
              style={{ borderTop: '1px solid #e5e7eb', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{issue.title}</td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{issue.project_name}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: `${getPriorityColor(issue.priority)}20`, color: getPriorityColor(issue.priority) }}>
                  {issue.priority}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: `${getStatusColor(issue.status)}20`, color: getStatusColor(issue.status) }}>
                  {issue.status}
                </span>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{issue.assignee_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {issues.length === 0 && (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>No issues found</div>
      )}
    </div>
  );
};

export default IssueTable;
