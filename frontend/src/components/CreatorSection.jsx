import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Config from "../config/Config";
import Papa from "papaparse";
import { saveAs } from "file-saver";

function CreatorSection() {
  const [creators, setCreators] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
const [instagramFilter, setInstagramFilter] = useState("");
const [followersFilter, setFollowersFilter] = useState("");
const [emailFilter, setEmailFilter] = useState("");
const [mobileFilter, setMobileFilter] = useState("");
const [whatsappFilter, setWhatsappFilter] = useState("");

const [genderFilter, setGenderFilter] = useState("");
const [dobFilter, setDobFilter] = useState("");

const [categoryFilter, setCategoryFilter] = useState("");
const [campaignFilter, setCampaignFilter] = useState("");

const [reelRateFilter, setReelRateFilter] = useState("");
const [storyRateFilter, setStoryRateFilter] = useState("");
const [postRateFilter, setPostRateFilter] = useState("");

const [youtubeNameFilter, setYoutubeNameFilter] = useState("");
const [youtubeSubsFilter, setYoutubeSubsFilter] = useState("");

const [cityFilter, setCityFilter] = useState("");
const [stateFilter, setStateFilter] = useState("");
const [pincodeFilter, setPincodeFilter] = useState("");

const [addressTypeFilter, setAddressTypeFilter] = useState("");
const [productFilter, setProductFilter] = useState("");

const [brandFilter, setBrandFilter] = useState("");
const [hasYoutubeFilter, setHasYoutubeFilter] = useState("");
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

        const matchInstagram =
creator.instagramUsername?.toLowerCase().includes(instagramFilter.toLowerCase());

const matchFollowers =
creator.followersRange?.toString().includes(followersFilter);

const matchWhatsapp =
creator.whatsappNumber?.includes(whatsappFilter);

const matchGender =
  genderFilter === "" ||
  creator.gender?.trim().toLowerCase() ===
    genderFilter.trim().toLowerCase();

const matchDOB =
creator.dob?.includes(dobFilter);

const matchCategory =
creator.preferredCategory?.join(",").toLowerCase().includes(categoryFilter.toLowerCase());

const matchCampaign =
creator.campaignTypes?.join(",").toLowerCase().includes(campaignFilter.toLowerCase());

const matchReel =
creator.reelRate?.toString().includes(reelRateFilter);

const matchStory =
creator.storyRate?.toString().includes(storyRateFilter);

const matchPost =
creator.postRate?.toString().includes(postRateFilter);

const matchYoutubeName =
creator.youtubeName?.toLowerCase().includes(youtubeNameFilter.toLowerCase());

const matchYoutubeSubs =
creator.youtubeSubs?.toString().includes(youtubeSubsFilter);

const matchState =
creator.state?.toLowerCase().includes(stateFilter.toLowerCase());

const matchPincode =
creator.pincode?.includes(pincodeFilter);

const matchAddress =
  addressTypeFilter === "" ||
  creator.addressType?.trim().toLowerCase() ===
    addressTypeFilter.trim().toLowerCase();

const matchProducts =
  productFilter === "" ||
  creator.canReceiveProducts?.trim().toLowerCase() ===
    productFilter.trim().toLowerCase();

const matchBrand =
creator.brandNames?.toLowerCase().includes(brandFilter.toLowerCase());


const matchHasYoutube =
  hasYoutubeFilter === "" ||
  creator.hasYoutube?.trim().toLowerCase() ===
    hasYoutubeFilter.trim().toLowerCase();

    return (
  matchName &&
  matchInstagram &&
  matchFollowers &&
  matchEmail &&
  matchMobile &&
  matchWhatsapp &&
  matchGender &&
  matchDOB &&
  matchCategory &&
  matchCampaign &&
  matchReel &&
  matchStory &&
  matchPost &&
  matchYoutubeName &&
  matchYoutubeSubs &&
  matchCity &&
  matchState &&
  matchPincode &&
  matchAddress &&
  matchProducts &&
  matchBrand &&
  matchHasYoutube
);
  });

//  DOwnload filter CSV

const downloadCSV = () => {
  if (filtered.length === 0) {
    alert("No filtered data available to download.");
    return;
  }

  const exportData = filtered.map((creator) => ({
    InstagramUsername: creator.instagramUsername || "",
  InstagramLink: creator.instagramLink || "",
  Followers: creator.followersRange || "",

  FullName: creator.fullName || "",
  Email: creator.email || "",
  MobileNumber: creator.mobileNumber || "",
  WhatsAppNumber: creator.whatsappNumber || "",

  Gender: creator.gender || "",
  DOB: creator.dob || "",

  PreferredCategory: creator.preferredCategory?.join(", ") || "",
  CampaignTypes: creator.campaignTypes?.join(", ") || "",

  ReelRate: creator.reelRate || "",
  StoryRate: creator.storyRate || "",
  PostRate: creator.postRate || "",

  HasYoutube: creator.hasYoutube || "",
  YoutubeName: creator.youtubeName || "",
  YoutubeLink: creator.youtubeLink || "",
  YoutubeSubscribers: creator.youtubeSubs || "",
  YoutubeVideoRate: creator.ytVideoRate || "",
  YoutubeShortRate: creator.ytShortsRate || "",

  Address1: creator.address1 || "",
  Address2: creator.address2 || "",
  City: creator.city || "",
  State: creator.state || "",
  Pincode: creator.pincode || "",

  AddressType: creator.addressType || "",
  CanReceiveProducts: creator.canReceiveProducts || "",

  BrandNames: creator.brandNames || "",

  Image: creator.image || "",

  Consent1: creator.consent1 ? "Yes" : "No",
  Consent2: creator.consent2 ? "Yes" : "No",
  Consent3: creator.consent3 ? "Yes" : "No",

  RegisteredOn: creator.createdAt
    ? new Date(creator.createdAt).toLocaleString()
    : "",
}));
  const csv = Papa.unparse(exportData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "Filtered_Creators.csv");
};


// Download mask CSV

const downloadMaskedCSV = () => {
  if (filtered.length === 0) {
    alert("No filtered data available to download.");
    return;
  }

  const exportData = filtered.map((creator) => ({
    // Instagram
    InstagramUsername: creator.instagramUsername || "",
    InstagramLink: creator.instagramLink || "",
    Followers: creator.followersRange || "",

    // Personal Details
    FullName: creator.fullName || "",

    Email: creator.email
      ? creator.email.replace(/^(.{2}).*(@.*)$/, "$1******$2")
      : "",

    MobileNumber: creator.mobileNumber
      ? creator.mobileNumber.replace(/^(\d{2})\d{6}(\d{2})$/, "$1******$2")
      : "",

    WhatsAppNumber: creator.whatsappNumber
      ? creator.whatsappNumber.replace(/^(\d{2})\d{6}(\d{2})$/, "$1******$2")
      : "",

    Gender: creator.gender || "",
    DOB: creator.dob || "",

    // Categories
    PreferredCategory:
      creator.preferredCategory?.join(", ") || "",

    CampaignTypes:
      creator.campaignTypes?.join(", ") || "",

    // Rates
    ReelRate: creator.reelRate || "",
    StoryRate: creator.storyRate || "",
    PostRate: creator.postRate || "",

    // YouTube
    HasYoutube: creator.hasYoutube || "",

    YoutubeName: creator.youtubeName || "",
    YoutubeLink: creator.youtubeLink || "",

    YoutubeSubscribers: creator.youtubeSubs || "",

    YoutubeVideoRate: creator.ytVideoRate || "",
    YoutubeShortRate: creator.ytShortsRate || "",

    // Address
    Address1: creator.address1 || "",
    Address2: creator.address2 || "",

    City: creator.city || "",
    State: creator.state || "",

    Pincode: creator.pincode
  ? creator.pincode.replace(/^(\d{2})\d{2}(\d{2})$/, "$1**$2")
  : "",

    AddressType: creator.addressType || "",

    CanReceiveProducts: creator.canReceiveProducts || "",

    // Brands
    BrandNames: creator.brandNames || "",

    // Image
    Image: creator.image || "",

    // Consents
    Consent1: creator.consent1 ? "Yes" : "No",
    Consent2: creator.consent2 ? "Yes" : "No",
    Consent3: creator.consent3 ? "Yes" : "No",

    // Registration
    RegisteredOn: creator.createdAt
      ? new Date(creator.createdAt).toLocaleString()
      : "",
  }));

  const csv = Papa.unparse(exportData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "Filtered_Creators_Masked.csv");
};

const isFilterApplied =
  nameFilter.trim() !== "" ||
  instagramFilter.trim() !== "" ||
  followersFilter.trim() !== "" ||
  emailFilter.trim() !== "" ||
  mobileFilter.trim() !== "" ||
  whatsappFilter.trim() !== "" ||
  genderFilter.trim() !== "" ||
  dobFilter.trim() !== "" ||
  categoryFilter.trim() !== "" ||
  campaignFilter.trim() !== "" ||
  reelRateFilter.trim() !== "" ||
  storyRateFilter.trim() !== "" ||
  postRateFilter.trim() !== "" ||
  youtubeNameFilter.trim() !== "" ||
  youtubeSubsFilter.trim() !== "" ||
  cityFilter.trim() !== "" ||
  stateFilter.trim() !== "" ||
  pincodeFilter.trim() !== "" ||
  addressTypeFilter.trim() !== "" ||
  productFilter.trim() !== "" ||
  brandFilter.trim() !== "" ||
  hasYoutubeFilter.trim() !== "";


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

        <input
        placeholder="Instagram Username"
        value={instagramFilter}
        onChange={(e)=>setInstagramFilter(e.target.value)}
       className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
        />

        <input
placeholder="Followers"
value={followersFilter}
onChange={(e)=>setFollowersFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="WhatsApp"
value={whatsappFilter}
onChange={(e)=>setWhatsappFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<select
placeholder="select gender"
value={genderFilter}
onChange={(e)=>setGenderFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
>
<option value="">All Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<input
type="date"
value={dobFilter}
onChange={(e)=>setDobFilter(e.target.value)}
cclassName="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Category"
value={categoryFilter}
onChange={(e)=>setCategoryFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Campaign Type"
value={campaignFilter}
onChange={(e)=>setCampaignFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Reel Rate"
value={reelRateFilter}
onChange={(e)=>setReelRateFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Story Rate"
value={storyRateFilter}
onChange={(e)=>setStoryRateFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Post Rate"
value={postRateFilter}
onChange={(e)=>setPostRateFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="YouTube Name"
value={youtubeNameFilter}
onChange={(e)=>setYoutubeNameFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Subscribers"
value={youtubeSubsFilter}
onChange={(e)=>setYoutubeSubsFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="State"
value={stateFilter}
onChange={(e)=>setStateFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<input
placeholder="Pincode"
value={pincodeFilter}
onChange={(e)=>setPincodeFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>

<select
placeholder="Adress Type?"
value={addressTypeFilter}
onChange={(e)=>setAddressTypeFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
>
<option value="">All</option>
<option>Home</option>
<option>Office</option>
<option>Studio</option>
<option>other</option>
</select>

<select
placeholder="Recive Product?"
value={productFilter}
onChange={(e)=>setProductFilter(e.target.value)}
cclassName="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
>
<option value="">All</option>
<option>Yes</option>
<option>No</option>
</select>

<select
placeholder="Has Youtube?"
  value={hasYoutubeFilter}
  onChange={(e) => setHasYoutubeFilter(e.target.value)}
  cclassName="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
>
  <option value="">Has YouTube</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

<input
placeholder="Brand"
value={brandFilter}
onChange={(e)=>setBrandFilter(e.target.value)}
className="bg-white/10 border border-cyan-500 rounded-lg px-4 py-2 text-white"
/>
</div>


{isFilterApplied && filtered.length > 0 && (
  <div className="flex justify-end gap-3 mb-5">

    <button
      onClick={downloadCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
    >
      ⬇ Download Filtered CSV
    </button>

    <button
      onClick={downloadMaskedCSV}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
    >
      🔒 Download Masked CSV
    </button>

  </div>
)}

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
      href={creator.image}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={creator.image}
        alt={creator.fullName}
        className="w-14 h-14 rounded-lg object-cover border"
      />
    </a>
  ) : (
    <span>No Image</span>
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