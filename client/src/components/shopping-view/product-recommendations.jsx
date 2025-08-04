import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { formatRupee } from "../../lib/currency";

function ProductRecommendations({ 
  recommendations, 
  handleGetProductDetails, 
  handleAddtoCart,
  isLoading = false 
}) {
  if (isLoading) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-[300px] rounded-t-lg"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
        <div className="text-center text-muted-foreground">
          <p>No recommendations available yet.</p>
          <p className="text-sm">Products will appear here once users start adding them to their cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {recommendations.map((product) => (
          <Card key={product._id} className="w-full max-w-sm mx-auto">
            <div onClick={() => handleGetProductDetails(product._id)}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                {product.totalStock === 0 ? (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    Out Of Stock
                  </Badge>
                ) : product.totalStock < 10 ? (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    {`Only ${product.totalStock} items left`}
                  </Badge>
                ) : product.salePrice > 0 ? (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    Sale
                  </Badge>
                ) : null}
                {/* Popularity badge */}
                {product.addToCartCount > 0 && (
                  <Badge className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white">
                    {product.addToCartCount} {product.addToCartCount === 1 ? 'user' : 'users'} added to cart
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{product.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[16px] text-muted-foreground">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`${
                      product.salePrice > 0 ? "line-through" : ""
                    } text-lg font-semibold text-primary`}
                  >
                    {formatRupee(product.price)}
                  </span>
                  {product.salePrice > 0 ? (
                    <span className="text-lg font-semibold text-primary">
                      {formatRupee(product.salePrice)}
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </div>
            <CardFooter>
              {product.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out Of Stock
                </Button>
              ) : (
                <Button
                  onClick={() => handleAddtoCart(product._id, product.totalStock)}
                  className="w-full"
                >
                  Add to cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductRecommendations; 