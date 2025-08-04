const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testRecommendations() {
  try {
    // Test the recommendations query
    const recommendations = await Product.find({})
      .sort({ addToCartCount: -1 })
      .limit(6)
      .select('image title price salePrice addToCartCount category');
    
    console.log('Recommendations found:', recommendations.length);
    console.log('Sample recommendation:', recommendations[0]);
    
    // Test with category filter
    const categoryRecommendations = await Product.find({ category: 'electronics' })
      .sort({ addToCartCount: -1 })
      .limit(6)
      .select('image title price salePrice addToCartCount category');
    
    console.log('Category recommendations found:', categoryRecommendations.length);
    
  } catch (error) {
    console.error('Error testing recommendations:', error);
  } finally {
    mongoose.connection.close();
  }
}

testRecommendations(); 