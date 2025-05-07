
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import { products, getAllCategories } from "@/data/products";
import { Product } from "@/models/product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X } from "lucide-react";

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  
  const categories = getAllCategories();
  const maxPrice = Math.max(...products.map((p) => p.price));

  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }
    
    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
    
    // Update URL params
    const params = new URLSearchParams();
    if (categoryFilter) params.set("category", categoryFilter);
    setSearchParams(params);
  }, [categoryFilter, priceRange, searchTerm, setSearchParams]);

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(categoryFilter === category ? "" : category);
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setPriceRange([0, maxPrice]);
    setSearchTerm("");
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h1>
      <p className="text-gray-600 mb-8">Browse our wide selection of high-quality products</p>
      
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <Button onClick={toggleMobileFilters} variant="outline" className="w-full">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Mobile */}
        {showMobileFilters && (
          <div className="md:hidden bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={toggleMobileFilters}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="search-mobile">Search</Label>
              <Input
                id="search-mobile"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="mt-1"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-mobile-${category}`}
                      checked={categoryFilter === category}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`category-mobile-${category}`}
                      className="ml-2 text-sm capitalize cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            <div className="mb-6">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="mt-1"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={categoryFilter === category}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm capitalize cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Products */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-600">Showing {filteredProducts.length} products</span>
                {(categoryFilter || searchTerm || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                  <Button 
                    variant="link" 
                    className="text-sm text-accent p-0 ml-2" 
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <ProductGrid products={filteredProducts} />
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search term.</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
