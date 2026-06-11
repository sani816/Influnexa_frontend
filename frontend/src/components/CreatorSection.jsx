import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Config from "../config/Config";

function CreatorSection() {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [followersFilter, setFollowersFilter] = useState("");

  // 🔥 EDIT STATE
  const [editData, setEditData] = useState(null);

  // FETCH
  const fetchCreators = async () => {
    const res = await axios.get(`${Config.API_URL}/api/creator`);
    setCreators(res.data.creators || []);
  };

  useEffect(() => {
    fetchCreators();

    const socket = io(Config.API_URL);

    socket.on("new-creator", (data) => {
      setCreators((prev) => [data, ...prev]);
    });

    socket.on("update-creator", (updated) => {
      setCreators((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
    });

    socket.on("delete-creator", (id) => {
      setCreators((prev) => prev.filter((c) => c._id !== id));
    });

    return () => socket.disconnect();
  }, []);

  // DELETE
  const deleteCreator = async (id) => {
    await axios.delete(`${Config.API_URL}/api/creator/${id}`);
  };

  // UPDATE
  const updateCreator = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", editData.fullName);
      formData.append("email", editData.email);
      formData.append("mobileNumber", editData.mobileNumber);
      formData.append("city", editData.city);
      formData.append("state", editData.state);
      formData.append("instagramUsername", editData.instagramUsername);

      await axios.put(
         `${Config.API_URL}/api/creator/${editData._id}`,
  formData
      );

      setEditData(null);
      alert("Updated Successfully");

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  // FILTER
  const filtered = creators
    .filter((c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.instagramUsername?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (cityFilter ? c.city === cityFilter : true))
    .filter((c) =>
      followersFilter ? c.followersRange === followersFilter : true
    );

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white mb-5">
        Influencer Admin Panel
      </h1>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 bg-white/10 text-white rounded"
        />

        <input
          placeholder="Filter City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-2 bg-white/10 text-white rounded"
        />

        {/* <select
          value={followersFilter}
          onChange={(e) => setFollowersFilter(e.target.value)}
          className="px-3 py-2 bg-white/10 text-white rounded"
        >
          <option value="">All Followers</option>
          <option value="0-10K">0-10K</option>
          <option value="10K-50K">10K-50K</option>
          <option value="50K-100K">50K-100K</option>
          <option value="100K+">100K+</option>
        </select> */}

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
      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map((creator) => (
          <div
            key={creator._id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl"
          >

            {/* IMAGE */}
            <img
              src={
                creator.image
                  ? `${Config.API_URL}/uploads/${creator.image}`
                  : "https://via.placeholder.com/400x200"
              }
              className="w-full h-44 object-cover"
              alt="creator"
            />

            {/* DETAILS */}
        <div className="p-4 text-white">

  <h2 className="text-xl font-bold text-cyan-300 mb-3">
    {creator.fullName}
  </h2>

  <div className="space-y-2 text-sm ">

    <p>
      📧 <span className="text-gray-100"><span className="text-cyan-200 font-bold ">Creator Email:</span> {creator.email}</span>
    </p>

    <p>
      📱 <span className="text-gray-300"><span className="text-cyan-200 font-bold ">Mobile Number:</span> {creator.mobileNumber}</span>
    </p>

    <p>
      📍 <span className="text-gray-300">
        <span className="text-cyan-200 font-bold ">Loaction:</span> {creator.city}, {creator.state}
      </span>
    </p>

   {/* <p className="text-cyan-300 mb-2">
    🏷️ Categories
  </p>

  <div className="flex flex-wrap gap-2">
    {creator.preferredCategory?.length ? (
      creator.preferredCategory.map((cat, index) => (
        <span
          key={index}
          className="px-2 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
        >
          {cat}
        </span>
      ))
    ) : (
      <span className="text-gray-400">
        No Category Selected
      </span>
    )}
  </div> */}

    <p>
      👥 <span className="text-cyan-200 font-bold">Followers:</span>{" "}
      {creator.followersRange || "N/A"}
    </p>

     <p>
    🚻 <span className="text-cyan-200 font-bold ">Gender:</span> {creator.gender || "N/A"}
  </p>

  
      {/* <p>
    🏢 Worked With:
    {" "}
    {creator.brandNames || "No brands yet"}
  </p> */}
 <p>
    🎥 
    {" "}
    <span className="text-cyan-200 font-bold ">Reel Rate:</span> {creator.reelRate || "N/A"} %
  </p>

    {/* <p>
      💰 <span className="text-cyan-300">Pricing:</span>{" "}
      {creator.priceRange || "N/A"}
    </p> */} 

    <p>
      📸{" "}
      <a
        href={creator.instagramLink}
        target="_blank"
        rel="noreferrer"
        className="text-white "
      >
        <span className="text-cyan-200 font-bold ">Instagram Link:</span> {creator.instagramUsername}
      </a>
    </p>

  </div>

  {/* BIO BOX */}
  {/* <div className="mt-4 bg-black/20 border border-cyan-500/20 rounded-xl p-3">
    <h3 className="text-cyan-300 font-semibold mb-2">
      Creator Bio
    </h3>

    <p className="text-xs text-gray-300">
      {creator.bio || "No bio available"}
    </p>
  </div> */}

  {/* STATS */}
  <div className="grid grid-cols-3 gap-2 mt-4">

    {/* <div className="bg-cyan-500/10 rounded-lg p-2 text-center">
      <p className="text-xs text-gray-400">Followers</p>
      <p className="font-bold">
        {creator.followersRange || "-"}
      </p>
    </div> */}

    {/* <div className="bg-purple-500/10 rounded-lg p-2 text-center">
      <p className="text-xs text-gray-400">Engagement</p>
      <p className="font-bold">
        {creator.engagementRate || "-"}
      </p>
    </div> */}

    {/* <div className="bg-pink-500/10 rounded-lg p-2 text-center">
      <p className="text-xs text-gray-400">Rating</p>
      <p className="font-bold">
        ⭐ {creator.rating || "5.0"}
      </p>
    </div> */}

  </div>

  {/* BUTTONS */}
  <div className="flex gap-2 mt-4">

    <button
      onClick={() => setEditData(creator)}
      className="bg-blue-500 px-3 py-2 rounded text-xs"
    >
      Edit
    </button>

    <button
      onClick={() => deleteCreator(creator._id)}
      className="bg-red-500 px-3 py-2 rounded text-xs"
    >
      Delete
    </button>

  </div>

</div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CreatorSection;