import { useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Config from "../config/Config";

function BrandTable({ brands, loadData }) {

  const [editBrand, setEditBrand] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    brandName: "",
    workEmail: "",
    status: "active"
  });

  // OPEN EDIT
  const openEdit = (brand) => {
  setEditBrand(brand);
  setFormData({
    ...brand
  });
};

  // UPDATE BRAND
  const updateBrand = async () => {
  try {
    const res = await axios.put(
      `${Config.API_URL}/api/brands/${editBrand._id}`,
      formData
    );

    console.log(res.data);

    setEditBrand(null);

    if (loadData) {
      await loadData();
    }

    alert("Brand updated successfully");

  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      err.message ||
      "Update failed"
    );
  }
};

  return (
    <div className="mt-10">

      {/* HEADER */}
      <h2 className="text-3xl text-white mb-5 font-bold">
        Brands Management
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl">

        <table className="min-w-[1800px] w-full text-white bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">

         <thead>
  <tr className="bg-cyan-500 text-black text-sm">
    <th className="p-3">Owner</th>
    <th className="p-3">Brand</th>
    <th className="p-3">Email</th>
    <th className="p-3">Mobile</th>
    <th className="p-3">Website</th>
    <th className="p-3">Instagram</th>
    <th className="p-3">Looking For</th>
    <th className="p-3">Budget</th>
    <th className="p-3">Category</th>
    <th className="p-3">Location</th>
    <th className="p-3">Followers</th>
    <th className="p-3">Status</th>
   
    <th className="p-3">Created</th>
    <th className="p-3">Action</th>
  </tr>
</thead>

          <tbody>
  {brands.map((brand) => (
    <tr
      key={brand._id}
      className="border-b border-white/10 hover:bg-white/10 text-sm"
    >
      <td className="p-3">{brand.fullName}</td>

      <td className="p-3">{brand.brandName}</td>

      <td className="p-3">{brand.workEmail}</td>

      <td className="p-3">{brand.mobileNumber}</td>

      <td className="p-3">
        {brand.websiteUrl ? (
          <a
            href={
              brand.websiteUrl.startsWith("http")
                ? brand.websiteUrl
                : `https://${brand.websiteUrl}`
            }
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 underline"
          >
            Visit
          </a>
        ) : (
          "N/A"
        )}
      </td>

      <td className="p-3">{brand.instagramHandle || "N/A"}</td>

      <td className="p-3">
        {Array.isArray(brand.lookingFor)
          ? brand.lookingFor.join(", ")
          : brand.lookingFor}
      </td>

      <td className="p-3">{brand.budgetRange}</td>

      <td className="p-3">
        {Array.isArray(brand.preferredCategory)
          ? brand.preferredCategory.join(", ")
          : brand.preferredCategory}
      </td>

      <td className="p-3">{brand.influencerLocation}</td>

      <td className="p-3">{brand.followersRange}</td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            brand.status === "active"
              ? "bg-green-500/30 text-green-300"
              : "bg-red-500/30 text-red-300"
          }`}
        >
          {brand.status}
        </span>
      </td>

     

      <td className="p-3">
        {new Date(brand.createdAt).toLocaleDateString()}
      </td>

      <td className="p-3">
        <button
          onClick={() => openEdit(brand)}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg"
        >
          <FaEdit />
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>

      </div>

      {/* EDIT MODAL */}
      {editBrand && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Brand
            </h2>

            <input
              className="w-full border p-2 mb-2"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Full Name"
            />

            <input
              className="w-full border p-2 mb-2"
              value={formData.brandName}
              onChange={(e) =>
                setFormData({ ...formData, brandName: e.target.value })
              }
              placeholder="Brand Name"
            />

            <input
              className="w-full border p-2 mb-2"
              value={formData.workEmail}
              onChange={(e) =>
                setFormData({ ...formData, workEmail: e.target.value })
              }
              placeholder="Email"
            />

            <select
              className="w-full border p-2 mb-4"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">pending</option>
            </select>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setEditBrand(null)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateBrand}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default BrandTable;