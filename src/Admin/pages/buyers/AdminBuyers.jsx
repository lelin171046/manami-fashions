import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { Plus, Pencil, Trash2, Star, ExternalLink, X, ChevronDown, ChevronUp, Grid, List, MapPin, Calendar, Tag, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const AdminBuyers = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [view, setView] = useState("table");
  const [form, setForm] = useState({
    name: "",
    country: "",
    partnershipYear: "",
    description: "",
    featured: false,
    logo: null,
    stats: [{ label: "", value: "" }],
    orderCategories: [""],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-buyer-maps", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      const { data } = await api.get(`/buyer-maps?${params}`);
      return data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => api.patch(`/buyer-maps/${id}/toggle-featured`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-buyer-maps"] }),
  });

  const createMutation = useMutation({
    mutationFn: (body) => api.post("/buyer-maps", body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyer-maps"] }); toast.success("Buyer created"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/buyer-maps/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyer-maps"] }); toast.success("Buyer updated"); closeModal(); },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/buyer-maps/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyer-maps"] }); toast.success("Buyer deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const seedMutation = useMutation({
    mutationFn: () => api.post("/buyer-maps/seed"),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-buyer-maps"] }); toast.success("Sample buyers seeded"); },
    onError: (err) => toast.error(err.response?.data?.message || "Seed failed"),
  });

  const openCreate = () => { 
    setEditItem(null); 
    setForm({ 
      name: "", 
      country: "", 
      partnershipYear: "", 
      description: "", 
      featured: false, 
      logo: null, 
      stats: [{ label: "", value: "" }], 
      orderCategories: [""] 
    }); 
    setModalOpen(true); 
  };
  
  const openEdit = (item) => { 
    setEditItem(item); 
    setForm({ 
      name: item.name, 
      country: item.country || "", 
      partnershipYear: item.partnershipYear || "", 
      description: item.description || "", 
      featured: item.featured, 
      logo: item.logo || null, 
      stats: item.stats?.length ? item.stats : [{ label: "", value: "" }], 
      orderCategories: item.orderCategories?.length ? item.orderCategories : [""] 
    }); 
    setModalOpen(true); 
  };
  
  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  const addStat = () => setForm({ ...form, stats: [...form.stats, { label: "", value: "" }] });
  const removeStat = (index) => {
    if (form.stats.length <= 1) return;
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };
  const updateStat = (index, field, value) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm({ ...form, stats: newStats });
  };

  const addCategory = () => setForm({ ...form, orderCategories: [...form.orderCategories, ""] });
  const removeCategory = (index) => {
    if (form.orderCategories.length <= 1) return;
    setForm({ ...form, orderCategories: form.orderCategories.filter((_, i) => i !== index) });
  };
  const updateCategory = (index, value) => {
    const newCategories = [...form.orderCategories];
    newCategories[index] = value;
    setForm({ ...form, orderCategories: newCategories });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Buyer name is required");
    if (!form.country.trim()) return toast.error("Country is required");
    
    const body = { 
      name: form.name, 
      country: form.country, 
      featured: form.featured,
      partnershipYear: form.partnershipYear,
      description: form.description,
      stats: form.stats.filter(s => s.label.trim() || s.value.trim()),
      orderCategories: form.orderCategories.filter(c => c.trim()),
    };
    
    if (form.logo) body.logo = form.logo;
    if (editItem) updateMutation.mutate({ id: editItem._id, body });
    else createMutation.mutate(body);
  };

  const buyers = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "name", label: "Brand", render: (v, row) => (
      <div className="flex items-center gap-3">
        {row.logo?.url && <img src={row.logo.url} alt={v} className="w-8 h-8 object-contain rounded" />}
        <span className="font-medium text-gray-900">{v}</span>
      </div>
    )},
    { key: "country", label: "Country", render: (v) => <span className="flex items-center gap-1"><MapPin size={12} className="text-gray-400" />{v}</span> },
    { key: "partnershipYear", label: "Partnership", render: (v) => <span className="flex items-center gap-1"><Calendar size={12} className="text-gray-400" />{v}</span> },
    { key: "featured", label: "Featured", render: (v, row) => (
      <button onClick={() => toggleMutation.mutate(row._id)} className="p-1 rounded hover:bg-gray-100 transition-colors" aria-label={v ? "Remove from featured" : "Add to featured"}>
        {v ? <Star size={16} className="text-amber-400 fill-amber-400" /> : <Star size={16} className="text-gray-300" />}
      </button>
    )},
    { key: "stats", label: "Metrics", render: (v) => (
      <span className="text-sm text-gray-500">{v?.length || 0} metrics</span>
    )},
    { key: "orderCategories", label: "Categories", render: (v) => (
      <div className="flex flex-wrap gap-1">
        {v?.slice(0, 3).map((cat, i) => <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{cat}</span>)}
        {v && v.length > 3 && <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-400 rounded-full">+{v.length - 3} more</span>}
      </div>
    )},
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Buyer Partnerships</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total partners</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={seedMutation.mutate} 
            disabled={seedMutation.isPending}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Seed Sample Data
          </button>
          <button onClick={openCreate} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
            <Plus size={16} /> Add Buyer
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setView("table")} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${view === "table" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          <List size={14} className="inline-block" />
        </button>
        <button onClick={() => setView("grid")} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${view === "grid" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          <Grid size={14} className="inline-block" />
        </button>
      </div>

      {view === "table" ? (
        <DataTable 
          columns={columns} 
          data={buyers} 
          total={meta?.total} 
          page={page} 
          limit={20} 
          totalPages={meta?.totalPages} 
          onPageChange={setPage} 
          onSearch={setSearch} 
          loading={isLoading} 
          emptyMessage="No buyers found"
          actions={(row) => (
            <div className="flex items-center justify-end gap-1">
              <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600" aria-label="Edit"><Pencil size={14} /></button>
              <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500" aria-label="Delete"><Trash2 size={14} /></button>
            </div>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {buyers.map((buyer) => (
            <div key={buyer._id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {buyer.logo?.url && <img src={buyer.logo.url} alt={buyer.name} className="w-10 h-10 object-contain rounded" />}
                  <div>
                    <h3 className="font-semibold text-gray-900">{buyer.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{buyer.country}</p>
                  </div>
                </div>
                {buyer.featured && <Star size={16} className="text-amber-400 fill-amber-400" />}
              </div>
              {buyer.partnershipYear && <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Calendar size={10} />{buyer.partnershipYear}</p>}
              <div className="flex flex-wrap gap-1 mt-3">
                {buyer.orderCategories?.slice(0, 4).map((cat, i) => <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{cat}</span>)}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">{buyer.stats?.length || 0} metrics</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(buyer)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600"><Pencil size={12} /></button>
                  <button onClick={() => setDeleteItem(buyer)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={closeModal} title={editItem ? "Edit Buyer Partnership" : "New Buyer Partnership"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Buyer Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., H&M, Zara, Target" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Country *</label>
              <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="e.g., Sweden, Spain, USA" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Partnership Year</label>
              <input value={form.partnershipYear} onChange={(e) => setForm({ ...form, partnershipYear: e.target.value })} placeholder="e.g., Since 2018" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Logo</label>
              <ImageUpload value={form.logo} onChange={(img) => setForm({ ...form, logo: img })} folder="buyer-maps" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Short overview of the client partnership..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Key Metrics (Stats)</label>
              <button type="button" onClick={addStat} className="text-xs text-black hover:text-gray-700 font-medium flex items-center gap-1"><Plus size={12} /> Add Metric</button>
            </div>
            <div className="space-y-2">
              {form.stats.map((stat, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <label className="sr-only">Metric Label</label>
                    <input value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} placeholder="Label (e.g., Annual Volume)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                  </div>
                  <div className="flex-1">
                    <label className="sr-only">Metric Value</label>
                    <input value={stat.value} onChange={(e) => updateStat(index, "value", e.target.value)} placeholder="Value (e.g., 2.5M pcs)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
                  </div>
                  {form.stats.length > 1 && (
                    <button type="button" onClick={() => removeStat(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" aria-label="Remove metric">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Order Categories</label>
              <button type="button" onClick={addCategory} className="text-xs text-black hover:text-gray-700 font-medium flex items-center gap-1"><Plus size={12} /> Add Category</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.orderCategories.map((cat, index) => (
                <div key={index} className="flex items-center gap-1">
                  <input value={cat} onChange={(e) => updateCategory(index, e.target.value)} placeholder="Category" className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black min-w-[150px]" />
                  {form.orderCategories.length > 1 && (
                    <button type="button" onClick={() => removeCategory(index)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" aria-label="Remove category">
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/5" />
            <span className="text-sm font-medium text-gray-700">Featured (highlight on homepage)</span>
          </label>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
              {editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Buyer Partnership?" message={`Delete "${deleteItem?.name}"? This action cannot be undone.`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default AdminBuyers;