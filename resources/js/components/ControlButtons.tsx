interface ControlButtonsProps {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

const ControlButtons = ({ isRunning, setIsRunning }: ControlButtonsProps) => {
  return (
    <div className="text-center mt-24" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
      {isRunning ? (
        <button className="secondary outline" onClick={() => setIsRunning(false)} style={{ width: '200px' }}>Stop</button>
      ) : (
        <button onClick={() => setIsRunning(true)} style={{ width: '200px' }}>Start</button>
      )}
    </div>
  );
};

export default ControlButtons;
