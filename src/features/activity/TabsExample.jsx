import { Activity, useState, useEffect, useRef } from 'react';

// Cart Tab - has form inputs and counter state
function CartTab() {
  const [items, setItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, qty: 1 },
    { id: 2, name: 'Smart Watch', price: 199.99, qty: 2 },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [notes, setNotes] = useState('');

  const updateQty = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(0, item.qty + delta) }
          : item
      ).filter(item => item.qty > 0)
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800">🛒 Shopping Cart</h4>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Cart is empty</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-7 h-7 rounded bg-gray-200 text-white flex flex-col justify-center items-center hover:bg-gray-300 text-sm font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold text-sm">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-7 h-7 rounded bg-primary text-white flex flex-col justify-center items-center hover:bg-blue-600 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-3">
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Promo Code</label>
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code..."
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Order Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Special instructions..."
          rows={2}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-700">
        💡 Try typing a promo code and notes, switch tabs, then come back — your text is preserved!
      </div>
    </div>
  );
}

// Reviews Tab - has rating state and a timer
function ReviewsTab() {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Alice', rating: 5, text: 'Amazing product!', helpful: 12 },
    { id: 2, user: 'Bob', rating: 4, text: 'Good value for money', helpful: 8 },
    { id: 3, user: 'Carol', rating: 3, text: 'Decent, could be better', helpful: 3 },
  ]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [sortBy, setSortBy] = useState('helpful');
  const [timeOnTab, setTimeOnTab] = useState(0);

  // Timer that runs while tab is visible (Activity cleans up effects when hidden)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnTab(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const markHelpful = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, helpful: r.helpful + 1 } : r)
    );
  };

  const addReview = () => {
    if (!newReview.trim() || newRating === 0) return;
    setReviews(prev => [
      { id: Date.now(), user: 'You', rating: newRating, text: newReview, helpful: 0 },
      ...prev,
    ]);
    setNewReview('');
    setNewRating(0);
  };

  const sorted = [...reviews].sort((a, b) =>
    sortBy === 'helpful' ? b.helpful - a.helpful : b.rating - a.rating
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-800">⭐ Reviews ({reviews.length})</h4>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          ⏱ Time on tab: {timeOnTab}s
        </span>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded p-2 text-xs text-amber-700">
        💡 The timer <strong>pauses</strong> when you switch tabs (Activity cleans up the effect) and <strong>resumes</strong> when you come back. The count is preserved!
      </div>

      {/* Sort */}
      <div className="flex gap-2">
        <button
          onClick={() => setSortBy('helpful')}
          className={`px-3 py-1 rounded text-xs font-medium ${
            sortBy === 'helpful' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Most Helpful
        </button>
        <button
          onClick={() => setSortBy('rating')}
          className={`px-3 py-1 rounded text-xs font-medium ${
            sortBy === 'rating' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Highest Rating
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {sorted.map(review => (
          <div key={review.id} className="bg-white p-3 rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{review.user}</span>
                <span className="text-yellow-500 text-xs">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              <button
                onClick={() => markHelpful(review.id)}
                className="text-xs text-gray-500 hover:text-primary"
              >
                👍 {review.helpful}
              </button>
            </div>
            <p className="text-sm text-gray-600">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Add Review */}
      <div className="border-t pt-3 space-y-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setNewRating(star)}
              className={`text-lg ${star <= newRating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={addReview}
            disabled={!newReview.trim() || newRating === 0}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// Settings Tab - has toggles and selections
function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [fontSize, setFontSize] = useState(14);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800">⚙️ Settings</h4>

      <div className="space-y-3">
        {/* Toggle: Notifications */}
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
          <span className="text-sm">Push Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-10 h-8 flex flex-col justify-center items-center rounded-full transition-colors ${
              notifications ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`block w-4 h-4 flex flex-col justify-center items-center rounded-full transition-transform mx-1 ${
                notifications ? 'bg-green-300 translate-x-2' : 'bg-gray-400 translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle: Dark Mode */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <span className="text-sm">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-8 rounded-full flex flex-col justify-center items-center transition-colors ${
              darkMode ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full transition-transform mx-1 ${
                darkMode ? 'bg-green-300 translate-x-2' : 'bg-gray-400 translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Select: Language */}
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
          <span className="text-sm">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        {/* Select: Currency */}
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
          <span className="text-sm">Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="PEN">S/ PEN</option>
          </select>
        </div>

        {/* Slider: Font Size */}
        <div className="bg-white p-3 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Font Size</span>
            <span className="text-xs text-gray-500">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-gray-500"
          />
          <p className="mt-2 text-gray-600" style={{ fontSize: `${fontSize}px` }}>
            Preview text at {fontSize}px
          </p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded p-2 text-xs text-green-700">
        💡 Change settings, switch tabs, come back — all your toggles, selections, and slider positions are intact!
      </div>
    </div>
  );
}

// ==========================================
// Main Tabs Example - uses Activity
// ==========================================
function TabsExample() {
  const [activeTab, setActiveTab] = useState('cart');
  const [useActivity, setUseActivity] = useState(true);
  const [switchCount, setSwitchCount] = useState(0);

  const tabs = [
    { id: 'cart', label: '🛒 Cart', color: 'blue' },
    { id: 'reviews', label: '⭐ Reviews', color: 'amber' },
    { id: 'settings', label: '⚙️ Settings', color: 'green' },
  ];

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setSwitchCount(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      {/* Toggle between Activity and Conditional Rendering */}
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600">Render Mode:</span>
          <button
            onClick={() => setUseActivity(true)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              useActivity
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 border'
            }`}
          >
            {'<Activity>'} (preserves state)
          </button>
          <button
            onClick={() => setUseActivity(false)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              !useActivity
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 border'
            }`}
          >
            Conditional (destroys state)
          </button>
        </div>
        <span className="text-xs text-gray-500">
          Tab switches: {switchCount}
        </span>
      </div>

      {/* Tab Buttons */}
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabSwitch(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white border-b-2 border-primary text-primary text-white'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {useActivity ? (
          // ✅ NEW WAY: Activity - state preserved
          <>
            <Activity mode={activeTab === 'cart' ? 'visible' : 'hidden'}>
              <CartTab />
            </Activity>
            <Activity mode={activeTab === 'reviews' ? 'visible' : 'hidden'}>
              <ReviewsTab />
            </Activity>
            <Activity mode={activeTab === 'settings' ? 'visible' : 'hidden'}>
              <SettingsTab />
            </Activity>
          </>
        ) : (
          // ❌ OLD WAY: Conditional - state destroyed
          <>
            {activeTab === 'cart' && <CartTab />}
            {activeTab === 'reviews' && <ReviewsTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </>
        )}
      </div>

      {/* Status bar */}
      <div className={`px-4 py-2 text-xs border-t ${
        useActivity
          ? 'bg-green-50 text-green-700'
          : 'bg-red-50 text-red-700'
      }`}>
        {useActivity
          ? '✅ Using <Activity> — state is preserved across tab switches. Try typing, changing settings, then switching!'
          : '❌ Using conditional rendering — state is destroyed on each switch. Notice how inputs reset!'
        }
      </div>
    </div>
  );
}

export default TabsExample;