const IssueFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        />
        <input
          type="number"
          placeholder="Project ID"
          value={filters.project_id || ''}
          onChange={(e) => handleChange('project_id', e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        />
        <select
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <select
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="number"
          placeholder="Assignee ID"
          value={filters.assignee_id || ''}
          onChange={(e) => handleChange('assignee_id', e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default IssueFilters;
