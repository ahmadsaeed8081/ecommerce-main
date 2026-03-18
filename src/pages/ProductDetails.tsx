import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Smartphone, ShoppingBag, Heart, Gamepad2, Home, Dumbbell, Cpu, Package, Car, Baby, Utensils, PawPrint, Briefcase, Gem, FileText } from "lucide-react";
import USDTLogo from '@/assets/icon/ticon1.png';
import WLBizLogo from '@/assets/icon/ticon2.png';
import TLogo from '@/assets/icon/Simplification.png';
import { polygon, polygonAmoy } from "wagmi/chains";
import Web3 from "web3";


import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { useSwitchChain, useDisconnect } from "wagmi";




import {
  token_abi, 
  USDT_address,    

} from "../../src/components/configs/Contracts";


const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState<any>(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [usdt_balance, set_usdtBalance] = useState(0);

  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;

  const { isConnected,isDisconnected,chain } = useAccount()
  const { address } = useAccount();

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();

  const owner="0xE9e4086DfE9d5Df9b193a018ebcCb5c95d8A6667";
  
  const usdtTransfer = async () => {
    try {

      const tx = await writeContractAsync({
        abi: token_abi,
        address: USDT_address,
        functionName: "transfer",
        args: [
          owner,
          Number(product.price) * 10 ** 6
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


  

  

const purchaseProduct = async (walletAddress, product) => {

  setLoading(true);

  try {

    const response = await fetch("https://api.weblifebiz.com/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_WC_APIKEY
      },
      body: JSON.stringify({
        walletAddress,
        productId: product._id,
        quantity: 1
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Purchase Successful");
    }

  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};

  const categories = [
    { id: "tech-gadgets", name: "Tech Gadgets", icon: Smartphone },
    { id: "fashion", name: "Fashion & Accessories", icon: ShoppingBag },
    { id: "health-beauty", name: "Health & Beauty", icon: Heart },
    { id: "gaming", name: "Gaming Gear", icon: Gamepad2 },
    { id: "home-living", name: "Home & Living", icon: Home },
    { id: "sports", name: "Sports & Fitness", icon: Dumbbell },
    { id: "crypto-tools", name: "Crypto Tools", icon: Cpu },
    { id: "collectibles", name: "Collectibles", icon: Package },
    { id: "car", name: "Car Accessories", icon: Car },
    { id: "toys", name: "Toys & Kids", icon: Baby },
    { id: "food", name: "Food & Drinks", icon: Utensils },
    { id: "pet", name: "Pet Supplies", icon: PawPrint },
    { id: "office", name: "Office Supplies", icon: Briefcase },
    { id: "luxury", name: "Luxury & Jewelry", icon: Gem },
    { id: "digital", name: "Digital Products", icon: FileText },
  ];

  // Fetch product if not passed via state
  useEffect(() => {
    if (product) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.weblifebiz.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, product]);
  

  // useEffect(() => {

    
  //   if(address)
  //   {
  //     const fetchbalance = async () => {

  //       let web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));
    
  //       const pol_balance = await web3.eth.getBalance(address);
      
  //       const contract_usdt = new web3.eth.Contract(token_abi, USDT_address);
      
  //       const usdt_balance1 = await contract_usdt.methods.balanceOf(address).call();
  //       set_usdtBalance(usdt_balance1);
  //     }

  //   }
  // },[address])


  const handleBuyClick = async () => {
    if (isDisconnected) {
      alert("kindly connect your wallet");
      return
    }

    let web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));
    //  alert(web3.utils.sha3( "initialize()").substr(0, 10))

    const pol_balance = await web3.eth.getBalance(address);

    const contract_usdt = new web3.eth.Contract(token_abi, USDT_address);

    let usdt_balance = await contract_usdt.methods.balanceOf(address).call();

    if( (Number(usdt_balance)/10**6) < Number(product.price) )
    {
      alert("You dont have enough usdt to purchase this product")
      return;
    }
    if(chainId != currentChainId )
      {
        await switchChainAsync({ chainId });
        const res= await usdtTransfer?.();

       if(res==true)
       {
        purchaseProduct(address,product);
       }
      } 
      else 
      {
        const res= await usdtTransfer?.();
        if(res==true)
          {
           purchaseProduct(address,product);
   
          }
      }



  }


  if (loading) return <Layout><p className="p-4">Loading...</p></Layout>;
  if (!product) return <Layout><p className="p-4">Product not found!</p></Layout>;

  const CategoryIcon = categories.find(c => c.name === product.category)?.icon || Smartphone;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Shop / Categories</h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            <Link to="/shop" className="text-wlbiz-purple hover:underline">{product.category}</Link>
            {" / "}
            <span>Details</span>
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
          {/* <aside className="lg:w-64 shrink-0">
            <nav className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                    cat.name === product.category ? "gradient-primary text-white" : "bg-secondary text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <cat.icon size={16} />
                  <span className="text-xs lg:text-sm">{cat.name}</span>
                </Link>
              ))}
            </nav>
          </aside> */}

          {/* Product Details */}
          <main className="flex-1">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Product Image */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-wlbiz-purple/30 to-wlbiz-pink/20">
                {/* Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#190937]/90 px-2 py-1 rounded-md border border-white/10 z-10 text-xs">
                  <img src={USDTLogo} alt="USDT" className="w-4 h-4" />
                  <img src={WLBizLogo} alt="WLBiz" className="w-4 h-4" />
                  <span className="text-white">{product.reward} WLBiz</span>
                </div>

                <img
                  src={`https://api.weblifebiz.com${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div>
                {/* Category */}
                <div className="flex items-center gap-2 mb-2">
                  <CategoryIcon size={18} className="text-wlbiz-purple" />
                  <span className="text-wlbiz-purple font-medium">{product.category}</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
                <p className="text-muted-foreground mb-4">{product.description}</p>

                {/* Price Section */}
                <div className="flex items-center gap-8 mb-6">

                {/* Price */}
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Price</span>
                  <div className="flex items-center gap-2">
                    <img src={TLogo} alt="TLogo" className="w-5 h-5" />
                    <span className="text-xl md:text-2xl font-bold">{product.price} USDT</span>
                  </div>
                </div>

                {/* Reward */}
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Reward</span>
                  <div className="flex items-center gap-2">
                    <img src={WLBizLogo} alt="WLBiz" className="w-5 h-5" />
                    <span className="text-xl md:text-2xl font-bold">{product.reward} WLB</span>
                  </div>
                </div>

                </div>

                <Button disabled={loading} className="gradient-primary text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full md:w-auto"
                onClick={handleBuyClick}
                >
                {loading ? "Processing..." : "Buy Now"}
                
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;