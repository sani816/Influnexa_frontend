import {useEffect,useState} from "react";
import axios from "axios";
import Config from "../config/Config";
import Papa from "papaparse";
import {saveAs} from "file-saver";
import PaymentQR from "../components/PaymentQR";

function Subscription(){

const [creators,setCreators]=useState([]);

const [filtered,setFiltered]=useState([]);

const [loading,setLoading]=useState(true);


// FILTER STATES

const [nameFilter,setNameFilter]=useState("");
const [emailFilter,setEmailFilter]=useState("");
const [cityFilter,setCityFilter]=useState("");
const [categoryFilter,setCategoryFilter]=useState("");
const [followersFilter,setFollowersFilter]=useState("");
const [instagramFilter,setInstagramFilter]=useState("");



// PAYMENT STATES

const [showPayment,setShowPayment]=useState(false);

const [paymentStatus,setPaymentStatus]=useState(null);

const [downloadAllowed,setDownloadAllowed]=useState(false);


const [payment,setPayment]=useState({

name:"",
email:"",
phone:"",
paymentApp:"Google Pay",
transactionId:"",
amount:99

});


const [screenshot,setScreenshot]=useState(null);



// ================================
// FETCH CREATORS
// ================================


useEffect(()=>{


fetchCreators();


},[]);



const fetchCreators=async()=>{


try{


const res=await axios.get(
`${Config.API_URL}/api/creator`
);


setCreators(res.data.creators || []);

setFiltered(res.data.creators || []);



}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}


};



// ================================
// FILTER LOGIC
// ================================


useEffect(()=>{


let data=[...creators];



if(nameFilter){

data=data.filter(c=>

c.fullName
?.toLowerCase()
.includes(
nameFilter.toLowerCase()
)

);

}



if(emailFilter){

data=data.filter(c=>

c.email
?.toLowerCase()
.includes(
emailFilter.toLowerCase()
)

);

}



if(cityFilter){

data=data.filter(c=>

c.city
?.toLowerCase()
.includes(
cityFilter.toLowerCase()
)

);

}



if(categoryFilter){

data=data.filter(c=>

c.preferredCategory
?.join(",")
.toLowerCase()
.includes(
categoryFilter.toLowerCase()
)

);

}




if(followersFilter){

data=data.filter(c=>

c.followersRange
?.toString()
.includes(
followersFilter
)

);

}



if(instagramFilter){

data=data.filter(c=>

c.instagramUsername
?.toLowerCase()
.includes(
instagramFilter.toLowerCase()
)

);

}



setFiltered(data);



},[
creators,
nameFilter,
emailFilter,
cityFilter,
categoryFilter,
followersFilter,
instagramFilter
]);

// ================================
// CHECK PAYMENT APPROVAL STATUS
// ================================

const checkPaymentStatus = async()=>{

try{

if(!payment.email){

alert("Please enter your payment email first");
return;

}


const res = await axios.get(
`${Config.API_URL}/api/payment/status/${payment.email}`
);


console.log(res.data);


// no payment found
if(!res.data.success){

setDownloadAllowed(false);

alert("No payment found.");

return;

}


// already downloaded
if(res.data.downloaded === true){

setDownloadAllowed(false);

setPaymentStatus(null);

alert(
"Download already used. Please make a new payment."
);

return;

}


// approved and not downloaded

if(
res.data.approved === true &&
res.data.downloaded === false
){

setPaymentStatus({

...res.data,

_id:res.data.paymentId

});


setDownloadAllowed(true);


alert(
"Payment approved. Download unlocked for one time only."
);


return;

}


// pending

setDownloadAllowed(false);


alert(
"Payment is pending approval."
);



}
catch(err){

console.log(err);

alert(
err.response?.data?.message ||
"Unable to check payment status"
);


}

};
const submitPayment = async()=>{


try{


if(!screenshot){

alert("Upload payment screenshot");

return;

}



const formData=new FormData();


formData.append(
"name",
payment.name
);


formData.append(
"email",
payment.email
);


formData.append(
"phone",
payment.phone
);


formData.append(
"paymentApp",
payment.paymentApp
);


formData.append(
"transactionId",
payment.transactionId
);


formData.append(
"amount",
1
);


formData.append(
"screenshot",
screenshot
);



await axios.post(

`${Config.API_URL}/api/payment/submit`,

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



alert(
"Payment submitted. Wait for admin approval."
);



setShowPayment(false);

setPaymentStatus(null);

setDownloadAllowed(false);

setPayment({

name:"",
email:"",
phone:"",
paymentApp:"Google Pay",
transactionId:"",
amount:1

});


setScreenshot(null);


}

catch(err){

console.log(err);

alert(
err.response?.data?.message ||
"Payment Failed"
);


}


};


// ================================
// DOWNLOAD CSV
// ================================

const downloadCSV = async()=>{

try{


if(!downloadAllowed){

alert(
"Please complete payment approval first."
);

return;

}


// FIRST CHECK BACKEND

const res = await axios.post(
`${Config.API_URL}/api/payment/download`,
{
email:payment.email,
filterData:{
  name: nameFilter,
        email: emailFilter,
        city: cityFilter,
        category: categoryFilter,
        followers: followersFilter,
        instagram: instagramFilter
}
}
);



if(!res.data.success){

alert(
"Payment expired. Please purchase again."
);

return;

}



const creators=res.data.creators;



const exportData = creators.map((creator) => ({

  // Instagram
  InstagramUsername: creator.instagramUsername || "",
  InstagramLink: creator.instagramLink || "",
  Followers: creator.followersRange || "",

  // Personal
  FullName: creator.fullName || "",
  Email: creator.email || "",
  MobileNumber: creator.mobileNumber || "",
  WhatsAppNumber: creator.whatsappNumber || "",

  // Basic
  Gender: creator.gender || "",
  DOB: creator.dob || "",

  // Categories
  PreferredCategory:
    creator.preferredCategory?.join(", ") || "",

  CampaignTypes:
    creator.campaignTypes?.join(", ") || "",

  // Rates
  ReelRate: creator.reelRate || "",
  StoryRate: creator.storyRate || "",
  PostRate: creator.postRate || "",

  // YouTube
  HasYoutube: creator.hasYoutube || "",

  YoutubeName: creator.youtubeName || "",
  YoutubeLink: creator.youtubeLink || "",
  YoutubeSubscribers: creator.youtubeSubs || "",

  YoutubeVideoRate: creator.ytVideoRate || "",
  YoutubeShortRate: creator.ytShortsRate || "",

  // Address
  Address1: creator.address1 || "",
  Address2: creator.address2 || "",

  City: creator.city || "",
  State: creator.state || "",
  Pincode: creator.pincode || "",

  AddressType: creator.addressType || "",
  CanReceiveProducts: creator.canReceiveProducts || "",

  // Brands
  BrandNames: creator.brandNames || "",

  // Image
  Image: creator.image || "",

  // Consents
  Consent1: creator.consent1 ? "Yes" : "No",
  Consent2: creator.consent2 ? "Yes" : "No",
  Consent3: creator.consent3 ? "Yes" : "No",

  // Registration
  RegisteredOn: creator.createdAt
    ? new Date(creator.createdAt).toLocaleString()
    : ""

}));




const csv=Papa.unparse(exportData);



const blob=new Blob(
[csv],
{
type:"text/csv;charset=utf-8;"
}
);



saveAs(
blob,
"InfluNexa_Creators.csv"
);



// lock frontend

setDownloadAllowed(false);

setPaymentStatus(null);



alert(
"Download completed. Please make new payment for next download."
);



}
catch(err){

console.log(err);


alert(
err.response?.data?.message ||
"Download failed"
);


}


};
return (

<div className="min-h-screen bg-gray-950 p-8 text-white">


<h1 className="text-4xl font-bold text-cyan-400 mb-8">

Creator Data Subscription

</h1>

{/* ================= FILTER SECTION ================= */}


<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">


<input

placeholder="Search Name"

value={nameFilter}

onChange={(e)=>setNameFilter(e.target.value)}

className="p-3 rounded bg-gray-900 border border-cyan-500"

/>


<input

placeholder="Search Email"

value={emailFilter}

onChange={(e)=>setEmailFilter(e.target.value)}

className="p-3 rounded bg-gray-900 border border-cyan-500"

/>



<input

placeholder="Search City"

value={cityFilter}

onChange={(e)=>setCityFilter(e.target.value)}

className="p-3 rounded bg-gray-900 border border-cyan-500"

/>



<input

placeholder="Search Category"

value={categoryFilter}

onChange={(e)=>setCategoryFilter(e.target.value)}

className="p-3 rounded bg-gray-900 border border-cyan-500"

/>



<input

placeholder="Search Followers"

value={followersFilter}

onChange={(e)=>setFollowersFilter(e.target.value)}

className="p-3 rounded bg-gray-900 border border-cyan-500"

/>



<input

placeholder="Instagram Username"

value={instagramFilter}

onChange={(e)=>setInstagramFilter(e.target.value)}

className="p-3 rounded bg-gray-900 border border-cyan-500"

/>



</div>





{/* ================= DOWNLOAD BUTTON ================= */}


{
filtered.length > 0 &&

<div className="flex justify-end mb-6">


<button

onClick={

downloadAllowed

?

downloadCSV

:

()=>setShowPayment(true)

}

className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold"

>


{

downloadAllowed

?

"⬇ Download CSV"

:

"🔒 Unlock Download"

}



</button>


</div>

}





{/* ================= CREATOR TABLE ================= */}



<div className="overflow-x-auto border border-cyan-500 rounded-xl">


<table className="w-max min-w-full text-sm">


<thead className="bg-cyan-500 text-black sticky top-0 z-10">

<tr>

<th className="px-4 py-3 text-left">
#
</th>

<th className="px-4 py-3 whitespace-nowrap">
Image
</th>

<th className="px-4 py-3 whitespace-nowrap">
Full Name
</th>

<th className="px-4 py-3 whitespace-nowrap">
Instagram
</th>

<th className="px-4 py-3 whitespace-nowrap">
Followers
</th>

<th className="px-4 py-3 whitespace-nowrap">
Email
</th>

<th className="px-4 py-3 whitespace-nowrap">
Mobile
</th>

<th className="px-4 py-3 whitespace-nowrap">
WhatsApp
</th>

<th className="px-4 py-3">
Gender
</th>

<th className="px-4 py-3">
DOB
</th>

<th className="px-4 py-3">
Preferred Category
</th>

<th className="px-4 py-3">
Campaign Types
</th>

<th className="px-4 py-3">
Reel ₹
</th>

<th className="px-4 py-3">
Story ₹
</th>

<th className="px-4 py-3">
Post ₹
</th>

<th className="px-4 py-3">
YT Video ₹
</th>

<th className="px-4 py-3">
YT Shorts ₹
</th>

<th className="px-4 py-3">
Has YouTube
</th>

<th className="px-4 py-3">
YouTube Name
</th>

<th className="px-4 py-3">
YouTube Link
</th>

<th className="px-4 py-3">
Subscribers
</th>

<th className="px-4 py-3">
Address 1
</th>

<th className="px-4 py-3">
Address 2
</th>

<th className="px-4 py-3">
City
</th>

<th className="px-4 py-3">
State
</th>

<th className="px-4 py-3">
Pincode
</th>

<th className="px-4 py-3">
Address Type
</th>

<th className="px-4 py-3">
Receive Products
</th>

<th className="px-4 py-3">
Worked Brands
</th>

<th className="px-4 py-3">
Registered
</th>

</tr>

</thead>


<tbody>



{

loading ?


<tr>

<td

colSpan="30"

className="text-center p-10"

>

Loading...

</td>

</tr>



:


filtered.length===0 ?


<tr>

<td

colSpan="30"

className="text-center p-10 text-red-400"

>

No Creator Found

</td>

</tr>



:



filtered.map((creator, index) => (

<tr
  key={creator._id}
  className="border-b border-gray-700 hover:bg-gray-900"
>

<td className="px-4 py-3">
{index + 1}
</td>

<td className="px-4 py-3">

{creator.image ? (

<a
href={creator.image}
target="_blank"
rel="noreferrer"
>

<img
src={creator.image}
alt={creator.fullName}
className="w-14 h-14 rounded object-cover border"
/>

</a>

) : (

"N/A"

)}

</td>

<td className="px-4 py-3 whitespace-nowrap">

************

</td>

<td className="px-4 py-3 whitespace-nowrap">

{creator.instagramLink ? (

<a
href={creator.instagramLink}
target="_blank"
rel="noreferrer"
className="text-cyan-400 underline"
>

{creator.instagramUsername}

</a>

) : (

"N/A"

)}

</td>

<td className="px-4 py-3">

{creator.followersRange || "N/A"}

</td>

<td className="px-4 py-3">

********@*****

</td>

<td className="px-4 py-3">

******7890

</td>

<td className="px-4 py-3">

******7890

</td>

<td className="px-4 py-3">

{creator.gender || "N/A"}

</td>

<td className="px-4 py-3">

{creator.dob || "N/A"}

</td>

<td className="px-4 py-3">

{creator.preferredCategory?.join(", ") || "N/A"}

</td>

<td className="px-4 py-3">

{creator.campaignTypes?.join(", ") || "N/A"}

</td>

<td className="px-4 py-3">

₹ {creator.reelRate || 0}

</td>

<td className="px-4 py-3">

₹ {creator.storyRate || 0}

</td>

<td className="px-4 py-3">

₹ {creator.postRate || 0}

</td>
<td className="px-4 py-3">

₹ {creator.ytVideoRate || 0}

</td>

<td className="px-4 py-3">

₹ {creator.ytShortsRate || 0}

</td>

<td className="px-4 py-3">

{creator.hasYoutube || "No"}

</td>

<td className="px-4 py-3">

{creator.youtubeName || "N/A"}

</td>

<td className="px-4 py-3">

{creator.youtubeLink ? (

<a
href={creator.youtubeLink}
target="_blank"
rel="noopener noreferrer"
className="text-cyan-400 underline"
>

Open Channel

</a>

) : (

"N/A"

)}

</td>

<td className="px-4 py-3">

{creator.youtubeSubs || "N/A"}

</td>

<td className="px-4 py-3">

**************

</td>

<td className="px-4 py-3">

**************

</td>

<td className="px-4 py-3">

{creator.city || "N/A"}

</td>

<td className="px-4 py-3">

{creator.state || "N/A"}

</td>

<td className="px-4 py-3">

******

</td>

<td className="px-4 py-3">

{creator.addressType || "N/A"}

</td>

<td className="px-4 py-3">

{creator.canReceiveProducts || "No"}

</td>

<td className="px-4 py-3">

{creator.brandNames || "N/A"}

</td>

<td className="px-4 py-3">

{creator.createdAt
? new Date(creator.createdAt).toLocaleDateString()
: "N/A"}

</td>


</tr>


))


}



</tbody>


</table>


</div>






{/* ================= PAYMENT MODAL ================= */}


{
  showPayment && (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400">
            Complete Payment
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">

          <div className="bg-black p-5 rounded mb-5">
            <h3 className="text-yellow-400 text-xl font-bold">
              Scan QR & Pay ₹{payment.amount} for download data
            </h3>

            <p className="mt-3">
              UPI ID :
              <span className="text-cyan-400 ml-2">
                influnexa@upi
              </span>
            </p>

            <PaymentQR amount={payment.amount} />
          </div>

          <input
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"
            placeholder="Full Name"
            value={payment.name}
            onChange={(e) =>
              setPayment({
                ...payment,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"
            placeholder="Email"
            value={payment.email}
            onChange={(e) =>
              setPayment({
                ...payment,
                email: e.target.value,
              })
            }
          />

          <input
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"
            placeholder="Phone Number"
            value={payment.phone}
            onChange={(e) =>
              setPayment({
                ...payment,
                phone: e.target.value,
              })
            }
          />

          <select
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"
            value={payment.paymentApp}
            onChange={(e) =>
              setPayment({
                ...payment,
                paymentApp: e.target.value,
              })
            }
          >
            <option>Google Pay</option>
            <option>PhonePe</option>
            <option>Paytm</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>

          <input
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"
            placeholder="Transaction ID"
            value={payment.transactionId}
            onChange={(e) =>
              setPayment({
                ...payment,
                transactionId: e.target.value,
              })
            }
          />

          <input
            type="file"
            accept="image/*"
            className="w-full mb-5"
            onChange={(e) => setScreenshot(e.target.files[0])}
          />

          <div className="flex gap-3">
            <button
              onClick={() => setShowPayment(false)}
              className="flex-1 bg-red-600 py-3 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>

            <button
              onClick={submitPayment}
              className="flex-1 bg-green-600 py-3 rounded-lg font-bold hover:bg-green-700"
            >
              Submit Payment
            </button>
          </div>

          <button
            onClick={checkPaymentStatus}
            className="w-full mt-4 bg-blue-600 py-3 rounded-lg hover:bg-blue-700"
          >
            Check Payment Approval
          </button>

        </div>
      </div>
    </div>
  )
}

</div>


);


}



export default Subscription;





