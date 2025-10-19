import { useEffect, useState } from 'react';
import questionsData from '../data/questions.json';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(true); // NEW

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
  }, []);

  useEffect(() => {
    if (showResult || showConfirmation) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQIndex, showResult, showConfirmation]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    const currentQuestion = questions[currentQIndex];
    const correctIndex = currentQuestion.options.indexOf(currentQuestion.answer);

    if (optionIndex === correctIndex) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, optionIndex]);
    setTimeout(handleNext, 500);
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const startTest = () => {
    setShowConfirmation(false);
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  if (showConfirmation) {
    return (
      <div className="confirmation-container">
        <h2>📋 Mock Test Prerequisites</h2>
        <ul>
          <li>📌 20 questions will be shown.</li>
          <li>⏱️ Each question has a 30-second timer.</li>
          <li>✅ You must score at least 12 to pass.</li>
          <li>🚫 No going back to previous questions.</li>
        </ul>
        <button className="start-btn" onClick={startTest}>Start Test</button>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = score >= 12;
    
    return (
      <div className="result-container">
        <div className="result-header" style={{
          background: isPassed ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(90deg, #2d0066, #5a00b8)',
          padding: '40px 30px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {isPassed ? '🎉 Congratulations!' : '📝 Test Completed'}
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            flexWrap: 'wrap',
            marginTop: '25px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '25px 40px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              minWidth: '180px'
            }}>
              <div style={{ fontSize: '1rem', opacity: '0.9', marginBottom: '8px' }}>Your Score</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1' }}>
                {score}
                <span style={{ fontSize: '1.8rem', opacity: '0.8' }}> / {questions.length}</span>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '25px 40px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              minWidth: '180px'
            }}>
              <div style={{ fontSize: '1rem', opacity: '0.9', marginBottom: '8px' }}>Percentage</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1' }}>
                {percentage}
                <span style={{ fontSize: '1.8rem', opacity: '0.8' }}>%</span>
              </div>
            </div>
          </div>
          
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            fontSize: '1.3rem',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            {isPassed ? '✅ PASSED - Well Done!' : '❌ FAILED - Keep Practicing!'}
          </div>
          
          {!isPassed && (
            <p style={{ 
              marginTop: '15px', 
              fontSize: '1rem',
              opacity: '0.9'
            }}>
              You need {12 - score} more correct answer{12 - score !== 1 ? 's' : ''} to pass
            </p>
          )}
        </div>

        <div className="review-section">
          <h3>Review Your Answers</h3>
          {questions.map((q, idx) => {
            const userAnswerIndex = userAnswers[idx];
            const correctAnswerIndex = q.options.indexOf(q.answer);
            const isCorrect = userAnswerIndex === correctAnswerIndex;
            
            return (
              <div key={idx} className="review-question">
                <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {q.options.map((option, optIdx) => {
                    const isUserAnswer = optIdx === userAnswerIndex;
                    const isCorrectAnswer = optIdx === correctAnswerIndex;
                    
                    let className = 'review-option neutral';
                    if (isCorrectAnswer) {
                      className = 'review-option correct';
                    } else if (isUserAnswer && !isCorrect) {
                      className = 'review-option wrong';
                    }
                    
                    return (
                      <li key={optIdx} className={className}>
                        {option}
                        {isCorrectAnswer && <span className="tick"> ✔ Correct Answer</span>}
                        {isUserAnswer && !isCorrect && <span className="cross"> ❌ Your Wrong Answer</span>}
                        {isUserAnswer && isCorrect && <span className="tick"> ✔ Your Answer (Correct)</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const question = questions[currentQIndex];

  return (
    <div className="mocktest-container">
      <h2>Mock Test</h2>
      <div className="question-card">
        <div className="timer">⏳ Time Left: {timeLeft}s</div>
        <h3 className="question-text">Q{currentQIndex + 1}: {question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(index)}
            >
              <span className="option-circle"></span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTest;
