import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const TYPES = [
  { value: "compliance", label: "Compliance" },
  { value: "quality", label: "Quality" },
  { value: "sustainability", label: "Sustainability" },
];

const Certifications = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", issuer: "", type: "compliance", credentialId: "", skills: [], logo: null });
  const [skillInput, setSkillInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-certs", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      const { data } = await api.get(`/certifications?${params}`);
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (body) => api.post("/certifications", body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-certs"] }); toast.success("Certification created"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/certifications/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-certs"] }); toast.success("Certification updated"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/certifications/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-certs"] }); toast.success("Deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const openCreate = () => { setEditItem(null); setForm({ name: "", description: "", issuer: "", type: "compliance", credentialId: "", skills: [], logo: null }); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, description: item.description || "", issuer: item.issuer || "", type: item.type, credentialId: item.credentialId || "", skills: item.skills || [], logo: item.logo || null }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");
    if (editItem) updateMutation.mutate({ id: editItem._id, body: form });
    else createMutation.mutate(form);
  };

  const addSkill = () => { if (skillInput.trim()) { setForm({ ...form, skills: [...form.skills, skillInput.trim()] }); setSkillInput(""); } };

  const certs = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "name", label: "Name", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "type", label: "Type", render: (v) => <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium capitalize">{v}</span> },
    { key: "issuer", label: "Issuer" },
    { key: "credentialId", label: "Credential ID", render: (v) => v ? <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{v}</code> : "—" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total certifications</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Certification
        </button>
      </div>

      <DataTable columns={columns} data={certs} total={meta?.total} page={page} limit={20} totalPages={meta?.totalPages} onPageChange={setPage} onSearch={setSearch} loading={isLoading} emptyMessage="No certifications found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <Modal open={modalOpen} onClose={closeModal} title={editItem ? "Edit Certification" : "New Certification"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black">
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Issuer</label>
              <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Credential ID</label>
              <input value={form.credentialId} onChange={(e) => setForm({ ...form, credentialId: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Skills</label>
            <div className="flex gap-2 mb-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Add a skill" />
              <button type="button" onClick={addSkill} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.skills.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {s} <button type="button" onClick={() => setForm({ ...form, skills: form.skills.filter((_, idx) => idx !== i) })} className="hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Logo</label>
            <ImageUpload value={form.logo} onChange={(img) => setForm({ ...form, logo: img })} folder="certifications" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Certification?" message={`Delete "${deleteItem?.name}"?`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default Certifications;
