import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Filter, X, Search } from "lucide-react";
import toast from "react-hot-toast";

const Products = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products", page, search, audienceFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 12 });
      if (search) params.append("search", search);
      if (audienceFilter) params.append("audience", audienceFilter);
      if (statusFilter) params.append("status", statusFilter);
      const { data } = await api.get(`/products?${params}`);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
      setDeleteItem(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => api.patch(`/products/${id}/featured`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/products/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Status updated");
    },
  });

  const products = data?.data || [];
  const meta = data?.meta;

  const hasActiveFilters = audienceFilter || statusFilter;

  const columns = [
    {
      key: "images",
      label: "",
      render: (_, row) => (
        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          {row.images?.[0]?.url ? <img src={row.images[0].url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>}
        </div>
      ),
    },
    { key: "name", label: "Product Name", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "audience", label: "Audience", render: (v) => {
      const map = { men: "Men's Wear", women: "Women's Wear", kids: "Kids' Wear" };
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{map[v] || v}</span>;
    }},
    { key: "productType", label: "Product Type", render: (v) => v || <span className="text-gray-400">—</span> },
    { key: "category", label: "Category", render: (v) => v?.name || "—" },
    { key: "fabric", label: "Fabric" },
    {
      key: "status",
      label: "Status",
      render: (v, row) => (
        <select
          value={v}
          onChange={(e) => statusMutation.mutate({ id: row._id, status: e.target.value })}
          className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border-0 cursor-pointer ${
            v === "active" ? "bg-emerald-50 text-emerald-600" : v === "draft" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (v, row) => (
        <button onClick={() => toggleMutation.mutate(row._id)} className="p-1 rounded hover:bg-gray-100 transition-colors">
          {v ? <Star size={16} className="text-amber-400 fill-amber-400" /> : <Star size={16} className="text-gray-300" />}
        </button>
      ),
    },
    {
      key: "sortOrder",
      label: "Sort",
      render: (v) => <span className="text-gray-500 font-mono">{v ?? 0}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total products</p>
        </div>
        <Link to="/admin/products/new" className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex-1 min-w-[200px]">
          <label className="sr-only">Search products</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, type, category..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500">Audience:</label>
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

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => { setAudienceFilter(""); setStatusFilter(""); }}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={products}
        total={meta?.total}
        page={page}
        limit={12}
        totalPages={meta?.totalPages}
        onPageChange={setPage}
        onSearch={setSearch}
        loading={isLoading}
        emptyMessage="No products found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <Link to={`/admin/products/${row._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600">
              <Pencil size={14} />
            </Link>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500">
              <Trash2 size={14} />
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => deleteMutation.mutate(deleteItem._id)}
        title="Delete Product?"
        message={`Delete "${deleteItem?.name || deleteItem?.title}"? This cannot be undone.`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default Products;
