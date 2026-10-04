import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", sortOrder: 0, audience: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-categories", page, search, audienceFilter],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      if (audienceFilter) params.append("audience", audienceFilter);
      const { data } = await api.get(`/categories?${params}`);
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (body) => api.post("/categories", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category created");
      closeModal();
    },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/categories/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category updated");
      closeModal();
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category deleted");
      setDeleteItem(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const openCreate = () => { setEditItem(null); setForm({ name: "", description: "", sortOrder: 0, audience: "" }); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, description: item.description || "", sortOrder: item.sortOrder || 0, audience: item.audience || "" }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");
    if (editItem) updateMutation.mutate({ id: editItem._id, body: form });
    else createMutation.mutate(form);
  };

  const categories = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "name", label: "Name", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "audience", label: "Audience", render: (v) => {
      const map = { men: "Men's Wear", women: "Women's Wear", kids: "Kids' Wear" };
      return v ? <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{map[v] || v}</span> : <span className="text-gray-400 text-xs">All</span>;
    }},
    { key: "slug", label: "Slug", render: (v) => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{v}</code> },
    { key: "sortOrder", label: "Order" },
    {
      key: "isActive",
      label: "Active",
      render: (v) => (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${v ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
          {v ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total categories</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <label className="text-xs font-medium text-gray-500">Filter by Audience:</label>
        <select
          value={audienceFilter}
          onChange={(e) => setAudienceFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
        >
          <option value="">All Audiences</option>
          <option value="men">Men's Wear</option>
          <option value="women">Women's Wear</option>
          <option value="kids">Kids' Wear</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        total={meta?.total}
        page={page}
        limit={20}
        totalPages={meta?.totalPages}
        onPageChange={setPage}
        onSearch={setSearch}
        loading={isLoading}
        emptyMessage="No categories found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <Modal open={modalOpen} onClose={closeModal} title={editItem ? "Edit Category" : "New Category"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Audience</label>
            <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black">
              <option value="">All Audiences (Global)</option>
              <option value="men">Men's Wear</option>
              <option value="women">Women's Wear</option>
              <option value="kids">Kids' Wear</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Leave empty for global categories, or select an audience to filter in product forms</p>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => deleteMutation.mutate(deleteItem._id)}
        title="Delete Category?"
        message={`Delete "${deleteItem?.name}"? Products using this category will not be affected.`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default Categories;
