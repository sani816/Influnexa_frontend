import { useState } from "react";
import axios from "axios";

import Config from "../config/Config";

function UploadCreatorsCSV(){

const [file,setFile] = useState(null);


const uploadCSV = async()=>{

 try{

  const formData = new FormData();

  formData.append(
    "file",
    file
  );


  await axios.post(
    `${Config.API_URL}/api/csv/creators`,
    formData
  );


  alert("Creators uploaded successfully");


 }
 catch(error){

 console.log(
   "CSV ERROR:",
   error.response?.data
 );
   alert(
   error.response?.data?.message ||
   "CSV upload failed"
 );

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
onChange={(e)=>
 setFile(e.target.files[0])
}
className="text-white"
/>


<button
onClick={uploadCSV}
className="
mt-5
bg-cyan-500
px-5 py-2
rounded-lg
text-white
"
>
Upload CSV
</button>


</div>
)

}

export default UploadCreatorsCSV;