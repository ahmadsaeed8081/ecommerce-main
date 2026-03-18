import Layout from "@/components/layout/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { Wallet, Gift, ArrowDownCircle, DollarSign, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import TLogo from '@/assets/icon/Simplification.png';
import USDTLogo from '@/assets/icon/ticon1.png';
import WLBizLogo from '@/assets/icon/ticon2.png';
import investment from '@/assets/icon/investment.png';
import reward from '@/assets/icon/reward.png';
import withdraw from '@/assets/icon/withdrawal.png';
import wallet from '@/assets/icon/balance.png';
import { useEffect } from "react";


import { polygon, polygonAmoy } from "wagmi/chains";
import Web3 from "web3";


import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { useSwitchChain, useDisconnect } from "wagmi";

import {
  token_abi, 
  USDT_address,    

} from "../../src/components/configs/Contracts";


const Profile = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "account-balances";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    walletAddress:"",
    name: "",
    Lname: "",
    phone: "",
    email: "",
    address: "",
    country:"",
    city:"",
    status:""
  });
  const [user, setuser] = useState({
    totalInvestment:"",
    totalReward: "",
    totalWithdrawn:"",
    currentBalance:""

  });

  const tabs = [
    { id: "personal-info", name: "Personal Info" },
    { id: "account-balances", name: "Account Balances" },
    { id: "purchase-details", name: "Purchase Details" },
  ];

  const stats = [
    { 
      icon: investment, 
      label: "Total Investment", 
      value: user.totalInvestment + "$" ||0+ "$" , 
      iconBg: "bg-wlbiz-purple/30",
    },
    { 
      icon: reward, 
      label: "Total Reward", 
      value: user.totalReward+ " WLB" ||0+ " WLB" , 
      iconBg: "bg-green-500/30",
    },
    
    { 
      icon: withdraw, 
      label: "Total Withdraw", 
      value: user.totalWithdrawn + " WLB" ||0+ " WLB" , 
      iconBg: "bg-orange-500/30",
    },
    { 
      icon: Wallet, 
      label: "Current Balance", 
      value: user.currentBalance + " WLB" ||0+ " WLB" , 
      iconBg: "bg-wlbiz-purple/30",
      hasButton: true 
    },
  ];

  // const purchases = [
  //   { id: 1, name: "iPhone 15 Pro", category: "Tech Gadgets", price: "$50", wlbiz: "500", date: "Jan 10, 2024", description: "Latest Apple smartphone with A17 Pro chip, 48MP camera, and titanium design.", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop" },
  //   { id: 2, name: "iPhone 15 Pro", category: "Tech Gadgets", price: "$50", wlbiz: "500", date: "Jan 10, 2024", description: "Latest Apple smartphone with A17 Pro chip, 48MP camera, and titanium design.", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop" },
  //   { id: 3, name: "iPhone 15 Pro", category: "Tech Gadgets", price: "$50", wlbiz: "500", date: "Jan 10, 2024", description: "Latest Apple smartphone with A17 Pro chip, 48MP camera, and titanium design.", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop" },
  //   { id: 4, name: "iPhone 15 Pro", category: "Tech Gadgets", price: "$50", wlbiz: "500", date: "Jan 10, 2024", description: "Latest Apple smartphone with A17 Pro chip, 48MP camera, and titanium design.", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop" },
  //   { id: 5, name: "iPhone 15 Pro", category: "Tech Gadgets", price: "$50", wlbiz: "500", date: "Jan 10, 2024", description: "Latest Apple smartphone with A17 Pro chip, 48MP camera, and titanium design.", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop" },
  // ];




  const { isConnected,isDisconnected,chain } = useAccount()
  const { address } = useAccount();




  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;


  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();
  
  const [purchases, setPurchases] = useState([]);
  

  const owner="0xE9e4086DfE9d5Df9b193a018ebcCb5c95d8A6667";
  
  const usdtTransfer = async () => {
    try {

      const tx = await writeContractAsync({
        abi: token_abi,
        address: USDT_address,
        functionName: "transfer",
        args: [
          owner,
          100,
        ],
        chain: {
          id: 137,
          name: 'Polygon',
          nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
          rpcUrls: {
            default: {
              http: ['https://poly.api.pocket.network'],
            },
          },
          blockExplorers: {
            default: {
              name: 'PolygonScan',
              url: 'https://polygonscan.com',
              apiUrl: 'https://api.polygonscan.com/api',
            },
          },
          contracts: {
            multicall3: {
              address: '0xca11bde05977b3631167028862be2a173976ca11',
              blockCreated: 25770160,
            },
          },
        },
        account: address
      });



      console.log(tx);
      return true;

    } catch (err) {
      console.error(err);
    }
  };




  const getUserPurchases = async (walletAddress) => {

    try {

      const response = await fetch(
        `https://api.weblifebiz.com/api/user/purchases/${walletAddress}`
      );
      const data = await response.json();
  
      if (response.ok) {

        console.log("Purchases:", data);
        setPurchases(data.purchases);
      } else {

        console.log(data.message);
  
      }
  
    } catch (error) {
  
      console.error("Error fetching purchases:", error);
  
    }
  
  };
  const getUserinfo = async (walletAddress) => {

    try {

      const response = await fetch(
        `https://api.weblifebiz.com/api/user/info/${walletAddress}`

      );
      const data = await response.json();
  
      if (response.ok && data.user!=null ) {

        setFormData(data.user)
        console.log("user data", data.user)
        
      } else {

        console.log(data.message);
  
      }
  
    } catch (error) {
  
      console.error("Error fetching purchases:", error);
  
    }
  
  };
  

  useEffect(() => {

    if(address)
      {
      getUserPurchases(address);
      setFormData({ ...formData, walletAddress:address });
      getUserinfo(address);
      getUserInvestmentSummary(address);
    }
   
   }, [address]);


   // userData = { walletAddress, name, email, phone, country, city }
 const saveUserInfo = async (userData) => {

  if (isDisconnected) {
    alert("kindly connect your wallet");
    return
  }


  try {
    const response = await fetch(`https://api.weblifebiz.com/api/user/save/`
, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error saving user info:", errorData);
      return null;
    }

    const data = await response.json();
    console.log(data.message);
    return data.user;
  } catch (error) {
    console.error("Error saving user info:", error);
    return null;
  }
};



const getUserInvestmentSummary = async (walletAddress) => {
  try {
    const res = await fetch(`https://api.weblifebiz.com/api/user/summary/${walletAddress}`);
    const data = await res.json();

    setuser(data);

  } catch (error) {
    console.error("Error fetching summary:", error);

  }
};


async function withdrawReward(walletAddress){

  try{

    const res = await fetch(`https://api.weblifebiz.com/api/user/reward/claim/${walletAddress}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }
    });

    const data = await res.json();

    if(!res.ok){
      throw new Error(data.message)
    }
    else{
      alert(data.message)
    }

    return data;

  }catch(err){

    alert(err.message)

  }

}

  const handleWithdrawClick = async () => {
    if (isDisconnected) {
      alert("kindly connect your wallet");
      return
    }

    let web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));
    //  alert(web3.utils.sha3( "initialize()").substr(0, 10))

    // const pol_balance = await web3.eth.getBalance(address);

    // const contract_usdt = new web3.eth.Contract(token_abi, USDT_address);

    // let usdt_balance = await contract_usdt.methods.balanceOf(address).call();

    // if( (Number(usdt_balance)/10**18) < Number(product.price) )
    // {
    //   alert("You dont have enough usdt to purchase this product")
    //   return;
    // }
    if(chainId != currentChainId )
      {
        await switchChainAsync({ chainId });
        // const res= await usdtTransfer?.();

      //  if(res==true)
      //  {
        withdrawReward(address);
      //  }
      } 
      else 
      {
        // const res= await usdtTransfer?.();
        // if(res==true)
        //   {
            withdrawReward(address);
   
          // }
      }



  }


  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Profiles</h1>

        {/* Tabs - Horizontal scroll on mobile */}
        <div className="flex gap-4 md:gap-8 border-b border-border mb-6 md:mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={`/profile?tab=${tab.id}`}
              className={`pb-3 md:pb-4 px-1 md:px-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                activeTab === tab.id
                  ? "text-wlbiz-purple border-b-2 border-wlbiz-purple"
                  : "text-white hover:text-foreground"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>

        {/* Account Balances Tab */}
        {activeTab === "account-balances" && (
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Account Balances & Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="rounded-xl md:rounded-2xl p-4 md:p-6 text-center"
                  style={{
                    background: '#1A0936',
                    border: '1px solid #29164E',
                    boxShadow: '4px 4px 32px 2px #0A041652'
                  }}
                >
                  {/* <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-xl flex items-center justify-center`}>
                    {stat.hasButton ? (
                      <img src={wallet} alt="Wallet" className="" />
                    ) : (
                      <img src={stat.icon} alt={stat.label} className="" />
                    )}
                  </div> */}
                  <p className="text-white text-xs md:text-sm mb-1 md:mb-2">{stat.label}</p>
                  <p className="text-white text-lg md:text-2xl font-bold">{stat.value}</p>
                  {stat.hasButton && (
                    <Button className="mt-3 md:mt-4 gradient-primary text-white h-[48px] w-full text-xs md:text-sm py-2 gap-2"
                    onClick={handleWithdrawClick}
                    >
                      <Wallet size={14} />
                      Withdraw Funds
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Purchase Details Tab */}
        {activeTab === "purchase-details" && (
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-2">Purchase Details</h2>
            <h3 className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">Recent Purchase</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {purchases.map((purchase,index) => (
                <div 
                  key={purchase.productId._id} 
                  className="rounded-xl overflow-hidden transition-all"
                  style={{
                    background: '#1A0936',
                    border: '1px solid #29164E',
                    boxShadow: '4px 4px 32px 2px #0A041652'
                  }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    {/* Product image */}
                    <img
                      src={`http://localhost:8000${purchase.productId.image}`}
                      alt={purchase.productId.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge overlay - top right */}
                    <div className="absolute top-2 right-2 bg-[#190937] flex items-center gap-1 backdrop-blur-sm px-2 py-2 rounded-md border-2 border-white/10">
                      <span className="text-yellow-400">
                        <img src={USDTLogo} alt="USDTLogo" className="" />
                      </span>
                      <span className="text-wlbiz-purple">
                        <img src={WLBizLogo} alt="WLBizLogo" className="" />
                      </span>
                      <span className="text-white text-xs font-medium">{purchase.reward} WLB</span>
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Product title */}
                    <h3 className="font-semibold text-sm md:text-base mb-2 text-white">{purchase.productId.name}</h3>
                    {/* Price section */}
                    <div className="flex items-center justify-between pt-3 gap-2">
                      {/* Prices label */}
                      <p className="text-white text-xs mb-2">Prices</p>
                      <div className="flex items-center gap-2">
                        <img src={TLogo} alt="TLogo" className="" />
                        <span className="text-white text-sm font-semibold">{purchase.productId.price}$</span>
                      </div>
                    </div>
                    {/* Purchase date */}
                    <div className="flex items-center gap-2 mt-3 text-muted-foreground text-[10px] md:text-xs">
                      <Calendar size={12} />
                      <span>Purchased:</span>
                      <span>{purchase.purchaseDate.slice(0,10)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Info Tab */}
        {activeTab === "personal-info" && (
          <div className="max-w-4xl">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Personal Information</h2>
            
            <div className="space-y-0">
              {/* Editable Fields */}
              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Your First Name
                </span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.name != null ? formData.name:""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.name != null ? formData.name:""}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Your Second Name
                </span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.Lname}
                    onChange={(e) => setFormData({ ...formData, Lname: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.Lname}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Your Phone Number
                </span>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.phone}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Your Email Address
                </span>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.email}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Your Address
                </span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.address}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  country
                </span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.country}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  city
                </span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="md:w-1/2 bg-secondary border-border focus:border-wlbiz-purple text-white"
                  />
                ) : (
                  <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.city}</span>
                )}
              </div>

              {/* Non-editable Fields */}
              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Wallet Address:
                </span>
                <span className="text-sm md:text-base md:w-1/2 text-foreground">{address?address:""}</span>
              </div>
              {formData.status!="" && formData.status!= "unknown"?(


              <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
              <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                Status:
              </span>
              <span className="text-sm md:text-base md:w-1/2 text-foreground">{formData.status?formData.status:""}</span>
            </div>
              ):("")

              }

              {/* <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-border/50">
                <span className="text-white text-sm md:text-base md:w-1/2 mb-1 md:mb-0">
                  Membership Level:
                </span>
                <span className="text-sm md:text-base md:w-1/2 text-wlbiz-pink">Gold Member</span>
              </div> */}
            </div>
            

            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 mb-4 md:mb-6">
                <Button 
                  onClick={() => {
                    // Handle save logic here
                    console.log("Saved:", formData);
                    saveUserInfo(formData)
                    setIsEditing(false);
                  }}
                  className="flex-1 gradient-primary text-white rounded-lg md:py-6 py-4 gap-2 text-base relative z-10"
                >
                  Save Changes
                </Button>
                <Button 
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 rounded-lg md:py-6 py-4 border-border text-base relative z-10"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)}
                className="w-full gradient-primary text-white rounded-lg py-6 gap-2 text-base mt-6 md:mt-8 mb-4 md:mb-6 relative z-10"
              >
                <Pencil size={18} />
                Edit Info
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
