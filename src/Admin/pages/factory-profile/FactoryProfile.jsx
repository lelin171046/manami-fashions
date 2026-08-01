import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../../../api/axios.js";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const FactoryProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["factory-profile"],
    queryFn: async () => {
      const { data } = await api.get("/factory-profile");
      return data.data;
    },
  });

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      companyName: "", businessType: "", legalStatus: "", yearEstablished: "",
      incorporationNumber: "", binNumber: "", tinNumber: "", bgmeaRegistration: "",
      directors: [], addresses: [], contact: {}, bankInformation: {},
      productionCapacity: "", machinery: "", annualTurnover: "",
      certifications: [], tags: [], factoryImage: null,
    },
  });

  // Reset form when profile loads
  if (profile && !watch("companyName") && profile.companyName) {
    reset({
      companyName: profile.companyName || "",
      businessType: profile.businessType || "",
      legalStatus: profile.legalStatus || "",
      yearEstablished: profile.yearEstablished || "",
      incorporationNumber: profile.incorporationNumber || "",
      binNumber: profile.binNumber || "",
      tinNumber: profile.tinNumber || "",
      bgmeaRegistration: profile.bgmeaRegistration || "",
      directors: profile.directors || [],
      addresses: profile.addresses || [],
      contact: profile.contact || {},
      bankInformation: profile.bankInformation || {},
      productionCapacity: profile.productionCapacity || "",
      machinery: profile.machinery || "",
      annualTurnover: profile.annualTurnover || "",
      certifications: profile.certifications || [],
      tags: profile.tags || [],
      factoryImage: profile.factoryImage || null,
    });
  }

  const mutation = useMutation({
    mutationFn: (body) => api.put("/factory-profile", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["factory-profile"] });
      toast.success("Profile saved");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Save failed"),
  });

  const tags = watch("tags") || [];
  const [tagInput, setTagInput] = useState("");
  const addTag = () => { if (tagInput.trim()) { setValue("tags", [...tags, tagInput.trim()]); setTagInput(""); } };

  const onSubmit = (data) => mutation.mutate(data);

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Factory Profile</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your company information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Company Name *</label>
              <input {...register("companyName", { required: "Required" })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Business Type</label>
              <input {...register("businessType")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. Manufacturer" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Legal Status</label>
              <input {...register("legalStatus")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Year Established</label>
              <input type="number" {...register("yearEstablished")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
          </div>
        </div>

        {/* Registration Numbers */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Registration Numbers</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Incorporation Number</label>
              <input {...register("incorporationNumber")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">BIN Number</label>
              <input {...register("binNumber")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">TIN Number</label>
              <input {...register("tinNumber")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">BGMEA Registration</label>
              <input {...register("bgmeaRegistration")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
            </div>
          </div>
        </div>

        {/* Production */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Production Details</h2>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Production Capacity</label>
            <input {...register("productionCapacity")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" placeholder="e.g. 50,000 pieces/month" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Machinery</label>
            <input {...register("machinery")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Annual Turnover</label>
            <input {...register("annualTurnover")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black" />
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Tags</h2>
          <div className="flex gap-2">
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

        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Factory Image</h2>
          <ImageUpload value={watch("factoryImage")} onChange={(img) => setValue("factoryImage", img)} folder="factory" />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={mutation.isPending} className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">
            {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default FactoryProfile;
