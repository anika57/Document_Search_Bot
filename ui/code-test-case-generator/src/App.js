import logo from './logo.svg';
import './App.css';
import Bot from './bot';
import LoginPage from './Login';
import AdminPage from './AdminPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
            <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/bot" element={<Bot />} />
                <Route path="*" element={<LoginPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
