const API_BASE_URL = 'http://localhost:5000';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
};

export const getIssues = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  const url = `${API_BASE_URL}/issues${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const getIssueById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}`);
  return handleResponse(response);
};

export const createIssue = async (data) => {
  const response = await fetch(`${API_BASE_URL}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const updateIssueStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return handleResponse(response);
};

export const addComment = async (id, comment) => {
  const response = await fetch(`${API_BASE_URL}/issues/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment })
  });
  return handleResponse(response);
};

export const getStatusCounts = async () => {
  const response = await fetch(`${API_BASE_URL}/issues/status-counts`);
  return handleResponse(response);
};
