import { useEffect, useState } from "react";
import axios from "axios";
import Config from "../config/Config";

function AdminPayments() {

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const [phoneFilter,setPhoneFilter]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 10;

  // ==========================
  // FETCH PAYMENTS
  // ==========================

  const fetchPayments = async () => {

    try {

      const res = await axios.get(
        `${Config.API_URL}/api/payment/all`
      );

      setPayments(res.data.payments || []);
      setFilteredPayments(res.data.payments || []);

    }

    catch (err) {

      console.log(err);

      alert("Unable to load payments.");

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchPayments();

  }, []);

  // ==========================
  // FILTERS
  // ==========================

  useEffect(() => {

    let data = [...payments];

    if (nameFilter) {

      data = data.filter(item =>
        item.name
          ?.toLowerCase()
          .includes(nameFilter.toLowerCase())
      );

    }

    if (emailFilter) {

      data = data.filter(item =>
        item.email
          ?.toLowerCase()
          .includes(emailFilter.toLowerCase())
      );

    }

    if(phoneFilter){

data=data.filter(item=>

item.phone

?.toLowerCase()

.includes(phoneFilter.toLowerCase())

);

}

    if (statusFilter) {

      data = data.filter(
        item => item.status === statusFilter
      );

    }
    setCurrentPage(1)
    setFilteredPayments(data);

  }, [payments, nameFilter, emailFilter,phoneFilter, statusFilter]);


// ==========================================
// APPROVE PAYMENT
// ==========================================

const approvePayment = async (id) => {

  try {

    await axios.put(
      `${Config.API_URL}/api/payment/approve/${id}`
    );

    alert("Payment Approved Successfully");

    fetchPayments();

  } catch (err) {

    console.log(err);

    alert(err.response?.data?.message || "Approval Failed");

  }

};


// ==========================================
// REJECT PAYMENT
// ==========================================

const rejectPayment = async (id) => {

  try {

    await axios.put(
      `${Config.API_URL}/api/payment/reject/${id}`
    );

    alert("Payment Rejected");

    fetchPayments();

  } catch (err) {

    console.log(err);

    alert(err.response?.data?.message || "Reject Failed");

  }

};


// ==========================================
// RESET DOWNLOAD
// ==========================================

const resetDownload = async (id) => {

  try {

    await axios.put(
      `${Config.API_URL}/api/payment/reset-download/${id}`
    );

    alert("Download Unlocked");

    fetchPayments();

  } catch (err) {

    console.log(err);

    alert(err.response?.data?.message || "Reset Failed");

  }

};



const lastIndex = currentPage * recordsPerPage;

const firstIndex = lastIndex - recordsPerPage;

const currentPayments = filteredPayments.slice(
  firstIndex,
  lastIndex
);

const totalPages = Math.ceil(
  filteredPayments.length / recordsPerPage
);
  return (

    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold text-white">

          Payment Requests

        </h2>

      </div>


{/* ========================= */}
{/* PAYMENT STATISTICS */}
{/* ========================= */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

  <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg">

    <h3 className="text-lg">Total Payments</h3>

    <h1 className="text-3xl font-bold mt-3">

      {payments.length}

    </h1>

  </div>

  <div className="bg-yellow-500 rounded-xl p-5 text-white shadow-lg">

    <h3 className="text-lg">Pending</h3>

    <h1 className="text-3xl font-bold mt-3">

      {payments.filter(p=>p.status==="Pending").length}

    </h1>

  </div>

  <div className="bg-green-600 rounded-xl p-5 text-white shadow-lg">

    <h3 className="text-lg">Approved</h3>

    <h1 className="text-3xl font-bold mt-3">

      {payments.filter(p=>p.status==="Approved").length}

    </h1>

  </div>

  <div className="bg-red-600 rounded-xl p-5 text-white shadow-lg">

    <h3 className="text-lg">Rejected</h3>

    <h1 className="text-3xl font-bold mt-3">

      {payments.filter(p=>p.status==="Rejected").length}

    </h1>

  </div>

</div>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Name"
          value={nameFilter}
          onChange={(e)=>setNameFilter(e.target.value)}
          className="bg-slate-800 border border-cyan-500 rounded-lg p-3 text-white"
        />

        <input
          type="text"
          placeholder="Search Email"
          value={emailFilter}
          onChange={(e)=>setEmailFilter(e.target.value)}
          className="bg-slate-800 border border-cyan-500 rounded-lg p-3 text-white"
        />
         
         <input

type="text"

placeholder="Search Phone"

value={phoneFilter}

onChange={(e)=>setPhoneFilter(e.target.value)}

className="bg-slate-800 border border-cyan-500 rounded-lg p-3 text-white"

/>
        <select
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-cyan-500 rounded-lg p-3 text-white"
        >

          <option value="">All Status</option>

          <option value="Pending">Pending</option>

          <option value="Approved">Approved</option>

          <option value="Rejected">Rejected</option>

        </select>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">

        <table className="w-full table-fixed">

          <thead className="bg-cyan-700 text-white">

<tr>

<th className="p-3 w-[50px]">
Sl No.
</th>

<th className="p-3 w-[150px]">
Name
</th>

<th className="p-3 w-[220px]">
Email
</th>

<th className="p-3 w-[130px]">
Phone
</th>

<th className="p-3 w-[120px]">
Payment App
</th>

<th className="p-3 w-[100px]">
Amount
</th>

<th className="p-3 w-[160px]">
Transaction
</th>

<th className="p-3 w-[120px]">
Screenshot
</th>

<th className="p-3 w-[120px]">
Status
</th>

<th className="p-3 w-[120px]">
Download
</th>

<th className="p-3 w-[220px]">
Actions
</th>

</tr>

</thead>

          <tbody>

            {

              loading

              ?

              <tr>

                <td
                  colSpan="11"
                  className="text-center py-10 text-white"
                >

                  Loading...

                </td>

              </tr>

              :

              filteredPayments.length===0

              ?

              <tr>

                <td
                  colSpan="11"
                  className="text-center py-10 text-red-400"
                >

                  No Payment Requests

                </td>

              </tr>

              :

              currentPayments.map((payment,index)=>(

                <tr
                  key={payment._id}
                  className="border-b border-slate-700 hover:bg-slate-800 text-center text-white"
                >

                  <td className="p-3">

                   {firstIndex + index + 1}

                  </td>

                  <td>

                    {payment.name}

                  </td>

                  <td>

                    {payment.email}

                  </td>

                  <td>

                    {payment.phone}

                  </td>

                  <td>

                    {payment.paymentApp}

                  </td>

                  <td>

                    ₹{payment.amount}

                  </td>

                  <td>

                    {payment.transactionId || "-"}

                  </td>

                  <td>

                    <button

                      onClick={()=>setPreviewImage(payment.screenshot)}

                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"

                    >

                      View

                    </button>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm

                      ${
                        payment.status==="Pending"

                        ?

                        "bg-yellow-500"

                        :

                        payment.status==="Approved"

                        ?

                        "bg-green-600"

                        :

                        "bg-red-600"

                      }

                      `}
                    >

                      {payment.status}

                    </span>

                  </td>

                  <td>

                    {

                      payment.downloaded

                      ?

                      <span className="text-red-400">

                        Locked

                      </span>

                      :

                      <span className="text-green-400">

                        Available

                      </span>

                    }

                  </td>

                  <td>

             <div className="flex flex-wrap justify-center gap-2">

  <button

    onClick={() => approvePayment(payment._id)}

    disabled={payment.status === "Approved"}

    className={`px-3 py-1 rounded text-white

      ${payment.status === "Approved"

        ? "bg-gray-500 cursor-not-allowed"

        : "bg-green-600 hover:bg-green-700"

      }

    `}

  >

    Approve

  </button>


  <button

    onClick={() => rejectPayment(payment._id)}

    disabled={payment.status === "Rejected"}

    className={`px-3 py-1 rounded text-white

      ${payment.status === "Rejected"

        ? "bg-gray-500 cursor-not-allowed"

        : "bg-red-600 hover:bg-red-700"

      }

    `}

  >

    Reject

  </button>


  {

    payment.downloaded && (

      <button

        onClick={() => resetDownload(payment._id)}

        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"

      >

        Unlock

      </button>

    )

  }

</div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

{/* ========================= */}
{/* PAGINATION */}
{/* ========================= */}

{
totalPages > 1 && (

<div className="flex justify-center items-center gap-3 mt-6">


<button

disabled={currentPage===1}

onClick={()=>setCurrentPage(currentPage-1)}

className={`px-4 py-2 rounded text-white

${
currentPage===1

?
"bg-gray-500 cursor-not-allowed"

:

"bg-cyan-600 hover:bg-cyan-700"

}

`}

>

Previous

</button>



{
Array.from(
{length:totalPages},
(_,i)=>(

<button

key={i}

onClick={()=>setCurrentPage(i+1)}

className={`px-4 py-2 rounded text-white

${
currentPage===i+1

?

"bg-green-600"

:

"bg-slate-700 hover:bg-slate-600"

}

`}

>

{i+1}

</button>


)

)
}



<button

disabled={currentPage===totalPages}

onClick={()=>setCurrentPage(currentPage+1)}

className={`px-4 py-2 rounded text-white

${
currentPage===totalPages

?
"bg-gray-500 cursor-not-allowed"

:

"bg-cyan-600 hover:bg-cyan-700"

}

`}

>

Next

</button>


</div>

)
}

{

previewImage && (

<div

className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"

onClick={()=>setPreviewImage(null)}

>

<div className="bg-white p-4 rounded-xl">

<img

src={`${Config.API_URL}/uploads/payments/${previewImage}`}

alt="Payment Screenshot"

className="max-w-[700px] max-h-[80vh] rounded-lg"

/>

</div>

</div>

)

}
    </div>

  );

}

export default AdminPayments;