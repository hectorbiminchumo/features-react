export const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    stock: 15,
    category: "Electronics",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    description: "Advanced fitness tracking, heart rate monitoring, and GPS navigation.",
    stock: 8,
    category: "Electronics",
    rating: 4.7,
    reviews: 256
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    description: "Handcrafted genuine leather backpack with laptop compartment.",
    stock: 23,
    category: "Accessories",
    rating: 4.3,
    reviews: 89
  },
  {
    id: 4,
    name: "Running Shoes Elite",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    description: "Professional running shoes with advanced cushioning technology.",
    stock: 0,
    category: "Sports",
    rating: 4.8,
    reviews: 342
  },
  {
    id: 5,
    name: "Coffee Maker Deluxe",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
    description: "Programmable coffee maker with built-in grinder and thermal carafe.",
    stock: 12,
    category: "Home",
    rating: 4.6,
    reviews: 167
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    description: "Eco-friendly non-slip yoga mat with extra cushioning.",
    stock: 45,
    category: "Sports",
    rating: 4.4,
    reviews: 203
  }
];

export const mockCategories = [
  "All",
  "Electronics",
  "Accessories",
  "Sports",
  "Home"
];

export const mockReviews = [
  {
    id: 1,
    productId: 1,
    user: "John Doe",
    rating: 5,
    comment: "Excellent sound quality and comfortable fit!",
    date: "2024-02-15"
  },
  {
    id: 2,
    productId: 1,
    user: "Jane Smith",
    rating: 4,
    comment: "Great headphones, but a bit pricey.",
    date: "2024-02-10"
  },
  {
    id: 3,
    productId: 2,
    user: "Mike Johnson",
    rating: 5,
    comment: "Best smartwatch I've ever owned!",
    date: "2024-02-12"
  }
];

// Utility function to simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API calls
export const api = {
  getProducts: async () => {
    await delay(800);
    return mockProducts;
  },
  
  getProductById: async (id) => {
    await delay(500);
    return mockProducts.find(p => p.id === id);
  },
  
  addToCart: async (productId, quantity) => {
    await delay(600);
    return { success: true, message: "Product added to cart" };
  },
  
  updateStock: async (productId, newStock) => {
    await delay(700);
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
      return { success: true, product };
    }
    return { success: false, message: "Product not found" };
  },
  
  submitReview: async (productId, review) => {
    await delay(1000);
    return { 
      success: true, 
      review: { 
        id: Date.now(), 
        productId, 
        ...review, 
        date: new Date().toISOString() 
      } 
    };
  }
};