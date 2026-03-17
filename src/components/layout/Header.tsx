import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from '../../assets/brand/logo.png';
import profile from '../../assets/icon/profile.png';


import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract } from "wagmi";



const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const { open, close } = useWeb3Modal()
  const { isConnected,isDisconnected,chain } = useAccount()
  const { address } = useAccount();


  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#190737] backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo}  alt=""  />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-foreground underline underline-offset-4"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Connect Wallet Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
          className={"gradient-primary h-[48px] text-white border-0  px-6"}
          onClick={() => open()} 
          >
          {!isConnected?("Connect Wallet"):(address.slice(0,4)+"...."+address.slice(39,42))}
          </Button>
          <Link to="/profile" className="w-10 h-10 rounded-full bg-secondary overflow-hidden hover:ring-2 hover:ring-wlbiz-purple transition-all">
            <img
              src={profile}
              alt="User"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="md:hidden flex  items-center gap-2">
        <Link to="/profile" className="w-10 h-10 rounded-full bg-secondary overflow-hidden hover:ring-2 hover:ring-wlbiz-purple transition-all">
            <img
              src={profile}
              alt="User"
              className="w-full h-full object-cover"
            />
          </Link>
          
        {/* Mobile Menu Button */}
        <button
          className=" text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden  bg-[#190737] border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="gradient-primary h-[48px] text-white border-0  px-6"
                      onClick={() => open()} 

            >
          {!isConnected?("Connect Wallet"):(address.slice(0,4)+"...."+address.slice(39,42))}
          </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
