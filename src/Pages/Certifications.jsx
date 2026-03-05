import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Calendar, Download, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Certification Data
  const certifications = [
    {
      id: 1,
      title: "Google UX Design Professional Certificate",
      issuer: "Coursera • Google",
      date: "Completed: Dec 2024",
      credentialId: "ABC123XYZ",
      skills: ["UX Research", "Wireframing", "Prototyping", "User Testing"],
      image: "https://images.unsplash.com/photo-1613478244908-3988bd9d29b8?w=400&ixlib=rb-4.0.3",
      link: "https://coursera.org/verify/ABC123XYZ",
      type: "ux"
    },
    {
      id: 2,
      title: "React JavaScript Certification",
      issuer: "freeCodeCamp",
      date: "Completed: Oct 2024",
      credentialId: "FCC-RCT-456",
      skills: ["React Hooks", "Redux", "Routing", "State Management"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      link: "https://freecodecamp.org/certification/react",
      type: "frontend"
    },
    {
      id: 3,
      title: "Advanced Tailwind CSS Developer",
      issuer: "Tailwind Labs",
      date: "Completed: Nov 2024",
      credentialId: "TW-789ADV",
      skills: ["Custom Components", "Design Systems", "Responsive Design"],
      image: "https://tailwindcss.com/img/card-top.jpg",
      link: "https://tailwindcss.com/certification/TW-789ADV",
      type: "design"
    },
    {
      id: 4,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Completed: Jan 2025",
      credentialId: "AWS-CP-101",
      skills: ["Cloud Computing", "AWS Services", "Security"],
      image: "https://images.unsplash.com/photo-1464632150231-3eacc50986e5?w=400",
      link: "https://aws.amazon.com/certification/verify/AWS-CP-101",
      type: "cloud"
    },
    {
      id: 5,
      title: "Figma UI/UX Design Mastery",
      issuer: "Figma Academy",
      date: "Completed: Sep 2024",
      credentialId: "FIGMA-PRO-2024",
      skills: ["Prototyping", "Design Systems", "Collaboration"],
      image: "https://images.unsplash.com/photo-1460932687039-0f4d3d95de52?w=400",
      link: "https://figma.com/cert/FIGMA-PRO-2024",
      type: "ux"
    },
    {
      id: 6,
      title: "Node.js & Express Development",
      issuer: "Udemy",
      date: "Completed: Feb 2025",
      credentialId: "UDEMY-NODE-999",
      skills: ["APIs", "Authentication", "MongoDB"],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400",
      link: "https://udemy.com/certificate/UDEMY-NODE-999",
      type: "backend"
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Certifications', count: 6 },
    { id: 'ux', label: 'UX/UI Design', count: 2 },
    { id: 'frontend', label: 'Frontend', count: 2 },
    { id: 'backend', label: 'Backend', count: 1 },
    { id: 'cloud', label: 'Cloud', count: 1 },
    { id: 'design', label: 'Design', count: 1 }
  ];

  const filteredCerts = certifications.filter(cert => activeTab === 'all' || cert.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4">
        <div className="absolute inset-0 bg-grid-white/[0.03] opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-all duration-300 group mb-8"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
          </Link>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
              <Award size={24} className="mr-3 text-yellow-400" />
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Certifications
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Verified professional certifications showcasing expertise in modern web development, UX design, and cloud technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-2xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl
                  backdrop-blur-sm border ${activeTab === tab.id 
                    ? 'bg-white/20 border-white/50 shadow-white/25 scale-105 translate-y-[-2px]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-white/10 hover:scale-102'
                  }
                `}
              >
                {tab.label} <span className="ml-1 text-white/60">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map((cert, index) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Individual Certification Card
const CertCard = ({ cert, index, hoveredCard, setHoveredCard }) => {
  const isHovered = hoveredCard === cert.id;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHoveredCard(cert.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Card Background */}
      <div className={`
        relative h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-black/30
        backdrop-blur-xl bg-gradient-to-br from-white/5 via-black/20 to-black/10
        border border-white/10 hover:border-white/30 transition-all duration-700
        hover:shadow-white/20 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.02]
        ${isHovered ? 'shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)] ring-2 ring-white/20' : ''}
      `}>
        
        {/* Image */}
        <div className="h-64 overflow-hidden relative group-hover:scale-110 transition-transform duration-700">
          <img 
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover filter grayscale brightness-50 group-hover:brightness-75 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end backdrop-blur-sm">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl mb-4 shadow-lg w-fit">
            <Calendar size={16} className="mr-2" />
            <span className="text-xs font-bold uppercase tracking-wider">{cert.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
            {cert.title}
          </h3>

          {/* Issuer */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">
              {cert.issuer}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 backdrop-blur-sm bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/80 hover:bg-white/10 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105 shadow-md"
            >
              <ExternalLink size={18} />
              <span>View Credential</span>
            </a>
            <button className="p-3 backdrop-blur-sm bg-white/5 hover:bg-white/15 border border-white/20 rounded-2xl transition-all duration-300 hover:rotate-12 hover:scale-110 shadow-lg">
              <Download size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
