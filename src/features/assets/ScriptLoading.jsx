import { useState } from 'react';

function ScriptLoading() {
  const [loadedScripts, setLoadedScripts] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const scripts = [
    {
      id: 'analytics',
      name: 'Analytics Tracker',
      url: 'https://cdn.example.com/analytics.js',
      type: 'async',
      description: 'Loads independently, doesn\'t block page rendering',
      size: '45 KB'
    },
    {
      id: 'charts',
      name: 'Chart Library',
      url: 'https://cdn.example.com/charts.js',
      type: 'defer',
      description: 'Loads after DOM is ready, executes in order',
      size: '120 KB'
    },
    {
      id: 'widget',
      name: 'Chat Widget',
      url: 'https://cdn.example.com/chat-widget.js',
      type: 'async',
      description: 'Third-party widget, loads asynchronously',
      size: '80 KB'
    }
  ];

  const simulateScriptLoad = (scriptId) => {
    // Simulate loading delay
    const loadTime = Math.random() * 2000 + 1000; // 1-3 seconds

    setTimeout(() => {
      setLoadedScripts(prev => [...prev, scriptId]);
      
      // Simulate script execution
      if (scriptId === 'analytics') {
        setAnalytics({
          pageViews: 1,
          timeOnPage: '0:00',
          startTime: Date.now()
        });
        
        // Update time on page
        const interval = setInterval(() => {
          setAnalytics(prev => {
            if (!prev) return null;
            const elapsed = Math.floor((Date.now() - prev.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            return {
              ...prev,
              timeOnPage: `${minutes}:${seconds.toString().padStart(2, '0')}`
            };
          });
        }, 1000);
        
        return () => clearInterval(interval);
      }
    }, loadTime);
  };

  const isLoaded = (scriptId) => loadedScripts.includes(scriptId);
  const isLoading = (scriptId) => !loadedScripts.includes(scriptId) && loadedScripts.length > 0;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-4">External Scripts Manager</h4>

      {/* Scripts List */}
      <div className="space-y-3 mb-6">
        {scripts.map((script) => (
          <div
            key={script.id}
            className={`bg-white border-2 rounded-lg p-4 transition-all ${
              isLoaded(script.id)
                ? 'border-green-300'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h5 className="font-semibold text-gray-900">{script.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    script.type === 'async'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {script.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{script.size}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{script.description}</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block break-all">
                  {script.url}
                </code>
              </div>
              
              <div className="ml-4">
                {isLoaded(script.id) ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold">Loaded</span>
                  </div>
                ) : isLoading(script.id) ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-semibold">Loading...</span>
                  </div>
                ) : (
                  <button
                    onClick={() => simulateScriptLoad(script.id)}
                    className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Load Script
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Dashboard (appears when analytics script loads) */}
      {analytics && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>📊</span>
            Analytics Dashboard (Simulated)
          </h5>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.pageViews}</div>
              <div className="text-xs text-gray-600">Page Views</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.timeOnPage}</div>
              <div className="text-xs text-gray-600">Time on Page</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <div className="text-xs text-gray-600">Script Active</div>
            </div>
          </div>
        </div>
      )}

      {/* Code Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-gray-900 mb-2">Implementation:</h5>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`function ExternalScripts() {
  return (
    <>
      {/* Async - Loads independently */}
      <script 
        src="https://cdn.example.com/analytics.js"
        async
      />
      
      {/* Defer - Waits for DOM, executes in order */}
      <script 
        src="https://cdn.example.com/charts.js"
        defer
      />
      
      {/* Multiple async scripts */}
      <script src="https://cdn.example.com/widget.js" async />
      <script src="https://cdn.example.com/tracking.js" async />
    </>
  );
}`}
        </pre>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-3">Async vs Defer:</h5>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Attribute</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">When to Use</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Execution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2">
                  <code className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">async</code>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Scripts that don't depend on DOM or other scripts (analytics, ads)
                </td>
                <td className="px-3 py-2 text-gray-700">
                  As soon as downloaded, may execute before DOM is ready
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <code className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">defer</code>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Scripts that need full DOM or must execute in specific order
                </td>
                <td className="px-3 py-2 text-gray-700">
                  After DOM is ready, in document order
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-orange-50 border border-orange-200 rounded p-3 text-xs text-orange-800">
        <strong>⚡ Performance Tip:</strong> Use <code className="bg-orange-100 px-1 rounded">async</code> for 
        independent scripts like analytics. Use <code className="bg-orange-100 px-1 rounded">defer</code> for 
        scripts that need the DOM or have dependencies. Both prevent blocking the main thread!
      </div>
    </div>
  );
}

export default ScriptLoading;