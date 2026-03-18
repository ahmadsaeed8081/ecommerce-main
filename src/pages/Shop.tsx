import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TLogo from '@/assets/icon/Simplification.png';
import USDTLogo from '@/assets/icon/ticon1.png';
import WLBizLogo from '@/assets/icon/ticon2.png';

interface Category {
  _id: string;
  name: string;
  image?: string; // optional
}

interface Product {
  _id: string;
  name: string;
  price: number;
  reward: number;
  description: string;
  image: string;
  category: string;
}

const Shop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await fetch("https://api.weblifebiz.com/api/categories"); // backend endpoint
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data: Category[] = await res.json();
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0].name); // set first category as default
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
      setLoadingCategories(false);
    };

    fetchCategories();
  }, []);

  // Fetch products whenever activeCategory changes
  useEffect(() => {
    if (!activeCategory) return;
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch(`https://api.weblifebiz.com/api/products/category?category=${encodeURIComponent(activeCategory)}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
        console.log(data)
      } catch (err) {
        console.error(err);
        alert("fail")
        setProducts([]);
      }
      setLoadingProducts(false);
    };

    fetchProducts();
  }, [activeCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold mb-6">Shop / Categories</h1>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {loadingCategories ? (
              <p>Loading categories...</p>
            ) : (
              <nav className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap w-full text-left ${
                      activeCategory === category.name
                        ? "gradient-primary text-white"
                        : "bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </nav>
            )}
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
              {categories.find(c => c.name === activeCategory)?.name || "Products"}
            </h2>

            {loadingProducts ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="group"
                  >
                    <div 
                      className="rounded-xl hover:border-wlbiz-purple/50 overflow-hidden transition-all"
                      style={{
                        background: '#1A0936',
                        border: '1px solid #29164E',
                        boxShadow: '4px 4px 32px 2px #0A041652'
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                      src={`https://api.weblifebiz.com${product.image}`}
                      alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 flex items-center bg-[#190937] gap-1 backdrop-blur-sm px-2 py-2 rounded-md border-2 border-white/10">
                          <span className="text-yellow-400">
                            <img src={USDTLogo} alt="USDTLogo" className="" />
                          </span>
                          <span className="text-wlbiz-purple">
                            <img src={WLBizLogo} alt="WLBizLogo" className="" />
                          </span>
                          <span className="text-white text-xs font-medium">{product.reward} WLBiz</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm md:text-base mb-2 text-white">{product.name}</h3>
                        <div className="flex items-center justify-between pt-3 gap-2">
                          <p className="text-white text-xs mb-2">Prices</p>
                          <div className="flex items-center gap-2">
                            <img src={TLogo} alt="TLogo" className="" />
                            <span className="text-white text-sm font-semibold">{product.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;