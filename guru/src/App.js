import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './signup';
import Login from './login';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* Navigation */}
        <nav>
          <Link to="/signup" style={{ marginRight: '20px' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
