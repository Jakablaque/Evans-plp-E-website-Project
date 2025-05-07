
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/products/ProductGrid";
import { getFeaturedProducts, getAllCategories } from "@/data/products";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand to-brand-light text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Shop the Latest Products</h1>
            <p className="text-xl opacity-90 mb-8">
              Discover our curated collection of premium products for every need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/products")}
                size="lg" 
                className="bg-white text-brand hover:bg-gray-100"
              >
                Shop Now
              </Button>
              <Button 
                onClick={() => navigate("/contact")}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Shop by Category</h2>
          <p className="text-gray-600 mb-10 text-center">Browse our wide selection of products by category</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/products?category=${category}`)}
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent capitalize font-medium">
                      {category.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold capitalize">{category}</h3>
                  <Button 
                    variant="link" 
                    className="p-0 text-accent" 
                    onClick={() => navigate(`/products?category=${category}`)}
                  >
                    View Products
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Products</h2>
          <p className="text-gray-600 mb-10 text-center">Check out our most popular items</p>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/products")}
              size="lg"
              className="bg-brand text-white hover:bg-brand-dark"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-medium">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Jane Smith</h4>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I'm extremely impressed by the quality of the products. Fast shipping and excellent customer service too!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-white font-medium">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Michael Johnson</h4>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The wireless headphones exceeded my expectations. Great sound quality and the battery life is amazing!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-accent-dark flex items-center justify-center text-white font-medium">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Sarah Williams</h4>
                  <div className="flex text-amber-500">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've ordered multiple items from WaveShop and have always been pleased with the quality and value."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Stay Updated</h2>
          <p className="mb-6 max-w-md mx-auto">
            Subscribe to our newsletter to get updates on our latest products and special offers.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md flex-1 text-gray-800"
            />
            <Button className="bg-white text-accent hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
