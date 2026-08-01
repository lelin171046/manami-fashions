import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../../../api/axios.js";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "", category: "", description: "", fabric: "", gsm: "", moq: "",
      sizes: [], colors: [], featured: false, status: "active", images: [],
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories-select"],
    queryFn: async () => {
      const { data } = await api.get("/categories?limit=100");
      return data.data;
    },
  });

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title || "",
        category: existing.category?._id || "",
        description: existing.description || "",
        fabric: existing.fabric || "",
        gsm: existing.gsm || "",
        moq: existing.moq || "",
        sizes: existing.sizes || [],
        colors: existing.colors || [],
        featured: existing.featured || false,
        status: existing.status || "active",
        images: existing.images || [],
      });
    }
  }, [existing, reset]);

  const mutation = useMutation({
    mutationFn: (formData) =>
      isEdit ? api.put(`/products/${id}`, formData) : api.post("/products", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(isEdit ? "Product updated" : "Product created");
      navigate("/admin/products");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Save failed"),
  });

  const [sizeInput, setSizeInput] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");
  const sizes = watch("sizes") || [];
  const colors = watch("colors") || [];
  const images = watch("images") || [];

  const addSize = () => {
    if (sizeInput.trim()) {
      setValue("sizes", [...sizes, sizeInput.trim()]);
      setSizeInput("");
    }
  };
  const removeSize = (i) => setValue("sizes", sizes.filter((_, idx) => idx !== i));

  const addColor = () => {
    if (colorName.trim()) {
      setValue("colors", [...colors, { name: colorName.trim(), hex: colorHex }]);
      setColorName("");
    }
  };
  const removeColor = (i) => setValue("colors", colors.filter((_, idx) => idx !== i));

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (loadingExisting) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate("/admin/products")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? "Edit Product" : "New Product"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Title *</label>
          <input {...register("title", { required: "Title is required" })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Category *</label>
          <select {...register("category", { required: "Category is required" })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black">
            <option value="">Select category</option>
            {categories?.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
          <textarea {...register("description")} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Fabric</label>
            <input {...register("fabric")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. Cotton" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">GSM</label>
            <input {...register("gsm")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. 180" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">MOQ</label>
            <input {...register("moq")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. 500 pcs" />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Sizes</label>
          <div className="flex gap-2 mb-2">
            <input value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. S, M, L, XL" />
            <button type="button" onClick={addSize} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {s} <button type="button" onClick={() => removeSize(i)} className="hover:text-red-500"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Colors</label>
          <div className="flex gap-2 mb-2">
            <input value={colorName} onChange={(e) => setColorName(e.target.value)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="Color name" />
            <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
            <button type="button" onClick={addColor} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                <span className="w-3 h-3 rounded-full border border-gray-200" style={{ background: c.hex }} />
                {c.name}
                <button type="button" onClick={() => removeColor(i)} className="hover:text-red-500"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Images</label>
          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img.url} alt="" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                <button type="button" onClick={() => setValue("images", images.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"><X size={10} /></button>
              </div>
            ))}
            <ImageUpload
              folder="products"
              onChange={(img) => { if (img) setValue("images", [...images, img]); }}
              className="inline-block"
            />
          </div>
        </div>

        {/* Status + Featured */}
        <div className="flex items-center gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Status</label>
            <select {...register("status")} className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black">
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <label className="flex items-center gap-2 mt-5 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/5" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={mutation.isPending} className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">
            {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
