import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIssue } from '../api/api';

const CreateIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    priority: 'Medium',
    assignee_id: '',
    status: 'Open'
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (formData.title.length > 255) {
      setError('Title must not exceed 255 characters');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    if (!formData.project_id) {
      setError('Project ID is required');
      return;
    }

    if (!formData.assignee_id) {
      setError('Assignee ID is required');
      return;
    }

    try {
      setSubmitting(true);
      await createIssue({
        ...formData,
        project_id: Number(formData.project_id),
        assignee_id: Number(formData.assignee_id)
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        ← Back
      </button>
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Create New Issue</h1>
        {error && (
          <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '6px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', resize: 'vertical' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Project ID *</label>
            <input
              type="number"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Priority *</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Assignee ID *</label>
            <input
              type="number"
              name="assignee_id"
              value={formData.assignee_id}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', opacity: submitting ? 0.5 : 1 }}
          >
            {submitting ? 'Creating...' : 'Create Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
