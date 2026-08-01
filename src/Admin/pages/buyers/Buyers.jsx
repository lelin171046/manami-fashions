import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { Plus, Pencil, Trash2, Star, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

const Buyers = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ brandName: "", country: "", featured: false, logo: null });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-buyers", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      const { data } = await api.get(`/buyers?${params}`);
      return data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => api.patch(`/buyers/${id}/featured`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-buyers"] }),
  });

  const createMutation = useMutation({
    mutationFn: (body) => api.post("/buyers", body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyers"] }); toast.success("Buyer created"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/buyers/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyers"] }); toast.success("Buyer updated"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/buyers/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyers"] }); toast.success("Buyer deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const openCreate = () => { setEditItem(null); setForm({ brandName: "", country: "", featured: false, logo: null }); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ brandName: item.brandName,  country: item.country || "", featured: item.featured, logo: item.logo || null }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.brandName.trim()) return toast.error("Brand name is required");
    const body = { brandName: form.brandName, featured: form.featured };
   
    if (form.country?.trim()) body.country = form.country;
    if (form.logo) body.logo = form.logo;
    if (editItem) updateMutation.mutate({ id: editItem._id, body });
    else createMutation.mutate(body);
  };

  const buyers = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "brandName", label: "Brand", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "country", label: "Country" },
    { key: "featured", label: "Featured", render: (v, row) => (
      <button onClick={() => toggleMutation.mutate(row._id)} className="p-1 rounded hover:bg-gray-100 transition-colors">
        {v ? <Star size={16} className="text-amber-400 fill-amber-400" /> : <Star size={16} className="text-gray-300" />}
      </button>
    )},
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyers</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total buyers</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Buyer
        </button>
      </div>

      <DataTable columns={columns} data={buyers} total={meta?.total} page={page} limit={20} totalPages={meta?.totalPages} onPageChange={setPage} onSearch={setSearch} loading={isLoading} emptyMessage="No buyers found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <Modal open={modalOpen} onClose={closeModal} title={editItem ? "Edit Buyer" : "New Buyer"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Brand Name *</label>
            <input value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
        
           
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Country</label>
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Logo</label>
            <ImageUpload value={form.logo} onChange={(img) => setForm({ ...form, logo: img })} folder="buyers" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/5" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Buyer?" message={`Delete "${deleteItem?.brandName}"?`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default Buyers;
