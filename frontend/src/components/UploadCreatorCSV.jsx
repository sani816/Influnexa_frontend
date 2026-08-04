import { useState,useEffect } from "react";
import axios from "axios";
import Config from "../config/Config";
import Papa from "papaparse";
import { saveAs } from "file-saver";

function UploadCreatorsCSV(){

  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
const [summary, setSummary] = useState({
  totalRecords: 0,
  successfulRecords: 0,
  updatedRecords: 0,
  failedRecords: 0,
});

const [uploadReport, setUploadReport] = useState([]);

const [csvCreators,setCsvCreators] = useState([]);
useEffect(()=>{

  fetchLatestReport();
   fetchCSVCreators();
},[]);

const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 100; // Show 100 records per page

//   Fetch latest report

const fetchLatestReport = async()=>{

  try{

    const response = await axios.get(
      `${Config.API_URL}/api/csv-creators/latest-report`
    );


    if(
      response.data.success &&
      response.data.report
    ){

      setSummary({

        totalRecords: response.data.report.totalRecords,

        successfulRecords: response.data.report.successfulRecords,
        updatedRecords:response.data.report.updatedRecords,

        failedRecords: response.data.report.failedRecords

      });


      setUploadReport(
    Array.isArray(response.data.report.report)
        ? response.data.report.report
        : []
);


    }
    else{

      setUploadReport([]);

      setSummary({

        totalRecords:0,

        successfulRecords:0,
        updatedRecords:0,

        failedRecords:0

      });

    }


  }
  catch(error){

    console.log(
      "REPORT FETCH ERROR:",
      error.response?.data || error.message
    );


    setUploadReport([]);

  }

};


const fetchCSVCreators = async()=>{

try{

const response = await axios.get(
`${Config.API_URL}/api/csv-creators`
);


setCsvCreators(
response.data.data || []
);


}
catch(error){

console.log(
"CSV CREATOR FETCH ERROR",
error.response?.data || error.message
);

}

};

// UPLOAD CSV FILE 
  const uploadCSV = async()=>{

    console.log("Button clicked");
    console.log("Selected file:", file);


    try{

      if(!file){
        alert("Please select CSV file first");
        return;
      }


      setLoading(true);


      const formData = new FormData();

      formData.append("file", file);


      const response = await axios.post(
         `${Config.API_URL}/api/csv-creators/upload`,
        formData,
        {
          timeout:0,
        }
      );
     
      setSummary({
    totalRecords: response.data.totalRecords,
    successfulRecords: response.data.successfulRecords,
    updatedRecords:response.data.updatedRecords,
    failedRecords: response.data.failedRecords,
});

setUploadReport(response.data.report);

// fetchLatestReport();
fetchCSVCreators();

      console.log(
        "UPLOAD RESPONSE:",
        response.data
      );


      alert("Creators uploaded successfully");


    }
    catch(error){

      console.log(
        "CSV ERROR:",
        error.response?.data || error.message
      );


      alert(
        error.response?.data?.message ||
        "CSV upload failed"
      );

    }
    finally{

      setLoading(false);

    }

  }

  // Delete CSV file
const deleteCSVCreators = async()=>{

 try{

  const confirmDelete = window.confirm(
    "Delete all CSV uploaded creators?"
  );


  if(!confirmDelete) return;


  const response = await axios.delete(
   `${Config.API_URL}/api/csv-creators`
  );


  alert(response.data.message);
  setUploadReport([]);

setSummary({
 totalRecords:0,
 successfulRecords:0,
 updatedRecords:0,
 failedRecords:0
});

setFile(null);
setCsvCreators([]);

 }
 catch(error){

  console.log(
   error.response?.data || error.message
  );

  alert("Delete failed");

 }

};



// DELETE SINGLE CSV CREATOR

const deleteSingleCSV = async(id)=>{


try{


const confirmDelete = window.confirm(
"Delete this CSV creator?"
);


if(!confirmDelete)
return;



const response = await axios.delete(

`${Config.API_URL}/api/csv-creators/${id}`

);



alert(response.data.message);



// refresh report/data if needed

// fetchLatestReport();
fetchCSVCreators();


}
catch(error){


console.log(
error.response?.data || error.message
);


alert(
"Single creator delete failed"
);
}
};

// Pagination
const totalPages = Math.ceil(uploadReport.length / recordsPerPage);

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentRecords = uploadReport.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);

const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage((prev) => prev + 1);
  }
};

const handlePrevious = () => {
  if (currentPage > 1) {
    setCurrentPage((prev) => prev - 1);
  }
};

// DOWNLOAD FAILED CSV FILE

const downloadFailedCSV = () => {
  const failedRecords = uploadReport
    .filter(item => item.status === "Failed")
    .map(item => ({
      "Timestamp": item.timestamp,
      "Instagram Username": item.instagramUsername,
      "Instagram Profile Link": item.instagramProfileLink,
      "Instagram Followers Range": item.instagramFollowersRange,
      "Exact Followers": item.exactFollowers,

      "Categories": Array.isArray(item.categories)
        ? item.categories.join(", ")
        : item.categories,

      "Phone Number": item.phoneNumber,
      "Whatsapp Number": item.whatsappNumber,

      "Full Name": item.fullName,
      "Email": item.email,
      "Gender": item.gender,
      "Date of Birth": item.dateOfBirth,
       "influencerType":item.influencerType,
      "Campaign type": Array.isArray(item.campaignType)
        ? item.campaignType.join(", ")
        : item.campaignType,

      "What kind of deal do you participate in":
        item.whatKindOfDealDoYouParticipateIn,

      "Languages": Array.isArray(item.languages)
        ? item.languages.join(", ")
        : item.languages,

      "Speaking Video Link": item.speakingVideoLink,

      "Full Address": item.fullAddress,
      "Landmark": item.landmark,
      "City": item.city,
      "State": item.state,
      "Country": item.country,
      "Pincode": item.pincode,

      "Photo Link": item.photoLink,

      "YouTube Username": item.youtubeUsername,
      "YouTube Channel Link": item.youtubeChannelLink,
      "YouTube Subscribers Range": item.youtubeSubscribersRange,

      "Commercials For 1 Instagram Reel":
        item.commercialsFor1InstagramReel,

      "Commercials For 1 Instagram Story":
        item.commercialsFor1InstagramStory,

      "Commercials For 1 Instagram Post":
        item.commercialsFor1InstagramPost,

      "Commercials For 1 Dedicated YouTube Video":
        item.commercialsFor1DedicatedYouTubeVideo,

      "Commercials For 1 Integrated YouTube Video":
        item.commercialsFor1IntegratedYouTubeVideo,

      "Commercials For 1 Dedicated YouTube Shorts Video":
        item.commercialsFor1DedicatedYouTubeShortsVideo,

      "Commercials For 1 Integrated YouTube Shorts Video":
        item.commercialsFor1IntegratedYouTubeShortsVideo,
      "Bio": item.bio,

      "Are you a TV/movies/OTT celebrity":
        item.areYouATvMoviesOttCelebrity,

      "Type of Celeb": item.typeOfCeleb,

      "What all platforms are you avilable on": Array.isArray(
        item.whatAllPlatformsAreYouAvailableOn
      )
        ? item.whatAllPlatformsAreYouAvailableOn.join(", ")
        : item.whatAllPlatformsAreYouAvailableOn,

      "How many Amazon reviews you do per month":
        item.howManyAmazonReviewsYouDoPerMonth,

      "Fetched from Brand Page": item.fetchedFromBrandPage,
      "Fetched For Brand": item.fetchedForBrand,
      "Platform": item.platform,
      "Fetched Date": item.fetchedDate,

      "InflunexaUserId": item.InflunexaUserId,

      "Status": item.status,
      "Reason": item.reason
    }));

  if (!failedRecords.length) {
    alert("No failed records found.");
    return;
  }

  const csv = Papa.unparse(failedRecords);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  saveAs(blob, "Failed_Creators.csv");
};


return(
<div className="
bg-white/10 
backdrop-blur-xl
border border-white/20
rounded-xl
p-6
">

<h2 className="
text-2xl 
text-white 
font-bold 
mb-5
">
Upload Creator CSV
</h2>

<button
onClick={deleteCSVCreators}
className="
mt-4
bg-red-500
px-5 py-2
rounded-lg
text-white
"
>
Delete CSV Creators
</button>
<input
type="file"
accept=".csv"
onChange={(e)=>{
  console.log("File selected:",e.target.files[0]);
  setFile(e.target.files[0]);
}}
className="text-white"
/>


<button
onClick={uploadCSV}
disabled={loading}
className="
mt-5
bg-cyan-500
px-5 py-2
rounded-lg
text-white
"
>
{
 loading ? "Uploading..." : "Upload CSV"
}
</button>
{summary.totalRecords > 0 && (
  <div className="mt-6 bg-black/30 border border-cyan-500 rounded-lg p-4 text-white">

    <h3 className="text-xl font-bold mb-4">
      Upload Summary
    </h3>

    <div className="grid grid-cols-3 gap-4">

      <div className="bg-blue-600 rounded-lg p-4 text-center">
        <p>Total Records</p>
        <h2 className="text-3xl font-bold">
          {summary.totalRecords}
        </h2>
      </div>

      <div className="bg-green-600 rounded-lg p-4 text-center">
        <p>Successfully Uploaded</p>
        <h2 className="text-3xl font-bold">
          {summary.successfulRecords}
        </h2>
      </div>

      <div className="bg-green-600 rounded-lg p-4 text-center">
        <p>Successfully Updated</p>
        <h2 className="text-3xl font-bold">
          {summary.updatedRecords}
        </h2>
      </div>

      <div className="bg-red-600 rounded-lg p-4 text-center">
        <p>Failed</p>
        <h2 className="text-3xl font-bold">
          {summary.failedRecords}
        </h2>
      </div>

    </div>

  </div>
)}

 <div className="flex justify-end w-full mt-3">
    <button
      onClick={downloadFailedCSV}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
    >
      Download Failed CSV
    </button>
  </div>
{uploadReport.length > 0 ? (

<div className="mt-8 overflow-x-auto">

<table className="min-w-full border border-cyan-500 text-white">

<thead className="bg-cyan-600">

<tr>

<th className="border p-2">SL No.</th>
<th className="border p-2">Name</th>
<th className="border p-2">Email</th>
<th className="border p-2">Mobile</th>
<th className="border p-2">Instagram UserName</th>
<th className="border p-2">YouTube UserName</th>
<th className="border p-2">Status</th>
<th className="border p-2">Reason</th>

</tr>

</thead>


<tbody>

{
currentRecords.map((item,index)=>(

<tr key={index}>

<td className="border p-2">
{indexOfFirstRecord + index + 1}
</td>

<td className="border p-2">
{item.fullName}
</td>

<td className="border p-2">
{item.email}
</td>

<td className="border p-2">
{item.phoneNumber}
</td>

<td className="border p-2">
{item.instagramUsername}
</td>

<td className="border p-2">
{item.youtubeUsername}
</td>
<td
  className={`border p-2 font-bold ${
    item.status === "Failed"
      ? "text-red-500"
      : item.status === "Updated"
      ? "text-yellow-400"
      : "text-green-500"
  }`}
>
  {item.status}
</td>

<td className="border p-2">
{item.reason}
</td>


</tr>

))
}

</tbody>

</table>

{uploadReport.length > recordsPerPage && (
  <div className="flex justify-center items-center gap-4 mt-6">

    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg text-white ${
        currentPage === 1
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-cyan-500 hover:bg-cyan-600"
      }`}
    >
      Previous
    </button>

    <span className="text-white font-bold">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg text-white ${
        currentPage === totalPages
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-cyan-500 hover:bg-cyan-600"
      }`}
    >
      Next
    </button>

  </div>
)}
</div>

)

:

(

<div className="
mt-8
text-center
text-white
text-xl
font-bold
">

No Creator Found

</div>

)
}
</div>
)
}


export default UploadCreatorsCSV;