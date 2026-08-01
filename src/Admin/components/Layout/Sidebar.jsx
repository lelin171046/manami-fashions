import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import {
  LayoutDashboard, Package, FolderTree, Building2, Image, Award,
  Users, Cog, Newspaper, MessageSquare, Briefcase, Mail,
  User, Settings, ChevronDown, X, ChevronRight, BarChart3,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Categories", icon: FolderTree, path: "/admin/categories" },
  { label: "Factory Profile", icon: Building2, path: "/admin/factory-profile" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Certifications", icon: Award, path: "/admin/certifications" },
  { label: "Buyers", icon: Users, path: "/admin/buyers" },
  { label: "Operations", icon: Cog, path: "/admin/operations" },
  { label: "Blogs", icon: Newspaper, path: "/admin/blogs" },
  { type: "divider" },
  { label: "Contact Messages", icon: MessageSquare, path: "/admin/contacts" },
  { label: "Applications", icon: Briefcase, path: "/admin/careers" },
  { label: "Newsletter", icon: Mail, path: "/admin/newsletter" },
  { type: "divider" },
  { label: "Profile", icon: User, path: "/admin/profile" },
];

const Sidebar = ({ open, onClose }) => {
  const { pathname } = useLocation();

  const { data: unreadCount } = useQuery({
    queryKey: ["contact-unread-count"],
    queryFn: async () => (await api.get("/admin/messages/unread-count")).data.data.count,
    refetchInterval: 10000,
  });

  const isActive = (path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const content = (
    <div className="h-full flex flex-col bg-zinc-900">
      <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold text-sm tracking-tighter">M</span>
          </div>
          <div>
            <div className="text-white text-sm font-bold tracking-tight leading-none">Manami</div>
            <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">Admin Panel</div>
          </div>
        </Link>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {menu.map((item, i) => {
          if (item.type === "divider") {
            return <div key={i} className="border-t border-white/10 my-3" />;
          }
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                active
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} className={active ? "text-white" : "text-gray-500 group-hover:text-gray-300"} />
              <span className="flex-1">{item.label}</span>
              {item.path === "/admin/contacts" && unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-red-500 text-white min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
              {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="px-3 py-2 text-[10px] text-gray-500 uppercase tracking-widest">
          Manami Fashions Ltd.
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block w-64 fixed inset-y-0 left-0 z-30">{content}</div>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute inset-y-0 left-0 w-64 z-50">{content}</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
