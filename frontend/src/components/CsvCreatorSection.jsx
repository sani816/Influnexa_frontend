import { useEffect, useState } from "react";
import axios from "axios";
import Config from "../config/Config";
import { FaTrash, FaSync,FaEye,FaEdit } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { io } from "socket.io-client";


function CsvCreatorSection() {

  const [creators, setCreators] = useState([]);
  const [filterTimeout,setFilterTimeout] = useState(null);
  const [isFiltered,setIsFiltered] = useState(false);

  const [loading, setLoading] = useState(false);
  const [filters,setFilters] = useState({

  // Basic
  search:"",
  fullName:"",
  email:"",
  mobileNumber:"",
  whatsappNumber:"",

  // Instagram
  instagramUsername:"",
  instagramFollowersRange:"",
  exactFollowers:"",

  // Category
  category:"",

  // Personal
  gender:"",
  dob:"",
  languages:"",

  // Campaign
  campaignType:"",
  dealType:"",

  // Location
  city:"",
  state:"",
  country:"",
  pincode:"",
  landmark:"",

  // Youtube
  youtubeUsername:"",
  youtubeSubscribersRange:"",

  // Commercial
  instagramReelCommercial:"",
  instagramStoryCommercial:"",
  instagramPostCommercial:"",
  dedicatedYoutubeVideo:"",
  integratedYoutubeVideo:"",
  dedicatedYoutubeShorts:"",
  integratedYoutubeShorts:"",

  // Celebrity
  isCelebrity:"",
  celebrityType:"",

  // Platform
  availablePlatforms:"",
  platform:"",

  // Brand Data
  fetchedFromBrandPage:"",
  fetchedForBrand:"",

  // Other
  hoboUserId:"",
  bio:"",
  message:""

});



  // =========================
  // GET CSV CREATORS
  // =========================
  const fetchCreators = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
`${Config.API_URL}/api/csv-creators`,
{
 params: filters
}
);


      setCreators(
        res.data.data || []
      );


    } catch(error) {

      console.log(
        "CSV FETCH ERROR",
        error
      );

    }
    finally {

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchCreators();
    const socket = io(Config.API_URL);
socket.on(
"new-csv-creator",
(creator)=>{
setCreators((prev)=>[
creator,
...prev
]);
});

socket.on(
"update-csv-creator",
(updated)=>{


setCreators((prev)=>

prev.map((creator)=>

creator._id === updated._id
?
updated
:
creator
)
);
});
socket.on(
"delete-csv-creator",
(id)=>{
setCreators((prev)=>

prev.filter(
(creator)=>
creator._id !== id
)

);
});

return ()=>{

socket.disconnect();

};

  },[]);



  // =========================
  // DELETE CREATOR
  // =========================
  const deleteCreator = async(id)=>{

    const confirmDelete =
      window.confirm(
        "Delete this CSV creator?"
      );


    if(!confirmDelete)
      return;


    try{


      await axios.delete(
        `${Config.API_URL}/api/csv-creators/${id}`
      );


      fetchCreators();


    }
    catch(error){

      console.log(
        "DELETE ERROR",
        error
      );

    }

  };

// =========================
// DOWNLOAD FILTERED CSV
// =========================

const downloadCSV = ()=>{


if(creators.length===0)
return;


const csv = Papa.unparse(creators);


const blob = new Blob(
[csv],
{
type:"text/csv;charset=utf-8;"
}
);


saveAs(
blob,
"filtered_csv_creators.csv"
);


};



// =========================
// DOWNLOAD MASKED CSV
// =========================

const downloadMaskedCSV = ()=>{


if(creators.length===0)
return;



const maskedCreators = creators.map((creator)=>{


return {


...creator,


email:
creator.email
?
creator.email.replace(
/(.{2}).+(@.+)/,
"$1****$2"
)
:
"",


mobileNumber:
creator.mobileNumber
?
"******"+creator.mobileNumber.slice(-4)
:
"",


whatsappNumber:
creator.whatsappNumber
?
"******"+creator.whatsappNumber.slice(-4)
:
"",


fullAddress:
creator.fullAddress
?
"********"
:
"",


pincode:
creator.pincode
?
"*****"
:
"",


hoboUserId:
creator.hoboUserId
?
"******"
:
""


};


});



const csv = Papa.unparse(maskedCreators);



const blob = new Blob(
[csv],
{
type:"text/csv;charset=utf-8;"
}
);


saveAs(
blob,
"filtered_masked_creators.csv"
);


};

  return (

<div className="bg-white rounded-xl shadow p-6">


<div className="flex justify-between items-center mb-5">


<h2 className="text-2xl font-bold">
CSV Creators
</h2>
{
isFiltered && creators.length > 0 &&

<div className="flex gap-3">


<button

onClick={downloadCSV}

className="
bg-green-600
text-white
px-4
py-2
rounded-lg
"

>

Download CSV

</button>



<button

onClick={downloadMaskedCSV}

className="
bg-purple-600
text-white
px-4
py-2
rounded-lg
"

>

Download Masked CSV

</button>


</div>

}

</div>


{/* =========================
CSV FILTER SECTION
========================= */}
<div
className="
grid
grid-cols-1
md:grid-cols-4
gap-3
mb-6
"
>

{
[
{
name:"search",
type:"text",
placeholder:"Search Name Email Instagram"
},

{
name:"fullName",
type:"text",
placeholder:"Full Name"
},

{
name:"email",
type:"text",
placeholder:"Email"
},

{
name:"mobileNumber",
type:"text",
placeholder:"Mobile Number"
},

{
name:"instagramUsername",
type:"text",
placeholder:"Instagram Username"
},


{
name:"instagramFollowersRange",
type:"select",
placeholder:"Followers Range",
options:[
"Under 2K",
"2K - 10K",
"10K - 50K",
"50K - 100K",
"100K - 500K",
"500K - 1M",
"1M - 5M",
"5M+"
]
},


{
name:"category",
type:"select",
placeholder:"Category",
options:[
"Fashion",
"Beauty",
"Food",
"Travel",
"Fitness",
"Technology",
"Gaming",
"Lifestyle",
"Entertainment",
"Education"
]
},


{
name:"gender",
type:"select",
placeholder:"Gender",
options:[
"Male",
"Female",
"Other"
]
},


{
name:"city",
type:"text",
placeholder:"City"
},


{
name:"state",
type:"select",
placeholder:"State",
options:[
"West Bengal",
"Maharashtra",
"Delhi",
"Karnataka",
"Tamil Nadu",
"Gujarat",
"Rajasthan",
"Punjab"
]
},


{
name:"country",
type:"select",
placeholder:"Country",
options:[
"India",
"USA",
"UK",
"Canada",
"Australia"
]
},


{
name:"youtubeUsername",
type:"text",
placeholder:"Youtube Username"
},


{
name:"youtubeSubscribers",
type:"select",
placeholder:"Youtube Subscribers",
options:[
"Under 1K",
"1K - 10K",
"10K - 100K",
"100K - 1M",
"1M+"
]
},


{
name:"platform",
type:"select",
placeholder:"Platform",
options:[
"Instagram",
"YouTube",
"Facebook",
"Twitter",
"LinkedIn",
"Multiple"
]
},


{
name:"celebrityType",
type:"select",
placeholder:"Celebrity Type",
options:[
"Influencer",
"Actor",
"Model",
"Creator",
"Celebrity",
"Artist"
]
},


{
name:"language",
type:"select",
placeholder:"Language",
options:[
"Hindi",
"English",
"Bengali",
"Tamil",
"Telugu",
"Marathi",
"Gujarati"
]
},


{
name:"ageGroup",
type:"select",
placeholder:"Age Group",
options:[
"18-25",
"25-35",
"35-45",
"45+"
]
},


{
name:"contentType",
type:"select",
placeholder:"Content Type",
options:[
"Reels",
"Shorts",
"Videos",
"Blogs",
"Photos",
"Live"
]
},


{
name:"verificationStatus",
type:"select",
placeholder:"Verification Status",
options:[
"Verified",
"Not Verified"
]
},




].map((field)=>(


field.type==="select" ? (

<select

key={field.name}

className="
border
p-2
rounded
"

value={
filters[field.name] || ""
}


onChange={(e)=>{

const value=e.target.value;

const updatedFilters={
...filters,
[field.name]:value
};


setFilters(updatedFilters);


if(filterTimeout){
clearTimeout(filterTimeout);
}
const timeout=setTimeout(()=>{

fetchCreators(updatedFilters);

},500);


setFilterTimeout(timeout);


}}

>
<option value="">
{field.placeholder}
</option>
{
field.options.map((option)=>(

<option
key={option}
value={option}
>
{option}
</option>

))
}
</select>
)

:(

<input

key={field.name}

placeholder={field.placeholder}

className="
border
p-2
rounded
"
value={
filters[field.name] || ""
}


onChange={(e)=>{

const value=e.target.value;
const updatedFilters={

...filters,

[field.name]:value

};

setFilters(updatedFilters);


setIsFiltered(
Object.values(updatedFilters)
.some(value => value !== "")
);



if(filterTimeout){

clearTimeout(filterTimeout);

}


const timeout=setTimeout(()=>{


fetchCreators(updatedFilters);


},500);
setFilterTimeout(timeout);
}}
/>
)
))

}
</div>


{
loading ?


(
<p>
Loading CSV creators...
</p>
)


:


(

// TABLE

<div className="overflow-x-auto">

<table className="
min-w-[4000px]
border
text-sm
">


<thead className="bg-gray-100">


<tr>


<th className="p-3 border">
Action
</th>


<th className="p-3 border">
Timestamp
</th>


<th className="p-3 border">
Instagram Username
</th>


<th className="p-3 border">
Instagram Link
</th>


<th className="p-3 border">
Followers Range
</th>


<th className="p-3 border">
Exact Followers
</th>


<th className="p-3 border">
Categories
</th>


<th className="p-3 border">
Phone
</th>


<th className="p-3 border">
Whatsapp
</th>


<th className="p-3 border">
Full Name
</th>


<th className="p-3 border">
Email
</th>


<th className="p-3 border">
Gender
</th>


<th className="p-3 border">
DOB
</th>


<th className="p-3 border">
Campaign Type
</th>


<th className="p-3 border">
Deal Type
</th>


<th className="p-3 border">
Languages
</th>


<th className="p-3 border">
Speaking Video
</th>


<th className="p-3 border">
Full Address
</th>


<th className="p-3 border">
Landmark
</th>


<th className="p-3 border">
City
</th>


<th className="p-3 border">
State
</th>


<th className="p-3 border">
Country
</th>


<th className="p-3 border">
Pincode
</th>


<th className="p-3 border">
Photo Link
</th>


<th className="p-3 border">
Youtube Username
</th>


<th className="p-3 border">
Youtube Channel
</th>


<th className="p-3 border">
Youtube Subscribers
</th>


<th className="p-3 border">
Instagram Reel Price
</th>


<th className="p-3 border">
Instagram Story Price
</th>


<th className="p-3 border">
Instagram Post Price
</th>


<th className="p-3 border">
Dedicated Youtube Video
</th>


<th className="p-3 border">
Integrated Youtube Video
</th>


<th className="p-3 border">
Dedicated Shorts
</th>


<th className="p-3 border">
Integrated Shorts
</th>


<th className="p-3 border">
Message
</th>


<th className="p-3 border">
Bio
</th>


<th className="p-3 border">
TV/Movies Celebrity
</th>


<th className="p-3 border">
Celebrity Type
</th>


<th className="p-3 border">
Available Platforms
</th>


<th className="p-3 border">
Amazon Reviews
</th>


<th className="p-3 border">
Fetched From Brand
</th>


<th className="p-3 border">
Fetched For Brand
</th>


<th className="p-3 border">
Platform
</th>


<th className="p-3 border">
Fetched Date
</th>


<th className="p-3 border">
hoboUserId
</th>



</tr>

</thead>





<tbody>


{

creators.length===0 ?


(

<tr>

<td

colSpan="45"

className="
text-center
p-5
"

>

No CSV creators found

</td>

</tr>

)


:


creators.map((creator)=>(



<tr

key={creator._id}

>




<td className="border p-2 flex gap-2">


<button

className="
bg-blue-600
text-white
p-2
rounded
"

title="View"

>

<FaEye/>

</button>



<button

className="
bg-green-600
text-white
p-2
rounded
"

title="Edit"

>

<FaEdit/>

</button>



<button

onClick={()=>deleteCreator(creator._id)}

className="
bg-red-600
text-white
p-2
rounded
"

title="Delete"

>

<FaTrash/>

</button>


</td>





<td className="border p-2">
{creator.timestamp || "-"}
</td>



<td className="border p-2">
{creator.instagramUsername || "-"}
</td>



<td className="border p-2">
{creator.instagramLink || "-"}
</td>



<td className="border p-2">
{creator.followersRange || "-"}
</td>



<td className="border p-2">
{creator.exactFollowers || "-"}
</td>



<td className="border p-2">
{
creator.categories?.join(", ")
||
"-"
}
</td>



<td className="border p-2">
{creator.mobileNumber || "-"}
</td>



<td className="border p-2">
{creator.whatsappNumber || "-"}
</td>



<td className="border p-2">
{creator.fullName || "-"}
</td>



<td className="border p-2">
{creator.email || "-"}
</td>



<td className="border p-2">
{creator.gender || "-"}
</td>



<td className="border p-2">
{creator.dob || "-"}
</td>



<td className="border p-2">
{
creator.campaignTypes?.join(", ")
||
"-"
}
</td>



<td className="border p-2">
{creator.dealType || "-"}
</td>



<td className="border p-2">
{
creator.languages?.join(", ")
||
"-"
}
</td>



<td className="border p-2">
{creator.speakingVideoLink || "-"}
</td>



<td className="border p-2">
{creator.fullAddress || "-"}
</td>



<td className="border p-2">
{creator.landmark || "-"}
</td>



<td className="border p-2">
{creator.city || "-"}
</td>



<td className="border p-2">
{creator.state || "-"}
</td>



<td className="border p-2">
{creator.country || "-"}
</td>



<td className="border p-2">
{creator.pincode || "-"}
</td>



<td className="border p-2">
{creator.photoLink || "-"}
</td>



<td className="border p-2">
{creator.youtubeUsername || "-"}
</td>



<td className="border p-2">
{creator.youtubeChannelLink || "-"}
</td>



<td className="border p-2">
{creator.youtubeSubscribersRange || "-"}
</td>



<td className="border p-2">
{creator.instagramReelCommercial || "-"}
</td>



<td className="border p-2">
{creator.instagramStoryCommercial || "-"}
</td>



<td className="border p-2">
{creator.instagramPostCommercial || "-"}
</td>



<td className="border p-2">
{creator.dedicatedYoutubeVideo || "-"}
</td>



<td className="border p-2">
{creator.integratedYoutubeVideo || "-"}
</td>



<td className="border p-2">
{creator.dedicatedYoutubeShorts || "-"}
</td>



<td className="border p-2">
{creator.integratedYoutubeShorts || "-"}
</td>



<td className="border p-2">
{creator.message || "-"}
</td>



<td className="border p-2">
{creator.bio || "-"}
</td>



<td className="border p-2">
{creator.isCelebrity || "-"}
</td>



<td className="border p-2">
{creator.celebrityType || "-"}
</td>



<td className="border p-2">
{creator.availablePlatforms || "-"}
</td>



<td className="border p-2">
{creator.amazonReviews || "-"}
</td>



<td className="border p-2">
{creator.fetchedFromBrandPage || "-"}
</td>



<td className="border p-2">
{creator.fetchedForBrand || "-"}
</td>



<td className="border p-2">
{creator.platform || "-"}
</td>



<td className="border p-2">
{creator.fetchedDate || "-"}
</td>



<td className="border p-2">
{creator.hoboUserId || "-"}
</td>



</tr>


))


}



</tbody>


</table>


</div>


)

}



</div>

);
}

export default CsvCreatorSection;