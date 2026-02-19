import FeatureCard from '../../components/FeatureCard';
import ContactForm from './ContactForm';
import { BoltIcon, ShoppingCartIcon } from '../../components/Icons';
import ProductCard from './ProductCard';
import ShoppingCart from './ShoppingCart';
import { mockProducts } from '../../data/mockProducts';
import { useState } from 'react';

function ActionsDemo() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Add product to cart
  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8">
      <FeatureCard
        title="Actions & useActionState"
        description="Handle form submissions and async operations with automatic state management"
        icon={BoltIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              What are Actions?
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Actions</strong> are a new way to handle async operations in React 19. 
                The <code className="bg-blue-100 px-1 rounded">useActionState</code> hook provides:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Automatic pending state management</li>
                <li>Built-in error handling</li>
                <li>Access to form data automatically</li>
                <li>Progressive enhancement support</li>
              </ul>
            </div>
          </div>

          {/* Demo Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo: E-commerce Shopping Cart
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This demo shows how to use Actions for adding products to a cart. 
              Notice the automatic pending states and error handling without manual state management.
            </p>
          </div>

          {/* Cart Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowCart(!showCart)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors relative"
            >
              <ShoppingCartIcon className="w-2 h-2" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Shopping Cart Sidebar */}
          {showCart && (
            <ShoppingCart
              cart={cart}
              onClose={() => setShowCart(false)}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              total={cartTotal}
            />
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          {/* Additional Form Example */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Form Validation Example
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Here's a more complex example showing form validation, multiple field types,
              and comprehensive error handling using useActionState.
            </p>
            <ContactForm />
          </div>
          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Example:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`import { useActionState } from 'react';

function AddToCartForm({ product }) {
  // Action function
  async function addToCartAction(prevState, formData) {
    const quantity = parseInt(formData.get('quantity'));
    
    try {
      // Simulate API call
      await api.addToCart(product.id, quantity);
      return { 
        success: true, 
        message: 'Added to cart!' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  }

  // useActionState provides state, action, and isPending
  const [state, formAction, isPending] = useActionState(
    addToCartAction,
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input type="number" name="quantity" defaultValue={1} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`}
            </pre>
          </div>
          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Example:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`// How the form action works:
async function submitContactAction(prevState, formData) {
  // 1. Extract form data
  const name = formData.get('name')?.trim();
  const email = formData.get('email')?.trim();
  
  // 2. Validate inputs
  const errors = {};
  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // 3. Return validation errors immediately
  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: 'Fix errors' };
  }
  
  // 4. Make API call
  try {
    await api.submitContact(name, email);
    return { 
      success: true, 
      message: 'Thank you!',
      data: { name, email, ticketId: 'TICKET-123' }
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message 
    };
  }
}

// 5. Use the hook
const [state, formAction, isPending] = useActionState(
  submitContactAction,
  { success: false, errors: {}, message: '', data: null }
);`}
            </pre>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• No manual loading state management</li>
                <li>• Built-in error handling</li>
                <li>• Works without JavaScript (progressive enhancement)</li>
                <li>• Cleaner, more declarative code</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Use Cases</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Form submissions</li>
                <li>• Shopping cart operations</li>
                <li>• Comment posting</li>
                <li>• Any async user action</li>
              </ul>
            </div>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default ActionsDemo;