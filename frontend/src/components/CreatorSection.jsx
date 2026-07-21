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

  {/* HEADER */}
  <div className="flex justify-between items-start mb-4">

    <div>
      <h2 className="text-xl font-bold text-cyan-300">
        {creator.fullName}
      </h2>

      <p className="text-gray-300">
        @{creator.instagramUsername}
      </p>
    </div>

    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500 text-xs font-bold">
      {creator.followersRange || "N/A"}
    </span>

  </div>

  <div className="space-y-2 text-sm">

    <p><span className="text-cyan-300 font-bold">📧 Email:</span> {creator.email || "N/A"}</p>

    <p><span className="text-cyan-300 font-bold">📱 Mobile:</span> {creator.mobileNumber || "N/A"}</p>

    <p><span className="text-cyan-300 font-bold">💬 WhatsApp:</span> {creator.whatsappNumber || "N/A"}</p>

    <p><span className="text-cyan-300 font-bold">🚻 Gender:</span> {creator.gender || "N/A"}</p>

    <p><span className="text-cyan-300 font-bold">🎂 DOB:</span> {creator.dob || "N/A"}</p>

    <p>
      <span className="text-cyan-300 font-bold">📍 Address:</span>{" "}
      {creator.address1}, {creator.address2}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">🏙 City:</span>{" "}
      {creator.city}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">🗺 State:</span>{" "}
      {creator.state}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">📮 Pincode:</span>{" "}
      {creator.pincode}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">🏠 Address Type:</span>{" "}
      {creator.addressType || "N/A"}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">🎯 Preferred Category:</span>{" "}
      {Array.isArray(creator.preferredCategory)
        ? creator.preferredCategory.join(", ")
        : creator.preferredCategory || "N/A"}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">📢 Campaign Types:</span>{" "}
      {Array.isArray(creator.campaignTypes)
        ? creator.campaignTypes.join(", ")
        : creator.campaignTypes || "N/A"}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">📸 Instagram:</span>{" "}
      <a
        href={creator.instagramLink}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 underline"
      >
        {creator.instagramUsername}
      </a>
    </p>

    <p>
      <span className="text-cyan-300 font-bold">▶ YouTube:</span>{" "}
      {creator.hasYoutube === "Yes" ? "Yes" : "No"}
    </p>

    {creator.hasYoutube === "Yes" && (
      <>
        <p>
          <span className="text-cyan-300 font-bold">📺 Channel:</span>{" "}
          {creator.youtubeName}
        </p>

        <p>
          <span className="text-cyan-300 font-bold">🔗 Channel Link:</span>{" "}
          <a
            href={creator.youtubeLink}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 underline"
          >
            Visit Channel
          </a>
        </p>

        <p>
          <span className="text-cyan-300 font-bold">👥 Subscribers:</span>{" "}
          {creator.youtubeSubs || "N/A"}
        </p>
      </>
    )}

    <hr className="border-white/20 my-3" />

    <h3 className="text-cyan-300 font-bold">
      💰 Pricing Details
    </h3>

    <p>🎥 Reel : ₹ {creator.reelRate || 0}</p>

    <p>📸 Story : ₹ {creator.storyRate || 0}</p>

    <p>🖼 Post : ₹ {creator.postRate || 0}</p>

    <p>▶ YouTube Video : ₹ {creator.ytVideoRate || 0}</p>

    <p>🎬 YouTube Shorts : ₹ {creator.ytShortsRate || 0}</p>

    <hr className="border-white/20 my-3" />

    <p>
      <span className="text-cyan-300 font-bold">🎁 Can Receive Products:</span>{" "}
      {creator.canReceiveProducts || "No"}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">🤝 Worked With Brands:</span>{" "}
      {creator.brandNames || "No Brands"}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">📝 Message:</span>{" "}
      {creator.message || "N/A"}
    </p>

    <p>
      <span className="text-cyan-300 font-bold">📅 Registered:</span>{" "}
      {new Date(creator.createdAt).toLocaleDateString()}
    </p>

  </div>

  <div className="flex gap-2 mt-5">

    <button
      onClick={() => setEditData(creator)}
      className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
    >
      Edit
    </button>

    <button
      onClick={() => deleteCreator(creator._id)}
      className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
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