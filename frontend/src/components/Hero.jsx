import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../config/Config";


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
     `${Config.API_URL}/api/creator/register`,
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
      `${Config.API_URL}/api/brands/register`,
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
<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight animate-marquee">
  India's Trusted Influencer Marketing Company
</h1>

<p className="mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-center px-4">
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
  <div className="fixed inset-0 z-50 bg-gray-300 overflow-y-auto text-black">
    <div className="min-h-screen flex items-start justify-center py-8 px-4 text-black">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-black">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-black">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Brand Registration
            </h2>
            <p className="text-gray-500 mt-2">
              Complete the form below and our team will contact you within
              24 hours.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Reset
            </button>

            <button
              onClick={() => setIsFormOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-red-500 transition"
            >
              ×
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-10 space-y-8"
        >
          {/* Basic Information */}
          <div className="bg-gray-50 border border-gray-400 rounded-2xl p-6 text-black">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input 
                   className={`${inputStyle} !text-black`}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"

                  
                />
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Work Email
                </label>
                <input
                  className={`${inputStyle} !text-black`}
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                   className={`${inputStyle} !text-black`}
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  className={`${inputStyle} !text-black`}
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                />
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                   className={`${inputStyle} !text-black`}
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                   className={`${inputStyle} !text-black`}
                  name="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={handleInputChange}
                  placeholder="@username"
                />
              </div>
            </div>
          </div>

          {/* Influencer Categories */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-black">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Influencer Categories
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Fashion",
                "Beauty",
                "Food & Beverage",
                "Electronics",
                "Healthcare",
                "Education",
                "Real Estate",
                "Other",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition"
                >
                  <input
                    type="radio"
                    name="preferredCategory"
                    value={item}
                    checked={formData.preferredCategory === item}
                    onChange={handleInputChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-black">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              What are you looking for?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
              {[
                "Campaign",
                "Product Promotion",
                "Brand Awareness",
                "UGC Content",
                "Celebrity Endorsement",
                "Other",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition"
                >
                  <input
                    type="checkbox"
                    checked={formData.lookingFor?.includes(item)}
                    onChange={() =>
                      handleCheckboxGroupChange(
                        "lookingFor",
                        item
                      )
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Budget Range
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
              {[
                "Under ₹50K",
                "₹50K-₹2L",
                "₹2L-₹5L",
                "₹5L-₹10L",
                "₹10L+",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition"
                >
                  <input
                    type="radio"
                    name="budgetRange"
                    value={item}
                    checked={formData.budgetRange === item}
                    onChange={handleInputChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Additional Details
            </h3>

            <div className="space-y-5 text-black">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Influencer Location
                </label>
                <input
                  className={inputStyle}
                  name="influencerLocation"
                  value={formData.influencerLocation}
                  onChange={handleInputChange}
                  placeholder="Kolkata, Mumbai, Delhi..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Followers Range
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 text-black">
                  {[
                    "10K–50K",
                    "50K–100K",
                    "100K–500K",
                    "500K–1M",
                    "1M+",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition"
                    >
                      <input
                        type="radio"
                        name="followersRange"
                        value={item}
                        checked={
                          formData.followersRange === item
                        }
                        onChange={handleInputChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Campaign Description
                </label>
                <textarea
                  rows="4"
                   className={`${inputStyle} !text-black`}
                  name="campaignDescription"
                  value={formData.campaignDescription}
                  onChange={handleInputChange}
                  placeholder="Enter your details"
                />
              </div>

              <div className="text-black">
                <label className="text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  rows="4"
                   className={`${inputStyle} !text-black`}
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Add notes"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <label className="flex items-center gap-3 text-gray-700">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
            />
            I confirm that the information provided is correct.
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 rounded-xl transition shadow-lg"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  </div>
)}
{/* CREATOR FORM MODAL */}
{isCreatorFormOpen && (
  <div className="fixed inset-0 z-50  bg-gray-300 overflow-y-auto text-black">
  <div className="min-h-screen flex items-start justify-center py-8 px-4 text-black">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-black">

      {/* CLOSE BUTTON */}
      <button
        className="absolute top-4 right-5 text-3xl hover:text-pink-400"
        onClick={() => setIsCreatorFormOpen(false)}
      >
        ×
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-gray-800">
        InfluNexa Creator Registration
      </h2>

      <p className="text-gray-600 mt-2 mb-6">
        Join India's fastest-growing creator community
      </p>

      <form className="space-y-6" onSubmit={handleCreatorSubmit}>

        {/* INSTAGRAM DETAILS */}
       <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Instagram Details
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div>
      <label className="text-sm font-medium text-gray-700">
        Instagram Username
      </label>

      <input
        className={inputStyle}
        name="instagramUsername"
        value={creatorData.instagramUsername}
        onChange={handleCreatorChange}
        placeholder="Instagram Username"
      />

      {errors.instagramUsername && (
        <p className="text-red-500 mt-1">
          {errors.instagramUsername}
        </p>
      )}
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Instagram Profile Link
      </label>

      <input
        className={inputStyle}
        name="instagramLink"
        value={creatorData.instagramLink}
        onChange={handleCreatorChange}
        placeholder="https://instagram.com/username"
      />

      {errors.instagramLink && (
        <p className="text-red-500 mt-1">
          {errors.instagramLink}
        </p>
      )}
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Followers Range
      </label>

      <select
        className={inputStyle}
        name="followersRange"
        value={creatorData.followersRange}
        onChange={handleCreatorChange}
      >
        <option value="">Select Range</option>
        <option>Under 2K</option>
        <option>2K - 10K</option>
        <option>10K - 50K</option>
        <option>50K - 100K</option>
        <option>100K+</option>
      </select>
    </div>
    </div>
    </div>

        {/* PERSONAL INFO */}
    <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Personal Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <input
      className={inputStyle}
      name="fullName"
      value={creatorData.fullName}
      onChange={handleCreatorChange}
      placeholder="Full Name"
    />

    <input
      className={inputStyle}
      name="email"
      value={creatorData.email}
      onChange={handleCreatorChange}
      placeholder="Email Address"
    />

    <input
      className={inputStyle}
      name="mobileNumber"
      value={creatorData.mobileNumber}
      onChange={handleCreatorChange}
      placeholder="Mobile Number"
    />

    <input
      className={inputStyle}
      name="whatsappNumber"
      value={creatorData.whatsappNumber}
      onChange={handleCreatorChange}
      placeholder="WhatsApp Number"
    />

    <select
      className={inputStyle}
      name="gender"
      value={creatorData.gender}
      onChange={handleCreatorChange}
    >
      <option value="">Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>

    <input
      type="date"
      className={inputStyle}
      name="dob"
      value={creatorData.dob}
      onChange={handleCreatorChange}
    />

  </div>
</div>
{/* upload image */}
<div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Upload Your Photo
  </h3>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className={inputStyle}
  />

  {creatorImage && (
    <div className="mt-3 flex gap-3 items-center">
      <span className="text-green-600">
        {creatorImage.name}
      </span>

      <button
        type="button"
        onClick={removeImage}
        className="px-3 py-1 bg-red-500 text-white rounded-lg"
      >
        Delete
      </button>
    </div>
  )}
</div>
{/* ================= YOUTUBE ================= */}
<div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    YouTube Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <input
      className={inputStyle}
      name="hasYoutube"
      value={creatorData.hasYoutube}
      onChange={handleCreatorChange}
      placeholder="Do you have YouTube?"
    />

    <input
      className={inputStyle}
      name="youtubeName"
      value={creatorData.youtubeName}
      onChange={handleCreatorChange}
      placeholder="Channel Name"
    />

    <input
      className={inputStyle}
      name="youtubeLink"
      value={creatorData.youtubeLink}
      onChange={handleCreatorChange}
      placeholder="Channel Link"
    />

    <select
      className={inputStyle}
      name="youtubeSubs"
      value={creatorData.youtubeSubs}
      onChange={handleCreatorChange}
    >
      <option value="">Subscriber Range</option>
      <option>Under 1K</option>
      <option>1K - 10K</option>
      <option>10K - 50K</option>
      <option>50K - 100K</option>
      <option>100K+</option>
    </select>

  </div>
</div>
        {/* CONTENT CATEGORY */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Preferred Category
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition"
      >
        <input
          type="checkbox"
          className="w-4 h-4 accent-purple-600"
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

        <span className="text-gray-800 font-medium">
          {cat}
        </span>
      </label>
    ))}
  </div>
</div>
       {/* RATE SECTION */}
<div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Commercial Rates
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    <input
      className={inputStyle}
      name="reelRate"
      value={creatorData.reelRate}
      onChange={handleCreatorChange}
      placeholder="Instagram Reel Rate"
    />

    <input
      className={inputStyle}
      name="storyRate"
      value={creatorData.storyRate}
      onChange={handleCreatorChange}
      placeholder="Instagram Story Rate"
    />

    <input
      className={inputStyle}
      name="ytVideoRate"
      value={creatorData.ytVideoRate}
      onChange={handleCreatorChange}
      placeholder="YouTube Video Rate"
    />

  </div>
</div>
        {/* ================= CAMPAIGN PREFERENCES ================= */}
<div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Campaign Preferences
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {[
      "Paid Campaigns",
      "Barter Campaigns",
      "Product Review",
      "UGC",
      "Affiliate",
      "Long Term",
      "All",
    ].map((item) => (
      <label
        key={item}
        className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition"
      >
        <input
          type="checkbox"
          className="w-4 h-4 accent-purple-600"
          checked={creatorData.campaignTypes?.includes(item)}
          onChange={() =>
            handleCreatorMulti("campaignTypes", item)
          }
        />

        <span className="text-gray-800 font-medium">
          {item}
        </span>
      </label>
    ))}
  </div>
</div>
        {/* ADDRESS */}
       <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Address Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <input
      className={inputStyle}
      name="address1"
      value={creatorData.address1}
      onChange={handleCreatorChange}
      placeholder="Address Line 1"
    />

    <input
      className={inputStyle}
      name="address2"
      value={creatorData.address2}
      onChange={handleCreatorChange}
      placeholder="Address Line 2"
    />

    <div>
      <input
        className={inputStyle}
        name="city"
        value={creatorData.city}
        onChange={handleCreatorChange}
        placeholder="City"
      />

      {errors.city && (
        <p className="text-red-500 mt-1">
          {errors.city}
        </p>
      )}
    </div>

    <input
      className={inputStyle}
      name="state"
      value={creatorData.state}
      onChange={handleCreatorChange}
      placeholder="State"
    />

    <input
      className={inputStyle}
      name="pincode"
      value={creatorData.pincode}
      onChange={handleCreatorChange}
      placeholder="Pincode"
    />

    <div>
      <select
        className={inputStyle}
        name="canReceiveProducts"
        value={creatorData.canReceiveProducts}
        onChange={handleCreatorChange}
      >
        <option value="">Can receive products?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {errors.canReceiveProducts && (
        <p className="text-red-500 mt-1">
          {errors.canReceiveProducts}
        </p>
      )}
    </div>

    <div>
      <select
        className={inputStyle}
        name="addressType"
        value={creatorData.addressType}
        onChange={handleCreatorChange}
      >
        <option value="">Address Type</option>
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Studio">Studio</option>
        <option value="Other">Other</option>
      </select>

      {errors.addressType && (
        <p className="text-red-500 mt-1">
          {errors.addressType}
        </p>
      )}
    </div>

  </div>
</div>
{/* ================= ADDITIONAL ================= */}
   <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Additional Information
  </h3>

  <div className="grid grid-cols-1 gap-5">

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Previously Worked Brands
      </label>

      <textarea
        className={`${inputStyle} min-h-[120px] resize-none`}
        name="brandNames"
        value={creatorData.brandNames}
        onChange={handleCreatorChange}
        placeholder="Enter brands you have worked with"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Message for InfluNexa
      </label>

      <textarea
        className={`${inputStyle} min-h-[120px] resize-none`}
        name="message"
        value={creatorData.message}
        onChange={handleCreatorChange}
        placeholder="Write your message here..."
      />
    </div>
    </div>
    </div>
{/* ================= CONSENT ================= */}
<div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Terms & Consent
  </h3>

  <div className="space-y-4">

    <label className="flex items-start gap-3 text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        name="consent1"
        checked={creatorData.consent1}
        onChange={handleCreatorChange}
        className="w-5 h-5 mt-1 accent-purple-600"
      />
      <span>I confirm that the information provided is correct.</span>
    </label>

    <label className="flex items-start gap-3 text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        name="consent2"
        checked={creatorData.consent2}
        onChange={handleCreatorChange}
        className="w-5 h-5 mt-1 accent-purple-600"
      />
      <span>I agree to receive campaigns and promotional updates.</span>
    </label>

    <label className="flex items-start gap-3 text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        name="consent3"
        checked={creatorData.consent3}
        onChange={handleCreatorChange}
        className="w-5 h-5 mt-1 accent-purple-600"
      />
      <span>I understand that creator selection is not guaranteed.</span>
    </label>

    {errors.consent && (
      <p className="text-red-500 text-sm">
        {errors.consent}
      </p>
    )}

  </div>
</div>
        {/* SUBMIT */}
      <div className="flex flex-col md:flex-row gap-4 pt-6">
  

  <button
    type="submit"
    className="w-full md:w-1/2 py-3 rounded-xl font-bold text-white
    bg-gradient-to-r from-blue-600 to-purple-600
    hover:scale-105 transition duration-300 shadow-lg"
  >
    Register as Creator
  </button>
</div>

</form>
</div>
</div>
</div>
)}      
    </div>
  );
}

export default Hero;

