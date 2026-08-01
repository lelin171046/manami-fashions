import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Plus, Pencil, Trash2, Eye, FileText, ExternalLink, X, Search, Loader2, Download } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_COLORS = {
  pending: "bg-amber-50 text-amber-600",
  reviewed: "bg-blue-50 text-blue-600",
  shortlisted: "bg-purple-50 text-purple-600",
  hired: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const CIRCULAR_TYPES = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const TABS = ["Applications", "Circulars"];

const Careers = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("Applications");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-careers", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      const { data } = await api.get(`/careers?${params}`);
      return data;
    },
    enabled: activeTab === "Applications",
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/careers/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-careers"] }); toast.success("Deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/careers/${id}/status`, { status }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-careers"] }); toast.success("Status updated"); },
  });

  const apps = data?.data || [];
  const meta = data?.meta;

  const [resumeViewItem, setResumeViewItem] = useState(null);

  const columns = [
    { key: "name", label: "Applicant", render: (v, row) => (
      <div>
        <p className="font-medium text-gray-900">{v}</p>
        <p className="text-xs text-gray-400">{row.email}</p>
      </div>
    ) },
    { key: "position", label: "Position", render: (v) => <span className="font-medium text-gray-700">{v}</span> },
    { key: "department", label: "Department", render: (v) => v || "—" },
    { key: "phone", label: "Phone", render: (v) => v || "—" },
    { key: "createdAt", label: "Applied Date", render: (v) => (
      <div>
        <p className="text-gray-700">{new Date(v).toLocaleDateString()}</p>
        <p className="text-xs text-gray-400">{new Date(v).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
    ) },
    { key: "status", label: "Status", render: (v, row) => (
      <select value={v} onChange={(e) => statusMutation.mutate({ id: row._id, status: e.target.value })}
        className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border-0 cursor-pointer ${STATUS_COLORS[v] || ""}`}>
        {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    )},
  ];

  const [circularModalOpen, setCircularModalOpen] = useState(false);
  const [circularEditItem, setCircularEditItem] = useState(null);
  const [circularDeleteItem, setCircularDeleteItem] = useState(null);
  const [circularSearch, setCircularSearch] = useState("");
  const [circularForm, setCircularForm] = useState({
    title: "", description: "", requirements: [], responsibilities: [],
    location: "", type: "full-time", department: "", salary: "", deadline: "", vacancies: 1, isActive: true,
  });
  const [reqInput, setReqInput] = useState("");
  const [respInput, setRespInput] = useState("");

  const { data: circularsData, isLoading: circularsLoading } = useQuery({
    queryKey: ["admin-job-circulars"],
    queryFn: async () => {
      const { data } = await api.get("/job-circulars");
      return data;
    },
    enabled: activeTab === "Circulars",
  });

  const createCircularMutation = useMutation({
    mutationFn: (body) => api.post("/job-circulars", body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-job-circulars"] }); toast.success("Circular created"); closeCircularModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateCircularMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/job-circulars/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-job-circulars"] }); toast.success("Circular updated"); closeCircularModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteCircularMutation = useMutation({
    mutationFn: (id) => api.delete(`/job-circulars/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-job-circulars"] }); toast.success("Deleted"); setCircularDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const openCreateCircular = () => {
    setCircularEditItem(null);
    setCircularForm({
      title: "", description: "", requirements: [], responsibilities: [],
      location: "", type: "full-time", department: "", salary: "", deadline: "", vacancies: 1, isActive: true,
    });
    setCircularModalOpen(true);
  };

  const openEditCircular = (item) => {
    setCircularEditItem(item);
    setCircularForm({
      title: item.title || "",
      description: item.description || "",
      requirements: item.requirements || [],
      responsibilities: item.responsibilities || [],
      location: item.location || "",
      type: item.type || "full-time",
      department: item.department || "",
      salary: item.salary || "",
      deadline: item.deadline ? item.deadline.split("T")[0] : "",
      vacancies: item.vacancies || 1,
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setCircularModalOpen(true);
  };

  const closeCircularModal = () => { setCircularModalOpen(false); setCircularEditItem(null); };

  const handleCircularSubmit = (e) => {
    e.preventDefault();
    if (!circularForm.title.trim() || !circularForm.description.trim() || !circularForm.location.trim() || !circularForm.department.trim() || !circularForm.deadline) {
      return toast.error("Job position, description, location, department, and deadline are required");
    }
    const vacancies = Number(circularForm.vacancies);
    if (!Number.isInteger(vacancies) || vacancies < 1) {
      return toast.error("Number of vacancies must be at least 1");
    }
    const body = { ...circularForm, vacancies };
    if (circularEditItem) updateCircularMutation.mutate({ id: circularEditItem._id, body });
    else createCircularMutation.mutate(body);
  };

  const addRequirement = () => { if (reqInput.trim()) { setCircularForm({ ...circularForm, requirements: [...circularForm.requirements, reqInput.trim()] }); setReqInput(""); } };
  const addResponsibility = () => { if (respInput.trim()) { setCircularForm({ ...circularForm, responsibilities: [...circularForm.responsibilities, respInput.trim()] }); setRespInput(""); } };

  const circulars = circularsData?.data || [];

  const filteredCirculars = useMemo(() => {
    if (!circularSearch) return circulars;
    const q = circularSearch.toLowerCase();
    return circulars.filter((c) =>
      c.title.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  }, [circulars, circularSearch]);

  const circularColumns = [
    { key: "title", label: "Title", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "type", label: "Type", render: (v) => {
      const colors = { "full-time": "bg-blue-50 text-blue-600", "part-time": "bg-purple-50 text-purple-600", "contract": "bg-amber-50 text-amber-600", "internship": "bg-emerald-50 text-emerald-600" };
      return <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${colors[v] || "bg-gray-50 text-gray-600"}`}>{v}</span>;
    }},
    { key: "location", label: "Location" },
    { key: "department", label: "Department" },
    { key: "vacancies", label: "Vacancies", render: (v) => <span className="text-gray-700">{v ?? 1}</span> },
    { key: "deadline", label: "Deadline", render: (v) => v ? new Date(v).toLocaleDateString() : "—" },
    { key: "isActive", label: "Status", render: (v) => (
      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${v ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"}`}>
        {v ? "Active" : "Inactive"}
      </span>
    )},
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Careers</h1>
          <p className="text-sm text-gray-400 mt-1">
            {activeTab === "Applications"
              ? `${meta?.total || 0} total applications`
              : `${circulars.length} total circulars`
            }
          </p>
        </div>
        {activeTab === "Circulars" && (
          <button onClick={openCreateCircular} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
            <Plus size={16} /> Add Circular
          </button>
        )}
      </div>

      <div className="flex gap-1 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Applications" ? (
        <>
          <DataTable columns={columns} data={apps} total={meta?.total} page={page} limit={20} totalPages={meta?.totalPages} onPageChange={setPage} onSearch={setSearch} loading={isLoading} emptyMessage="No applications found"
            actions={(row) => (
              <div className="flex items-center justify-end gap-1">
                <button onClick={() => setViewItem(row)} title="View Details" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Eye size={14} /></button>
                <button onClick={() => setResumeViewItem(row)} title="View Resume" disabled={!row.resume?.url} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"><FileText size={14} /></button>
                {row.resume?.url && (
                  <a href={`${row.resume.url}${row.resume.url.includes("?") ? "&" : "?"}fl_attachment=1`} title="Download Resume" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-emerald-600"><Download size={14} /></a>
                )}
                <button onClick={() => setDeleteItem(row)} title="Delete" className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            )}
          />

          <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Application Details" size="lg">
            {viewItem && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Applied Position</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.position}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Department</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.department || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                    <span className={`inline-block text-[10px] mt-0.5 px-2 py-1 rounded-full font-bold uppercase tracking-wider ${STATUS_COLORS[viewItem.status] || "bg-gray-50 text-gray-600"}`}>{viewItem.status}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${viewItem.email}`} className="text-sm font-medium text-gray-900 mt-0.5 hover:underline">{viewItem.email}</a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{viewItem.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Applied Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{new Date(viewItem.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Resume</p>
                    {viewItem.resume?.url ? (
                      <div className="flex items-center gap-3 mt-0.5">
                        <a href={viewItem.resume.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{viewItem.resume.originalName || "Resume file"}</a>
                        <a href={`${viewItem.resume.url}${viewItem.resume.url.includes("?") ? "&" : "?"}fl_attachment=1`} className="text-xs text-emerald-600 hover:underline flex items-center gap-1"><Download size={12} /> Download</a>
                      </div>
                    ) : <p className="text-sm text-gray-400 mt-0.5">No resume uploaded</p>}
                  </div>
                </div>

                {viewItem.experience && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Experience</p>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{viewItem.experience}</p>
                  </div>
                )}
                {viewItem.coverLetter && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Cover Letter</p>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{viewItem.coverLetter}</p>
                  </div>
                )}
                {viewItem.notes && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Admin Notes</p>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{viewItem.notes}</p>
                  </div>
                )}
              </div>
            )}
          </Modal>

          <Modal open={!!resumeViewItem} onClose={() => setResumeViewItem(null)} title="Resume Preview" size="xl">
            {resumeViewItem?.resume?.url && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500 truncate">{resumeViewItem.resume.originalName || "Resume"}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a href={resumeViewItem.resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <ExternalLink size={13} /> Open
                    </a>
                    <a href={`${resumeViewItem.resume.url}${resumeViewItem.resume.url.includes("?") ? "&" : "?"}fl_attachment=1`} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                      <Download size={13} /> Download
                    </a>
                  </div>
                </div>
                {String(resumeViewItem.resume.mimeType || "").includes("pdf") ? (
                  <iframe src={resumeViewItem.resume.url} title="Resume preview" className="w-full h-[70vh] rounded-lg border border-gray-100" />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg text-center">
                    <FileText size={40} className="text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500">Preview isn't available for this file type.</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">{resumeViewItem.resume.originalName || "Resume file"}</p>
                    <div className="flex items-center gap-2">
                      <a href={resumeViewItem.resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <ExternalLink size={13} /> Open in new tab
                      </a>
                      <a href={`${resumeViewItem.resume.url}${resumeViewItem.resume.url.includes("?") ? "&" : "?"}fl_attachment=1`} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        <Download size={13} /> Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal>

          <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Application?" message={`Delete application from "${deleteItem?.name}"?`} loading={deleteMutation.isPending} />
        </>
      ) : (
        <>
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={circularSearch}
              onChange={(e) => setCircularSearch(e.target.value)}
              placeholder="Filter by title, location, department or type..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
            />
          </div>

          <DataTable columns={circularColumns} data={filteredCirculars} emptyMessage={circularSearch ? "No matching circulars" : "No circulars found"}
            actions={(row) => (
              <div className="flex items-center justify-end gap-1">
                <button onClick={() => openEditCircular(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
                <button onClick={() => setCircularDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            )}
          />

          <Modal open={circularModalOpen} onClose={closeCircularModal} title={circularEditItem ? "Edit Circular" : "Add Circular"} size="xl">
            <form onSubmit={handleCircularSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Job Position *</label>
                <input value={circularForm.title} onChange={(e) => setCircularForm({ ...circularForm, title: e.target.value })} placeholder="e.g. Senior Merchandiser" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Job Description *</label>
                <textarea value={circularForm.description} onChange={(e) => setCircularForm({ ...circularForm, description: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" placeholder="Write a detailed description of the role..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Type *</label>
                  <select value={circularForm.type} onChange={(e) => setCircularForm({ ...circularForm, type: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black">
                    {CIRCULAR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Department *</label>
                  <input value={circularForm.department} onChange={(e) => setCircularForm({ ...circularForm, department: e.target.value })} placeholder="e.g. Merchandising" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Number of Vacancies *</label>
                  <input type="number" min="1" value={circularForm.vacancies} onChange={(e) => setCircularForm({ ...circularForm, vacancies: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Location *</label>
                  <input value={circularForm.location} onChange={(e) => setCircularForm({ ...circularForm, location: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Deadline *</label>
                  <input type="date" value={circularForm.deadline} onChange={(e) => setCircularForm({ ...circularForm, deadline: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                </div>
                <div className="flex items-end pb-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={circularForm.isActive} onChange={(e) => setCircularForm({ ...circularForm, isActive: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Active</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Requirements</label>
                <div className="flex gap-2 mb-2">
                  <input value={reqInput} onChange={(e) => setReqInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Add a requirement" />
                  <button type="button" onClick={addRequirement} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
                </div>
                <div className="space-y-1">
                  {circularForm.requirements.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-400 w-4">{i + 1}.</span>
                      <span className="flex-1 text-sm text-gray-600">{d}</span>
                      <button type="button" onClick={() => setCircularForm({ ...circularForm, requirements: circularForm.requirements.filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Responsibilities</label>
                <div className="flex gap-2 mb-2">
                  <input value={respInput} onChange={(e) => setRespInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addResponsibility())} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Add a responsibility" />
                  <button type="button" onClick={addResponsibility} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
                </div>
                <div className="space-y-1">
                  {circularForm.responsibilities.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-400 w-4">{i + 1}.</span>
                      <span className="flex-1 text-sm text-gray-600">{d}</span>
                      <button type="button" onClick={() => setCircularForm({ ...circularForm, responsibilities: circularForm.responsibilities.filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeCircularModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={createCircularMutation.isPending || updateCircularMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {(createCircularMutation.isPending || updateCircularMutation.isPending) && <Loader2 size={14} className="animate-spin" />}
                  {circularEditItem ? (updateCircularMutation.isPending ? "Updating..." : "Update Circular") : (createCircularMutation.isPending ? "Publishing..." : "Publish Circular")}
                </button>
              </div>
            </form>
          </Modal>

          <ConfirmDialog open={!!circularDeleteItem} onClose={() => setCircularDeleteItem(null)} onConfirm={() => deleteCircularMutation.mutate(circularDeleteItem._id)} title="Delete Circular?" message={`Delete circular "${circularDeleteItem?.title}"?`} loading={deleteCircularMutation.isPending} />
        </>
      )}
    </div>
  );
};

export default Careers;
