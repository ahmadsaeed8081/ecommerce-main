import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram } from "lucide-react";
import logo from '@/assets/brand/logo.png';
import { Button } from "../ui/button";
import bg from '@/assets/home/bg-footer.png';
const Footer = () => {
  return (
    <footer className="bg-[#1A0936]  relative border-t border-border">
      <div className="absolute  bottom-0  right-0 pointer-events-none">
        <img src={bg} alt="Background" className=" h-[400px]  object-cover" />
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left side */}
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <img src={logo} alt="Logo" />
            </div>
            <p className="text-white text-base md:text-xl max-w-md">
              Getting Started On WLBiz Is Ready — No Complex Registrations Or Technical Barriers.
            </p>
          </div>

          {/* Right side - Social Links */}
          <div className="md:text-left">
            <p className="text-white text-sm md:text-base mb-3 md:mb-4 text-center">Follow Us</p>
            <div className="flex gap-3 justify-center md:gap-4">
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-wlbiz-purple transition-colors"
              >
                <Button className=" gradient-primary w-10 h-10 md:w-12 md:h-12 rounded-full">
                  <Twitter size={20} className="" />
                </Button>

              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-wlbiz-pink flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Button className=" gradient-primary w-10 h-10 md:w-12 md:h-12 rounded-full">
                  <Facebook size={20} className="" />
                </Button>
              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-wlbiz-pink flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Button className=" gradient-primary w-10 h-10 md:w-12 md:h-12 rounded-full">
                  <Instagram size={18} className="" />
                </Button>

              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-wlbiz-cyan flex items-center justify-center hover:opacity-80 transition-opacity text-background"
              >

                <Button className=" gradient-primary w-10 h-10 md:w-12 md:h-12 rounded-full">
                  <Twitter size={30} className="" />
                </Button>

              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="flex gap-4 md:gap-6">
            <Link to="/privacy" className="text-foreground font-semibold hover:text-primary text-sm md:text-base">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-foreground font-semibold hover:text-primary text-sm md:text-base">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
