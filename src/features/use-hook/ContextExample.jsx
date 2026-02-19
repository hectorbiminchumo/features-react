import { use, createContext, useState } from 'react';

// Create contexts
const ThemeContext = createContext();
const UserContext = createContext();

// Component using use() to read context
function ProfileCard({ showDetails }) {
  // Reading theme context
  const theme = use(ThemeContext);
  
  // Conditional context reading - only possible with use()!
  let user = null;
  if (showDetails) {
    user = use(UserContext);
  }

  return (
    <div className={`rounded-lg p-4 border-2 ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <h4 className="font-semibold mb-2">User Profile</h4>
      
      {showDetails && user ? (
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-sm">
            <strong>Role:</strong> {user.role}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-300">
            <p className="text-xs opacity-75">
              Current theme: <strong>{theme}</strong>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm opacity-75">
          Enable "Show Details" to view user information
        </p>
      )}
    </div>
  );
}

function ContextExample() {
  const [theme, setTheme] = useState('light');
  const [showDetails, setShowDetails] = useState(true);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Premium Customer'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Toggle Theme ({theme})
        </button>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={user}>
          <ProfileCard showDetails={showDetails} />
        </UserContext.Provider>
      </ThemeContext.Provider>

      {/* Explanation */}
      <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded p-3">
        <p className="text-xs text-indigo-900 font-semibold mb-1">
          🎯 Context with use()
        </p>
        <p className="text-xs text-indigo-800 mb-2">
          The <code className="bg-indigo-100 px-1 rounded">use()</code> hook can read Context 
          values conditionally, unlike <code className="bg-indigo-100 px-1 rounded">useContext</code>.
        </p>
        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`function ProfileCard({ showDetails }) {
  // Always read theme
  const theme = use(ThemeContext);
  
  // Conditionally read user - NOT possible with useContext!
  let user = null;
  if (showDetails) {
    user = use(UserContext);
  }
  
  return <div>...</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default ContextExample;