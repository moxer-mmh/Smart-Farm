import React, { useState } from "react";

const Settings: React.FC = () => {
  // Manage settings state
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the settings on your backend or context
    console.log("Updated Settings:", {
      darkMode,
      language,
      emailNotifications,
    });
    alert("Settings saved!");
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <label htmlFor="darkMode" className="mr-4 text-lg">
            Dark Mode
          </label>
          <input
            id="darkMode"
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="h-5 w-5 text-blue-600"
          />
        </div>

        {/* Language Selector */}
        <div>
          <label htmlFor="language" className="block mb-2 text-lg">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center">
          <label htmlFor="emailNotifications" className="mr-4 text-lg">
            Email Notifications
          </label>
          <input
            id="emailNotifications"
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="h-5 w-5 text-blue-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
