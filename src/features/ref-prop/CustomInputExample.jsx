import { useRef, useState } from 'react';

// Styled Search Input with ref as prop
function SearchInput({ ref, onSearch, placeholder = 'Search...', ...props }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
        {...props}
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

// Price Range Input with ref as prop
function PriceRangeInput({ ref, label, currency = '$', ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
          {currency}
        </span>
        <input
          ref={ref}
          type="number"
          step="0.01"
          min="0"
          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          {...props}
        />
      </div>
    </div>
  );
}

// Rating Input with ref as prop (hidden input for form submission)
function RatingInput({ ref, label, onChange, ...props }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (ref.current) {
      ref.current.value = value;
    }
    onChange?.(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
          >
            <svg
              className={`w-3 h-3 ${
                star <= (hover || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Not rated'}
        </span>
      </div>
      <input
        ref={ref}
        type="hidden"
        value={rating}
        {...props}
      />
    </div>
  );
}

// Color Picker Input with ref as prop
function ColorPickerInput({ ref, label, ...props }) {
  const [color, setColor] = useState('#3b82f6');

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          ref={ref}
          type="color"
          value={color}
          onChange={handleChange}
          className="w-16 h-10 rounded cursor-pointer"
          {...props}
        />
        <div className="flex-1">
          <input
            type="text"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              if (ref.current) {
                ref.current.value = e.target.value;
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
          />
        </div>
        <div
          className="w-10 h-10 rounded border-2 border-gray-300"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function CustomInputExample() {
  const searchRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const ratingRef = useRef(null);
  const colorRef = useRef(null);

  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState(null);

  const handleSearch = (query) => {
    setSearchResults([
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ]);
  };

  const handleApplyFilters = () => {
    const filterData = {
      search: searchRef.current?.value || '',
      minPrice: minPriceRef.current?.value || '0',
      maxPrice: maxPriceRef.current?.value || '∞',
      rating: ratingRef.current?.value || '0',
      color: colorRef.current?.value || '#000000'
    };
    setFilters(filterData);
  };

  const handleResetFilters = () => {
    if (searchRef.current) searchRef.current.value = '';
    if (minPriceRef.current) minPriceRef.current.value = '';
    if (maxPriceRef.current) maxPriceRef.current.value = '';
    if (ratingRef.current) ratingRef.current.value = '0';
    if (colorRef.current) colorRef.current.value = '#3b82f6';
    
    setSearchResults([]);
    setFilters(null);
    searchRef.current?.focus();
  };

  const handleFocusSearch = () => {
    searchRef.current?.focus();
    searchRef.current?.select();
  };

  const handleGetValues = () => {
    alert(JSON.stringify({
      search: searchRef.current?.value,
      minPrice: minPriceRef.current?.value,
      maxPrice: maxPriceRef.current?.value,
      rating: ratingRef.current?.value,
      color: colorRef.current?.value
    }, null, 2));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Inputs */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-4">Advanced Filter Form</h5>

          <div className="space-y-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <SearchInput
                ref={searchRef}
                onSearch={handleSearch}
                placeholder="Type and press Enter..."
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-3">
              <PriceRangeInput
                ref={minPriceRef}
                label="Min Price"
                placeholder="0.00"
              />
              <PriceRangeInput
                ref={maxPriceRef}
                label="Max Price"
                placeholder="999.99"
              />
            </div>

            {/* Rating */}
            <RatingInput
              ref={ratingRef}
              label="Minimum Rating"
            />

            {/* Color Picker */}
            <ColorPickerInput
              ref={colorRef}
              label="Preferred Color"
            />

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Ref Action Buttons */}
            <div className="pt-4 border-t border-gray-300">
              <p className="text-xs text-gray-600 mb-2 font-semibold">
                Ref Actions:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={handleFocusSearch}
                  className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
                >
                  Focus & Select Search
                </button>
                <button
                  onClick={handleGetValues}
                  className="text-xs bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600"
                >
                  Get All Values
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-4">Results</h5>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-4 bg-white border border-gray-200 rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-3 text-sm">
                Search Results:
              </h6>
              <ul className="space-y-2">
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 bg-gray-50 p-2 rounded"
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Applied Filters */}
          {filters ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-3 text-sm">
                Active Filters:
              </h6>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Search:</span>
                  <span className="font-semibold text-gray-900">
                    {filters.search || 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-semibold text-gray-900">
                    ${filters.minPrice} - ${filters.maxPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Min Rating:</span>
                  <span className="font-semibold text-gray-900">
                    {filters.rating > 0 ? `${filters.rating} stars` : 'Any'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Color:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-900">
                      {filters.color}
                    </span>
                    <div
                      className="w-6 h-6 rounded border-2 border-gray-300"
                      style={{ backgroundColor: filters.color }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
                  ✓ Filters applied successfully!
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-64">
              <p className="text-gray-500 text-center">
                No filters applied yet.<br />
                <span className="text-sm">
                  Set your preferences and click "Apply Filters"
                </span>
              </p>
            </div>
          )}

          {/* Code Example */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
            <h6 className="font-semibold text-gray-900 mb-2 text-sm">
              Component Code:
            </h6>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`// Custom styled input with ref
function SearchInput({ ref, onSearch, ...props }) {
  return (
    <div className="relative">
      <input 
        ref={ref}
        type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(e.target.value);
          }
        }}
        {...props}
      />
      <SearchIcon />
    </div>
  );
}

// Price input with currency symbol
function PriceRangeInput({ ref, currency, ...props }) {
  return (
    <div>
      <span>{currency}</span>
      <input ref={ref} type="number" {...props} />
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded p-3 text-xs text-indigo-800">
        <strong>🎨 Complex Custom Inputs:</strong> These components demonstrate how 
        custom styled inputs with complex functionality can still accept refs as regular 
        props. No <code className="bg-indigo-100 px-1 rounded">forwardRef</code> needed 
        even for advanced components with multiple features!
      </div>
    </div>
  );
}

export default CustomInputExample;