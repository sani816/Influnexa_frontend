import { useEffect, useState } from "react";
import axios from "axios";
import { FaSyncAlt, FaTh, FaList } from "react-icons/fa";
import { io } from "socket.io-client";

function BrandSection() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("carousel");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editBrand, setEditBrand] = useState(null);

  const [matches, setMatches] = useState([]);

   const generateMatches = async (brandsList) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/creator"
    );

    const creators = res.data.creators || [];

    const result = [];

    brandsList.forEach((brand) => {
      creators.forEach((creator) => {

        let score = 0;

        // CATEGORY MATCH
        // const brandCategories =
        //   brand.preferredCategory || [];

        // const creatorCategories =
        //   creator.preferredCategory || [];

        // const commonCategories =
        //   brandCategories.filter((cat) =>
        //     creatorCategories.includes(cat)
        //   );

        // score += commonCategories.length * 20;

        // FOLLOWER MATCH
        // if (
        //   brand.lookingFor?.includes("Nano") &&
        //   creator.followersRange === "0-10K"
        // )
        //   score += 20;

        // if (
        //   brand.lookingFor?.includes("Micro") &&
        //   creator.followersRange === "10K-50K"
        // )
        //   score += 20;

        // if (
        //   brand.lookingFor?.includes("Macro") &&
        //   creator.followersRange === "100K+"
        // )
        //   score += 20;

        // LOCATION MATCH
        if (
          brand.influencerLocation &&
          creator.city &&
          brand.influencerLocation
            .includes(creator.city)
        ) {
          score += 15;
        }

        // // CAMPAIGN TYPE MATCH
        // const campaignMatches =
        //   creator.campaignTypes?.length || 0;

        // score += campaignMatches * 5;

        // BUDGET MATCH
        // const reelRate =
        //   Number(creator.reelRate) || 0;

        // if (
        //   brand.budgetRange === "10000-50000" &&
        //   reelRate <= 50000
        // ) {
        //   score += 20;
        // }

        // if (
        //   brand.budgetRange === "50000-100000" &&
        //   reelRate <= 100000
        // ) {
        //   score += 20;
        // }

        // if (score >= 30) {
        //   result.push({
        //     brandId: brand._id,
        //     creatorId: creator._id,
        //     brand: brand.brandName,
        //     creator: creator.fullName,
        //     score,
        //     category:
        //       commonCategories.join(", "),
        //   });
        // }
      });
    });

    setMatches(
      result.sort((a, b) => b.score - a.score)
    );

  } catch (err) {
    console.log(err);
  }
};


  // FETCH
 const fetchBrands = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "http://localhost:5000/api/brands"
    );

    const data = res.data?.brands || [];

    setBrands(data);

    // Generate matches after brands load
    generateMatches(data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  // UPDATE (FIXED)
  const updateBrand = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/brands/${editBrand._id}`,
        editBrand
      );

      const updated = res.data?.brand;

      setBrands((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );

      setEditBrand(null);
    } catch (err) {
      console.log(err);
      alert("Update failed (check backend route)");
    }
  };

  // SOCKET
 useEffect(() => {
  fetchBrands();

  const socket = io("http://localhost:5000");

  // BRAND EVENTS
  socket.on("new-brand", (newBrand) => {
    setBrands((prev) => [newBrand, ...prev]);
    fetchBrands(); // refresh matches
  });

  socket.on("update-brand", (updated) => {
    setBrands((prev) =>
      prev.map((b) => (b._id === updated._id ? updated : b))
    );

    fetchBrands(); // refresh matches
  });

  socket.on("delete-brand", () => {
    fetchBrands();
  });

  // CREATOR EVENTS
  socket.on("new-creator", () => {
    fetchBrands(); // refresh matches
  });

  socket.on("update-creator", () => {
    fetchBrands(); // refresh matches
  });

  socket.on("delete-creator", () => {
    fetchBrands(); // refresh matches
  });

  return () => socket.disconnect();
}, []);

useEffect(() => {
  if (brands.length > 0) {
    generateMatches(brands);
  }
}, [brands]);


  // FILTER + SEARCH
  const filteredBrands = brands
    .filter((b) => (filter === "all" ? true : b.status === filter))
    .filter(
      (b) =>
        b.brandName?.toLowerCase().includes(search.toLowerCase()) ||
        b.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        b.workEmail?.toLowerCase().includes(search.toLowerCase())
    );

   
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">
          Brands Dashboard
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/10 text-white"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <button
            onClick={() =>
              setView(view === "carousel" ? "table" : "carousel")
            }
            className="bg-purple-500 px-3 py-2 rounded-lg text-white flex items-center gap-2"
          >
            {view === "carousel" ? <FaList /> : <FaTh />}
            View
          </button>

          <button
            onClick={fetchBrands}
            className="flex items-center gap-2 bg-cyan-500 px-4 py-2 rounded-xl text-white"
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>
      </div>

      {/* EDIT MODAL */}
      {editBrand && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[420px]">

            <h2 className="text-xl font-bold mb-4">Edit Brand</h2>

            <input
              className="w-full p-2 border mb-2"
              value={editBrand.brandName || ""}
              onChange={(e) =>
                setEditBrand({ ...editBrand, brandName: e.target.value })
              }
              placeholder="Brand Name"
            />

            <input
              className="w-full p-2 border mb-2"
              value={editBrand.fullName || ""}
              onChange={(e) =>
                setEditBrand({ ...editBrand, fullName: e.target.value })
              }
              placeholder="Full Name"
            />

            <input
              className="w-full p-2 border mb-2"
              value={editBrand.workEmail || ""}
              onChange={(e) =>
                setEditBrand({ ...editBrand, workEmail: e.target.value })
              }
              placeholder="Email"
            />

            <input
              className="w-full p-2 border mb-2"
              value={editBrand.mobileNumber || ""}
              onChange={(e) =>
                setEditBrand({ ...editBrand, mobileNumber: e.target.value })
              }
              placeholder="Mobile"
            />

            <input
              className="w-full p-2 border mb-2"
              value={editBrand.websiteUrl || ""}
              onChange={(e) =>
                setEditBrand({ ...editBrand, websiteUrl: e.target.value })
              }
              placeholder="Website URL"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={updateBrand}
                className="bg-green-500 px-4 py-2 text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditBrand(null)}
                className="bg-red-500 px-4 py-2 text-white rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

{/* 🔥 MATCHING SECTION
<div className="mb-6 bg-white/10 p-4 rounded-xl border border-white/20">

  <h2 className="text-xl font-bold text-cyan-300 mb-3">
    Best Brand ↔ Influencer Matches
  </h2>

  {matches.length === 0 ? (
    <p className="text-gray-400">No strong matches found</p>
  ) : (
    <div className="space-y-2 max-h-40 overflow-y-auto">

      {matches.slice(0, 5).map((m, index) => (
        <div
          key={index}
          className="flex justify-between bg-slate-800 p-3 rounded-lg text-white"
        >
          <span>
            🏢 {m.brand} ↔ 👤 {m.creator}
          </span>

          <span className="text-green-400 font-bold">
            {m.score}% match
          </span>
        </div>
      ))}

    </div>
  )}

</div> */}


      {/* CAROUSEL */}
      {loading ? (
        <p className="text-white">Loading brands...</p>
      ) : view === "carousel" ? (

        <div className="flex gap-6 overflow-x-auto p-2">

          {filteredBrands.map((brand) => (
            <div
              key={brand._id}
              className="min-w-[300px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 text-white shadow-xl hover:scale-105 transition"
            >

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-black">
                  {brand.brandName?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-cyan-300">
                    {brand.brandName}
                  </h2>
                  <p className="text-l text-gray-100 font-bold">
                    Owner: {brand.fullName}
                  </p>
                </div>

              </div>

             
             {/* INFO */}
<div className="space-y-2 text-sm font-bold">

  <p>
    <span className="text-cyan-300">📧 Brand Email:</span>{" "}
    {brand.workEmail || "N/A"}
  </p>

  <p>
    <span className="text-cyan-300">📱 Mobile:</span>{" "}
    {brand.mobileNumber || "N/A"}
  </p>

  {/* <p>
    <span className="text-cyan-300">🏢 Industry:</span>{" "}
    {brand.industry || "N/A"}
  </p> */}

  <p>
    <span className="text-cyan-300">🎯 Looking For:</span>{" "}
    {Array.isArray(brand.lookingFor)
      ? brand.lookingFor.join(", ")
      : brand.lookingFor || "N/A"}
  </p>

  <p>
    <span className="text-cyan-300">💰 Budget Range:</span>{" "}
    {brand.budgetRange || "N/A"}
  </p>

  <p>
    <span className="text-cyan-300">📍 Location required:</span>{" "}
    {brand.influencerLocation || "N/A"}
  </p>

  <p>
    <span className="text-cyan-300">📂 Category Needed:</span>{" "}
    {Array.isArray(brand.preferredCategory)
      ? brand.preferredCategory.join(", ")
      : brand.preferredCategory || "N/A"}
  </p>

  <p>
    <span className="text-cyan-300">📸 Instagram:</span>{" "}
    {brand.instagramHandle || "N/A"}
  </p>

  <p>
    <span className="text-cyan-300">🌐 Website:</span>{" "}
    {brand.websiteUrl ? (
      <a
        href={brand.websiteUrl}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 underline"
      >
        Visit Website
      </a>
    ) : (
      "N/A"
    )}
  </p>

  <p>
    <span className="text-cyan-300">📅 Created:</span>{" "}
    {brand.createdAt
      ? new Date(brand.createdAt).toLocaleDateString()
      : "N/A"}
  </p>

</div>

              {/* EDIT */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditBrand(brand)}
                  className="bg-blue-500 px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>
              </div>

            </div>
          ))}
        </div>

      ) : (
        /* TABLE */
        <div className="bg-white/10 p-4 rounded-xl text-white">
          <table className="w-full">

            <thead>
              <tr>
                <th>Brand</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBrands.map((b) => (
                <tr key={b._id}>
                  <td>{b.brandName}</td>
                  <td>{b.fullName}</td>
                  <td>{b.workEmail}</td>
                  <td>
                    <button
                      onClick={() => setEditBrand(b)}
                      className="bg-blue-500 px-3 py-1 text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default BrandSection;