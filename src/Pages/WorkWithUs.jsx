import React, { useState } from "react";

const WorkWithUs = () => {
  const [activeTab, setActiveTab] = useState("resume");

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Work with us</h2>
          <p className="text-gray-600 mt-2">
            Join our team and lets create magic together
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setActiveTab("positions")}
            className={`px-8 py-3 border ${
              activeTab === "positions"
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Available Positions
          </button>

          <button
            onClick={() => setActiveTab("resume")}
            className={`px-8 py-3 border ${
              activeTab === "resume"
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Resume corner
          </button>
        </div>

        {/* TAB CONTENT */}

        {activeTab === "positions" && (
          <div className="text-center text-gray-600">
            <p>No positions available right now.</p>
            <p>Please check again later.</p>
          </div>
        )}

        {activeTab === "resume" && (
          <form className="space-y-6">

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your name"
                className="p-4 border rounded w-full"
              />

              <input
                type="email"
                placeholder="Email address"
                className="p-4 border rounded w-full"
              />

              <input
                type="text"
                placeholder="Mobile No"
                className="p-4 border rounded w-full"
              />

              <input
                type="text"
                placeholder="Type Position"
                className="p-4 border rounded w-full"
              />
            </div>

            {/* File Upload */}
            <div>
              <p className="mb-2 text-sm">File upload</p>

              <label className="border-2 border-dashed border-blue-400 rounded-lg p-6 flex items-center justify-center cursor-pointer text-blue-600">
                <input type="file" className="hidden" />
                Upload CV
              </label>

              <p className="text-sm text-red-500 mt-2">
                Application documents (PDF, max. 50 MB)
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded"
            >
              Submit
            </button>

          </form>
        )}
      </div>
    </section>
  );
};

export default WorkWithUs;