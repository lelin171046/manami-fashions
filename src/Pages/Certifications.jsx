import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Award, Calendar, ExternalLink, Loader2, X } from "lucide-react";
import api from "../api/axios.js";

const TABS = [
  { id: "all", label: "All Certifications" },
  { id: "compliance", label: "Compliance" },
  { id: "quality", label: "Quality" },
  { id: "sustainability", label: "Sustainability" },
];

const formatDateRange = (issueDate, expiryDate) => {
  const issue = issueDate ? new Date(issueDate).getFullYear() : null;
  const expiry = expiryDate ? new Date(expiryDate).getFullYear() : null;
  if (issue && expiry) return `Valid: ${issue} \u2013 ${expiry}`;
  if (issue) return `Certified: ${issue}`;
  if (expiry) return `Expires: ${expiry}`;
  return null;
};

const Certifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [previewCert, setPreviewCert] = useState(null);

  const { data: certs, isLoading } = useQuery({
    queryKey: ["public-certifications"],
    queryFn: async () => {
      const { data } = await api.get("/certifications/public");
      return data.data;
    },
  });

  const filteredCerts = useMemo(() => {
    if (!certs) return [];
    if (activeTab === "all") return certs;
    return certs.filter((cert) => cert.type === activeTab);
  }, [certs, activeTab]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 pb-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Award size={40} className="text-gray-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-4">
              Factory <span className="font-bold">Certifications</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Manami Fashions Ltd maintains international compliance standards to ensure ethical
              manufacturing, product quality, and sustainable production practices.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="text-gray-300 animate-spin" />
            </div>
          ) : filteredCerts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No certifications found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => {
                const dateLabel = formatDateRange(cert.issueDate, cert.expiryDate);
                const logoUrl = cert.logo?.url || "";

                return (
                  <div
                    key={cert._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div
                      className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 cursor-pointer group"
                      onClick={() => logoUrl && setPreviewCert(cert)}
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`${cert.name} certificate`}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <Award size={64} className="text-gray-200" />
                      )}
                    </div>

                    <div className="p-5">
                      {dateLabel && (
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <Calendar size={14} />
                          {dateLabel}
                        </div>
                      )}

                      <h3 className="text-lg font-semibold mb-1">{cert.name}</h3>
                      {cert.issuer && <p className="text-gray-500 text-sm mb-3">{cert.issuer}</p>}

                      {cert.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {cert.skills.map((skill, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {logoUrl && (
                        <button
                          onClick={() => setPreviewCert(cert)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline"
                        >
                          <ExternalLink size={14} />
                          View Certificate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {previewCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 text-white rounded-full p-1.5 hover:bg-black transition-colors"
            >
              <X size={18} />
            </button>
            <div className="bg-gray-50 flex items-center justify-center p-8">
              <img
                src={previewCert.logo?.url}
                alt={`${previewCert.name} certificate`}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{previewCert.name}</h3>
              {previewCert.issuer && (
                <p className="text-gray-500 text-sm mb-2">{previewCert.issuer}</p>
              )}
              {formatDateRange(previewCert.issueDate, previewCert.expiryDate) && (
                <p className="text-gray-400 text-sm">
                  {formatDateRange(previewCert.issueDate, previewCert.expiryDate)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certifications;