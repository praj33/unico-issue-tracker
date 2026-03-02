import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIssueById, updateIssueStatus, addComment } from '../api/api';

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchIssue = async () => {
    try {
      setLoading(true);
      const data = await getIssueById(id);
      setIssue(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateIssueStatus(id, newStatus);
      setIssue({ ...issue, status: newStatus });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      setSubmitting(true);
      await addComment(id, comment);
      setComment('');
      await fetchIssue();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>Error: {error}</div>;
  }

  if (!issue) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Issue not found</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        ← Back
      </button>
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>{issue.title}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Project: </span>
            <span style={{ fontWeight: '500' }}>{issue.project_name}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Assignee: </span>
            <span style={{ fontWeight: '500' }}>{issue.assignee_name}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Priority: </span>
            <span style={{ fontWeight: '500' }}>{issue.priority}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status: </span>
            <select
              value={issue.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              style={{ padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontWeight: '500' }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Created: </span>
            <span style={{ fontWeight: '500' }}>{new Date(issue.created_at).toLocaleString()}</span>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Description</h3>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>{issue.description}</p>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Comments ({issue.comments.length})</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          {issue.comments.map((c) => (
            <div key={c.id} style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', marginBottom: '0.75rem' }}>
              <p style={{ color: '#374151', marginBottom: '0.5rem' }}>{c.comment}</p>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{new Date(c.created_at).toLocaleString()}</span>
            </div>
          ))}
          {issue.comments.length === 0 && (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No comments yet</p>
          )}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows="4"
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '0.75rem', resize: 'vertical' }}
          />
          <button
            type="submit"
            disabled={submitting || !comment.trim()}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', opacity: submitting || !comment.trim() ? 0.5 : 1 }}
          >
            {submitting ? 'Submitting...' : 'Add Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueDetail;
