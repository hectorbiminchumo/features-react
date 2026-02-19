import { useActionState } from 'react';
import { XMarkIcon, ShoppingCartIcon } from '../../components/Icons';

function ShoppingCart({ cart, onClose, onRemove, onUpdateQuantity, total }) {
  // Checkout action
  async function checkoutAction(prevState, formData) {
    // Simulate checkout API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: 'Order placed successfully! (Demo mode)',
      orderId: `ORD-${Date.now()}`
    };
  }

  const [checkoutState, checkoutFormAction, isCheckingOut] = useActionState(
    checkoutAction,
    { success: false, message: '', orderId: null }
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-md shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingCartIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCartIcon className="w-16 h-16 mb-4" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ${item.price.toFixed(2)} each
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="font-bold text-2xl text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Form using Actions */}
            <form action={checkoutFormAction}>
              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </form>

            {/* Checkout Status */}
            {checkoutState.message && (
              <div className={`text-sm p-3 rounded ${
                checkoutState.success
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {checkoutState.message}
                {checkoutState.orderId && (
                  <p className="mt-1 font-mono text-xs">
                    Order ID: {checkoutState.orderId}
                  </p>
                )}
              </div>
            )}

            {/* Demo Note */}
            <p className="text-xs text-gray-500 text-center">
              This is a demo. No actual checkout will occur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;