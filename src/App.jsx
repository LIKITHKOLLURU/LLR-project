import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MockTest from './pages/MockTest';
import Practice from './pages/Practice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        <main style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mock-test" element={<MockTest />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
