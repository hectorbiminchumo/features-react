import { useState } from 'react';
import FeatureCard from '../../components/FeatureCard';
import { CursorArrowRaysIcon } from '../../components/Icons';
import SimpleRefExample from './SimpleRefExample';
import FormRefExample from './FormRefExample';
import CustomInputExample from './CustomInputExample';

function RefPropDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="ref as Prop"
        description="Pass refs directly as props without forwardRef wrapper"
        icon={CursorArrowRaysIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-2">
              What is ref as Prop in React 19.2?
            </h3>
            <div className="text-sm text-indigo-800 space-y-2">
              <p>
                React 19.2 allows you to pass <code className="bg-indigo-100 px-1 rounded">ref</code> directly 
                as a prop to functional components without wrapping them 
                in <code className="bg-indigo-100 px-1 rounded">forwardRef</code>.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Simpler component API</li>
                <li>No forwardRef wrapper needed</li>
                <li>Better TypeScript support</li>
                <li>Cleaner, more intuitive code</li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Old Way (forwardRef)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return (
    <input 
      ref={ref}
      {...props}
    />
  );
});

// Usage
<Input ref={inputRef} />`}
              </pre>
              <p className="text-xs text-red-700 mt-2">
                Extra wrapper, more complex
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ New Way (React 19.2)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`function Input({ ref, ...props }) {
  return (
    <input 
      ref={ref}
      {...props}
    />
  );
}

// Usage
<Input ref={inputRef} />`}
              </pre>
              <p className="text-xs text-green-700 mt-2">
                Direct, simple, intuitive
              </p>
            </div>
          </div>

          {/* Demo 1: Simple Ref Example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Basic ref as Prop
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              A simple example showing how to pass refs directly to custom components. 
              Click the buttons to see ref methods in action.
            </p>
            <SimpleRefExample />
          </div>

          {/* Demo 2: Form Refs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: Form with Multiple Refs
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              A practical example with a form that uses refs to control multiple inputs. 
              Shows how parent components can interact with child inputs.
            </p>
            <FormRefExample />
          </div>

          {/* Demo 3: Custom Input Components */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 3: Custom Styled Input Components
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Complex custom input components that accept refs without forwardRef. 
              Demonstrates real-world usage with styled components.
            </p>
            <CustomInputExample />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Examples:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`// 1. Basic Custom Input
function CustomInput({ ref, label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}

// Usage
function Parent() {
  const inputRef = useRef(null);
  
  return (
    <>
      <CustomInput ref={inputRef} label="Name" />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </>
  );
}

// 2. Custom Button with Ripple Effect
function RippleButton({ ref, children, onClick, ...props }) {
  const handleClick = (e) => {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ref.current.appendChild(ripple);
    
    onClick?.(e);
    
    setTimeout(() => ripple.remove(), 600);
  };
  
  return (
    <button ref={ref} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

// 3. Textarea with Auto-resize
function AutoResizeTextarea({ ref, ...props }) {
  const handleInput = () => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };
  
  return (
    <textarea
      ref={ref}
      onInput={handleInput}
      {...props}
    />
  );
}

// 4. Video Player Component
function VideoPlayer({ ref, src, ...props }) {
  return (
    <video ref={ref} src={src} {...props} />
  );
}

// Usage with controls
function App() {
  const videoRef = useRef(null);
  
  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();
  const reset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };
  
  return (
    <>
      <VideoPlayer ref={videoRef} src="/video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

// 5. Custom Select with Search
function SearchableSelect({ ref, options, ...props }) {
  return (
    <div className="custom-select">
      <input
        ref={ref}
        type="text"
        placeholder="Search..."
        {...props}
      />
      <div className="options">
        {options.map(opt => (
          <div key={opt.value}>{opt.label}</div>
        ))}
      </div>
    </div>
  );
}

// 6. Canvas Component
function DrawingCanvas({ ref, width, height }) {
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
    />
  );
}

// Usage
function DrawingApp() {
  const canvasRef = useRef(null);
  
  const clear = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
    }
  };
  
  return (
    <>
      <DrawingCanvas ref={canvasRef} width={800} height={600} />
      <button onClick={clear}>Clear Canvas</button>
    </>
  );
}

// 7. NO MORE forwardRef NEEDED!
// Before React 19.2
const OldInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// After React 19.2 - Much simpler!
function NewInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}`}
            </pre>
          </div>

          {/* Ref Methods Reference */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              Common Ref Methods & Properties:
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Input/Textarea:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-100 px-1 rounded text-xs">focus()</code> - Focus the element</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">blur()</code> - Remove focus</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">select()</code> - Select text</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">value</code> - Get/set value</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">setSelectionRange()</code> - Select portion</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Media (Video/Audio):</h5>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-100 px-1 rounded text-xs">play()</code> - Start playback</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">pause()</code> - Pause playback</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">currentTime</code> - Get/set position</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">volume</code> - Get/set volume</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">muted</code> - Get/set mute</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Canvas:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-100 px-1 rounded text-xs">getContext()</code> - Get drawing context</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">toDataURL()</code> - Export as image</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">width/height</code> - Dimensions</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">General DOM:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-100 px-1 rounded text-xs">scrollIntoView()</code> - Scroll to element</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">getBoundingClientRect()</code> - Get position</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">classList</code> - Manipulate classes</li>
                  <li><code className="bg-gray-100 px-1 rounded text-xs">style</code> - Inline styles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Simpler API - no forwardRef wrapper</li>
                <li>• Better TypeScript support</li>
                <li>• More intuitive for beginners</li>
                <li>• Cleaner component code</li>
                <li>• Consistent with other props</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-900 mb-2">🎯 Use Cases</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Custom form inputs</li>
                <li>• Media player controls</li>
                <li>• Canvas/drawing components</li>
                <li>• Focus management</li>
                <li>• Scroll control</li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• <code className="bg-yellow-100 px-1 rounded">ref</code> is now a regular prop, not a special case</li>
              <li>• You can destructure it like any other prop</li>
              <li>• Still use <code className="bg-yellow-100 px-1 rounded">useRef()</code> to create refs</li>
              <li>• Refs don't trigger re-renders when changed</li>
              <li>• Always check <code className="bg-yellow-100 px-1 rounded">ref.current</code> exists before using</li>
              <li>• <code className="bg-yellow-100 px-1 rounded">forwardRef</code> still works for backward compatibility</li>
            </ul>
          </div>

          {/* Migration Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              🔄 Migration from forwardRef
            </h4>
            <div className="text-sm text-blue-800 space-y-3">
              <div>
                <p className="font-semibold mb-1">Before:</p>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`const MyComponent = forwardRef((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});`}
                </pre>
              </div>
              
              <div>
                <p className="font-semibold mb-1">After:</p>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`function MyComponent({ ref, children }) {
  return <div ref={ref}>{children}</div>;
}`}
                </pre>
              </div>
              
              <p className="text-xs mt-2">
                Simply remove the <code className="bg-blue-100 px-1 rounded">forwardRef</code> wrapper 
                and treat <code className="bg-blue-100 px-1 rounded">ref</code> as a normal prop!
              </p>
            </div>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default RefPropDemo;