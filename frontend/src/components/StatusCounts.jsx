const StatusCounts = ({ counts }) => {
  const statusConfig = [
    { key: 'Open', color: '#3b82f6' },
    { key: 'In Progress', color: '#f59e0b' },
    { key: 'Resolved', color: '#10b981' },
    { key: 'Closed', color: '#6b7280' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      {statusConfig.map(({ key, color }) => (
        <div key={key} style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${color}` }}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{key}</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{counts[key] || 0}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusCounts;
