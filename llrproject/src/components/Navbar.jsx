import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Car" className="logo" />
        <span className="title">Learner License Test</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/mock-test" className="nav-btn">Mock Test</Link>
        <Link to="/practice" className="nav-btn">Practice</Link>
      </div>
    </nav>
  );
}
export default Navbar;
