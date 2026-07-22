import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaCheckCircle,
  FaRegEdit,
  FaEye,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
 

  // Modal
  const [showForm, setShowForm] = useState(false);

  // null = Add Blog
  // object = Edit Blog
  const [editingBlog, setEditingBlog] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    author: "",
    status: "Draft",
    image: null,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `${API_URL}/api/blogs/admin`
    );

    setBlogs(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setFormData({
      ...formData,
      image: files[0],
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

const resetForm = () => {
  setFormData({
    title: "",
    category: "",
    description: "",
    content: "",
    author: "",
    status: "Draft",
    image: null,
  });

  setEditingBlog(null);
};

// Open Add Blog Modal
const openAddModal = () => {
  resetForm();
  setShowForm(true);
};

// Open Edit Blog Modal
const openEditModal = (blog) => {
  setEditingBlog(blog);

  setFormData({
    title: blog.title,
    category: blog.category,
    description: blog.description,
    content: blog.content,
    author: blog.author,
    status: blog.status,
    image: null,
  });

  setShowForm(true);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("content", formData.content);
    data.append("author", formData.author);
    data.append("status", formData.status);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editingBlog) {
      await axios.put(
        `${API_URL}/api/blogs/${editingBlog._id}`,
        data
      );

      alert("Blog Updated Successfully");
    } else {
      await axios.post(
        `${API_URL}/api/blogs`,
        data
      );

      alert("Blog Published Successfully");
    }

    fetchBlogs();
    setShowForm(false);
    resetForm();

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

const deleteBlog = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${API_URL}/api/blogs/${id}`
    );

    fetchBlogs();

    alert("Blog Deleted Successfully");

  } catch (err) {

    console.log(err);

    alert("Failed to delete blog");

  }
};
const categories = [
  "All",
  ...new Set(blogs.map((blog) => blog.category)),
];
const filteredBlogs = useMemo(() => {
  return blogs.filter((blog) => {

    const matchesSearch =
      blog.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      blog.author
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : blog.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All"
        ? true
        : blog.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );

  });
}, [
  blogs,
  search,
  statusFilter,
  categoryFilter,
]);



const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

const currentBlogs = filteredBlogs.slice(
  indexOfFirstBlog,
  indexOfLastBlog
);

const totalPages = Math.ceil(
  filteredBlogs.length / blogsPerPage
);
return (
  <div className="p-8">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Blog Management
        </h1>

        <p className="text-gray-400 mt-2">
          Create, edit and manage all blog posts.
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={fetchBlogs}
          className="bg-slate-700 hover:bg-slate-600 transition px-4 py-3 rounded-lg flex items-center gap-2 text-white"
        >
          <FaSyncAlt />
          Refresh
        </button>

        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-3 rounded-lg flex items-center gap-2 text-white font-medium"
        >
          <FaPlus />
          Add Blog
        </button>

      </div>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-slate-800 rounded-xl p-6 shadow">

        <FaFileAlt className="text-4xl text-blue-400 mb-4" />

        <h3 className="text-gray-400">
          Total Blogs
        </h3>

        <h1 className="text-4xl font-bold text-white mt-2">
          {blogs.length}
        </h1>

      </div>

      <div className="bg-slate-800 rounded-xl p-6 shadow">

        <FaCheckCircle className="text-4xl text-green-400 mb-4" />

        <h3 className="text-gray-400">
          Published
        </h3>

        <h1 className="text-4xl font-bold text-green-400 mt-2">
          {
            blogs.filter(
              (blog) => blog.status === "Published"
            ).length
          }
        </h1>

      </div>

      <div className="bg-slate-800 rounded-xl p-6 shadow">

        <FaRegEdit className="text-4xl text-yellow-400 mb-4" />

        <h3 className="text-gray-400">
          Draft
        </h3>

        <h1 className="text-4xl font-bold text-yellow-400 mt-2">
          {
            blogs.filter(
              (blog) => blog.status === "Draft"
            ).length
          }
        </h1>

      </div>

    </div>

    {/* Search & Filter */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

  {/* Search */}

  <div className="relative">

    <FaSearch className="absolute left-4 top-4 text-gray-500" />

    <input
      type="text"
      placeholder="Search by title or author..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full bg-slate-800 text-white rounded-lg py-3 pl-12 pr-4 outline-none"
    />

  </div>

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="bg-slate-800 text-white rounded-lg p-3"
  >
    <option value="All">
      All Status
    </option>

    <option value="Published">
      Published
    </option>

    <option value="Draft">
      Draft
    </option>

  </select>

  {/* Category Filter */}

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(e.target.value)
    }
    className="bg-slate-800 text-white rounded-lg p-3"
  >
    {categories.map((category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}

  </select>

</div>
    {/* Blog Table */}

    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">

      <table className="min-w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="px-5 py-4 text-left text-gray-300">
              Image
            </th>

            <th className="px-5 py-4 text-left text-gray-300">
              Title
            </th>

            <th className="px-5 py-4 text-left text-gray-300">
              Category
            </th>

            <th className="px-5 py-4 text-left text-gray-300">
              Author
            </th>

            <th className="px-5 py-4 text-left text-gray-300">
              Status
            </th>

            <th className="px-5 py-4 text-left text-gray-300">
              Date
            </th>

            <th className="px-5 py-4 text-center text-gray-300">
              Actions
            </th>

          </tr>

        </thead>

  <tbody>

  {loading ? (
  <tr>
    <td
      colSpan="7"
      className="text-center py-10 text-gray-400"
    >
      Loading blogs...
    </td>
  </tr>
) : currentBlogs.length === 0 ? (
  <tr>
    <td
      colSpan="7"
      className="text-center py-10 text-gray-400"
    >
      No blogs found.
    </td>
  </tr>
) : (
  currentBlogs.map((blog) => (
    <tr
      key={blog._id}
      className="border-b border-slate-700 hover:bg-slate-700 transition"
    >
      {/* Image */}
      <td className="px-5 py-4">
        <img
          src={`${API_URL}/uploads/${blog.image}`}
          alt={blog.title}
          className="w-24 h-16 rounded-lg object-cover"
        />
      </td>

      {/* Title */}
      <td className="px-5 py-4">
        <h2 className="text-white font-semibold">
          {blog.title}
        </h2>

        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
          {blog.description}
        </p>
      </td>

      {/* Category */}
      <td className="px-5 py-4 text-gray-300">
        {blog.category}
      </td>

      {/* Author */}
      <td className="px-5 py-4 text-gray-300">
        {blog.author}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            blog.status === "Published"
              ? "bg-green-600/20 text-green-400"
              : "bg-yellow-600/20 text-yellow-400"
          }`}
        >
          {blog.status}
        </span>
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-gray-400">
        {new Date(blog.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">

        <div className="flex justify-center gap-3">

          {/* View */}

          <button
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
            title="View"
            onClick={() =>
              window.open(
                `/blog/${blog._id}`,
                "_blank"
              )
            }
          >
            <FaEye />
          </button>

          {/* Edit */}

          <button
            className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg text-white"
            title="Edit"
            onClick={() => openEditModal(blog)}
          >
            <FaEdit />
          </button>

          {/* Delete */}

          <button
            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white"
            title="Delete"
            onClick={() => deleteBlog(blog._id)}
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  ))
)}
        </tbody>
      </table>
    </div>
<div className="flex justify-between items-center mt-6">

  <p className="text-gray-400">
    Page {currentPage} of {totalPages}
  </p>

  <div className="flex gap-2">

    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((prev) => prev - 1)
      }
      className="bg-slate-700 px-4 py-2 rounded text-white disabled:opacity-40"
    >
      Previous
    </button>

    <button
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((prev) => prev + 1)
      }
      className="bg-indigo-600 px-4 py-2 rounded text-white disabled:opacity-40"
    >
      Next
    </button>

  </div>

</div>
{/* ================= Add / Edit Blog Modal ================= */}

{showForm && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

    <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

      {/* Header */}

      <div className="flex justify-between items-center border-b border-slate-700 p-6">

        <h2 className="text-2xl font-bold text-white">
          {editingBlog ? "Edit Blog" : "Add New Blog"}
        </h2>

        <button
          onClick={() => {
            setShowForm(false);
            resetForm();
          }}
          className="text-gray-400 hover:text-white text-2xl"
        >
          <FaTimes />
        </button>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-5"
      >

        {/* Title */}

        <div>

          <label className="block text-gray-300 mb-2">
            Blog Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          />

        </div>

        {/* Category */}

        <div>

          <label className="block text-gray-300 mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          />

        </div>

        {/* Author */}

        <div>

          <label className="block text-gray-300 mb-2">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          />

        </div>

        {/* Description */}

        <div>

          <label className="block text-gray-300 mb-2">
            Description
          </label>

          <textarea
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          />

        </div>

        {/* Content */}

        <div>

          <label className="block text-gray-300 mb-2">
            Content
          </label>

          <textarea
            rows="8"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          />

        </div>

        {/* Status */}

        <div>

          <label className="block text-gray-300 mb-2">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          >
            <option value="Draft">
              Draft
            </option>

            <option value="Published">
              Published
            </option>

          </select>

        </div>

        {/* Image */}

        <div>

          <label className="block text-gray-300 mb-2">
            Blog Image
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-lg p-3 text-white"
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 pt-4">

          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold"
          >
            {editingBlog
              ? "Update Blog"
              : "Publish Blog"}
          </button>

        </div>

      </form>

    </div>

  </div>
)}
</div>
 );
}

export default AdminBlogs;

