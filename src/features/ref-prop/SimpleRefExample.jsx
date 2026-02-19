import { useRef, useState } from 'react';

// Custom Button - ref as prop (no forwardRef needed!)
function CustomButton({ ref, children, variant = 'primary', ...props }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-all';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Custom Input - ref as prop (no forwardRef needed!)
function CustomInput({ ref, label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary'
        }`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

function SimpleRefExample() {
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const [buttonText, setButtonText] = useState('Click Me!');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      addLog('Input focused');
    }
  };

  const handleSelectText = () => {
    if (inputRef.current) {
      inputRef.current.select();
      addLog('Input text selected');
    }
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      addLog('Input cleared');
    }
  };

  const handleChangeButtonText = () => {
    if (buttonRef.current) {
      buttonRef.current.textContent = 'Text Changed!';
      setButtonText('Text Changed!');
      addLog('Button text changed via ref');
      
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.textContent = 'Click Me!';
          setButtonText('Click Me!');
        }
      }, 2000);
    }
  };

  const handleDisableButton = () => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      addLog('Button disabled');
      
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
          addLog('Button enabled');
        }
      }, 2000);
    }
  };

  const handleScrollIntoView = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      addLog('Scrolled to button');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Components */}
        <div className="space-y-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Custom Input Component</h5>
            <CustomInput
              ref={inputRef}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              defaultValue="user@example.com"
            />
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={handleFocusInput}
                className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
              >
                Focus Input
              </button>
              <button
                onClick={handleSelectText}
                className="text-sm bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600"
              >
                Select Text
              </button>
              <button
                onClick={handleClearInput}
                className="text-sm bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
              >
                Clear Input
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Custom Button Component</h5>
            <div className="mb-4">
              <CustomButton ref={buttonRef}>
                {buttonText}
              </CustomButton>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={handleChangeButtonText}
                className="text-sm bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600"
              >
                Change Text
              </button>
              <button
                onClick={handleDisableButton}
                className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded hover:bg-orange-600"
              >
                Disable 2s
              </button>
              <button
                onClick={handleScrollIntoView}
                className="text-sm bg-indigo-500 text-white px-3 py-1.5 rounded hover:bg-indigo-600"
              >
                Scroll to View
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Logs */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-3">Action Logs</h5>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <p className="text-gray-500">No actions yet. Try the buttons above!</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-2 text-xs bg-gray-700 text-white px-3 py-1.5 rounded hover:bg-gray-600 w-full"
          >
            Clear Logs
          </button>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-2">Component Code:</h5>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`// No forwardRef needed! Just use ref as a prop
function CustomInput({ ref, label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}

function CustomButton({ ref, children, ...props }) {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
}

// Usage
function Parent() {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  
  return (
    <>
      <CustomInput ref={inputRef} />
      <CustomButton ref={buttonRef}>Click</CustomButton>
      
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </>
  );
}`}
        </pre>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded p-3 text-xs text-indigo-800">
        <strong>🎯 Notice:</strong> Both CustomInput and CustomButton accept refs directly 
        without using <code className="bg-indigo-100 px-1 rounded">forwardRef</code>. 
        This is the new React 19.2 feature - refs are now just regular props!
      </div>
    </div>
  );
}

export default SimpleRefExample;