import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function SettingsSection({ setSection }) {

  const [settings, setSettings] = useState({
    companyName: "InfluNexa",
    email: "admin@influnexa.com",
    phone: "9876543210",
    password: "",
    notifications: true,
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const toggleNotifications = () => {
    setSettings({
      ...settings,
      notifications: !settings.notifications,
    });
  };

  const handleSave = () => {
    console.log("Settings:", settings);
    console.log("Profile Image:", profilePic);
    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className="text-white relative">

      {/* HEADER WITH CLOSE BUTTON */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSection("dashboard")}
          className="bg-red-500 hover:bg-red-600 p-2 rounded-full"
        >
          <FaTimes />
        </button>

      </div>

      <div className="max-w-2xl bg-slate-800 p-6 rounded-xl space-y-5">

        {/* PROFILE IMAGE */}
        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <label className="bg-cyan-500 px-4 py-2 rounded cursor-pointer">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </label>

        </div>

        {/* INPUT FIELDS */}
        <input
          type="text"
          name="companyName"
          value={settings.companyName}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700"
        />

        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700"
        />

        <input
          type="text"
          name="phone"
          value={settings.phone}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700"
        />

        <input
          type="password"
          name="password"
          value={settings.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700"
        />

        {/* NOTIFICATIONS */}
        <div className="flex items-center justify-between bg-slate-700 p-3 rounded">
          <span>Enable Notifications</span>

          <button
            onClick={toggleNotifications}
            className={`px-4 py-1 rounded ${
              settings.notifications ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {settings.notifications ? "ON" : "OFF"}
          </button>
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="bg-cyan-500 px-6 py-3 rounded-lg font-bold w-full"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default SettingsSection;