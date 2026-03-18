import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, Gift, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
// Import product images
import headphonesImg from "@/assets/home/hero.png";
import smartphoneImg from "@/assets/home/market.png";
import smartwatchImg from "@/assets/products/smartwatch.png";
import controllerImg from "@/assets/products/controller.png";
import earbudsImg from "@/assets/products/earbuds.png";
import Wallet from '@/assets/icon/connect.png';
import ShoppingCart from '@/assets/icon/shop.png';
import bgLeftBottom from '@/assets/home/built_left_bg.png';
import bgRightTop from '@/assets/home/built_right_bg.png';
import TransparentLeftBottom from '@/assets/home/transparent_left_bg.png';
import TransparentRightTop from '@/assets/home/transparent_right_bg.png';
import checkImg from '@/assets/icon/check.png';
import TLogo from '@/assets/icon/Simplification.png';
import USDTLogo from '@/assets/icon/ticon1.png';
import WLBizLogo from '@/assets/icon/ticon2.png';

const products = [
  { id: 1, name: "Premium Headphones", price: "$299", wlbiz: "500", image: headphonesImg },
  { id: 2, name: "Smartphone Pro", price: "$899", wlbiz: "1200", image: smartphoneImg },
  { id: 3, name: "Smart Watch", price: "$399", wlbiz: "650", image: smartwatchImg },
  { id: 4, name: "Gaming Controller", price: "$79", wlbiz: "120", image: controllerImg },
  { id: 5, name: "Wireless Earbuds", price: "$199", wlbiz: "320", image: earbudsImg },
];

const howItWorks = [
  {
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Link your crypto wallet securely with just one click."
  },
  {
    icon: ShoppingCart,
    title: "Shop Using USDT",
    description: "Browse and purchase products using stablecoins."
  },
  {
    icon: Wallet,
    title: "Earn WLB Automatically",
    description: "Get WLB tokens credited on every purchase you make."
  },
  {
    icon: Wallet,
    title: "Use Your Rewards",
    description: "Redeem tokens for discounts or withdraw to wallet."
  },
];

const Home = () => {


  interface Category {
    _id: string;
    name: string;
    image: string;
  }
  
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.weblifebiz.com/api/categories");
        const data = await res.json();
       setCategories(data);
        console.log(data.name)
      } catch (err) {
        alert("Failed to fetch categories:"+ err);
      }
    };

    fetchCategories();
  }, []);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-[#1A0936] min-h-[70vh] md:min-h-[90vh]   flex items-center overflow-hidden py-8 md:py-0">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-9  -left-12 w-96 h-96 bg-wlbiz-purple/20 rounded-full blur-3xl" />
          
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
                Shop With Crypto.<br />
                Earn <span className="gradient-text">Real Rewards</span><br />
                With <span className="text-wlbiz-purple">WLD.</span>
              </h1>
              <p className="text-white text-sm md:text-base lg:text-lg mb-4 max-w-lg">
                WLBIZ is a next generation Web3 shopping platform where users purchase products using USDT and earn WLB tokens on every order.
              </p>
              <p className="text-white text-xs md:text-sm mb-6 md:mb-8">
                No banks, no passwords - just secure wallet-based access.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link to="/shop">
                <Button className="gradient-primary text-white h-[48px]  px-5 md:px-8 py-4 md:py-6 text-sm md:text-base">
                  Explore Shop
                </Button>
                </Link>

                {/* <Button variant="outline" className=" h-[48px] bg-[#1A0936] px-5 md:px-8 py-4 md:py-6 text-sm md:text-base border-border border-2 text-white hover:text-white">
                  
                </Button> */}
              </div>
            </div>

            {/* Hero Image - 3D Product Showcase */}
            <div className=" relative">
              <div className="">
                {/* Glowing background */}
                <div className="absolute w-[500px]  h-[400px] top-0 right-0  bg-gradient-to-br from-wlbiz-purple/30 via-wlbiz-pink/20 to-wlbiz-cyan/30 rounded-full blur-3xl" />
                
                {/* Main product - Headphones */}
                <div className="">
                  <img 
                    src={headphonesImg} 
                    alt="Premium Headphones" 
                    className="drop-shadow-2xl animate-float"
                  />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Info Section */}
      <section className="py-10 bg-[#1A0936] md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
            A Marketplace Built for Utility and Scale
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            WLBIZ brings together a wide range of carefully selected product categories, offering both physical and digital goods under one decentralized ecosystem.
          </p>
        </div>
      </section>

      {/* Features Section with Image */}
      <section className="py-10 bg-[#1A0936] md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                A Marketplace Built For Utility<br />
                <span className="gradient-text">And Scale</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-lg">
                WLBIZ brings together a wide range of carefully selected product categories, offering both physical and digital goods under one decentralized ecosystem.
              </p>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "Automatically credited after each purchase",
                  "View your balance in real-time",
                  "Withdraw tokens to your wallet"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <img src={checkImg} alt="Check" />
                    </div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* <Link to="/shop">
                <Button className="gradient-primary text-white  h-[48px] px-5 md:px-6 py-3 md:py-4 text-sm md:text-base">
                  View All Categories
                </Button>
              </Link> */}
            </div>

            {/* Feature Image - Product Grid Preview */}
            <div className=" lg:flex justify-center items-center">
              <div className="relative w-full max-w-[500px] h-[400px]">
                {/* Subtle gradient glow behind the illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-wlbiz-purple/30 via-wlbiz-pink/20 to-transparent rounded-full blur-3xl opacity-60"></div>
                  <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-wlbiz-purple/20 via-wlbiz-pink/15 to-transparent rounded-full blur-2xl opacity-50"></div>
                </div>
                {/* Wallet image */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <img src={smartphoneImg} alt="Wallet" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Dark Background */}
      <section className="py-10 md:py-16 bg-[#1A0936] relative overflow-hidden">
        {/* Background image - top right */}
        <div className="absolute left-0 top-0 pointer-events-none">
          <img src={TransparentLeftBottom} alt="Background" className=" opacity-50" />
        </div>
        {/* Background image - left bottom */}
        <div className="absolute right-0 top-0 pointer-events-none">
          <img src={TransparentRightTop} alt="Background" className="h-[400px] object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Simplified Web3 <span className="gradient-text">Decentralized</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Getting started on WLBiz is ready — no complex registrations or technical barriers.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
            {categories.map((product, index) => (
              // <Link key={index} to={`/shop`} className="group">
                <div 
                  className="rounded-xl  hover:border-wlbiz-purple/50 overflow-hidden transition-all"
                  style={{
                    background: '#1A0936',
                    border: '1px solid #29164E',
                    boxShadow: '4px 4px 32px 2px #0A041652'
                  }}
                >
                  <div className="relative aspect-square  overflow-hidden mb-3">
                    {/* Product image */}
                                  <img 
                      src={`https://api.weblifebiz.com${product.image}`}
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badge overlay - top right */}
                    {/* <div className="absolute top-2 right-2 bg-[#190937] flex items-center gap-1  backdrop-blur-sm px-2 py-2 rounded-md border-2 border-white/10">
                      <span className="text-yellow-400">
                        
                        <img src={USDTLogo} alt="USDTLogo" className="" />
                      </span>
                      <span className="text-wlbiz-purple">
                      <img src={WLBizLogo} alt="WLBizLogo" className="" />
                      </span>
                      <span className="text-white text-xs font-medium">{product.wlbiz} WLBiz</span>
                    </div> */}
                  </div>
                  <div className="p-4">
                    {/* Product title */}
                  <h3 className="font-semibold text-sm md:text-base mb-2 text-white">{product.name}</h3>
                 
                  {/* Price section */}
                  <div className="flex items-center   justify-between pt-3 gap-2">
                     {/* Prices label */}
                  {/* <p className="text-white text-xs mb-2">Prices</p> */}
                    {/* <div className="flex items-center gap-2">
                    <img src={TLogo} alt="TLogo" className="" />
                    <span className="text-white text-sm font-semibold">{product.price.replace('$', '')}</span>
                    </div> */}
                  </div>
                  </div>
                </div>
              // </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/shop">
              <Button className="gradient-primary text-white  px-6 md:px-8 py-3 md:py-4 text-sm md:text-base">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Built on Trust Section */}
      <section className="py-10 md:py-16 bg-[#1A0936] relative overflow-hidden">
        {/* Background image - left bottom */}
        <div className="absolute left-0 bottom-0 pointer-events-none">
          <img src={bgLeftBottom} alt="Background" className="h-[400px] object-cover opacity-30" />
        </div>
        {/* Background image - right top */}
        <div className="absolute right-0 top-0 pointer-events-none">
          <img src={bgRightTop} alt="Background" className="h-[400px] object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
            Built on Trust, Powered by Blockchain
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-10 md:mb-16">
            For updates, announcements, and support, connect with the WLBIZ community through our social channels.
          </p>

          {/* How it Works */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {howItWorks.map((item, index) => (
              <div key={index} className="glass-card rounded-xl p-4 md:p-6 text-center">
                <div 
                  className="w-16 h-16 bg-[#29164E]  md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-lg border border-[#29164E] flex items-center justify-center"
                  style={{ boxShadow: '0px 4px 4px 0px #0A041652' }}
                >
                  <img src={item?.icon} alt="Wallet" />
                </div>
                <h3 className="font-semibold text-xs md:text-sm mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-[10px] md:text-xs">{item.description}</p>
              </div>
            ))}
          </div>

          {/* <Link to="/shop">
            <Button className="gradient-primary text-white   h-[48px] px-6 md:px-8 py-3 md:py-4 text-sm md:text-base">
              View All Categories
            </Button>
          </Link> */}
        </div>
      </section>
    </Layout>
  );
};

export default Home;