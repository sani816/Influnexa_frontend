import { useEffect, useState } from "react";
import axios from "axios";
import Config from "../config/Config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Campaigns(){

  const [campaigns,setCampaigns] = useState([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    fetchCampaigns();

  },[]);


  const fetchCampaigns = async()=>{

    try{

      const res = await axios.get(
        `${Config.API_URL}/api/campaigns`
      );

      setCampaigns(res.data);

    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };


return (
<>

<Navbar />
<div className="min-h-screen bg-gray-950 text-white px-6 py-10">


<h1 className="text-4xl md:text-6xl font-bold text-center">
  Active Campaigns
</h1>

<p className="text-center text-gray-400 mt-4">
  Discover influencer collaboration opportunities from brands
</p>



{
loading ?

(
<div className="text-center mt-10">
Loading Campaigns...
</div>
)

:

campaigns.length === 0 ?

(
<div className="text-center mt-10 text-gray-400">
No campaigns available currently
</div>
)

:

(
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">


{
campaigns.map((campaign)=>(


<div
key={campaign._id}
className="
bg-white/10
backdrop-blur-lg
border
border-white/20
rounded-2xl
p-6
hover:scale-105
transition
"
>


{/* Brand Image */}

<div className="flex items-center gap-4">


<img
src={
campaign.brandLogo ||
"https://via.placeholder.com/80"
}
className="
w-16
h-16
rounded-full
object-cover
"
/>


<div>

<h2 className="text-xl font-bold">
{campaign.brandName}
</h2>

<p className="text-gray-400">
{campaign.industry}
</p>

</div>


</div>




<h3 className="text-2xl font-semibold mt-6">
{campaign.title}
</h3>



<p className="text-gray-300 mt-3 line-clamp-3">
{campaign.description}
</p>



<div className="mt-5 space-y-2 text-sm">


<p>
💰 Budget:
<span className="text-cyan-400">
 {campaign.budget}
</span>
</p>


<p>
🎯 Category:
<span className="text-purple-400">
 {campaign.category}
</span>
</p>



<p>
👥 Required Followers:
<span className="text-green-400">
 {campaign.followersRange}
</span>
</p>


</div>




<button
className="
mt-6
w-full
bg-cyan-600
hover:bg-cyan-700
py-3
rounded-xl
font-semibold
"
>

Apply Campaign

</button>

</div>
))
}

</div>
)}
</div>
<Footer />
</>
)

}