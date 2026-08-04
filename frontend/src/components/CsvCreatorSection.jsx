import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../config/Config";
import { FaTrash,FaEye,FaEdit } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { io } from "socket.io-client";


function CsvCreatorSection() {

  const [creators, setCreators] = useState([]);
  const [filterTimeout,setFilterTimeout] = useState(null);
  const [isFiltered,setIsFiltered] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
const [showEdit, setShowEdit] = useState(false);
const [page, setPage] = useState(1);
const [limit] = useState(100);
const [totalPages, setTotalPages] = useState(1);

const handleEdit = (creator) => {
  setSelectedCreator(creator);
  setShowEdit(true);
};

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({

   // Personal
  fullName: "",
  email: "",
  phoneNumber: "",

  // Instagram
  instagramUsername: "",
  instagramFollowersRange: "",

  exactFollowers:"",

  // Category
  categories: "",

  // Personal
  gender: "",

  dateOfBirth:"",
  pincode:"",

  // Location
  city: "",
  state: "",
  country: "",

  // YouTube
  youtubeUsername: "",
  youtubeSubscribersRange: "",

  // Celebrity
  typeOfCeleb: "",

  // Platform
  platform: "",

  // Languages
  languages: "",

  InflunexaUserId: "",
  campaignType:"",
  influencerType: "",
  contactStatus: "",
});

const [filterOptions, setFilterOptions] = useState({
  gender: [],
  state: [],
  country: [],
  categories: [],
  languages: [],
  campaignType: [],
  typeOfCeleb: [],
  platform: [],
  youtubeSubscribersRange: [],
  instagramFollowersRange: [],
});


const fetchFilterOptions = async () => {
  try {
    const res = await axios.get(
      `${Config.API_URL}/api/csv-creators/filter-options`
    );

    setFilterOptions(res.data.options);

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchFilterOptions();
}, []);
const updateCsvCreator = async () => {
  try {
    const res = await axios.put(
      `${Config.API_URL}/api/csv-creators/${selectedCreator._id}`,
      selectedCreator
    );

    alert("Creator updated successfully");

    // update UI without refresh
    setCreators((prev) =>
      prev.map((creator) =>
        creator._id === selectedCreator._id
          ? res.data.creator
          : creator
      )
    );

    setShowEdit(false);

  } catch (error) {
    console.log(error);
    alert("Update failed");
  }
};

  // =========================
  // GET CSV CREATORS
  // =========================
  const fetchCreators = async (currentFilters = filters) => {
  try {
    setLoading(true);
 setCreators([]);
    // Remove empty filters
    const params = Object.fromEntries(
      Object.entries(currentFilters).filter(
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined
      )
    );

    const res = await axios.get(
      `${Config.API_URL}/api/csv-creators`,
      {
        params: {
      ...params,
      page,
      limit,
    },
      }
    );

    setCreators(res.data.data || []);
    setTotalPages(res.data.totalPages);

  } catch (error) {
    console.log("CSV FETCH ERROR", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCreators();

}, [page]);

  useEffect(() => {

  const socket = io(Config.API_URL);

  socket.on("connect", () => {
    console.log("Socket Connected:", socket.id);
  });

  // New CSV Creator Uploaded
  socket.on("new-csv-creator", () => {
    console.log("New CSV Creator");
    fetchCreators();
  });

  // CSV Creator Updated
  socket.on("update-csv-creator", () => {
    console.log("CSV Creator Updated");
    fetchCreators();
  });

  // Single CSV Creator Deleted
  socket.on("delete-csv-creator", () => {
    console.log("CSV Creator Deleted");
    fetchCreators();
  });

  // All CSV Creators Deleted
  socket.on("delete-all-csv-creators", () => {
    console.log("All CSV Creators Deleted");
    setCreators([]);
  });

  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });

  return () => {
    socket.disconnect();
  };
}, []);


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

const downloadCSV = () => {
  if (creators.length === 0) {
    alert("No filtered data available to download.");
    return;
  }

  const csv = Papa.unparse(creators, {
    header: true,
    skipEmptyLines: true,
  });

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "Filtered_Creators.csv");
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


phoneNumber:
creator.phoneNumber
?
"******"+creator.phoneNumber.slice(-4)
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


InflunexaUserId:
creator.InflunexaUserId
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



const handleFilterChange = (e) => {
  const { name, value } = e.target;

  const updatedFilters = {
    ...filters,
    [name]: value,
  };

  setFilters(updatedFilters);

  const filtered = Object.values(updatedFilters).some(
    (v) => String(v).trim() !== ""
  );

  setIsFiltered(filtered);

  if (filterTimeout) {
    clearTimeout(filterTimeout);
  }

  const timeout = setTimeout(() => {
    setPage(1);
    fetchCreators(updatedFilters);
  }, 500);

  setFilterTimeout(timeout);
};

// RESET FILTER
const resetFilters = () => {
  if (filterTimeout) {
    clearTimeout(filterTimeout);
  }

  const emptyFilters = {
    fullName: "",
    email: "",
    phoneNumber: "",
    instagramUsername: "",
    instagramFollowersRange: "",
    exactFollowers: "",
    categories: "",
    gender: "",
    dateOfBirth: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    youtubeUsername: "",
    youtubeSubscribersRange: "",
    typeOfCeleb: "",
    platform: "",
    languages: "",
    InflunexaUserId: "",
    campaignType:"",
    influencerType: "",
    contactStatus: "",
  };

  setFilters(emptyFilters);
  setIsFiltered(false);
setPage(1);
  fetchCreators(emptyFilters);
};

  return (

<div className="bg-white rounded-xl shadow p-6">


<div className="flex justify-between items-center mb-5">


<h2 className="text-2xl font-bold">
CSV Creators Data
</h2>

<div className="flex items-center gap-3">

    <button
      onClick={resetFilters}
      className="
      bg-red-600
      hover:bg-red-700
      text-white
      px-4
      py-2
      rounded-lg
      transition
      "
    >
      Reset Filters
    </button>
    </div>

{
isFiltered && !loading && creators.length > 0 &&

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
name:"phoneNumber",
type:"text",
placeholder:"phoneNumber"
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
options:filterOptions.instagramFollowersRange
},

{
  name: "exactFollowers",
  type: "number",
  placeholder: "Exact Followers",
},
{
name:"categories",
type:"select",
placeholder:"Category",
options:filterOptions.categories
},


{
name:"gender",
type:"select",
placeholder:"Gender",
options:filterOptions.gender,
},


{
  name: "dateOfBirth",
  type: "date",
  placeholder: "Date of Birth",
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
options:filterOptions.state
},


{
name:"country",
type:"select",
placeholder:"Country",
options:filterOptions.country
},
{
  name: "pincode",
  type: "text",
  placeholder: "Pincode",
},

{
name:"youtubeUsername",
type:"text",
placeholder:"Youtube Username"
},


{
name:"youtubeSubscribersRange",
type:"select",
placeholder:"Youtube Subscribers",
options:filterOptions.youtubeSubscribersRange
},


{
name:"platform",
type:"select",
placeholder:"Platform",
options:filterOptions.platform
},


{
name:"typeOfCeleb",
type:"select",
placeholder:"Celebrity Type",
options:filterOptions.typeOfCeleb

},


{
name:"languages",
type:"select",
placeholder:"Language",
options:filterOptions.languages
},


{
  name: "InflunexaUserId",
  type: "text",
  placeholder: "Influnexa User ID",
},

{
  name: "campaignType",
  type: "select",
  placeholder: "Campaign Type",
  options: filterOptions.campaignType
},
{
  name: "influencerType",
  type: "select",
  placeholder: "Influencer Type",
  options: [
    "Nano Influencer",
    "Micro Influencer",
    "Macro Influencer",
    "Mega Influencer",
  ],
},

{
  name: "contactStatus",
  type: "select",
  placeholder: "Contact Status",
  options: [
    "Mobile Only",
    "Email Only",
    "Both Email & Mobile",
  ]
},

].map((field)=>(


field.type==="select" ? (

<select
  key={field.name}
  name={field.name}
  className="border p-2 rounded"
  value={filters[field.name]}
  onChange={handleFilterChange}
>
  <option value="">
    {field.placeholder}
  </option>

  {field.options?.map((option) => (
    <option
      key={option}
      value={option}
    >
      {option}
    </option>
  ))}
</select>

)

:(

<input

key={field.name}
name={field.name}
type={field.type}
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


fetchCreators(updatedFilters,1);


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


<th className="p-3 border w-16">
      S.No.
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
Influencer Type
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
Timestamp
</th>

<th className="p-3 border">
InflunexaUserId
</th>

 <th className="border p-3 text-center w-32">
Action
</th>



</tr>

</thead>





<tbody>


{

creators.length===0 ?


(

<tr>

<td

colSpan={46}

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


creators.map((creator,index)=>(



<tr

key={creator._id}

>






 <td className="border p-2 text-center font-semibold">
    {(page - 1) * limit + index + 1}
  </td>

<td className="border p-2">
  {creator.instagramUsername || "-"}
</td>
<td className="border p-2">
  {creator.instagramProfileLink ? (
    <a
      href={creator.instagramProfileLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
     Instagram Profile Link
    </a>
  ) : (
    "-"
  )}
</td>

<td className="border p-2">
  {creator.instagramFollowersRange || "-"}
</td>

<td className="border p-2">
  {creator.exactFollowers || "-"}
</td>

<td className="border p-2">
  {creator.categories?.join(", ") || "-"}
</td>

<td className="border p-2">
  {creator.phoneNumber || "-"}
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
  {creator.dateOfBirth || "-"}
</td>

<td className="border p-2">
{
creator.exactFollowers >= 1000000
? "Mega Influencer"

: creator.exactFollowers >= 100000
? "Macro Influencer"

: creator.exactFollowers >= 10000
? "Micro Influencer"

: creator.exactFollowers >= 1000
? "Nano Influencer"

: "-"
}
</td>

<td className="border p-2">
  {creator.campaignType?.join(", ") || "-"}
</td>

<td className="border p-2">
  {creator.whatKindOfDealDoYouParticipateIn || "-"}
</td>

<td className="border p-2">
  {creator.languages?.join(", ") || "-"}
</td>

<td className="border p-2">
  {creator.speakingVideoLink ? (
    <a
      href={creator.speakingVideoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
    Speaking Video link
    </a>
  ) : (
    "-"
  )}
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
  {creator.youtubeChannelLink ? (
    <a
      href={creator.youtubeChannelLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
    YouTube Channel Link
    </a>
  ) : (
    "-"
  )}
</td>

<td className="border p-2">
  {creator.youtubeSubscribersRange || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1InstagramReel || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1InstagramStory || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1InstagramPost || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1DedicatedYouTubeVideo || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1IntegratedYouTubeVideo || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1DedicatedYouTubeShortsVideo || "-"}
</td>

<td className="border p-2">
  {creator.commercialsFor1IntegratedYouTubeShortsVideo || "-"}
</td>


<td className="border p-2">
  {creator.bio || "-"}
</td>

<td className="border p-2">
  {creator.areYouATvMoviesOttCelebrity || "-"}
</td>

<td className="border p-2">
  {creator.typeOfCeleb || "-"}
</td>

<td className="border p-2">
  {creator.whatAllPlatformsAreYouAvailableOn?.join(", ") || "-"}
</td>

<td className="border p-2">
  {creator.howManyAmazonReviewsYouDoPerMonth || "-"}
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
  {creator.timestamp || "-"}
</td>
<td className="border p-2">
  {creator.InflunexaUserId || "-"}
</td>


{/* Action */}
<td className="border p-2 align-middle">
  <div className="flex items-center justify-center gap-2">
    <button
    onClick={()=>handleEdit(creator)}
      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition"
      title="Edit"
    >
      <FaEdit />
    </button>

    
  </div>
</td>

</tr>


))


}



</tbody>


</table>


</div>
)}

<div className="flex justify-center items-center gap-5 mt-6">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    Previous
  </button>

  <span className="font-bold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    Next
  </button>

</div>

      {/* EDIT MODAL */}
   
    {showEdit && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[700px]">
          <h2 className="text-xl font-bold mb-4">
            Edit Creator
          </h2>
             
             <label className="block text-sm font-medium mb-1">
            Full Name:
          </label>
          <input
            className="border p-2 w-full rounded"
            value={selectedCreator?.fullName || ""}
            onChange={(e) =>
              setSelectedCreator({
                ...selectedCreator,
                fullName: e.target.value,
              })
            }
          />

         <div>
          <label className="block text-sm font-medium mb-1">
            Mobile Number:
          </label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={selectedCreator?.phoneNumber || ""}
            onChange={(e) =>
              setSelectedCreator({
                ...selectedCreator,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>

          {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={selectedCreator?.email || ""}
            onChange={(e) =>
              setSelectedCreator({
                ...selectedCreator,
                email: e.target.value,
              })
            }
          />
        </div>


        {/* Instagram Username */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Instagram Username:
          </label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={selectedCreator?.instagramUsername || ""}
            onChange={(e) =>
              setSelectedCreator({
                ...selectedCreator,
                instagramUsername: e.target.value,
              })
            }
          />
        </div>


          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={() => setShowEdit(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
            onClick={updateCsvCreator}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

  


</div>

);
}

export default CsvCreatorSection;