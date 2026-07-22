import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa";


const API_URL = import.meta.env.VITE_API_URL;

function AdminBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
const blogsPerPage = 5;
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/blog/admin`
      );

      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  const totalBlogs = blogs.length;

  const publishedBlogs = blogs.filter(
    (b) => b.status === "Published"
  ).length;

  const draftBlogs = blogs.filter(
    (b) => b.status === "Draft"
  ).length;

  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category)),
  ];



  const indexOfLastBlog = currentPage * blogsPerPage;

const indexOfFirstBlog =
  indexOfLastBlog - blogsPerPage;

const currentBlogs = filteredBlogs.slice(
  indexOfFirstBlog,
  indexOfLastBlog
);

const totalPages = Math.ceil(
  filteredBlogs.length / blogsPerPage
);

  
const deleteBlog = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${API_URL}/api/blogs/${id}`
    );

    setBlogs((prev) =>
      prev.filter((blog) => blog._id !== id)
    );

  } catch (error) {

    console.log(error);

    alert("Failed to delete blog.");

  }

};
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
      onClick={() => navigate("/admin/blogs/add")}
      className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-3 rounded-lg flex items-center gap-2 text-white font-medium"
    >
      <FaPlus />
      Add Blog
    </button>

  </div>

</div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-800 rounded-xl p-6">

          <FaFileAlt className="text-3xl text-blue-400 mb-3" />

          <h3 className="text-gray-400">
            Total Blogs
          </h3>

          <h1 className="text-4xl font-bold text-white mt-2">
            {totalBlogs}
          </h1>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <FaCheckCircle className="text-3xl text-green-400 mb-3" />

          <h3 className="text-gray-400">
            Published
          </h3>

          <h1 className="text-4xl font-bold text-green-400 mt-2">
            {publishedBlogs}
          </h1>

        </div>

        <div className="bg-slate-800 rounded-xl p-6">

          <FaRegEdit className="text-3xl text-yellow-400 mb-3" />

          <h3 className="text-gray-400">
            Draft
          </h3>

          <h1 className="text-4xl font-bold text-yellow-400 mt-2">
            {draftBlogs}
          </h1>

        </div>

      </div>

      {/* Search & Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-slate-800 rounded-lg py-3 pl-12 pr-4 text-white outline-none"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="bg-slate-800 rounded-lg p-3 text-white"
        >
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
          className="bg-slate-800 rounded-lg p-3 text-white"
        >
          {categories.map((cat) => (
            <option key={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Loading blogs...
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">

  {filteredBlogs.length === 0 ? (

    <div className="text-center py-20">

      <h2 className="text-2xl font-semibold text-white">
        No Blogs Found
      </h2>

      <p className="text-gray-400 mt-2">
        Try changing your search or filter.
      </p>

    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="px-6 py-4 text-left text-gray-300">
              Image
            </th>

            <th className="px-6 py-4 text-left text-gray-300">
              Title
            </th>

            <th className="px-6 py-4 text-left text-gray-300">
              Category
            </th>

            <th className="px-6 py-4 text-left text-gray-300">
              Author
            </th>

            <th className="px-6 py-4 text-left text-gray-300">
              Status
            </th>

            <th className="px-6 py-4 text-left text-gray-300">
              Date
            </th>

            <th className="px-6 py-4 text-center text-gray-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {currentBlogs.map((blog) => (

            <tr
              key={blog._id}
              className="border-b border-slate-700 hover:bg-slate-700 transition"
            >

              {/* Image */}

              <td className="px-6 py-4">

                <img
                  src={`${API_URL}/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />

              </td>

              {/* Title */}

              <td className="px-6 py-4">

                <h2 className="text-white font-semibold">
                  {blog.title}
                </h2>

                <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                  {blog.description}
                </p>

              </td>

              {/* Category */}

              <td className="px-6 py-4 text-gray-300">
                {blog.category}
              </td>

              {/* Author */}

              <td className="px-6 py-4 text-gray-300">
                {blog.author}
              </td>

              {/* Status */}

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    blog.status === "Published"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {blog.status}
                </span>

              </td>

              {/* Date */}

              <td className="px-6 py-4 text-gray-400">

                {new Date(
                  blog.createdAt
                ).toLocaleDateString()}

              </td>

              {/* Actions */}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  {/* View */}

                  <button
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
                    title="View"
                    onClick={() =>
                      window.open(
                        `/blogs/${blog._id}`,
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
                    onClick={() =>
                      navigate(
                        `/admin/blogs/edit/${blog._id}`
                      )
                    }
                  >
                    <FaEdit />
                  </button>

                  {/* Delete */}

                  <button
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white"
                    title="Delete"
                    onClick={() =>
                      deleteBlog(blog._id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>
      )}

    </div>
  );
}

export default AdminBlogs;