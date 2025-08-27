import React, { useState, useEffect } from 'react';

// Types for widget configuration
export interface WidgetConfig {
  type: 'counter' | 'timer' | 'progress' | 'stats';
  title: string;
  initialValue?: number;
  duration?: number;
  progress?: number;
  max?: number;
  data?: Record<string, number>;
}

// Individual widget components
const CounterWidget: React.FC<{ title: string; initialValue?: number }> = ({ title, initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            -
          </button>
          <button
            onClick={() => setCount(initialValue)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const TimerWidget: React.FC<{ title: string; duration?: number }> = ({ title, duration = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="text-center">
        <div className="text-4xl font-mono font-bold text-purple-600 mb-4">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-2 justify-center">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgressWidget: React.FC<{ title: string; progress?: number; max?: number }> = ({ title, progress = 0, max = 100 }) => {
  const percentage = Math.round((progress / max) * 100);
  const [currentProgress, setCurrentProgress] = useState(progress);

  const updateProgress = (newProgress: number) => {
    setCurrentProgress(Math.max(0, Math.min(max, newProgress)));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{currentProgress}</div>
          <div className="text-sm text-gray-500">out of {max}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(currentProgress / max) * 100}%` }}
          ></div>
        </div>
        <div className="text-center text-sm text-gray-600">{percentage}%</div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => updateProgress(currentProgress - 10)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
          >
            -10
          </button>
          <button
            onClick={() => updateProgress(currentProgress + 10)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
          >
            +10
          </button>
        </div>
      </div>
    </div>
  );
};

const StatsWidget: React.FC<{ title: string; data?: Record<string, number> }> = ({ title, data = {} }) => {
  const stats = Object.entries(data);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 gap-4">
        {stats.map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </span>
            <span className="text-2xl font-bold text-indigo-600">{value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Factory function that creates the appropriate widget component
export const createWidget = (config: WidgetConfig, key: number): React.ReactElement => {
  const { type, ...props } = config;
  
  switch (type) {
    case 'counter':
      return <CounterWidget key={key} {...props} />;
    case 'timer':
      return <TimerWidget key={key} {...props} />;
    case 'progress':
      return <ProgressWidget key={key} {...props} />;
    case 'stats':
      return <StatsWidget key={key} {...props} />;
    default:
      return <CounterWidget key={key} {...props} />;
  }
};

