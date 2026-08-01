import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, RefreshCw, Eye, Archive, Trash2, CheckCheck, MailX,
  Inbox, Clock, ChevronLeft, ChevronRight, Send, Mail, MessageSquare, Calendar,
} from "lucide-react";
import api from "../../../api/axios.js";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import toast from "react-hot-toast";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" },
  { key: "replied", label: "Replied" },
  { key: "archived", label: "Archived" },
];

const STATUS_STYLE = {
  pending: "bg-amber-50 text-amber-600",
  read: "bg-blue-50 text-blue-600",
  replied: "bg-emerald-50 text-emerald-600",
  archived: "bg-gray-100 text-gray-500",
};

const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
const formatTime = (d) => new Date(d).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

const StatCard = ({ title, value, icon: Icon, loading, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</p>
        {loading ? (
          <div className="h-7 w-16 bg-gray-100 rounded-lg animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-bold text-gray-900 mt-1">{value ?? "—"}</p>
        )}
      </div>
      <div className={`${accent} w-11 h-11 rounded-xl flex items-center justify-center`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
  </motion.div>
);

const MessageRow = ({ msg, onView, onRead, onUnread, onArchive, onDelete, onReply }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className={`flex items-center gap-4 px-5 py-4 border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${
      msg.isRead ? "bg-white" : "bg-blue-50/40"
    }`}
  >
    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView(msg)}>
      <div className="flex items-center gap-2">
        {!msg.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
        <p className={`text-sm truncate ${msg.isRead ? "text-gray-500 font-medium" : "text-gray-900 font-bold"}`}>
          {msg.name}
        </p>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${STATUS_STYLE[msg.status] || STATUS_STYLE.pending}`}>
          {msg.status}
        </span>
      </div>
      <p className={`text-xs mt-0.5 truncate ${msg.isRead ? "text-gray-400" : "text-gray-600 font-medium"}`}>
        {msg.subject || "General Inquiry"}
      </p>
      <p className="text-[11px] text-gray-400 mt-0.5 truncate">
        {msg.email} {msg.company && `· ${msg.company}`}
      </p>
    </div>
    <div className="hidden sm:block text-right shrink-0">
      <p className="text-xs text-gray-500 font-medium">{formatDate(msg.createdAt)}</p>
      <p className="text-[11px] text-gray-400">{formatTime(msg.createdAt)}</p>
    </div>
    <div className="flex items-center gap-1 shrink-0">
      <button onClick={() => onView(msg)} title="View" className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
        <Eye size={15} />
      </button>
      {msg.isRead ? (
        <button onClick={() => onUnread(msg)} title="Mark as unread" className="p-2 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors">
          <MailX size={15} />
        </button>
      ) : (
        <button onClick={() => onRead(msg)} title="Mark as read" className="p-2 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors">
          <CheckCheck size={15} />
        </button>
      )}
      <button onClick={() => onReply(msg)} title="Reply via email" className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
        <Send size={15} />
      </button>
      <button onClick={() => onArchive(msg)} title="Archive" className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <Archive size={15} />
      </button>
      <button onClick={() => onDelete(msg)} title="Delete" className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
        <Trash2 size={15} />
      </button>
    </div>
  </motion.div>
);

const Contacts = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [viewItem, setViewItem] = useState(null);
  const [replyItem, setReplyItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    queryClient.invalidateQueries({ queryKey: ["messages-stats"] });
    queryClient.invalidateQueries({ queryKey: ["contact-unread-count"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    queryClient.invalidateQueries({ queryKey: ["admin-unread-recent"] });
  };

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin-contacts", filter, search, page],
    queryFn: async () => {
      const params = new URLSearchParams({ filter, limit: 10, page });
      if (search) params.append("search", search);
      const { data } = await api.get(`/admin/messages?${params}`);
      return data;
    },
    refetchInterval: 15000,
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["messages-stats"],
    queryFn: async () => (await api.get("/admin/messages/stats")).data.data,
    refetchInterval: 15000,
  });

  const mutationOptions = {
    onSuccess: (msg) => {
      invalidate();
      toast.success(msg.data?.message || "Updated");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Action failed"),
  };

  const readMutation = useMutation({ mutationFn: (id) => api.patch(`/admin/messages/${id}/read`), ...mutationOptions });
  const unreadMutation = useMutation({ mutationFn: (id) => api.patch(`/admin/messages/${id}/unread`), ...mutationOptions });
  const archiveMutation = useMutation({ mutationFn: (id) => api.patch(`/admin/messages/${id}/archive`), ...mutationOptions });
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/messages/${id}`),
    ...mutationOptions,
    onSuccess: () => { invalidate(); toast.success("Message deleted"); setDeleteItem(null); },
  });
  const replyMutation = useMutation({
    mutationFn: ({ id, subject, message }) => api.post(`/admin/messages/${id}/reply`, { subject, message }),
    onSuccess: () => { invalidate(); toast.success("Reply sent"); setReplyItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Reply failed"),
  });

  const contacts = data?.data || [];
  const meta = data?.meta;

  const onView = (msg) => {
    setViewItem(msg);
    if (!msg.isRead) readMutation.mutate(msg._id, {
      onSuccess: () => setViewItem((prev) => (prev && prev._id === msg._id ? { ...prev, isRead: true, status: "read" } : prev)),
    });
  };

  const submitReply = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    replyMutation.mutate({
      id: replyItem._id,
      subject: form.get("subject") || `Re: ${replyItem.subject || "Your inquiry"}`,
      message: form.get("message"),
    });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-sm text-gray-400 mt-1">Manage visitor inquiries from your inbox</p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Messages" value={statsData?.total} icon={Inbox} accent="bg-zinc-900" loading={statsLoading} />
        <StatCard title="Unread" value={statsData?.unread} icon={MessageSquare} accent="bg-blue-500" loading={statsLoading} />
        <StatCard title="Today" value={statsData?.today} icon={Clock} accent="bg-emerald-500" loading={statsLoading} />
        <StatCard title="This Month" value={statsData?.month} icon={Calendar} accent="bg-amber-500" loading={statsLoading} />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => { setFilter(f.key); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              filter === f.key ? "bg-black text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Inbox */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50">
          <form onSubmit={submitSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email, company, or subject..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors">
              Search
            </button>
          </form>
        </div>

        {isLoading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse hidden sm:block" />
              </div>
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-16 text-center">
            <Inbox size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 font-medium">No messages found</p>
            <p className="text-xs text-gray-400 mt-1">
              {search ? "Try a different search term" : "New contact submissions will appear here in real time"}
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {contacts.map((msg) => (
              <MessageRow
                key={msg._id}
                msg={msg}
                onView={onView}
                onRead={(m) => readMutation.mutate(m._id)}
                onUnread={(m) => unreadMutation.mutate(m._id)}
                onArchive={(m) => archiveMutation.mutate(m._id)}
                onDelete={(m) => setDeleteItem(m)}
                onReply={(m) => setReplyItem(m)}
              />
            ))}
          </AnimatePresence>
        )}

        {meta?.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">
              Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, meta.total)} of {meta.total}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
                let p;
                if (meta.totalPages <= 5) p = i + 1;
                else if (page <= 3) p = i + 1;
                else if (page >= meta.totalPages - 2) p = meta.totalPages - 4 + i;
                else p = page - 2 + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === page ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"}`}
                  >
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage((p) => p + 1)} disabled={page >= meta.totalPages} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Message Details" size="lg">
        {viewItem && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${STATUS_STYLE[viewItem.status] || STATUS_STYLE.pending}`}>
                {viewItem.status}
              </span>
              <p className="text-xs text-gray-400">{formatDate(viewItem.createdAt)} · {formatTime(viewItem.createdAt)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Name</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{viewItem.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Email</p>
                <a href={`mailto:${viewItem.email}`} className="text-sm font-medium text-blue-600 mt-0.5 block hover:underline">{viewItem.email}</a>
              </div>
              {viewItem.phone && (
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.phone}</p>
                </div>
              )}
              {viewItem.company && (
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Company</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.company}</p>
                </div>
              )}
              {viewItem.country && (
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Country</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.country}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Subject</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{viewItem.subject || "General Inquiry"}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Message</p>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl leading-relaxed">{viewItem.message}</p>
            </div>
            <div className="flex gap-2">
              {viewItem.isRead ? (
                <button onClick={() => { unreadMutation.mutate(viewItem._id); setViewItem(null); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <MailX size={15} /> Mark Unread
                </button>
              ) : (
                <button onClick={() => { readMutation.mutate(viewItem._id); setViewItem((p) => ({ ...p, isRead: true, status: "read" })); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <CheckCheck size={15} /> Mark Read
                </button>
              )}
              <button onClick={() => { setReplyItem(viewItem); setViewItem(null); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                <Send size={15} /> Reply
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal open={!!replyItem} onClose={() => setReplyItem(null)} title={`Reply to ${replyItem?.name || ""}`} size="lg">
        {replyItem && (
          <form onSubmit={submitReply} className="space-y-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">To</p>
              <p className="text-sm font-semibold text-gray-900">{replyItem.email}</p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">Subject</label>
              <input
                name="subject"
                defaultValue={`Re: ${replyItem.subject || "Your inquiry"}`}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your reply..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={replyMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {replyMutation.isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} /> Send Reply via Brevo
                </>
              )}
            </button>
          </form>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => deleteMutation.mutate(deleteItem._id)}
        title="Delete Message?"
        message="Permanently delete this contact message? This cannot be undone."
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default Contacts;
