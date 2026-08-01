import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../../api/axios.js";
import { Menu, Bell, LogOut, User, CheckCheck, Mail } from "lucide-react";
import toast from "react-hot-toast";

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
};

const Navbar = ({ onMenuClick }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const { data: unread } = useQuery({
    queryKey: ["contact-unread-count"],
    queryFn: async () => (await api.get("/admin/messages/unread-count")).data.data.count,
    refetchInterval: 10000,
  });

  const { data: recentUnread } = useQuery({
    queryKey: ["admin-unread-recent"],
    queryFn: async () => {
      const { data } = await api.get("/admin/messages?filter=unread&limit=6");
      return data.data;
    },
    refetchInterval: 10000,
  });

  const readMutation = useMutation({
    mutationFn: (id) => api.patch(`/admin/messages/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-unread-count"] });
      queryClient.invalidateQueries({ queryKey: ["admin-unread-recent"] });
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      queryClient.invalidateQueries({ queryKey: ["messages-stats"] });
    },
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  const openMessage = (msg) => {
    if (!msg.isRead) readMutation.mutate(msg._id);
    setOpen(false);
    navigate("/admin/contacts");
  };

  const messages = recentUnread || [];

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-medium text-gray-700">Admin Dashboard</h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            title="Notifications"
          >
            <Bell size={18} className="text-gray-500" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">Notifications</p>
                  {unread > 0 && (
                    <span className="text-[10px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                      {unread} unread
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="py-10 text-center">
                      <Mail size={24} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-400">No unread messages</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <button
                        key={msg._id}
                        onClick={() => openMessage(msg)}
                        className="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{msg.name}</p>
                          <span className="text-[10px] text-gray-400 shrink-0">{timeAgo(msg.createdAt)}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{msg.subject || "General Inquiry"}</p>
                      </button>
                    ))
                  )}
                </div>
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => { setOpen(false); navigate("/admin/contacts"); }}
                    className="flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    View all
                  </button>
                  {messages.length > 0 && (
                    <button
                      onClick={() => {
                        messages.forEach((m) => { if (!m.isRead) readMutation.mutate(m._id); });
                        setOpen(false);
                      }}
                      className="flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCheck size={13} /> Mark all read
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 pl-2 ml-2 border-l border-gray-100">
          <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-gray-700">{admin?.name || "Admin"}</div>
            <div className="text-[10px] text-gray-400">{admin?.role || "admin"}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors ml-1"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
