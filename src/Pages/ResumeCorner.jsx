import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ApplyForm from "../Components/ApplyForm.jsx";

const ResumeCorner = () => {
  const [searchParams] = useSearchParams();
  const position = searchParams.get("position") || "";
  const department = searchParams.get("department") || "";

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 px-6 md:px-20 font-sans text-black">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/#work-with-us"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to Careers
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-4">
            Resume Corner
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-5">
            Submit <span className="font-bold">Your Resume.</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Send us your details and we'll reach out when a suitable position opens.
          </p>

          {position && (
            <div className="mt-6 inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-5 py-3">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Applying for</span>
              <span className="text-sm font-semibold uppercase tracking-tight">{position}</span>
              {department && <span className="text-xs text-gray-400">· {department}</span>}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ApplyForm initialPosition={position} />
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeCorner;
