import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Blogs = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append("search", search);
      const { data } = await api.get(`/blogs?${params}`);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/blogs/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success("Blog deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }) => api.put(`/blogs/${id}`, { isPublished: !isPublished }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success("Publish status updated"); },
  });

  const blogs = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "title", label: "Title", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "author", label: "Author", render: (v) => v?.name || "—" },
    { key: "tags", label: "Tags", render: (v) => (
      <div className="flex flex-wrap gap-1">{(v || []).slice(0, 2).map((t, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-500">{t}</span>)}{v?.length > 2 && <span className="text-[10px] text-gray-400">+{v.length - 2}</span>}</div>
    )},
    { key: "views", label: "Views" },
    { key: "isPublished", label: "Published", render: (v, row) => (
      <button onClick={() => publishMutation.mutate({ id: row._id, isPublished: v })} className="p-1 rounded hover:bg-gray-100 transition-colors">
        {v ? <Eye size={16} className="text-emerald-500" /> : <EyeOff size={16} className="text-gray-300" />}
      </button>
    )},
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total blogs</p>
        </div>
        <Link to="/admin/blogs/new" className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
          <Plus size={16} /> New Blog
        </Link>
      </div>

      <DataTable columns={columns} data={blogs} total={meta?.total} page={page} limit={20} totalPages={meta?.totalPages} onPageChange={setPage} onSearch={setSearch} loading={isLoading} emptyMessage="No blogs found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <Link to={`/admin/blogs/${row._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"><Pencil size={14} /></Link>
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Blog?" message={`Delete "${deleteItem?.title}"?`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default Blogs;
