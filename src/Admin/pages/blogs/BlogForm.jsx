import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../../../api/axios.js";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const BlogForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: { title: "", content: "", excerpt: "", tags: [], coverImage: null, isPublished: false },
  });

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => { const { data } = await api.get(`/blogs/${id}`); return data.data; },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title || "",
        content: existing.content || "",
        excerpt: existing.excerpt || "",
        tags: existing.tags || [],
        coverImage: existing.coverImage || null,
        isPublished: existing.isPublished || false,
      });
    }
  }, [existing, reset]);

  const mutation = useMutation({
    mutationFn: (formData) => isEdit ? api.put(`/blogs/${id}`, formData) : api.post("/blogs", formData),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success(isEdit ? "Blog updated" : "Blog created"); navigate("/admin/blogs"); },
    onError: (err) => toast.error(err.response?.data?.message || "Save failed"),
  });

  const tags = watch("tags") || [];
  const [tagInput, setTagInput] = useState("");
  const addTag = () => { if (tagInput.trim()) { setValue("tags", [...tags, tagInput.trim()]); setTagInput(""); } };

  const onSubmit = (data) => mutation.mutate(data);

  if (loadingExisting) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate("/admin/blogs")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors">
        <ArrowLeft size={16} /> Back to Blogs
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? "Edit Blog" : "New Blog"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Title *</label>
          <input {...register("title", { required: "Title is required" })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Excerpt</label>
          <textarea {...register("excerpt")} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Content *</label>
          <textarea {...register("content", { required: "Content is required" })} rows={12} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-y" />
          {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Tags</label>
          <div className="flex gap-2 mb-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Add a tag" />
            <button type="button" onClick={addTag} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {t} <button type="button" onClick={() => setValue("tags", tags.filter((_, idx) => idx !== i))} className="hover:text-red-500"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Cover Image</label>
          <ImageUpload value={watch("coverImage")} onChange={(img) => setValue("coverImage", img)} folder="blogs" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register("isPublished")} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/5" />
          <span className="text-sm font-medium text-gray-700">Publish immediately</span>
        </label>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={() => navigate("/admin/blogs")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={mutation.isPending} className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">
            {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
