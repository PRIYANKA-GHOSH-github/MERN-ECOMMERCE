const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function populateTestData() {
  try {
    // Update some products with addToCartCount values for testing
    const testUpdates = [
      { category: 'men', addToCartCount: 15 },
      { category: 'men', addToCartCount: 12 },
      { category: 'men', addToCartCount: 8 },
      { category: 'women', addToCartCount: 20 },
      { category: 'women', addToCartCount: 18 },
      { category: 'women', addToCartCount: 14 },
      { category: 'beauty', addToCartCount: 25 },
      { category: 'beauty', addToCartCount: 22 },
      { category: 'beauty', addToCartCount: 19 },
      { category: 'kids', addToCartCount: 10 },
      { category: 'kids', addToCartCount: 7 },
      { category: 'accessories', addToCartCount: 30 },
      { category: 'accessories', addToCartCount: 28 },
      { category: 'footwear', addToCartCount: 35 },
      { category: 'footwear', addToCartCount: 32 },
    ];

    console.log('Updating products with test addToCartCount values...');
    
    for (const update of testUpdates) {
      const result = await Product.updateMany(
        { category: update.category },
        { $set: { addToCartCount: update.addToCartCount } },
        { limit: 1 } // Only update one product per category for testing
      );
      
      console.log(`Updated ${result.modifiedCount} products in category: ${update.category}`);
    }

    // Show current state
    const productsWithCounts = await Product.find({ addToCartCount: { $gt: 0 } })
      .select('title category addToCartCount')
      .sort({ addToCartCount: -1 });

    console.log('\nProducts with addToCartCount > 0:');
    productsWithCounts.forEach(product => {
      console.log(`${product.title} (${product.category}): ${product.addToCartCount} users added to cart`);
    });

  } catch (error) {
    console.error('Error populating test data:', error);
  } finally {
    mongoose.connection.close();
  }
}

populateTestData(); 