import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getIssues, getStatusCounts } from '../api/api';
import StatusCounts from '../components/StatusCounts';
import IssueFilters from '../components/IssueFilters';
import IssueTable from '../components/IssueTable';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const filters = {
    search: searchParams.get('search') || '',
    project_id: searchParams.get('project_id') || '',
    priority: searchParams.get('priority') || '',
    status: searchParams.get('status') || '',
    assignee_id: searchParams.get('assignee_id') || ''
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [issuesData, countsData] = await Promise.all([
          getIssues(filters),
          getStatusCounts()
        ]);
        setIssues(issuesData.data);
        setCounts(countsData.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Issue Tracker</h1>
        <button
          onClick={() => navigate('/create')}
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
        >
          Create Issue
        </button>
      </div>
      <StatusCounts counts={counts} />
      <IssueFilters filters={filters} onFilterChange={handleFilterChange} />
      <IssueTable issues={issues} />
    </div>
  );
};

export default Dashboard;
