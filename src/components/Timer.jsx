import { useEffect, useState } from 'react';

const Timer = ({ duration = 30, onTimeUp, isActive, resetTrigger }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    setSecondsLeft(duration);
  }, [resetTrigger, duration]);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          onTimeUp(); // Notify parent
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, secondsLeft, onTimeUp]);

  return (
    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
      Time Left: {secondsLeft}s
    </div>
  );
};

export default Timer;
