import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";
import StatsCard from "../components/ui/StatsCard.jsx";
import { Package, FolderTree, Award, Users, Image, Cog, MessageSquare, Briefcase, Mail, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const fetchStats = async () => {
  const { data } = await api.get("/stats");
  return data.data;
};

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
    refetchInterval: 15000,
  });

  const counts = stats?.counts;
  const recent = stats?.recent;

  const cards = [
    { title: "Products", value: counts?.products, icon: Package, color: "bg-zinc-900", sub: `${counts?.activeProducts || 0} active`, link: "/admin/products" },
    { title: "Categories", value: counts?.categories, icon: FolderTree, color: "bg-blue-600", link: "/admin/categories" },
    { title: "Buyers", value: counts?.buyers, icon: Users, color: "bg-emerald-600", link: "/admin/buyers" },
    { title: "Gallery", value: counts?.gallery, icon: Image, color: "bg-purple-600", link: "/admin/gallery" },
    { title: "Certifications", value: counts?.certifications, icon: Award, color: "bg-amber-500", link: "/admin/certifications" },
    { title: "Blogs", value: counts?.blogs, icon: Newspaper, color: "bg-indigo-600", link: "/admin/blogs" },
    { title: "Messages", value: counts?.contacts, icon: MessageSquare, color: "bg-rose-500", sub: `${counts?.unreadContacts || 0} unread`, link: "/admin/contacts" },
    { title: "Applications", value: counts?.applications, icon: Briefcase, color: "bg-teal-600", sub: `${counts?.pendingApplications || 0} pending`, link: "/admin/careers" },
    { title: "Subscribers", value: counts?.subscribers, icon: Mail, color: "bg-cyan-600", link: "/admin/newsletter" },
    { title: "Operations", value: counts?.operations, icon: Cog, color: "bg-orange-500", link: "/admin/operations" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Overview of your website content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Link key={card.title} to={card.link}>
            <div className="group">
              <StatsCard
                title={card.title}
                value={isLoading ? "—" : card.value}
                icon={card.icon}
                color={card.color}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recent Products</h3>
            <Link to="/admin/products" className="text-xs text-gray-400 hover:text-black transition-colors">View all</Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse" />)}
            </div>
          ) : recent?.products?.length ? (
            <div className="space-y-2">
              {recent.products.map((p) => (
                <div key={p._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {p.images?.[0]?.url && <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.category?.name || "Uncategorized"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No products yet</p>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recent Messages</h3>
            <Link to="/admin/contacts" className="text-xs text-gray-400 hover:text-black transition-colors">View all</Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse" />)}
            </div>
          ) : recent?.contacts?.length ? (
            <div className="space-y-2">
              {recent.contacts.map((c) => (
                <Link to="/admin/contacts" key={c._id} className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${c.isRead ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}>
                      {!c.isRead && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 align-middle" />}
                      {c.name}
                    </p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                      c.isRead ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-600"
                    }`}>{c.isRead ? "read" : "unread"}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.subject || c.message}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No messages yet</p>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recent Applications</h3>
            <Link to="/admin/careers" className="text-xs text-gray-400 hover:text-black transition-colors">View all</Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse" />)}
            </div>
          ) : recent?.applications?.length ? (
            <div className="space-y-2">
              {recent.applications.map((a) => (
                <div key={a._id} className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 truncate">{a.name}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      a.status === "pending" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    }`}>{a.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{a.position || a.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No applications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
