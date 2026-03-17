import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet, ShoppingBag, Gift, CreditCard, Check } from "lucide-react";

const ShopLanding = () => {
  const features = [
    { icon: Wallet, title: "Connect Your Wallet", description: "Ethereum, BNB, Polygon - We accept major crypto wallets" },
    { icon: ShoppingBag, title: "Shop using USDT", description: "Purchase from a wide range of products using USDT" },
    { icon: Gift, title: "Earn WLD Automatically", description: "Withdraw your earned coins to your wallet" },
    { icon: CreditCard, title: "Use Your Rewards", description: "Redeem your rewards anytime, withdraw to your wallet" },
  ];

  const products = [
    { id: 1, name: "Tech Gadgets", price: 50, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop" },
    { id: 2, name: "Tech Gadgets", price: 50, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop" },
    { id: 3, name: "Tech Gadgets", price: 50, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop" },
    { id: 4, name: "Tech Gadgets", price: 50, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop" },
    { id: 5, name: "Tech Gadgets", price: 50, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300&h=300&fit=crop" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-wlbiz-purple/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-wlbiz-pink/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-wlbiz-cyan/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Shop With Crypto.<br />
                Earn <span className="gradient-text">Real Rewards</span><br />
                With WLD.
              </h1>
              <p className="text-muted-foreground text-lg mb-4 max-w-lg">
                WLBIZ is a next generation Web3 shopping platform where users purchase products using USDT and earn WLD tokens on every order.
              </p>
              <p className="text-muted-foreground mb-8">
                No banks, no passwords - just secure wallet-based access.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button className="gradient-primary text-white rounded-full px-8 py-6">
                  Connect Wallet
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-border">
                  Explore More
                </Button>
              </div>
            </div>

            {/* 3D Product Visual */}
            <div className="hidden lg:flex justify-center relative">
              <div className="relative w-96 h-96">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-wlbiz-purple/40 via-wlbiz-pink/30 to-wlbiz-cyan/40 rounded-3xl blur-2xl" />
                
                {/* Product showcase */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Floating elements */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl animate-float shadow-lg shadow-yellow-500/30" />
                  <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-wlbiz-cyan to-blue-500 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
                  <div className="absolute bottom-8 left-8 w-10 h-10 bg-gradient-to-br from-wlbiz-pink to-wlbiz-purple rounded-lg animate-float" style={{ animationDelay: "1s" }} />
                  
                  {/* Main product card */}
                  <div className="glass-card rounded-2xl p-6 w-72 transform rotate-3 hover:rotate-0 transition-transform">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-wlbiz-purple/30 to-wlbiz-pink/20 mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-wlbiz-purple/40 via-transparent to-wlbiz-cyan/20" />
                      <img 
                        src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop" 
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full gradient-primary" />
                        <span className="font-bold">50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Info Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">A Marketplace Built for Utility and Scale</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            WLBIZ brings together a wide range of carefully selected product categories, offering both physical and digital goods under one decentralized ecosystem.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                A Marketplace Built For Utility<br />And Scale
              </h2>
              <p className="text-muted-foreground mb-8">
                WLBIZ brings together a wide range of carefully selected product categories, offering both physical and digital goods under one decentralized ecosystem.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Automatically credited after each purchase",
                  "View your balance in real-time",
                  "Withdraw tokens to your wallet",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
                      <Check size={14} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="gradient-primary text-white rounded-full px-8">
                View All Categories
              </Button>
            </div>

            {/* Feature Visual */}
            <div className="hidden lg:block">
              <div className="relative w-full h-80 bg-gradient-to-br from-wlbiz-purple/20 to-wlbiz-pink/10 rounded-2xl border border-wlbiz-purple/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-wlbiz-purple/30 via-transparent to-transparent" />
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="glass-card rounded-xl p-4 animate-float">
                    <div className="w-12 h-12 rounded-lg gradient-primary mb-2" />
                    <div className="h-2 bg-secondary rounded w-20" />
                  </div>
                  <div className="glass-card rounded-xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                    <div className="w-12 h-12 rounded-lg bg-wlbiz-cyan mb-2" />
                    <div className="h-2 bg-secondary rounded w-16" />
                  </div>
                  <div className="glass-card rounded-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                    <div className="w-12 h-12 rounded-lg bg-wlbiz-pink mb-2" />
                    <div className="h-2 bg-secondary rounded w-24" />
                  </div>
                  <div className="glass-card rounded-xl p-4 animate-float" style={{ animationDelay: "1.5s" }}>
                    <div className="w-12 h-12 rounded-lg gradient-primary mb-2" />
                    <div className="h-2 bg-secondary rounded w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, Transparent, and Fully Decentralized
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Getting started on WLBiz is ready — no complex registrations or technical barriers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to="/shop"
                className="glass-card rounded-xl overflow-hidden group hover:glow-purple transition-all"
              >
                <div className="relative">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-secondary/80 rounded-full px-2 py-1 text-xs z-10">
                    <span className="w-3 h-3 rounded-full gradient-primary" />
                    <span className="text-wlbiz-pink">●</span>
                    500 WLBIZ
                  </div>
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-wlbiz-purple/30 to-wlbiz-pink/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-wlbiz-purple/40 via-transparent to-wlbiz-cyan/20 z-[1]" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground text-xs">Prices</span>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full gradient-primary" />
                      <span className="font-bold">{product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button className="gradient-primary text-white rounded-full px-8">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Built on Trust, Powered by Blockchain
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            For updates, announcements, and support, contact with the WLBIZ community through our Social Icon.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-wlbiz-purple/30 to-wlbiz-pink/20 flex items-center justify-center">
                  <feature.icon className="text-wlbiz-purple" size={28} />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopLanding;
