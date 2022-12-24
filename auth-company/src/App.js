import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { LoginPage } from './auth/components/login-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
