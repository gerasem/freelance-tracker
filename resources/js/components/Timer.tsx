import { useEffect, useState } from 'preact/hooks';

interface TimerProps {
  isRunning: boolean;
  onStop: (seconds: number) => void;
}

export default function Timer({ isRunning, onStop }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (seconds > 0) {
        onStop(seconds);
        setSeconds(0);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds, onStop]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  };

  return (
    <div className="text-center mt-24">
      <h2 className="monospace" style={{ fontSize: '4rem', margin: '2rem 0' }}>
        {formatTime(seconds)}
      </h2>
    </div>
  );
}