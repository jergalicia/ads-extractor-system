import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard.jsx';
import SearchPage from './pages/Search.jsx';
import CompaniesPage from './pages/Companies.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/stats" element={<div className="text-white">Estadísticas (Próximamente)</div>} />
          <Route path="/export" element={<div className="text-white">Exportación (Próximamente)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
