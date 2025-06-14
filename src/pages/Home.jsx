import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="home-container">
      <h1>👮‍♂ Learner License Test Preparation</h1>
      <p>
        Master your driving knowledge with our comprehensive test preparation
        platform. Practice with real questions and take timed mock tests to ensure
        you're ready for success.
      </p>

      <div className="cards">
        <div className="card">
          <h3>⏰ Mock Test</h3>
          <ul>
            <li>20 questions</li>
            <li>30 seconds per question</li>
            <li>Pass mark: 12/20</li>
            <li>Instant results</li>
          </ul>
          <Link to="/mock-test" className="btn">Start Mock Test</Link>
        </div>

        <div className="card">
          <h3>📚 Practice Mode</h3>
          <ul>
            <li>300+ questions</li>
            <li>No time pressure</li>
            <li>Organized by categories</li>
            <li>Immediate answer</li>
          </ul>
          <Link to="/practice" className="btn">Start Practice</Link>
        </div>
      </div>

      {/* Test Categories Section */}
      <section className="categories-section">
        <h2 className="category-title">Top Test Categories🏅</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Traffic Signs</h3>
            <p>50+ questions</p>
          </div>
          <div className="category-card">
            <h3>Road Rules</h3>
            <p>80+ questions</p>
          </div>
          <div className="category-card">
            <h3>Safety</h3>
            <p>100+ questions</p>
          </div>
          <div className="category-card">
            <h3>Parking</h3>
            <p>30+ questions</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
