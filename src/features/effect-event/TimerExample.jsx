import { useState, useEffect, useEffectEvent, useRef } from 'react';

// ============================================
// Approach 1: BROKEN - stale closure / restarts
// ============================================
function BrokenTimer() {
  const [userName, setUserName] = useState('Alice');
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const restartCount = useRef(0);

  useEffect(() => {
    restartCount.current += 1;
    setSeconds(0); // Timer resets!

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
      setMessage(`${userName} has been logged in for`);
    }, 1000);

    return () => clearInterval(interval);
  }, [userName]); // ← restarts every time userName changes

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="bg-white border rounded-lg p-3">
        <p className="text-sm">
          {message || `${userName} has been logged in for`}{' '}
          <span className="font-bold text-red-600">{seconds}s</span>
        </p>
        <p className="text-xs text-red-500 mt-1">
          ⚠️ Timer restarted <span className="font-bold">{restartCount.current}</span> times
          {restartCount.current > 1 && ' — resets every keystroke!'}
        </p>
      </div>
    </div>
  );
}


// ============================================
// Approach 2: useEffectEvent (clean solution)
// ============================================
function EffectEventTimer() {
  const [userName, setUserName] = useState('Alice');
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');

  // Effect Event: always reads latest userName
  const onTick = useEffectEvent(() => {
    setSeconds(prev => prev + 1);
    setMessage(`${userName} has been logged in for`);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(interval);
  }, []); // stable! no restarts, no refs

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="bg-white border rounded-lg p-3">
        <p className="text-sm">
          {message || `${userName} has been logged in for`}{' '}
          <span className="font-bold text-green-600">{seconds}s</span>
        </p>
        <p className="text-xs text-green-600 mt-1">
          ✅ Timer never restarts — always reads latest username automatically
        </p>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
function TimerExample() {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-gray-200">
        {/* Broken */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">1</span>
            <h5 className="font-semibold text-sm text-red-800">❌ Dependency Array</h5>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            userName in deps → timer restarts on every keystroke
          </p>
          <BrokenTimer />
        </div>

       

        {/* useEffectEvent */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</span>
            <h5 className="font-semibold text-sm text-green-800">✅ useEffectEvent</h5>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Clean, stable, always reads latest values
          </p>
          <EffectEventTimer />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-t border-blue-200 px-4 py-3 text-xs text-blue-800">
        <strong>⚡ Try this:</strong> Type in all three inputs simultaneously. Notice how:
        <strong> Column 1</strong> resets its timer on every keystroke,
        <strong> Column 2</strong> just works cleanly with useEffectEvent.
      </div>
    </div>
  );
}

export default TimerExample;