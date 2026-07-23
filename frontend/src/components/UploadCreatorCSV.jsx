import { useState,useEffect } from "react";
import axios from "axios";
import Config from "../config/Config";

function UploadCreatorsCSV(){

  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
const [summary, setSummary] = useState({
  totalRecords: 0,
  successfulRecords: 0,
  failedRecords: 0,
});

const [uploadReport, setUploadReport] = useState([]);
useEffect(()=>{

  fetchLatestReport();

},[]);

//   Fetch latest report

const fetchLatestReport = async()=>{

  try{

    const response = await axios.get(
      `${Config.API_URL}/api/csv/latest-report`
    );


    if(
      response.data.success &&
      response.data.report
    ){

      setSummary({

        totalRecords: response.data.report.totalRecords,

        successfulRecords: response.data.report.successfulRecords,

        failedRecords: response.data.report.failedRecords

      });


      setUploadReport(
        response.data.report.report || []
      );


    }
    else{

      setUploadReport([]);

      setSummary({

        totalRecords:0,

        successfulRecords:0,

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
        `${Config.API_URL}/api/csv/creators`,
        formData
      );
     
      setSummary({
    totalRecords: response.data.totalRecords,
    successfulRecords: response.data.successfulRecords,
    failedRecords: response.data.failedRecords,
});

setUploadReport(response.data.report);


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
    `${Config.API_URL}/api/csv/creators`
  );


  alert(response.data.message);
  setUploadReport([]);

setSummary({
 totalRecords:0,
 successfulRecords:0,
 failedRecords:0
});

setFile(null);

 }
 catch(error){

  console.log(
   error.response?.data || error.message
  );

  alert("Delete failed");

 }

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

      <div className="bg-red-600 rounded-lg p-4 text-center">
        <p>Failed</p>
        <h2 className="text-3xl font-bold">
          {summary.failedRecords}
        </h2>
      </div>

    </div>

  </div>
)}
{uploadReport.length > 0 ? (

<div className="mt-8 overflow-x-auto">

<table className="min-w-full border border-cyan-500 text-white">

<thead className="bg-cyan-600">

<tr>

<th className="border p-2">Row</th>
<th className="border p-2">Name</th>
<th className="border p-2">Email</th>
<th className="border p-2">Mobile</th>
<th className="border p-2">Instagram</th>
<th className="border p-2">YouTube</th>
<th className="border p-2">Status</th>
<th className="border p-2">Reason</th>

</tr>

</thead>


<tbody>

{
uploadReport.map((item,index)=>(

<tr key={index}>

<td className="border p-2">
{item.row}
</td>

<td className="border p-2">
{item.fullName}
</td>

<td className="border p-2">
{item.email}
</td>

<td className="border p-2">
{item.mobileNumber}
</td>

<td className="border p-2">
{item.instagramUsername}
</td>

<td className="border p-2">
{item.youtubeName}
</td>

<td className={`border p-2 font-bold ${
item.status==="Uploaded"
?"text-green-400"
:"text-red-400"
}`}>
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