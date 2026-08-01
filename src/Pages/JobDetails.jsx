import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Briefcase, Loader2, ArrowLeft, Users, MapPin, Clock, Banknote,
  Building2, CheckCircle2,
} from "lucide-react";
import api from "../api/axios.js";

const TYPE_LABELS = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: circulars, isLoading, isError } = useQuery({
    queryKey: ["public-circulars"],
    queryFn: async () => {
      const { data } = await api.get("/job-circulars/public");
      return data.data;
    },
  });

  const job = useMemo(() => circulars?.find((c) => c._id === id) || null, [circulars, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-16 pb-24 flex items-center justify-center">
        <Loader2 size={24} className="text-gray-300 animate-spin" />
      </div>
    );
  }

  if (isError || (!isLoading && !job)) {
    return (
      <div className="min-h-screen bg-white pt-16 pb-24 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Briefcase size={40} className="text-gray-200 mx-auto mb-6" />
          <h1 className="text-2xl font-bold uppercase tracking-tight mb-3">Position not found</h1>
          <p className="text-sm text-gray-400 mb-8">This job circular may have expired or been removed.</p>
          <Link
            to="/#work-with-us"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white bg-black px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={14} /> Browse Open Positions
          </Link>
        </div>
      </div>
    );
  }

  const deadlineDate = job.deadline ? new Date(job.deadline) : null;

  const handleApply = () => {
    const params = new URLSearchParams();
    if (job.title) params.set("position", job.title);
    if (job.department) params.set("department", job.department);
    navigate(`/careers?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 px-6 md:px-20 font-sans text-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#work-with-us"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to Careers
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 bg-black text-white">
              {TYPE_LABELS[job.type] || job.type}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500">
              <Users size={12} /> {job.vacancies ?? 1} {job.vacancies === 1 ? "Vacancy" : "Vacancies"}
            </span>
            {job.department && (
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500">
                <Building2 size={12} /> {job.department}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-[1.05] mb-6">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-gray-400">
            {job.location && (
              <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                <MapPin size={13} /> {job.location}
              </span>
            )}
            {job.salary && (
              <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                <Banknote size={13} /> {job.salary}
              </span>
            )}
            {deadlineDate && (
              <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                <Clock size={13} /> Application Deadline: {deadlineDate.toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="border-t border-gray-100 pt-10 space-y-10">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Job Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            {job.requirements?.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 size={16} className="text-black mt-0.5 shrink-0" />
                      <span className="text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.responsibilities?.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                      <span className="text-sm leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 p-8 md:p-12 bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Ready to join us?</h3>
              <p className="text-sm text-gray-500 mt-1">Submit your resume and our team will review your application.</p>
            </div>
            <button
              onClick={handleApply}
              className="shrink-0 inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 text-[11px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
            >
              Apply Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
