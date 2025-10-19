import { useState } from 'react';
import questionsData from '../data/questions.json';


const Practice = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(questionsData.map(q => q.category))];

  const filteredQuestions = selectedCategory === 'All'
    ? questionsData
    : questionsData.filter(q => q.category === selectedCategory);

  return (
    <div className="practice-container">
      <h2>Practice Questions</h2>

      <div className="category-filter">
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="question-list">
        {filteredQuestions.map((q, index) => (
          <div key={index} className="question-card">
            <h3>Q{index + 1}: {q.question}</h3>
            <ul>
              {q.options.map((opt, i) => (
                <li key={i} className={opt === q.answer ? 'correct-answer' : ''}>
                  {opt === q.answer ? <strong>{opt} ✔ (Correct Answer)</strong> : opt}
                </li>
              ))}
            </ul>
            <p className="category-label">Category: {q.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
