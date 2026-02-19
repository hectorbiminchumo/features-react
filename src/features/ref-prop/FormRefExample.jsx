import { useRef, useState } from 'react';

// Form Input Component with ref as prop
function FormInput({ ref, label, required, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        ref={ref}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
}

function FormRefExample() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);
  
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!nameRef.current.value.trim()) {
      newErrors.name = 'Name is required';
      nameRef.current.focus();
      return newErrors;
    }
    
    if (!emailRef.current.value.trim()) {
      newErrors.email = 'Email is required';
      emailRef.current.focus();
      return newErrors;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRef.current.value)) {
      newErrors.email = 'Invalid email format';
      emailRef.current.focus();
      return newErrors;
    }
    
    if (!messageRef.current.value.trim()) {
      newErrors.message = 'Message is required';
      messageRef.current.focus();
      return newErrors;
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setFormData({
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      message: messageRef.current.value
    });
  };

  const handleFocusFirst = () => {
    nameRef.current?.focus();
  };

  const handleClearForm = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    messageRef.current.value = '';
    setFormData(null);
    setErrors({});
    nameRef.current.focus();
  };

  const handleFillSample = () => {
    nameRef.current.value = 'John Doe';
    emailRef.current.value = 'john.doe@example.com';
    phoneRef.current.value = '+1 (555) 123-4567';
    messageRef.current.value = 'This is a sample message for testing the form functionality.';
  };

  const handleFocusError = () => {
    if (errors.name) {
      nameRef.current?.focus();
    } else if (errors.email) {
      emailRef.current?.focus();
    } else if (errors.message) {
      messageRef.current?.focus();
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-4">Contact Form</h5>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              ref={nameRef}
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <p className="text-xs text-red-600 -mt-2">{errors.name}</p>
            )}

            <FormInput
              ref={emailRef}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-600 -mt-2">{errors.email}</p>
            )}

            <FormInput
              ref={phoneRef}
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone (optional)"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                ref={messageRef}
                rows="4"
                placeholder="Enter your message"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-600 mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Submit Form
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Helper Buttons */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-xs text-gray-600 mb-2 font-semibold">
              Ref Actions:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleFocusFirst}
                className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
              >
                Focus First Field
              </button>
              <button
                onClick={handleFillSample}
                className="text-xs bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600"
              >
                Fill Sample Data
              </button>
              {Object.keys(errors).length > 0 && (
                <button
                  onClick={handleFocusError}
                  className="text-xs bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
                >
                  Focus Error Field
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Submitted Data */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-4">Form Data</h5>
          
          {formData ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Name:</p>
                  <p className="font-semibold text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email:</p>
                  <p className="font-semibold text-gray-900">{formData.email}</p>
                </div>
                {formData.phone && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Phone:</p>
                    <p className="font-semibold text-gray-900">{formData.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Message:</p>
                  <p className="text-gray-900 text-sm bg-gray-50 p-2 rounded">
                    {formData.message}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
                  ✓ Form submitted successfully!
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-64">
              <p className="text-gray-500 text-center">
                No form data yet.<br />
                <span className="text-sm">Fill out and submit the form to see the data here.</span>
              </p>
            </div>
          )}

          {/* Code Example */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
            <h6 className="font-semibold text-gray-900 mb-2 text-sm">Key Code:</h6>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`// Create refs
const nameRef = useRef(null);
const emailRef = useRef(null);

// Use refs to validate and access values
const validateForm = () => {
  if (!nameRef.current.value.trim()) {
    nameRef.current.focus();
    return false;
  }
  return true;
};

// Clear form using refs
const clearForm = () => {
  nameRef.current.value = '';
  emailRef.current.value = '';
  nameRef.current.focus();
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded p-3 text-xs text-purple-800">
        <strong>💡 Form Management with Refs:</strong> This example shows how refs can 
        be used for form validation, focus management, and programmatic value updates. 
        Notice how we can control multiple inputs from the parent component without 
        any state lifting!
      </div>
    </div>
  );
}

export default FormRefExample;