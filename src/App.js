import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WumpusGameBoard from './WumpusGameBoard';
import WumpusSetup from './WumpusSetup';
import FirstPage from './FirstPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} /> 
        <Route path={'/WumpusSetup'} element={<WumpusSetup />}/>
        <Route path={'/WumpusGameBoard'} element={<WumpusGameBoard />}/>

      </Routes>
      </Router>
  );
}

export default App;
