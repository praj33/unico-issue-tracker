import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IssueDetail from './pages/IssueDetail';
import CreateIssue from './pages/CreateIssue';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/issues/:id" element={<IssueDetail />} />
        <Route path="/create" element={<CreateIssue />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
