import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.js";
import DataTable from "../../components/ui/DataTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { Trash2, Mail, UserCheck, UserX } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [deleteItem, setDeleteItem] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-newsletter", page],
    queryFn: async () => {
      const { data } = await api.get(`/newsletter?page=${page}&limit=30`);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/newsletter/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-newsletter"] }); toast.success("Deleted"); setDeleteItem(null); },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  const subscribers = data?.data || [];
  const meta = data?.meta;

  const columns = [
    { key: "email", label: "Email", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "isSubscribed", label: "Status", render: (v) => (
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${v ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
        {v ? "Subscribed" : "Unsubscribed"}
      </span>
    )},
    { key: "subscribedAt", label: "Subscribed", render: (v) => v ? new Date(v).toLocaleDateString() : "—" },
    { key: "unsubscribedAt", label: "Unsubscribed", render: (v) => v ? new Date(v).toLocaleDateString() : "—" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
        <p className="text-sm text-gray-400 mt-1">{meta?.total || 0} total subscribers</p>
      </div>

      <DataTable columns={columns} data={subscribers} total={meta?.total} page={page} limit={30} totalPages={meta?.totalPages} onPageChange={setPage} loading={isLoading} emptyMessage="No subscribers found"
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => setDeleteItem(row)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      />

      <ConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => deleteMutation.mutate(deleteItem._id)} title="Delete Subscriber?" message={`Remove "${deleteItem?.email}"?`} loading={deleteMutation.isPending} />
    </div>
  );
};

export default Newsletter;
