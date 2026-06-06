import { useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

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
      fullName: brand.fullName,
      brandName: brand.brandName,
      workEmail: brand.workEmail,
      status: brand.status || "active"
    });
  };

  // UPDATE BRAND
  const updateBrand = async () => {
    try {
      await axios.put(
        `https://influnexa-backend-7.onrender.com/api/admin/brand/${editBrand._id}`,
        formData
      );

      setEditBrand(null);
      loadData();

      alert("Brand updated successfully");

    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="mt-10">

      {/* HEADER */}
      <h2 className="text-3xl text-white mb-5 font-bold">
        Brands Management
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-white bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">

          <thead>
            <tr className="bg-cyan-500 text-black">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {brands.map((brand) => (

              <tr
                key={brand._id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >

                <td className="p-3 font-semibold">
                  {brand.fullName}
                </td>

                <td className="p-3 text-cyan-300">
                  {brand.brandName}
                </td>

                <td className="p-3">
                  {brand.workEmail}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    brand.status === "inactive"
                      ? "bg-red-500/30 text-red-300"
                      : "bg-green-500/30 text-green-300"
                  }`}>
                    {brand.status || "active"}
                  </span>
                </td>

                {/* ACTION */}
                <td className="p-3">

                  <button
                    onClick={() => openEdit(brand)}
                    className="
                      flex items-center gap-2
                      bg-yellow-400
                      hover:bg-yellow-500
                      text-black
                      px-3 py-1
                      rounded-lg
                      font-semibold
                      transition
                    "
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