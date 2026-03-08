import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Calendar, ExternalLink } from "lucide-react";

const Certifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const certifications = [
    {
      id: 1,
      title: "BSCI Compliance Certification",
      issuer: "Business Social Compliance Initiative",
      date: "Valid: 2024 - 2026",
      credentialId: "BSCI-2024-8891",
      skills: ["Social Compliance", "Worker Safety", "Ethical Production"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/BSCI_logo.png",
      link: "#",
      type: "compliance",
    },
    {
      id: 2,
      title: "OEKO-TEX Standard 100",
      issuer: "OEKO-TEX Association",
      date: "Certified: 2024",
      credentialId: "OEKO-TEX-4490",
      skills: ["Chemical Safety", "Textile Testing", "Eco Friendly"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5d/Oeko_tex_standard_100_logo.svg",
      link: "#",
      type: "quality",
    },
    {
      id: 3,
      title: "WRAP Certification",
      issuer: "Worldwide Responsible Accredited Production",
      date: "Certified: 2023",
      credentialId: "WRAP-8821",
      skills: ["Ethical Manufacturing", "Labor Rights", "Compliance"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/WRAP_logo.png",
      link: "#",
      type: "compliance",
    },
    {
      id: 4,
      title: "ISO 9001: Quality Management",
      issuer: "International Organization for Standardization",
      date: "Certified: 2024",
      credentialId: "ISO9001-2024",
      skills: ["Quality Control", "Production Management"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/ISO_9001_Logo.svg",
      link: "#",
      type: "quality",
    },
    {
      id: 5,
      title: "SEDEX Member",
      issuer: "Supplier Ethical Data Exchange",
      date: "Member Since: 2023",
      credentialId: "SEDEX-7782",
      skills: ["Supply Chain Ethics", "Transparency"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Sedex_logo.png",
      link: "#",
      type: "compliance",
    },
    {
      id: 6,
      title: "GOTS Organic Textile Certification",
      issuer: "Global Organic Textile Standard",
      date: "Certified: 2024",
      credentialId: "GOTS-9902",
      skills: ["Organic Textile", "Sustainable Production"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/GOTS_logo.png",
      link: "#",
      type: "sustainability",
    },
  ];

  const tabs = [
    { id: "all", label: "All Certifications" },
    { id: "compliance", label: "Compliance" },
    { id: "quality", label: "Quality" },
    { id: "sustainability", label: "Sustainability" },
  ];

  const filteredCerts =
    activeTab === "all"
      ? certifications
      : certifications.filter((cert) => cert.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 pt-4 pb-24">

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-4 px-4">
        <div className="flex justify-center mb-2">
          <Award size={40} className="text-blue-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Factory Certifications
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Manami Fashions Ltd maintains international compliance standards to
          ensure ethical manufacturing, product quality, and sustainable
          production practices.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-black text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certification Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            onMouseEnter={() => setHoveredCard(cert.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
          >
            <div className="h-40 flex items-center justify-center mb-6">
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-28 object-contain"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar size={14} />
              {cert.date}
            </div>

            <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>

            <p className="text-gray-500 text-sm mb-3">{cert.issuer}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {cert.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              <ExternalLink size={16} />
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;