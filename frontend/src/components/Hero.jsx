import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Hero() {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreatorFormOpen, setIsCreatorFormOpen] = useState(false);

  const [creatorImage, setCreatorImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormdata] = useState({
    fullName: "",
    workEmail: "",
    mobileNumber: "",
    brandName: "",
    websiteUrl: "",
    instagramHandle: "",
    // industry: "",
    lookingFor: [],
    budgetRange: "",
    preferredCategory: [],
    influencerLocation: "",
    followersRange: "",
    campaignDescription: "",
    hearAboutUs: "",
    additionalNotes: "",
    consent: false,
  });


const resetForm = () => {
  setFormdata({
    fullName: "",
    workEmail: "",
    mobileNumber: "",
    brandName: "",
    websiteUrl: "",
    instagramHandle: "",
    industry: "",
    lookingFor: [],
    budgetRange: "",
    preferredCategory: [],
    influencerLocation: "",
    followersRange: "",
    campaignDescription: "",
    // hearAboutUs: "",
    additionalNotes: "",
    consent: false,
  });
};



const [creatorData, setCreatorData] = useState({
  instagramUsername: "",
  instagramLink: "",
  followersRange: "",
  fullName: "",
  email: "",
  mobileNumber: "",
  whatsappNumber: "",
  gender: "",
  dob: "",
  // languages: [],
  niche: [],
  preferredCategory:[],
  campaignTypes: [],
  reelRate: "",
  storyRate: "",
  // feedRate: "",
  // carouselRate: "",
  // ugcRate: "",
  ytVideoRate: "",
  // ytIntegrationRate: "",
  hasYoutube: "",
  youtubeName: "",
  youtubeLink: "",
  youtubeSubs: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  canReceiveProducts: "",
  addressType: "",
  // workedBrands: "",
  brandNames: "",
  message: "",
  consent1: false,
  consent2: false,
  consent3: false,
});



const validateCreatorForm = () => {
  let err = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  // REQUIRED FIELDS
  if (!creatorData.instagramUsername)
    err.instagramUsername = "Required";

  if (!creatorData.instagramLink)
    err.instagramLink = "Required";

  if (!creatorData.fullName)
    err.fullName = "Required";

  if (!creatorData.email || !emailRegex.test(creatorData.email))
    err.email = "Invalid email";

  if (!creatorData.mobileNumber || !phoneRegex.test(creatorData.mobileNumber))
    err.mobileNumber = "Invalid mobile";

  if (!creatorData.whatsappNumber)
    err.whatsappNumber = "Required";

  if (!creatorData.gender)
    err.gender = "Required";

  if (!creatorData.dob)
    err.dob = "Required";

  if (!creatorData.followersRange)
    err.followersRange = "Required";

  if (!creatorData.city)
    err.city = "Required";

  if (!creatorData.state)
    err.state = "Required";

  if (!creatorData.pincode)
    err.pincode = "Required";

  if (!creatorImage)
    err.image = "Upload image";

  if (creatorImage && creatorImage.size > 10 * 1024 * 1024)
    err.image = "Max 10MB allowed";

if(!creatorData.hasYoutube)
  err.hasYoutube="required"

if(!creatorData.youtubeName)
  err.youtubeName="required"

if(!creatorData.youtubeLink)
  err.youtubeLink="required"

if(!creatorData.youtubeSubs)
  err.youtubeSubs="required"

if(!creatorData.preferredCategory.length===0)
  err.preferredCategory="required"

if(!creatorData.reelRate)
  err.reelRate="required"

if(!creatorData.storyRate)
  err.storyRate="required"

if(!creatorData.ytVideoRate)
  err.ytVideoRate="required"

if (creatorData.campaignTypes.length === 0)
  err.campaignTypes = "Select at least one campaign type";

  if (!creatorData.addressType)
    err.addressType = "Required";

  if (!creatorData.canReceiveProducts)
    err.canReceiveProducts = "Required";

  if (!creatorData.consent1 || !creatorData.consent2 || !creatorData.consent3)
    err.consent = "Accept all consents";

  setErrors(err);

  return Object.keys(err).length === 0;
};

       // handle image
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // 10MB limit
  if (file.size > 10 * 1024 * 1024) {
    alert("Image size must be under 10MB");
    return;
  }

  setCreatorImage(file);
};
//  image delete

const removeImage = () => {
  setCreatorImage(null);

  // Clear file input visually
  const fileInput = document.getElementById("creator-image");
  if (fileInput) {
    fileInput.value = "";
  }
};


                // creator handler
const handleCreatorChange = (e) => {
  const { name, value, type, checked } = e.target;

  setCreatorData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const handleCreatorMulti = (key, value) => {
  setCreatorData((prev) => {
    const current = prev[key];

    return current.includes(value)
      ? { ...prev, [key]: current.filter((i) => i !== value) }
      : { ...prev, [key]: [...current, value] };
  });
};


//  creator submit

const handleCreatorSubmit = async (e) => {
  e.preventDefault();

  const valid = validateCreatorForm();

   console.log("Validation Result:", valid);
  console.log("Creator Data:", creatorData);

  if (!valid) {
    alert("⚠️ Please fill all required fields correctly");
    return;
  }


try {
    const formDataToSend = new FormData();

    Object.keys(creatorData).forEach((key) => {
      if (Array.isArray(creatorData[key])) {
       formDataToSend.append(
      key,
      JSON.stringify(creatorData[key])
    );
      } else {
        formDataToSend.append(
          key,
          creatorData[key]
        );
      }
    });

    if (creatorImage) {
      formDataToSend.append(
        "creatorImage",
        creatorImage
      );
    }

    console.log(
  "Campaign Types:",
  creatorData.campaignTypes
);
    const response = await axios.post(
      "http://localhost:5000/api/creator/register",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("🎉 Creator Registered Successfully!");

    setCreatorData({
      instagramUsername: "",
      instagramLink: "",
      followersRange: "",
      fullName: "",
      email: "",
      mobileNumber: "",
      whatsappNumber: "",
      gender: "",
      dob: "",
      niche:[],
      campaignTypes: [],

      reelRate: "",
      storyRate: "",
      ytVideoRate: "",

      hasYoutube: "",
      youtubeName: "",
      youtubeLink: "",
      youtubeSubs: "",

      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",

      canReceiveProducts: "",
      addressType: "",

      brandNames: "",
      message: "",

      consent1: false,
      consent2: false,
      consent3: false,
    });

    setCreatorImage(null);

    setIsCreatorFormOpen(false);

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "❌ Registration Failed"
    );
  }
};
  /* ---------------- INPUT HANDLER ---------------- */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- CHECKBOX HANDLER ---------------- */
  const handleCheckboxGroupChange = (groupName, value) => {
    setFormdata((prev) => {
      const current = prev[groupName];

      return current.includes(value)
        ? { ...prev, [groupName]: current.filter((i) => i !== value) }
        : { ...prev, [groupName]: [...current, value] };
    });
  };

  /* ---------------- STYLE (FIXED) ---------------- */
  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:border-cyan-300";

  /* ---------------- VALIDATION (SECURE) ---------------- */
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;

    if (!formData.fullName.trim()) return "Full Name is required";
    if (!formData.workEmail.trim()) return "Work Email is required";
    if (!emailRegex.test(formData.workEmail)) return "Invalid Email format";

    if (!formData.mobileNumber.trim()) return "Mobile Number is required";
    if (!phoneRegex.test(formData.mobileNumber))
      return "Invalid Mobile Number (Must be 10 digits starting 6-9)";

    if (!formData.brandName.trim()) return "Brand Name is required";

    if (formData.websiteUrl && !urlRegex.test(formData.websiteUrl))
      return "Invalid Website URL";

    // if (!formData.industry) return "Please select Industry";

    if (formData.lookingFor.length === 0)
      return "Select at least one option in What are you looking for";

    if (!formData.budgetRange)
      return "Please select Budget Range";

    if (formData.preferredCategory?.length === 0)
      return "Select Preferred Influencer Category";

    if (!formData.influencerLocation.trim())
      return "Influencer Location is required";

    if (!formData.followersRange)
      return "Followers Range is required";

    if (!formData.campaignDescription.trim())
      return "Campaign Description is required";

    // if (!formData.hearAboutUs)
    //   return "Please select how you heard about us";

    if (!formData.consent)
      return "You must accept consent to continue";

    return null;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
  e.preventDefault();

  const error = validateForm();

  if (error) {
    alert("⚠️ " + error);
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/brands/register",
      formData
    );

    if (response.data.success) {
      alert("🎉 Brand Registered Successfully!");

      setFormdata({
        fullName: "",
        workEmail: "",
        mobileNumber: "",
        brandName: "",
        websiteUrl: "",
        instagramHandle: "",
        lookingFor: [],
        budgetRange: "",
        preferredCategory: [],
        influencerLocation: "",
        followersRange: "",
        campaignDescription: "",
        // hearAboutUs: "",
        additionalNotes: "",
        consent: false,
      });

      setIsFormOpen(false);
    }
  } catch (error) {
    console.log(error);

    alert("❌ Failed to save brand details");
  }
};

  return (
    <div className="max-w-7xl mx-auto px-6">

      {/* HERO TEXT */}
      <h1 className="text-5xl md:text-7xl font-bold whitespace-nowrap animate-marquee">
        India's Trusted Influencer Marketing Company
      </h1>

      <p className="mt-6 text-xl max-w-3xl">
        We help brands connect with the right influencers and creators to drive awareness, engagement, and sales.
      </p>

      {/* BUTTONS */}
      <div className="mt-10 flex gap-5">

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-fuchsia-600 hover:scale-105 transition-all"
        >
          Register as Brand
        </button>
<button
  onClick={() => setIsCreatorFormOpen(true)}
  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-pink-600 transition-all"
>
  Register as Influencer
</button>
     



     
      </div>

      {/* MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4">

          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto 
            bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.15)] 
            text-white p-8">

            <div className="absolute top-4 right-5 flex gap-3 items-center">





  {/* RESET BUTTON */}
<button
  type="button"
  onClick={resetForm}
  className="text-sm px-3 py-1 rounded-lg border border-red-400 text-red-300 hover:bg-red-500 hover:text-white transition"
  title="Reset Form"
>
  Reset
</button>

  {/* CLOSE BUTTON */}
  <button
    className="text-3xl hover:text-cyan-400 hover:rotate-90 transition"
    onClick={() => setIsFormOpen(false)}
  >
    ×
  </button>

</div>
            {/* TITLE */}
            <h2 className="text-3xl font-extrabold">
              Recommended Brand Registration
            </h2>

            <p className="text-cyan-300 text-sm mt-2 uppercase tracking-widest">
              Get Free Consultation Within 24 Hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">

              {/* BASIC INFO */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
                <h3 className="text-cyan-300 font-semibold mb-4 ">
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="ml-2 w-190">
                  <label className="ml-1">Name:</label>
                  <input className={inputStyle}  value={formData.fullName} name="fullName" placeholder="Full Name*" onChange={handleInputChange}  />
                  <label className="ml-1">work email:</label>
                  <input className={inputStyle}   value={formData.workEmail}name="workEmail" placeholder="Work Email*" onChange={handleInputChange} />
                  <label className="ml-1">Mobile No.:</label>
                  <input className={inputStyle} name="mobileNumber" placeholder="Mobile Number*" onChange={handleInputChange}  value={formData.mobileNumber}/>
                  <label className="ml-1">Brand Name:</label>
                  <input className={inputStyle}value={formData.brandName} name="brandName" placeholder="Brand Name*" onChange={handleInputChange} />
                  <label className="ml-1">Website URL:</label>
                  <input className={inputStyle} value={formData.websiteUrl}name="websiteUrl" placeholder="Website URL" onChange={handleInputChange} />
                  <label className="ml-1">Instagram:</label>
                  <input className={inputStyle}  value={formData.instagramHandle}name="instagramHandle" placeholder="Instagram Handle" onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              {/* INDUSTRY */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
                <h3 className="text-cyan-300 font-semibold mb-4">
                  Influencer Categories:
                </h3>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {["Fashion", "Beauty", "Food & Beverage", "Electronics", "Healthcare", "Education", "Real Estate", "Other"].map((item) => (
                    <label key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 cursor-pointer">
                      <input type="radio" value={formData.preferredCategory}name="preferredCategory" value={item} onChange={handleInputChange} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* LOOKING FOR */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
                <h3 className="text-cyan-300 font-semibold mb-4">
                  What are you looking for?
                </h3>

                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  {["Campaign", "Product Promotion", "Brand Awareness", "UGC Content", "Celebrity Endorsement", "Other"].map((item) => (
                    <label key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 cursor-pointer">
                      <input type="checkbox" onChange={() => handleCheckboxGroupChange("lookingFor", item)} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* BUDGET */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
                <h3 className="text-cyan-300 font-semibold mb-4">
                  Budget Range
                </h3>

                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  {["Under ₹50K", "₹50K-₹2L", "₹2L-₹5L", "₹5L-₹10L", "₹10L+"].map((b) => (
                    <label key={b} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 cursor-pointer">
                      <input type="radio" name="budgetRange" value={b} onChange={handleInputChange} />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              {/* EXTRA */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition space-y-3">

                <label>Loacation:</label>
                <input className={inputStyle} value={formData.influencerLocation}name="influencerLocation" placeholder="Preferred Influencer Location" onChange={handleInputChange} />
                 <div>
  <label className="text-cyan-300 font-semibold">
    Followers Range:
  </label>

  <div className="grid md:grid-cols-2 gap-2 text-sm mt-2">
    {[
      "10K–50K",
      "50K–100K",
      "100K–500K",
      "500K–1M",
      "1M+",
    ].map((f) => (
      <label
        key={f}
        className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 cursor-pointer"
      >
        <input
          type="radio"
          name="followersRange"
          value={f}
          // value={formData.followersRange}
          onChange={handleInputChange}
        />
        {f}
      </label>
    ))}
  </div>
</div>
                 <label>Compaign Description:</label>
                <textarea className={inputStyle} value={formData.campaignDescription}name="campaignDescription" placeholder="Campaign Description" onChange={handleInputChange} />
                <label>Additional Notes:</label>

                <textarea className={inputStyle} value={formData.additionalNotes} name="additionalNotes" placeholder="Additional Notes" onChange={handleInputChange} />
              </div>

              {/* CONSENT */}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" value={formData.consent}name="consent" onChange={handleInputChange} />
                I confirm I am authorized and information is correct
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold
                bg-gradient-to-r from-cyan-500 to-fuchsia-600
                hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]
                transition-all"
              >
                Get Free Consultation
              </button>

            </form>
          </div>
        </div>
      )}
{/* CREATOR FORM MODAL */}
{isCreatorFormOpen && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">

    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto 
      bg-gradient-to-br from-purple-900/40 to-cyan-900/40 
      border border-white/20 rounded-2xl shadow-2xl text-white p-8">

      {/* CLOSE BUTTON */}
      <button
        className="absolute top-4 right-5 text-3xl hover:text-pink-400"
        onClick={() => setIsCreatorFormOpen(false)}
      >
        ×
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-pink-300">
        InfluNexa Creator Registration
      </h2>

      <p className="text-cyan-200 mt-2 mb-6">
        Join India's fastest-growing creator community
      </p>

      <form className="space-y-6" onSubmit={handleCreatorSubmit}>

        {/* INSTAGRAM DETAILS */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h3 className="text-cyan-300 font-semibold mb-3">Instagram Details</h3>

          <input
  className={inputStyle}
  name="instagramUsername"
  value={creatorData.instagramUsername}
  onChange={handleCreatorChange}
  placeholder="Instagram Username*"
/>
{errors.instagramUsername && <p className="text-red-400">{errors.instagramUsername}</p>}

<input
  className={inputStyle + " mt-2"}
  name="instagramLink"
  value={creatorData.instagramLink}
  onChange={handleCreatorChange}
  placeholder="Instagram Profile Link*"
/>
{errors.instagramLink && <p className="text-red-400">{errors.instagramLink}</p>}

<select
  className={inputStyle + " mt-2"}
  name="followersRange"
  value={creatorData.followersRange}
  onChange={handleCreatorChange}
>
  <option value="" className="bg-blue-950">Followers Ranges:</option>
  <option className="bg-blue-950">Under 2K</option>
  <option className="bg-blue-950">2K - 10K</option>
  <option className="bg-blue-950">10K - 50K</option>
  <option className="bg-blue-950">50K - 100K</option>
  <option className="bg-blue-950">100K+</option>
</select>
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h3 className="text-cyan-300 font-semibold mb-3">Personal Info</h3>

          <input
  className={inputStyle}
  name="fullName"
  value={creatorData.fullName}
  onChange={handleCreatorChange}
  placeholder="Full Name*"
/>
{errors.fullName && <p className="text-red-400">{errors.fullName}</p>}

<input
  className={inputStyle + " mt-2"}
  name="email"
  value={creatorData.email}
  onChange={handleCreatorChange}
  placeholder="Email Address*"
/>
{errors.email && <p className="text-red-400">{errors.email}</p>}

<input
  className={inputStyle + " mt-2"}
  name="mobileNumber"
  value={creatorData.mobileNumber}
  onChange={handleCreatorChange}
  placeholder="Mobile Number*"
/>
{errors.mobileNumber && <p className="text-red-400">{errors.mobileNumber}</p>}

<input
  className={inputStyle + " mt-2"}
  name="whatsappNumber"
  value={creatorData.whatsappNumber}
  onChange={handleCreatorChange}
  placeholder="WhatsApp Number*"
/>

<select
  className={inputStyle + " mt-2"}
  name="gender"
  value={creatorData.gender}
  onChange={handleCreatorChange}
>
  <option value="" className="bg-blue-950">Gender</option>
  <option className="bg-blue-950">Male</option>
  <option className="bg-blue-950">Female</option>
  <option className="bg-blue-950">Other</option>
</select>

<input
  type="date"
  className={inputStyle + " mt-2"}
  name="dob"
  value={creatorData.dob}
  onChange={handleCreatorChange}
/>
{errors.gender && (
  <p className="text-red-400">{errors.gender}</p>
)}

{errors.dob && (
  <p className="text-red-400">{errors.dob}</p>
)}


        </div>

{/* upload image */}
<div className="bg-white/5 p-4 rounded-xl border border-white/10">
  <h3 className="text-cyan-300 font-semibold mb-3">
    Upload Your Photo
  </h3>

  <input
    id="creator-image"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className={inputStyle}
  />

  {creatorImage && (
    <div className="mt-3 flex items-center gap-3">
      <p className="text-green-400 text-sm">
        Selected: {creatorImage.name}
      </p>
       
      <button
        type="button"
        onClick={removeImage}
        className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm"
      >
        Delete
      </button>
    </div>
  )}

  {errors.image && (
    <p className="text-red-400">{errors.image}</p>
  )}
</div>
{/* ================= YOUTUBE ================= */}
<div>
  <h3 className="text-xl text-cyan-300 font-semibold">YouTube Information</h3>

 <input
  className={inputStyle}
  name="hasYoutube"
  value={creatorData.hasYoutube}
  onChange={handleCreatorChange}
  placeholder="Do you have YouTube? (Yes/No)"
/>

<input
  className={inputStyle + " mt-2"}
  name="youtubeName"
  value={creatorData.youtubeName}
  onChange={handleCreatorChange}
  placeholder="YouTube Channel Name"
/>

<input
  className={inputStyle + " mt-2"}
  name="youtubeLink"
  value={creatorData.youtubeLink}
  onChange={handleCreatorChange}
  placeholder="YouTube Channel Link"
/>

<select
  className={inputStyle + " mt-2"}
  name="youtubeSubs"
  value={creatorData.youtubeSubs}
  onChange={handleCreatorChange}
>
  <option value="" className="bg-blue-950">Subscriber Range</option>
  <option className="bg-blue-950">Under 1K</option>
  <option className="bg-blue-950">1K - 10K</option>
  <option className="bg-blue-950">10K - 50K</option>
  <option className="bg-blue-950">50K - 100K</option>
  <option className="bg-blue-950">100K+</option>
</select>
</div>
        {/* CONTENT CATEGORY */}
        <div className="mt-4">
  <label className="block text-white mb-2 font-semibold">
    Preferred Category
  </label>

  <div className="flex flex-wrap gap-3">

    {[
      "Fashion",
      "Beauty",
      "Tech",
      "Travel",
      "Food",
      "Gaming",
      "Fitness",
      "Lifestyle",
    ].map((cat) => (
      <label
        key={cat}
        className="flex items-center gap-2 text-white"
      >
        <input
          type="checkbox"
          checked={creatorData.preferredCategory?.includes(cat)}
          onChange={(e) => {
            if (e.target.checked) {
              setCreatorData({
                ...creatorData,
                preferredCategory: [
                  ...(creatorData.preferredCategory || []),
                  cat,
                ],
              });
            } else {
              setCreatorData({
                ...creatorData,
                preferredCategory:
                  creatorData.preferredCategory.filter(
                    (c) => c !== cat
                  ),
              });
            }
          }}
        />

        {cat}
      </label>
    ))}

  </div>
</div>
       
       {/* RATE SECTION */}
<div className="bg-white/5 p-4 rounded-xl border border-white/10">
  <h3 className="text-cyan-300 font-semibold mb-3">
    Commercial Rates
  </h3>

  <input
    className={inputStyle}
    name="reelRate"
    placeholder="Instagram Reel Rate (₹)"
    value={creatorData.reelRate}
    onChange={handleCreatorChange}
  />

  <input
    className={inputStyle + " mt-2"}
    name="storyRate"
    placeholder="Instagram Story Rate (₹)"
    value={creatorData.storyRate}
    onChange={handleCreatorChange}
  />

  <input
    className={inputStyle + " mt-2"}
    name="ytVideoRate"
    placeholder="YouTube Video Rate (₹)"
    value={creatorData.ytVideoRate}
    onChange={handleCreatorChange}
  />
</div>

        {/* ================= CAMPAIGN PREFERENCES ================= */}
<div>
  <h3 className="text-xl text-cyan-300 font-semibold">Campaign Preferences</h3>

 {[
  "Paid Campaigns",
  "Barter Campaigns",
  "Product Review",
  "UGC",
  "Affiliate",
  "Long Term",
  "All"
].map((item) => (
  <label key={item} className="block">
    <input
      type="checkbox"
      onChange={() => handleCreatorMulti("campaignTypes", item)}
    />
    {item}
  </label>
))}
</div>

        {/* ADDRESS */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h3 className="text-cyan-300 font-semibold mb-3">Address</h3>
<input
  className={inputStyle}
  name="address1"
  value={creatorData.address1}
  onChange={handleCreatorChange}
  placeholder="Address Line 1"
/>

<input
  className={inputStyle + " mt-2"}
  name="address2"
  value={creatorData.address2}
  onChange={handleCreatorChange}
  placeholder="Address Line 2"
/>

<input
  className={inputStyle + " mt-2"}
  name="city"
  value={creatorData.city}
  onChange={handleCreatorChange}
  placeholder="City"
/>
{errors.city && <p className="text-red-400">{errors.city}</p>}

<input
  className={inputStyle + " mt-2"}
  name="state"
  value={creatorData.state}
  onChange={handleCreatorChange}
  placeholder="State"
/>

<input
  className={inputStyle + " mt-2"}
  name="pincode"
  value={creatorData.pincode}
  onChange={handleCreatorChange}
  placeholder="Pincode"
/>

<select
  className={inputStyle + " mt-2"}
  name="canReceiveProducts"
  value={creatorData.canReceiveProducts}
  onChange={handleCreatorChange}
>
  <option value="">Can receive products?</option>
  <option value="Yes" className="bg-blue-950">Yes</option>
  <option value="No" className="bg-blue-950">No</option>
</select>

{errors.canReceiveProducts && (
  <p className="text-red-400">{errors.canReceiveProducts}</p>
)}

<select
  className={inputStyle + " mt-2"}
  name="addressType"
  value={creatorData.addressType}
  onChange={handleCreatorChange}
>
  <option value="" className="bg-blue-950">Address Type</option>
  <option value="Home" className="bg-blue-950">Home</option>
  <option value="Office" className="bg-blue-950">Office</option>
  <option value="Studio" className="bg-blue-950">Studio</option>
  <option value="Other" className="bg-blue-950">Other</option>
</select>

{errors.addressType && (
  <p className="text-red-400">{errors.addressType}</p>
)}

</div>
{/* ================= ADDITIONAL ================= */}
        <div>
  <h3 className="text-xl text-cyan-300 font-semibold">Additional Information</h3>

  <textarea
  className={inputStyle}
  name="brandNames"
  value={creatorData.brandNames}
  onChange={handleCreatorChange}
  placeholder="Previously worked brands"
/>

<textarea
  className={inputStyle + " mt-2"}
  name="message"
  value={creatorData.message}
  onChange={handleCreatorChange}
  placeholder="Message for InfluNexa"
/>
</div>
{/* ================= CONSENT ================= */}
<div className="space-y-2">
 <label>
  <input
    type="checkbox"
    name="consent1"
    checked={creatorData.consent1}
    onChange={handleCreatorChange}
  />
  I confirm information is correct
</label><br></br>

<label>
  <input
    type="checkbox"
    name="consent2"
    checked={creatorData.consent2}
    onChange={handleCreatorChange}
  />
  I agree to receive campaigns
</label><br></br>

<label>
  <input
    type="checkbox"
    name="consent3"
    checked={creatorData.consent3}
    onChange={handleCreatorChange}
  />
  I understand selection is not guaranteed
</label>

{errors.consent && (
  <p className="text-red-400">{errors.consent}</p>
)}
</div>
        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold 
          bg-gradient-to-r from-pink-500 to-purple-600 
          hover:scale-105 transition"
        >
          Register as Creator
        </button>

      </form>
    </div>
  </div>
)}      
    </div>
  );
}

export default Hero;

