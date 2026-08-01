import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = [
  { value: "factory", label: "Factory" },
  { value: "team", label: "Team" },
  { value: "events", label: "Events" },
  { value: "production", label: "Production" },
];

const Gallery = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: "factory", image: null });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-gallery", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      const { data } = await api.get(`/gallery?${params}`);
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (body) => api.post("/gallery", body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Gallery item created"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/gallery/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Gallery item updated"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/gallery/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const openCreate = () => { setEditItem(null); setForm({ title: "", description: "", category: "factory", image: null }); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ title: item.title, description: item.description || "", category: item.category, image: item.image || null }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.image?.url && !editItem) return toast.error("Image is required");
    if (editItem) updateMutation.mutate({ id: editItem._id, body: form });
    else createMutation.mutate(form);
  };

  const items = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "image", label: "", render: (_, row) => (
      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
        {row.image?.url ? <img src={row.image.url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>}
      </div>
    )},
    { key: "title", label: "Title", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "category", label: "Category", render: (v) => <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium capitalize">{v}</span> },
    { key: "description", label: "Description", render: (v) => <span className="truncate block max-w-[200px]">{v || "—"}</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total items</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <DataTable columns={columns} data={items} total={meta?.total} page={page} limit={20} totalPages={meta?.totalPages} onPageChange={setPage} onSearch={setSearch} loading={isLoading} emptyMessage="No gallery items found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <Modal open={modalOpen} onClose={closeModal} title={editItem ? "Edit Gallery Item" : "New Gallery Item"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black">
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Image *</label>
            <ImageUpload value={form.image} onChange={(img) => setForm({ ...form, image: img })} folder="gallery" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Gallery Item?" message={`Delete "${deleteItem?.title}"?`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default Gallery;
