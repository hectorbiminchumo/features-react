import { useActionState } from 'react';
import { CheckIcon, XMarkIcon } from '../../components/Icons';

function ContactForm() {
  // Contact form action with validation
  async function submitContactAction(prevState, formData) {
    // Get form data
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const subject = formData.get('subject')?.trim();
    const message = formData.get('message')?.trim();
    const subscribe = formData.get('subscribe') === 'on';

    // Validation
    const errors = {};

    if (!name || name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email || !email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }

    if (!subject || subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!message || message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        message: 'Please fix the errors below'
      };
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Server error. Please try again.');
      }

      // Success response
      return {
        success: true,
        errors: {},
        message: 'Thank you for contacting us! We will respond within 24 hours.',
        data: {
          name,
          email,
          subject,
          subscribe,
          ticketId: `TICKET-${Date.now()}`
        }
      };
    } catch (error) {
      return {
        success: false,
        errors: {},
        message: error.message || 'Failed to submit form. Please try again.'
      };
    }
  }

  // useActionState hook
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    { 
      success: false, 
      errors: {}, 
      message: '',
      data: null 
    }
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          Customer Support Contact Form
        </h3>
        <p className="text-green-100 text-sm">
          Another example of useActionState with form validation
        </p>
      </div>

      <div className="p-6">
        {/* Success Message */}
        {state.success && state.data && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-green-800 mb-2">
                  {state.message}
                </p>
                <div className="bg-white border border-green-200 rounded p-3 text-xs space-y-1">
                  <p><strong>Name:</strong> {state.data.name}</p>
                  <p><strong>Email:</strong> {state.data.email}</p>
                  <p><strong>Ticket ID:</strong> <code className="bg-green-100 px-1 rounded">{state.data.ticketId}</code></p>
                  {state.data.subscribe && (
                    <p className="text-green-700">✓ Subscribed to newsletter</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message (General) */}
        {!state.success && state.message && Object.keys(state.errors).length === 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <XMarkIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-1">
                  Submission Failed
                </h4>
                <p className="text-sm text-red-800">
                  {state.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Validation Errors Summary */}
        {state.errors && Object.keys(state.errors).length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              Please fix the following errors:
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              {Object.values(state.errors).map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Form */}
        <form action={formAction} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              disabled={isPending}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                state.errors?.name 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="John Doe"
            />
            {state.errors?.name && (
              <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={isPending}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                state.errors?.email 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="john@example.com"
            />
            {state.errors?.email && (
              <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              disabled={isPending}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                state.errors?.subject 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Order inquiry"
            />
            {state.errors?.subject && (
              <p className="mt-1 text-xs text-red-600">{state.errors.subject}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              disabled={isPending}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                state.errors?.message 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="How can we help you?"
            />
            {state.errors?.message && (
              <p className="mt-1 text-xs text-red-600">{state.errors.message}</p>
            )}
          </div>

          {/* Subscribe Checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              disabled={isPending}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary disabled:cursor-not-allowed"
            />
            <label htmlFor="subscribe" className="text-sm text-gray-700">
              Subscribe to our newsletter for updates and special offers
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Contact Form</span>
            )}
          </button>

          {/* Pending State Info */}
          {isPending && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                <span>Processing your request. Please wait...</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactForm;