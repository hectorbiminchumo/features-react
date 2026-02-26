import FeatureCard from '../../components/FeatureCard';
import { SignalIcon } from '../../components/Icons';
import TimerExample from './TimerExample';
import NotificationExample from './NotificationExample';

function EffectEventDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="useEffectEvent"
        description="Separate non-reactive logic from Effects"
        icon={SignalIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <h3 className="font-semibold text-teal-900 mb-2">
              What is useEffectEvent in React 19.2?
            </h3>
            <div className="text-sm text-teal-800 space-y-2">
              <p>
                <code className="bg-teal-100 px-1 rounded">useEffectEvent</code> lets you extract 
                non-reactive logic from your Effects into "Effect Events." These functions always read 
                the <strong>latest</strong> props and state without causing the Effect to re-run.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Solves the <strong>stale closure</strong> problem</li>
                <li>No more unnecessary Effect re-runs</li>
                <li>Replaces the manual <code className="bg-teal-100 px-1 rounded">useRef</code> workaround pattern</li>
                <li>Cleaner separation of reactive vs non-reactive logic</li>
                <li>Linter-aware: ESLint plugin v6 understands Effect Events</li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Old Way (broken or hacky)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// Problem: timer resets every time
// userName changes!
const [userName, setUserName] = useState('Bob');

useEffect(() => {
  const interval = setInterval(() => {
    // userName is stale or causes 
    // the entire effect to restart
    console.log(userName + ' is online');
  }, 1000);
  return () => clearInterval(interval);
}, [userName]); // ← restarts timer!

// Workaround with useRef (clunky)
const userNameRef = useRef(userName);
userNameRef.current = userName;

useEffect(() => {
  const interval = setInterval(() => {
    console.log(userNameRef.current);
  }, 1000);
  return () => clearInterval(interval);
}, []); // works, but ugly`}
              </pre>
              <p className="text-xs text-red-700 mt-2">
                Timer restarts on every change, or needs manual ref sync
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ New Way (useEffectEvent)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`import { useEffectEvent } from 'react';

const [userName, setUserName] = useState('Bob');

// Effect Event: always reads latest
// userName, never triggers re-run
const onTick = useEffectEvent(() => {
  console.log(userName + ' is online');
});

useEffect(() => {
  const interval = setInterval(() => {
    onTick(); // always has latest value
  }, 1000);
  return () => clearInterval(interval);
}, []); // ← stable! never restarts

// Clean, correct, linter-happy ✅`}
              </pre>
              <p className="text-xs text-green-700 mt-2">
                Timer stays stable, always reads latest values
              </p>
            </div>
          </div>

          {/* Demo 1 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Login Timer (Stale Closure Problem)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              A timer shows how long a user has been logged in. Change the username and 
              see how each approach handles it differently.
            </p>
            <TimerExample />
          </div>

          {/* Demo 2 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: Product Notification System
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              A WebSocket-like connection that sends notifications. The notification style 
              changes based on user preference — without reconnecting.
            </p>
            <NotificationExample />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Examples:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`import { useEffect, useEffectEvent } from 'react';

// 1. Timer that reads latest state
function LoginTimer({ userName }) {
  const onTick = useEffectEvent(() => {
    // Always reads latest userName
    showNotification(userName + ' is online');
  });

  useEffect(() => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
  }, []); // No userName dependency needed!
}

// 2. Connection with non-reactive config
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    // Reads latest theme without reconnecting
    showToast('Connected!', { theme });
  });

  useEffect(() => {
    const conn = createConnection(roomId);
    conn.on('connected', () => onConnected());
    conn.connect();
    return () => conn.disconnect();
  }, [roomId]); // Only reconnects when roomId changes
}

// 3. Analytics with latest cart state
function ProductPage({ productId, cart }) {
  const onVisit = useEffectEvent(() => {
    // Reads latest cart without re-logging
    logAnalytics(productId, cart.items.length);
  });

  useEffect(() => {
    onVisit();
  }, [productId]); // Only logs on page change
}`}
            </pre>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Effect Events can <strong>only</strong> be called from inside Effects — not during render</li>
              <li>• Do <strong>not</strong> pass Effect Events to child components or other hooks</li>
              <li>• Don't use to hide legitimate dependencies — only for truly non-reactive logic</li>
              <li>• Effect Events don't have a stable identity (they change every render)</li>
              <li>• Requires <code className="bg-yellow-100 px-1 rounded">eslint-plugin-react-hooks</code> v6+ for proper linting</li>
              <li>• Think of it as: "I need the latest value, but it's not a reason to re-run"</li>
            </ul>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default EffectEventDemo;