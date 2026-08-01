import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Loader2, ChevronRight, MapPin, Clock, Banknote, Users } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import ApplyForm from "../Components/ApplyForm.jsx";

const TABS = [
  { key: "positions", label: "Available Positions" },
  { key: "resume", label: "Resume Corner" },
];

const TYPE_LABELS = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WorkWithUs = () => {
  const [activeTab, setActiveTab] = useState("positions");

  const { data: circulars, isLoading: circLoading, isError } = useQuery({
    queryKey: ["public-circulars"],
    queryFn: async () => {
      const { data } = await api.get("/job-circulars/public");
      return data.data;
    },
  });

  const validCirculars = useMemo(() => {
    if (!circulars) return [];
    const now = new Date();
    return circulars.filter((c) => {
      if (!c.deadline) return true;
      const deadline = new Date(c.deadline);
      deadline.setHours(23, 59, 59, 999);
      return deadline >= now;
    });
  }, [circulars]);

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-20 font-sans text-black">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4"
          >
            Join Our Team
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-6">
            Work <span className="font-bold">With Us.</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Be part of a world-class garment manufacturing team. We're always looking for talented individuals who share our passion for quality and innovation.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-200 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 border-b-2 ${
                activeTab === tab.key
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "positions" && (
            <motion.div
              key="positions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Positions */}
              {circLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={24} className="text-gray-300 animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center py-32">
            <p className="text-gray-400 text-sm">Failed to load available positions. Please try again later.</p>
          </div>
        ) : validCirculars.length === 0 ? (
          <div className="text-center py-32">
            <Briefcase size={40} className="text-gray-200 mx-auto mb-6" />
            <p className="text-gray-400 text-lg uppercase tracking-widest font-medium">No positions available right now</p>
            <p className="text-gray-300 text-sm mt-3 max-w-md mx-auto">
              We don't have any open positions at the moment. Please check back later, or submit your resume and we'll keep you on file.
            </p>
            <button
              onClick={() => setActiveTab("resume")}
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
            >
              Submit Resume <ChevronRight size={12} />
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {validCirculars.map((circ) => {
              const deadlineDate = circ.deadline ? new Date(circ.deadline) : null;
              return (
                <motion.article
                  key={circ._id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group relative flex flex-col bg-white border border-gray-100 shadow-sm p-7 transition-colors duration-300 hover:border-black"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 bg-gray-100 text-gray-600">
                      {TYPE_LABELS[circ.type] || circ.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400">
                      <Users size={11} />
                      {circ.vacancies ?? 1} {circ.vacancies === 1 ? "Vacancy" : "Vacancies"}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight uppercase leading-snug group-hover:underline decoration-black decoration-1 underline-offset-4">
                    {circ.title}
                  </h3>
                  {circ.department && (
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1.5">{circ.department}</p>
                  )}

                  <p className="text-sm text-gray-500 leading-relaxed mt-4 line-clamp-3">
                    {circ.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-5">
                    {circ.location && (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400">
                        <MapPin size={11} /> {circ.location}
                      </span>
                    )}
                    {circ.salary && (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400">
                        <Banknote size={11} /> {circ.salary}
                      </span>
                    )}
                    {deadlineDate && (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400">
                        <Clock size={11} /> Deadline: {deadlineDate.toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="mt-7 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/careers/${circ._id}`}
                      className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
                    >
                      Read More
                    </Link>
                    <ChevronRight size={16} className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
        </motion.div>
      )}

      {activeTab === "resume" && (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="max-w-2xl mx-auto text-center mb-10">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4"
              >
                Resume Corner
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">
                Submit <span className="font-bold">Your Resume.</span>
              </h2>
              <p className="text-sm text-gray-400 mt-4">
                Send us your details and we'll reach out when a suitable position opens.
              </p>
            </div>
            <ApplyForm />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom tags */}
        <div className="mt-24 flex flex-wrap gap-x-12 gap-y-4 opacity-40 grayscale">
          {["100% Export Oriented", "BSCI Grade A", "ISO Certified", "BGMEA Registered"].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
