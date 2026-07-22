import { useState } from "react";
import axios from "axios";
import Config from "../config/Config";

function UploadCreatorsCSV(){

  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);


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


</div>
)

}

export default UploadCreatorsCSV;