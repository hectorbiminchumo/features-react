import { useState, useEffect, useEffectEvent } from 'react';

// Simulated WebSocket-like connection
function createProductConnection(category) {
  let callbacks = {};
  let interval = null;

  const products = {
    electronics: ['Wireless Headphones', 'Smart Watch', '4K Monitor', 'Mechanical Keyboard'],
    clothing: ['Winter Jacket', 'Running Shoes', 'Denim Jeans', 'Cotton T-Shirt'],
    home: ['Coffee Maker', 'Air Purifier', 'Desk Lamp', 'Yoga Mat'],
  };

  return {
    on(event, callback) {
      callbacks[event] = callback;
    },
    connect() {
      // Fire "connected" callback
      setTimeout(() => callbacks['connected']?.(), 300);

      // Send random product updates
      interval = setInterval(() => {
        const items = products[category] || products.electronics;
        const product = items[Math.floor(Math.random() * items.length)];
        const discount = Math.floor(Math.random() * 50) + 10;
        callbacks['product_update']?.({
          product,
          discount,
          timestamp: new Date().toLocaleTimeString(),
        });
      }, 3000);
    },
    disconnect() {
      clearInterval(interval);
      callbacks = {};
    },
  };
}

function NotificationExample() {
  const [category, setCategory] = useState('electronics');
  const [notifStyle, setNotifStyle] = useState('toast');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [connectionLog, setConnectionLog] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // Effect Event: reads latest notifStyle and soundEnabled
  // WITHOUT reconnecting the "WebSocket"
  const onProductUpdate = useEffectEvent((data) => {
    const notification = {
      id: Date.now(),
      ...data,
      style: notifStyle,
      sound: soundEnabled,
    };
    setNotifications(prev => [notification, ...prev].slice(0, 8));
  });

  // Effect Event for connection
  const onConnected = useEffectEvent(() => {
    setIsConnected(true);
    setConnectionLog(prev => [
      {
        id: Date.now(),
        message: `Connected to "${category}" channel`,
        time: new Date().toLocaleTimeString(),
        style: notifStyle,
      },
      ...prev,
    ].slice(0, 5));
  });

  // The Effect: only depends on category (the reactive dependency)
  useEffect(() => {
    setIsConnected(false);
    setNotifications([]);

    const connection = createProductConnection(category);
    connection.on('connected', () => onConnected());
    connection.on('product_update', (data) => onProductUpdate(data));
    connection.connect();

    return () => connection.disconnect();
  }, [category]); // ← Only reconnects when category changes!
  // notifStyle and soundEnabled changes do NOT cause reconnection

  const styleIcons = {
    toast: '🔔',
    banner: '📢',
    minimal: '•',
    popup: '💬',
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid md:grid-cols-2 divide-x divide-gray-200">
        {/* Left: Controls */}
        <div className="p-4 space-y-4">
          <h4 className="font-semibold text-gray-800">Connection Settings</h4>

          {/* Category - REACTIVE (causes reconnection) */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              📡 Product Category
              <span className="ml-2 text-blue-600 font-normal">(reactive — changes reconnect)</span>
            </label>
            <div className="flex grid md:grid-cols-3 gap-2">
              {['electronics', 'clothing', 'home'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded capitalize transition-colors sm:text-xs md:text-base w-full truncate ${
                    category === cat
                      ? 'bg-primary text-white'
                      : 'bg-white border text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Style - NON-REACTIVE (no reconnection) */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              🎨 Notification Style
              <span className="ml-2 text-green-600 font-normal">(non-reactive — no reconnect)</span>
            </label>
            <div className="flex grid md:grid-cols-2 gap-2">
              {['toast', 'banner', 'minimal', 'popup'].map(style => (
                <button
                  key={style}
                  onClick={() => setNotifStyle(style)}
                  className={`px-3 py-1.5 rosunded text-xs font-medium capitalize transition-colors ${
                    notifStyle === style
                      ? 'bg-green-500 text-white'
                      : 'bg-white border text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {styleIcons[style]} {style}
                </button>
              ))}
            </div>
          </div>

          {/* Sound toggle - NON-REACTIVE */}
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
            <span className="text-sm">
              🔊 Sound
              <span className="ml-2 text-xs text-green-600">(non-reactive)</span>
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-10 h-8 rounded-full flex flex-col justify-center items-center transition-colors ${
                soundEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full  transition-transform mx-1 ${
                  soundEnabled ? 'bg-green-300 translate-x-2' : 'bg-gray-400 translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Connection Log */}
          <div>
            <h5 className="text-xs font-semibold text-gray-600 mb-1.5">Connection Log:</h5>
            <div className="space-y-1 max-h-28 overflow-y-auto">
              {connectionLog.length === 0 ? (
                <p className="text-xs text-gray-400">No connections yet...</p>
              ) : (
                connectionLog.map(log => (
                  <div key={log.id} className="text-xs bg-white border rounded px-2 py-1">
                    <span className="text-gray-400">{log.time}</span>{' '}
                    <span className="text-gray-700">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Notifications */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">Incoming Notifications</h4>
            <span className={`text-xs px-2 py-0.5 rounded ${
              isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {isConnected ? '● Connected' : '○ Connecting...'}
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Waiting for product updates...
                <br />
                <span className="text-xs">(updates arrive every ~3 seconds)</span>
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`rounded-lg p-3 transition-all animate-pulse-once ${
                    notif.style === 'toast'
                      ? 'bg-white border-l-4 border-l-primary shadow-sm'
                      : notif.style === 'banner'
                      ? 'bg-blue-50 border border-blue-200'
                      : notif.style === 'minimal'
                      ? 'bg-gray-100 border-b border-gray-200 rounded-none'
                      : 'bg-white border-2 border-primary shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {styleIcons[notif.style]} {notif.product}
                    </span>
                    <span className="text-xs text-gray-400">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-green-600 font-semibold mt-1">
                    {notif.discount}% OFF!
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-gray-400">Style: {notif.style}</span>
                    <span className="text-xs text-gray-400">Sound: {notif.sound ? 'on' : 'off'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-teal-50 border-t border-teal-200 px-4 py-3 text-xs text-teal-800">
        <strong>⚡ Try this:</strong> Change the <strong>notification style</strong> or <strong>sound toggle</strong> — 
        notice the connection log does NOT show a reconnection. New notifications use the updated style instantly.
        Now change the <strong>category</strong> — that DOES reconnect because it's a reactive dependency.
      </div>
    </div>
  );
}

export default NotificationExample;