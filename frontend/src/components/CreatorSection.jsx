import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Config from "../config/Config";

function CreatorSection() {
  const [creators, setCreators] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");


  // 🔥 EDIT STATE
  const [editData, setEditData] = useState(null);

  // FETCH
  const fetchCreators = async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/api/creator`);
      setCreators(res.data.creators || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCreators();

    const socket = io(Config.API_URL);

    socket.on("new-creator", (creator) => {
      setCreators((prev) => [creator, ...prev]);
    });

    socket.on("update-creator", (updated) => {
      setCreators((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
    });

    socket.on("delete-creator", (id) => {
      setCreators((prev) =>
        prev.filter((c) => c._id !== id)
      );
    });

    return () => socket.disconnect();
  }, []);
  // DELETE
 const deleteCreator = async (id) => {
    if (!window.confirm("Delete this creator?")) return;

    try {
      await axios.delete(`${Config.API_URL}/api/creator/${id}`);
      fetchCreators();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };
  // UPDATE
   const updateCreator = async () => {
    try {
      const formData = new FormData();

      Object.keys(editData).forEach((key) => {
        if (editData[key] !== undefined && editData[key] !== null) {
          formData.append(key, editData[key]);
        }
      });

      await axios.put(
        `${Config.API_URL}/api/creator/${editData._id}`,
        formData
      );

      alert("Creator Updated Successfully");

      setEditData(null);

      fetchCreators();

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  // FILTER
 const filtered = creators.filter((creator) => {

    const matchName =
      creator.fullName
        ?.toLowerCase()
        .includes(nameFilter.toLowerCase());

    const matchCity =
      creator.city
        ?.toLowerCase()
        .includes(cityFilter.toLowerCase());

    const matchMobile =
      creator.mobileNumber
        ?.toString()
        .includes(mobileFilter);

    const matchEmail =
      creator.email
        ?.toLowerCase()
        .includes(emailFilter.toLowerCase());

    return (
      matchName &&
      matchCity &&
      matchMobile &&
      matchEmail
    );
  });


  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white mb-6">
        Creator Management
      </h1>

      {/* FILTERS */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <input
          placeholder="Search by Name"
          value={nameFilter}
          onChange={(e)=>setNameFilter(e.target.value)}
          className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
        />

        <input
          placeholder="Search by City"
          value={cityFilter}
          onChange={(e)=>setCityFilter(e.target.value)}
          className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
        />

        <input
          placeholder="Search by Contact Number"
          value={mobileFilter}
          onChange={(e)=>setMobileFilter(e.target.value)}
          className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
        />

        <input
          placeholder="Search by Email"
          value={emailFilter}
          onChange={(e)=>setEmailFilter(e.target.value)}
          className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
        />

      </div>
{/* ======================= CREATOR TABLE ======================= */}

<div className="overflow-x-auto rounded-xl border border-cyan-500 shadow-lg">

  <table className="w-max min-w-full text-sm text-white border-collapse">

    {/* ================= HEADER ================= */}

    <thead className="bg-cyan-500 text-black sticky top-0 z-10">

      <tr>

        <th className="px-4 py-3 text-left">#</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">Image</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">Full Name</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">Instagram</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">Followers</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">Mobile</th>

        <th className="px-4 py-3 text-left whitespace-nowrap">WhatsApp</th>

        <th className="px-4 py-3 text-left">Gender</th>

        <th className="px-4 py-3 text-left">DOB</th>

        <th className="px-4 py-3 text-left">Preferred Category</th>

        <th className="px-4 py-3 text-left">Campaign Types</th>

        <th className="px-4 py-3 text-left">Reel ₹</th>

        <th className="px-4 py-3 text-left">Story ₹</th>

        <th className="px-4 py-3 text-left">Post ₹</th>

        <th className="px-4 py-3 text-left">YT Video ₹</th>

        <th className="px-4 py-3 text-left">YT Shorts ₹</th>

        <th className="px-4 py-3 text-left">Has YouTube</th>

        <th className="px-4 py-3 text-left">YouTube Name</th>

        <th className="px-4 py-3 text-left">YouTube Link</th>

        <th className="px-4 py-3 text-left">Subscribers</th>

        <th className="px-4 py-3 text-left">Address 1</th>

        <th className="px-4 py-3 text-left">Address 2</th>

        <th className="px-4 py-3 text-left">City</th>

        <th className="px-4 py-3 text-left">State</th>

        <th className="px-4 py-3 text-left">Pincode</th>

        <th className="px-4 py-3 text-left">Address Type</th>

        <th className="px-4 py-3 text-left">Receive Products</th>

        <th className="px-4 py-3 text-left">Worked Brands</th>

        <th className="px-4 py-3 text-left">Registered</th>

        <th className="px-4 py-3 text-center">Actions</th>

      </tr>

    </thead>

    {/* ================= BODY ================= */}

    <tbody>

      {filtered.length > 0 ? (

        filtered.map((creator, index) => (

          <tr
            key={creator._id}
            className="border-b border-white/10 hover:bg-cyan-500/10 transition"
          >

            <td className="px-4 py-3">{index + 1}</td>

            {/* IMAGE */}

            <td className="px-4 py-3">

              {creator.image ? (

                <a
                  href={`${Config.API_URL}/uploads/${creator.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <img
                    src={`${Config.API_URL}/uploads/${creator.image}`}
                    alt={creator.fullName}
                    className="w-14 h-14 rounded-lg border object-cover hover:scale-105 transition"
                  />

                </a>

              ) : (

                <span className="text-gray-400">No Image</span>

              )}

            </td>

            <td className="px-4 py-3 whitespace-nowrap">
              {creator.fullName || "N/A"}
            </td>

            <td className="px-4 py-3 whitespace-nowrap">

              {creator.instagramLink ? (

                <a
                  href={creator.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline"
                >
                  {creator.instagramUsername || "Open"}
                </a>

              ) : (
                "N/A"
              )}

            </td>

            <td className="px-4 py-3">{creator.followersRange || "N/A"}</td>

            <td className="px-4 py-3 whitespace-nowrap">{creator.email || "N/A"}</td>

            <td className="px-4 py-3">{creator.mobileNumber || "N/A"}</td>

            <td className="px-4 py-3">{creator.whatsappNumber || "N/A"}</td>

            <td className="px-4 py-3">{creator.gender || "N/A"}</td>

            <td className="px-4 py-3">{creator.dob || "N/A"}</td>

            <td className="px-4 py-3">

              {creator.preferredCategory?.length
                ? creator.preferredCategory.join(", ")
                : "N/A"}

            </td>

            <td className="px-4 py-3">

              {creator.campaignTypes?.length
                ? creator.campaignTypes.join(", ")
                : "N/A"}

            </td>

            <td className="px-4 py-3">₹ {creator.reelRate || 0}</td>

            <td className="px-4 py-3">₹ {creator.storyRate || 0}</td>

            <td className="px-4 py-3">₹ {creator.postRate || 0}</td>

            <td className="px-4 py-3">₹ {creator.ytVideoRate || 0}</td>

            <td className="px-4 py-3">₹ {creator.ytShortsRate || 0}</td>

            <td className="px-4 py-3">{creator.hasYoutube || "No"}</td>

            <td className="px-4 py-3">{creator.youtubeName || "N/A"}</td>

            <td className="px-4 py-3">
  {creator.youtubeLink ? (
    <a
      href={creator.youtubeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-300 underline hover:text-cyan-200"
    >
      {creator.youtubeLink}
    </a>
  ) : (
    <span className="text-gray-400">N/A</span>
  )}
</td>

            <td className="px-4 py-3">{creator.youtubeSubs || "N/A"}</td>

            <td className="px-4 py-3">{creator.address1 || "N/A"}</td>

            <td className="px-4 py-3">{creator.address2 || "N/A"}</td>

            <td className="px-4 py-3">{creator.city || "N/A"}</td>

            <td className="px-4 py-3">{creator.state || "N/A"}</td>

            <td className="px-4 py-3">{creator.pincode || "N/A"}</td>

            <td className="px-4 py-3">{creator.addressType || "N/A"}</td>

            <td className="px-4 py-3">{creator.canReceiveProducts || "No"}</td>

            <td className="px-4 py-3">{creator.brandNames || "N/A"}</td>

            <td className="px-4 py-3 max-w-xs break-words">
              {creator.message || "N/A"}
            </td>

            <td className="px-4 py-3 whitespace-nowrap">

              {creator.createdAt
                ? new Date(creator.createdAt).toLocaleString()
                : "N/A"}

            </td>

            {/* ACTIONS */}

            <td className="px-4 py-3">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() => setEditData(creator)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCreator(creator._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))

      ) : (

        <tr>

          <td
            colSpan={32}
            className="text-center py-10 text-gray-400 text-lg"
          >
            No Creator Found
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>
      {/* EDIT MODAL */}
      {editData && (
  <div className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 border-l border-cyan-500 shadow-2xl z-50 overflow-y-auto">
    
    <div className="p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-cyan-400">
          Edit Creator
        </h2>

        <button
          onClick={() => setEditData(null)}
          className="bg-red-500 px-3 py-1 rounded text-white"
        >
          ✕
        </button>
      </div>

      <input
        className="w-full p-2 rounded bg-black/30 border border-cyan-500 text-white mb-3"
        placeholder="Full Name"
        value={editData.fullName || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            fullName: e.target.value,
          })
        }
      />

      <input
        className="w-full p-2 rounded bg-black/30 border border-cyan-500 text-white mb-3"
        placeholder="Email"
        value={editData.email || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            email: e.target.value,
          })
        }
      />

      <input
        className="w-full p-2 rounded bg-black/30 border border-cyan-500 text-white mb-3"
        placeholder="Mobile Number"
        value={editData.mobileNumber || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            mobileNumber: e.target.value,
          })
        }
      />

      <input
        className="w-full p-2 rounded bg-black/30 border border-cyan-500 text-white mb-3"
        placeholder="City"
        value={editData.city || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            city: e.target.value,
          })
        }
      />

      <input
        className="w-full p-2 rounded bg-black/30 border border-cyan-500 text-white mb-3"
        placeholder="State"
        value={editData.state || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            state: e.target.value,
          })
        }
      />

      <button
        onClick={updateCreator}
        className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded font-bold text-white"
      >
        Save Changes
      </button>

    </div>
  </div>
)}
            
</div>
      
  );
}

export default CreatorSection;