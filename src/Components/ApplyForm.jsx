import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Upload, X, Loader2 } from "lucide-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const ApplyForm = ({ initialPosition = "", compact = false }) => {
  const fileInputRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: initialPosition, coverLetter: "", experience: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialPosition) {
      setForm((prev) => ({ ...prev, position: initialPosition }));
    }
  }, [initialPosition]);

  const submitMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post("/careers", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setForm({ name: "", email: "", phone: "", position: initialPosition, coverLetter: "", experience: "" });
      setResumeFile(null);
      setErrors({});
    },
    onError: (err) => toast.error(err.response?.data?.message || "Submission failed"),
  });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.position.trim()) newErrors.position = "Position is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("position", form.position);
    if (form.coverLetter) formData.append("coverLetter", form.coverLetter);
    if (form.experience) formData.append("experience", form.experience);
    if (resumeFile) formData.append("file", resumeFile);

    submitMutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border-b text-sm bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 ${
      errors[field] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <form onSubmit={handleSubmit} className={compact ? "" : "max-w-2xl mx-auto"} noValidate>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-0 md:gap-x-8">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Full Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass("name")} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass("email")} placeholder="john@example.com" />
            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0 md:gap-x-8">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Phone *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+880 1XXX XXXXXXX" />
            {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Desired Position *</label>
            <input type="text" name="position" value={form.position} onChange={handleChange} className={inputClass("position")} placeholder="e.g. Quality Manager" />
            {errors.position && <p className="text-red-500 text-[10px] mt-1">{errors.position}</p>}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Years of Experience</label>
          <input type="text" name="experience" value={form.experience} onChange={handleChange} className={inputClass("experience")} placeholder="e.g. 5 years in garment manufacturing" />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Cover Letter</label>
          <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={4} className={`${inputClass("coverLetter")} resize-none`} placeholder="Tell us about yourself and why you'd be a great fit..." />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Upload CV</label>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} className="hidden" />
          {resumeFile ? (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100">
              <span className="text-sm text-gray-600 truncate">{resumeFile.name}</span>
              <button type="button" onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-gray-400 hover:text-red-500">
                <X size={14} />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 px-4 py-7 flex flex-col items-center gap-2 hover:border-gray-400 transition-colors">
              <Upload size={18} className="text-gray-300" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Click to upload CV (PDF, DOC)</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={submitMutation.isPending}
          className="w-full bg-black text-white py-3.5 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitMutation.isPending && <Loader2 size={14} className="animate-spin" />}
          {submitMutation.isPending ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default ApplyForm;
