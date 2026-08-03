import {useEffect,useState} from "react";
import axios from "axios";
import Config from "../config/Config";
import Papa from "papaparse";
import {saveAs} from "file-saver";


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
// transactionId:"",
amount:999

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

            alert("Please enter your email first");
            return;

        }


        const res = await axios.get(
            `${Config.API_URL}/api/payment/status/${payment.email}`
        );


        console.log("Payment Status:",res.data);


        setPaymentStatus(res.data);



        if(
            res.data.approved === true &&
            res.data.downloaded === false
        ){

            setDownloadAllowed(true);


            alert(
                "Payment Approved. Download unlocked."
            );

        }

        else if(
            res.data.downloaded === true
        ){

            setDownloadAllowed(false);


            alert(
                "Download already used."
            );

        }

        else{


            setDownloadAllowed(false);


            alert(
                "Payment is still pending."
            );


        }


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


// formData.append(
// "transactionId",
// payment.transactionId
// );


formData.append(
"amount",
999
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

setPayment({

name:"",
email:"",
phone:"",
paymentApp:"Google Pay",
// transactionId:"",
amount:999

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




const exportData = filtered.map((creator)=>({



FullName:
creator.fullName || "",



Email:
creator.email || "",



Phone:
creator.mobileNumber || "",



Instagram:
creator.instagramUsername || "",



InstagramLink:
creator.instagramLink || "",



Followers:
creator.followersRange || "",



Category:
creator.preferredCategory?.join(",") || "",



Campaign:
creator.campaignTypes?.join(",") || "",



City:
creator.city || "",



State:
creator.state || "",



Youtube:
creator.youtubeName || "",



YoutubeSubscribers:
creator.youtubeSubs || ""



}));





const csv = Papa.unparse(exportData);



const blob = new Blob(

[csv],

{
type:"text/csv;charset=utf-8;"
}

);



saveAs(
blob,
"InfluNexa_Creators.csv"
);





// LOCK DOWNLOAD AFTER DOWNLOAD


await axios.put(

`${Config.API_URL}/api/payment/lock-download/${paymentStatus._id}`

);



setDownloadAllowed(false);



alert(
"Download completed. Access locked."
);



}


catch(err){


console.log(err);


alert(
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


<thead className="bg-cyan-500 text-black">


<tr>


<th className="p-3">

Sl No.

</th>


<th className="p-3">

Image

</th>


<th className="p-3">

Name

</th>


<th className="p-3">

Instagram

</th>


<th className="p-3">

Followers

</th>


<th className="p-3">

Email

</th>


<th className="p-3">

Phone

</th>


<th className="p-3">

Category

</th>


<th className="p-3">

City

</th>


</tr>


</thead>




<tbody>



{

loading ?


<tr>

<td

colSpan="9"

className="text-center p-10"

>

Loading...

</td>

</tr>



:


filtered.length===0 ?


<tr>

<td

colSpan="9"

className="text-center p-10 text-red-400"

>

No Creator Found

</td>

</tr>



:



filtered.map((creator,index)=>(


<tr

key={creator._id}

className="border-b border-gray-700 hover:bg-gray-900"

>


<td className="p-3">

{index+1}

</td>



<td className="p-3">


{

creator.image ?


<img

src={creator.image}

className="w-14 h-14 rounded object-cover"

/>


:

"N/A"

}


</td>




<td className="p-3">

{creator.fullName || "N/A"}

</td>



<td className="p-3">


{

creator.instagramLink ?


<a

href={creator.instagramLink}

target="_blank"

className="text-cyan-400 underline"

>

{creator.instagramUsername}

</a>


:

"N/A"

}


</td>



<td className="p-3">

{creator.followersRange || "N/A"}

</td>




<td className="p-3">

{creator.email || "N/A"}

</td>



<td className="p-3">

{creator.mobileNumber || "N/A"}

</td>



<td className="p-3">


{

creator.preferredCategory?.join(", ")

|| 

"N/A"

}


</td>



<td className="p-3">

{creator.city || "N/A"}

</td>



</tr>


))


}



</tbody>


</table>


</div>






{/* ================= PAYMENT MODAL ================= */}



{

showPayment &&


<div

className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"

>


<div

className="bg-gray-900 p-8 rounded-xl w-full max-w-xl"

>



<h2 className="text-2xl font-bold text-cyan-400 mb-5">

Complete Payment

</h2>




<div className="bg-black p-5 rounded mb-5">


<h3 className="text-yellow-400 text-xl font-bold">

Pay ₹999

</h3>


<p className="mt-3">

UPI ID :

<span className="text-cyan-400">

influnexa@upi

</span>

</p>



<img
  src="https://res.cloudinary.com/bfddbfaz/image/upload/v1723456789/WhatsApp_Image_2026-08-03_at_12.11.25_PM_wkxtjh.jpg"
  alt="Payment QR"
  className="w-30 h-30 rounded-lg border-4 border-cyan-500 object-contain"
/>
</div>


{/* PAYMENT FORM */}


<input

className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"

placeholder="Full Name"

value={payment.name}

onChange={(e)=>

setPayment({

...payment,

name:e.target.value

})

}

/>



<input

className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"

placeholder="Email"

type="email"

value={payment.email}

onChange={(e)=>

setPayment({

...payment,

email:e.target.value

})

}

/>




<input

className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"

placeholder="Phone Number"

value={payment.phone}

onChange={(e)=>

setPayment({

...payment,

phone:e.target.value

})

}

/>





<select

className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"

value={payment.paymentApp}

onChange={(e)=>

setPayment({

...payment,

paymentApp:e.target.value

})

}

>


<option>

Google Pay

</option>


<option>

PhonePe

</option>


<option>

Paytm

</option>


<option>

UPI

</option>


<option>

Bank Transfer

</option>


</select>





{/* <input

className="w-full p-3 mb-3 rounded bg-gray-800 border border-cyan-500"

placeholder="Transaction ID"

value={payment.transactionId}

onChange={(e)=>

setPayment({

...payment,

transactionId:e.target.value

})

}

/> */}




<input

type="file"

accept="image/*"

className="w-full mb-5"

onChange={(e)=>

setScreenshot(e.target.files[0])

}

/>






<div className="flex gap-3">



<button

onClick={()=>setShowPayment(false)}

className="w-1/2 bg-red-600 py-3 rounded-lg"

>

Cancel

</button>





<button

onClick={submitPayment}

className="w-1/2 bg-green-600 py-3 rounded-lg font-bold"

>

Submit Payment

</button>

<button

onClick={checkPaymentStatus}

className="w-full mt-4 bg-blue-600 py-3 rounded-lg"

>

Check Payment Approval

</button>


</div>



</div>


</div>


}



</div>


);


}



export default Subscription;





