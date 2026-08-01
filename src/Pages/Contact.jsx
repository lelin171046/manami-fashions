import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { MapPin, Building2, Phone, Mail, Clock, Zap, Send, CheckCircle, Loader2 } from "lucide-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const FALLBACK = {
  factoryAddress: "Kabirpur, Ashulia, Savar",
  factoryCity: "Dhaka-1349, Bangladesh",
  headAddress: "Dhaka, Bangladesh",
  phone: "+880 1711 556121",
  email: "info@manamifashions.com",
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const InfoCard = ({ icon: Icon, title, children, delay = 0 }) => (
  <motion.div
    {...fadeUp}
    transition={{ duration: 0.5, delay }}
    className="flex gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-black transition-all duration-300"
  >
    <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shrink-0">
      <Icon size={18} className="text-white" />
    </div>
    <div className="min-w-0">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1.5">{title}</h4>
      <div className="text-sm text-neutral-800 leading-relaxed">{children}</div>
    </div>
  </motion.div>
);

const Contact = () => {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { subject: subjectParam },
  });
  const [success, setSuccess] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ["factory-profile-public"],
    queryFn: async () => (await api.get("/factory-profile/public")).data.data,
    staleTime: 60000,
  });

  const profile = profileData || {};
  const op = profile.addresses?.operational || {};
  const hq = profile.addresses?.headquarters || {};
  const opParts = [op.street, op.area, op.city && `${op.city}${op.postalCode ? `-${op.postalCode}` : ""}`, op.country].filter(Boolean);
  const hqParts = [hq.street, hq.area, hq.city && `${hq.city}${hq.postalCode ? `-${hq.postalCode}` : ""}`, hq.country].filter(Boolean);
  const factoryAddress = opParts.join(", ") || `${FALLBACK.factoryAddress}, ${FALLBACK.factoryCity}`;
  const headAddress = hqParts.join(", ") || FALLBACK.headAddress;
  const phone = profile.contact?.phones?.[0] || FALLBACK.phone;
  const email = profile.contact?.emails?.[0] || FALLBACK.email;

  const onSubmit = async (data) => {
    try {
      await api.post("/contact", data);
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      reset();
      setSuccess(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message. Please try again.");
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 transition-colors placeholder:text-neutral-400 ${
      hasError ? "border-red-400 focus:ring-red-100" : "border-neutral-200 focus:ring-black/5 focus:border-black"
    }`;

  const labelClass = "block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2";

  return (
    <div className="relative bg-neutral-50 overflow-hidden">
      {/* Animated background accents */}
      <motion.div
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-neutral-200/60 blur-3xl"
        animate={{ y: [0, 24, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 -left-40 w-[420px] h-[420px] rounded-full bg-black/[0.04] blur-3xl"
        animate={{ y: [0, -20, 0], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="pointer-events-none absolute top-40 right-0 hidden xl:block text-[220px] font-black leading-none tracking-tighter text-neutral-200/60 select-none" aria-hidden>
        CONTACT
      </span>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-2xl mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Get in touch</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 uppercase">
            Contact <span className="font-bold">Us</span>
          </h1>
          <p className="text-neutral-500 mt-5 text-base sm:text-lg leading-relaxed">
            Have a question about our manufacturing capabilities, sourcing, or partnership? Our team responds to every
            inquiry within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-14">
          {/* Left — Information */}
          <div className="lg:col-span-2 space-y-5">
            <InfoCard icon={MapPin} title="Factory Address">
              <p className="font-semibold text-neutral-900">Manami Fashions Ltd.</p>
              <p className="text-neutral-600 mt-1">{factoryAddress}</p>
            </InfoCard>

            <InfoCard icon={Building2} title="Head Office" delay={0.05}>
              <p className="text-neutral-600">{headAddress}</p>
            </InfoCard>

            <InfoCard icon={Phone} title="Phone" delay={0.1}>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-neutral-700 hover:text-black transition-colors">
                {phone}
              </a>
            </InfoCard>

            <InfoCard icon={Mail} title="Email" delay={0.15}>
              <a href={`mailto:${email}`} className="text-neutral-700 hover:text-black transition-colors">
                {email}
              </a>
            </InfoCard>

            <InfoCard icon={Clock} title="Business Hours" delay={0.2}>
              <p className="text-neutral-700">Monday – Saturday</p>
              <p className="text-neutral-600">8:00 AM – 5:00 PM (GMT+6)</p>
              <p className="text-neutral-400 text-xs mt-1">Sunday: Closed</p>
            </InfoCard>

            {/* Quick response promise */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative overflow-hidden bg-black text-white p-6 rounded-2xl"
            >
              <motion.div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-1">Quick Response Promise</h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    We reply to every inquiry within 24 hours — usually much faster during business hours.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14578.131895116261!2d90.23798910082986!3d24.012263618715693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e68cb0691c1b%3A0xfefc5cad61b47bbb!2sMANAMI%20FASHIONS%20LTD!5e0!3m2!1sen!2sbd!4v1772897590690!5m2!1sen!2sbd"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="Manami Fashions Ltd factory location on Google Maps"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-10 lg:sticky lg:top-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1 tracking-tight">Send us a message</h2>
              <p className="text-sm text-neutral-400 mb-8">Fill in the form and we'll get back to you shortly.</p>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={40} className="text-emerald-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent Successfully</h3>
                    <p className="text-sm text-neutral-500 mb-8 max-w-sm mx-auto">
                      Thank you for reaching out to Manami Fashions Ltd. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name is too short" } })} placeholder="John Doe" className={inputClass(!!errors.name)} />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Company</label>
                        <input {...register("company")} placeholder="Your company (optional)" className={inputClass(false)} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
                          })}
                          placeholder="john@company.com"
                          className={inputClass(!!errors.email)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input
                          type="tel"
                          {...register("phone", { pattern: { value: /^[+\d\s()-]{7,}$/, message: "Please enter a valid phone number" } })}
                          placeholder="+880 1XXX XXXXXX"
                          className={inputClass(!!errors.phone)}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Subject *</label>
                      <input
                        {...register("subject", { required: "Subject is required", minLength: { value: 3, message: "Subject is too short" } })}
                        placeholder="How can we help you?"
                        className={inputClass(!!errors.subject)}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Message *</label>
                      <textarea
                        rows="6"
                        {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please write at least 10 characters" }, maxLength: { value: 5000, message: "Message cannot exceed 5000 characters" } })}
                        placeholder="Tell us about your inquiry..."
                        className={`${inputClass(!!errors.message)} resize-none`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
