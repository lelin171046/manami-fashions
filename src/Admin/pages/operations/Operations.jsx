import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import toast from "react-hot-toast";

const Operations = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ title: "", description: "", step: 1, details: [], icon: "", image: null });
  const [detailInput, setDetailInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-operations"],
    queryFn: async () => {
      const { data } = await api.get("/operations");
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (body) => api.post("/operations", body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-operations"] }); toast.success("Operation created"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/operations/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-operations"] }); toast.success("Operation updated"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/operations/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-operations"] }); toast.success("Deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const openCreate = () => { setEditItem(null); setForm({ title: "", description: "", step: (data?.data?.length || 0) + 1, details: [], icon: "", image: null }); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ title: item.title, description: item.description, step: item.step, details: item.details || [], icon: item.icon || "", image: item.image || null }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return toast.error("Title and description are required");
    const body = { ...form, image: form.image || undefined };
    if (editItem) updateMutation.mutate({ id: editItem._id, body });
    else createMutation.mutate(body);
  };

  const addDetail = () => { if (detailInput.trim()) { setForm({ ...form, details: [...form.details, detailInput.trim()] }); setDetailInput(""); } };

  const ops = data?.data || [];

  const filteredOps = useMemo(() => {
    if (!searchTerm) return ops;
    const q = searchTerm.toLowerCase();
    return ops.filter((op) =>
      op.title.toLowerCase().includes(q) ||
      op.description.toLowerCase().includes(q) ||
      String(op.step).includes(q)
    );
  }, [ops, searchTerm]);

  const columns = [
    { key: "step", label: "Step", render: (v) => <span className="inline-flex items-center justify-center w-7 h-7 bg-zinc-900 text-white rounded-full text-xs font-bold">{v}</span> },
    { key: "image", label: "Image", render: (v, row) => v?.url ? <img src={v.url} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" /> : <span className="text-xs text-gray-300">—</span> },
    { key: "title", label: "Title", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "description", label: "Description", render: (v) => <span className="truncate block max-w-[260px] text-gray-500">{v}</span> },
    { key: "details", label: "Details", render: (v) => <span className="text-xs text-gray-400">{v?.length || 0} items</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operations</h1>
          <p className="text-sm text-gray-400 mt-1">{ops.length} total steps</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Step
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by title, description or step..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
        />
      </div>

      <DataTable columns={columns} data={filteredOps} emptyMessage={searchTerm ? "No matching steps" : "No operations found"}
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <Modal open={modalOpen} onClose={closeModal} title={editItem ? "Edit Operation" : "New Operation"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Step Number *</label>
              <input type="number" min={1} max={20} value={form.step} onChange={(e) => setForm({ ...form, step: parseInt(e.target.value) || 1 })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Icon Name</label>
              <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. Scissors, Ruler" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Image</label>
            <ImageUpload value={form.image} onChange={(img) => setForm({ ...form, image: img })} folder="operations" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Details</label>
            <div className="flex gap-2 mb-2">
              <input value={detailInput} onChange={(e) => setDetailInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Add a detail line" />
              <button type="button" onClick={addDetail} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
            </div>
            <div className="space-y-1">
              {form.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-400 w-4">{i + 1}.</span>
                  <span className="flex-1 text-sm text-gray-600">{d}</span>
                  <button type="button" onClick={() => setForm({ ...form, details: form.details.filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Operation?" message={`Delete step ${deleteItem?.step}: "${deleteItem?.title}"?`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default Operations;
