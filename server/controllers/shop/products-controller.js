const Product = require("../../models/Product");
const User = require("../../models/User");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Add a product to the user's recently viewed list
const addRecentlyViewedProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: productId } = req.params;
    const MAX_RECENT = 20;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove if already exists
    user.recentlyViewed = user.recentlyViewed.filter(
      (pid) => pid.toString() !== productId
    );
    // Add to front
    user.recentlyViewed.unshift(productId);
    // Limit array size to 4
    if (user.recentlyViewed.length > 4) {
      user.recentlyViewed = user.recentlyViewed.slice(0, 4);
    }
    await user.save();
    res.status(200).json({ success: true, message: "Product added to recently viewed" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

// Get the user's recently viewed products
const getRecentlyViewedProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("recentlyViewed");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user.recentlyViewed });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

// Get product recommendations based on category and popularity
const getProductRecommendations = async (req, res) => {
  try {
    const { category, limit = 6 } = req.query;
    
    let filters = {
      addToCartCount: { $gt: 0 } // Only show products that have been added to cart at least once
    };
    
    if (category) {
      filters.category = category;
      console.log("Filtering recommendations by category:", category);
    }
    
    console.log("Recommendation filters:", filters);
    
    const recommendations = await Product.find(filters)
      .sort({ addToCartCount: -1 })
      .limit(parseInt(limit))
      .select('image title price salePrice addToCartCount category totalStock');
    
    console.log(`Found ${recommendations.length} recommendations for category: ${category || 'all'}`);
    
    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails, addRecentlyViewedProduct, getRecentlyViewedProducts, getProductRecommendations };
