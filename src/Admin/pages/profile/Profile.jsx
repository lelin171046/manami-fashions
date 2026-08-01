import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext.jsx";
import api from "../../../api/axios.js";
import { User, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { admin, fetchMe } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateMutation = useMutation({
    mutationFn: (body) => api.put(`/admin/${admin._id}`, body),
    onSuccess: async () => { toast.success("Profile updated"); await fetchMe(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const passwordMutation = useMutation({
    mutationFn: (body) => api.put(`/admin/${admin._id}`, body),
    onSuccess: () => { toast.success("Password updated"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    updateMutation.mutate({ name, email });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return toast.error("All fields are required");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    passwordMutation.mutate({ password: newPassword });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab("profile")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <User size={16} /> Profile
        </button>
        <button onClick={() => setActiveTab("password")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "password" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <Lock size={16} /> Password
        </button>
      </div>

      {activeTab === "profile" ? (
        <form onSubmit={handleProfileSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{admin?.name}</h3>
              <p className="text-xs text-gray-400">{admin?.role}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={updateMutation.isPending} className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">
              {updateMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Min 6 characters" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={passwordMutation.isPending} className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">
              {passwordMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
