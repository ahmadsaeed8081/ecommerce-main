import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, ArrowLeft } from "lucide-react";
import { useState } from "react";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "johndoe",
    email: "john@example.com",
    fullName: "John Doe",
    phone: "+1 234 567 8900",
    walletAddress: "0x1234567890abcdef",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Saved:", formData);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/profile?tab=personal-info" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">Edit Profile</h1>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary overflow-hidden border-4 border-wlbiz-purple/30">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 rounded-full gradient-primary flex items-center justify-center shadow-lg"
                  >
                    <Camera size={16} className="text-white" />
                  </button>
                </div>
                <p className="text-muted-foreground text-sm mt-3">Click to change profile picture</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-wlbiz-purple"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Username</label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-wlbiz-purple"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-wlbiz-purple"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-wlbiz-purple"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Wallet Address</label>
                  <Input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleChange}
                    className="bg-secondary border-border focus:border-wlbiz-purple"
                    placeholder="Enter your wallet address"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">Wallet address cannot be changed</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button 
                  type="submit" 
                  className="flex-1 gradient-primary text-white rounded-full py-6"
                >
                  Save Changes
                </Button>
                <Link to="/profile?tab=personal-info" className="flex-1">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full rounded-full py-6 border-border"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
