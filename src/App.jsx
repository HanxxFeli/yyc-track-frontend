import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <h1>YYC Track</h1>
          <p>Initial setup complete! Ready for development.</p>
          <p>Backend API: <a href="http://localhost:5000" target="_blank">http://localhost:5000</a></p>
        </main>
      </div>
    </Router>
  );
}

export default App;