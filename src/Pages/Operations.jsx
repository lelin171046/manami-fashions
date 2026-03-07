import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Ruler, 
  Monitor, 
  Scissors, 
  Zap, 
  Shirt, 
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Operations = () => {
  const [activeSection, setActiveSection] = useState(0);

  // Operations Process Data
  const operations = [
    {
      id: 0,
      slug: 'sample',
      title: 'Sample Development',
      icon: Ruler,
      description: "Prototype creation & fit testing to ensure perfect garment construction before mass production.",
      details: [
        "Pattern prototyping",
        "Fabric testing & fit trials",
        "Client approval samples",
        "Size set development",
        "Pre-production samples"
      ],
      image: "https://images.unsplash.com/photo-1584630342462-67d1abbf479e?w=600",
      stats: { samples: "500+", turnaround: "7-10 days", accuracy: "99.8%" }
    },
    {
      id: 1,
      slug: 'cad',
      title: 'CAD Pattern Making',
      icon: Monitor,
      description: "Digital pattern design using advanced CAD software for precision grading & marker planning.",
      details: [
        "Gerber AccuMark software",
        "Multi-size pattern grading",
        "Digital marker optimization",
        "Zero wastage planning",
        "3D visualization"
      ],
      image: "https://images.unsplash.com/photo-1558618047-3c8c76bbb17f?w=600",
      stats: { patterns: "10,000+", efficiency: "98%", software: "Gerber" }
    },
    {
      id: 2,
      slug: 'cutting',
      title: 'Precision Cutting',
      icon: Scissors,
      description: "Computerized straight knife & laser cutting for perfect edges & maximum fabric utilization.",
      details: [
        "10 straight knife machines",
        "Auto-spreaders (8m width)",
        "Laser edge sealing",
        "10-layer cutting capacity",
        "Numbering & bundling"
      ],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
      stats: { capacity: "20,000 pcs/day", layers: "10+", utilization: "95%" }
    },
    {
      id: 3,
      slug: 'fusing',
      title: 'Fusing & Interlining',
      icon: Zap,
      description: "High-pressure fusing machines bond interlining for shape retention & durability.",
      details: [
        "Continuous fusing machines",
        "Collar, cuff & placket fusing",
        "Dot & powder interlinings",
        "Precise temperature control",
        "Quality adhesion testing"
      ],
      image: "https://images.unsplash.com/photo-1602940659805-770d1b3b729e?w=600",
      stats: { machines: "6 units", temp: "140-180°C", pressure: "4kg/cm²" }
    },
    {
      id: 4,
      slug: 'sewing',
      title: 'Expert Sewing',
      icon: Shirt,
      description: "100+ skilled sewing operators across 50+ sewing machines for flawless construction.",
      details: [
        "Juki & Brother machines",
        "Overlock, flatseam, buttonhole",
        "50+ sewing workstations",
        "Inline quality checking",
        "Specialized embroidery unit"
      ],
      image: "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=600",
      stats: { operators: "100+", machines: "50+", output: "15,000 pcs/day" }
    },
    {
      id: 5,
      slug: 'finishing',
      title: 'Final Finishing',
      icon: CheckCircle,
      description: "Complete post-construction finishing with ironing, tagging & quality inspection.",
      details: [
        "6-stage quality control",
        "Industrial steam ironing",
        "Thread trimming & cleaning",
        "Polybagging & tagging",
        "Final shipment inspection"
      ],
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600",
      stats: { qc_stages: "6 levels", defect_rate: "<0.5%", capacity: "25,000 pcs/day" }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/95 to-black text-white pt-2 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
     

      {/* Hero Section */}
      <section className="px-4 mb-24 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-8 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl shadow-2xl mb-8 w-fit mx-auto">
            <Scissors size={28} className="mr-4 text-emerald-400" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Operations
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
            Precision manufacturing process from sample development to final finishing. Complete transparency in every stitch.
          </p>
        </div>
      </section>

      {/* Progress Timeline */}
      <section className="px-4 mb-24">
        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-white/30 to-transparent" />
          
          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {operations.map((operation, index) => {
              const Icon = operation.icon;
              const isActive = activeSection === index;
              
              return (
                <div
                  key={operation.id}
                  className={`
                    relative group cursor-pointer transition-all duration-700
                    ${isActive 
                      ? 'scale-105 translate-y-[-20px] z-20' 
                      : 'hover:scale-102 hover:translate-y-[-10px] hover:z-10'
                    }
                  `}
                  onClick={() => setActiveSection(index)}
                >
                  {/* Step Number */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-white/20 to-transparent backdrop-blur-xl border-2 border-white/30 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-white/40 group-hover:scale-110 transition-all duration-500">
                    <span className="font-black text-2xl">{operation.id + 1}</span>
                  </div>
                  
                  {/* Card */}
                  <div className={`
                    p-10 rounded-3xl backdrop-blur-xl shadow-2xl border transition-all duration-700 h-[420px] flex flex-col
                    ${isActive 
                      ? 'bg-white/25 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.3)] ring-4 ring-white/20' 
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-white/20'
                    }
                  `}>
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-3xl backdrop-blur-xl flex items-center justify-center mb-6 shadow-xl border ${isActive ? 'border-white/50 bg-white/20 shadow-white/30' : 'border-white/20 bg-white/10'}`}>
                      <Icon size={36} className={`transition-all ${isActive ? 'text-white shadow-lg scale-110' : 'text-white/60 group-hover:text-white group-hover:scale-105'}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
                      {operation.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/70 mb-6 leading-relaxed flex-1">{operation.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(operation.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 group-hover:bg-white/20 transition-all">
                          <div className="text-2xl font-black text-white">{value}</div>
                          <div className="text-xs uppercase tracking-wider text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* View Details */}
                    <Link
                      to={`/operations/${operation.slug}`}
                      className="inline-flex items-center space-x-3 pt-4 font-bold uppercase tracking-wider text-sm group/link hover:text-white transition-all"
                    >
                      <span>View Details</span>
                      <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Section Details */}
      <section className="px-4 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Section Image */}
            <div className="relative group">
              <div className="aspect-[4/3] rounded-4xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-white/20 backdrop-blur-xl">
                <img 
                  src={operations[activeSection].image}
                  alt={operations[activeSection].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
            </div>

            {/* Section Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  {operations[activeSection].title}
                </h2>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  {operations[activeSection].description}
                </p>
              </div>

              {/* Process Details */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Key Processes
                </h4>
                <div className="columns-1 md:columns-2 gap-4">
                  {operations[activeSection].details.map((detail, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-start space-x-4 p-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl group transition-all shadow-xl">
                        <div className="w-2 h-2 mt-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex-shrink-0 shadow-lg" />
                        <span className="font-medium text-white leading-relaxed">{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/operations/${operations[activeSection].slug}`}
                className="inline-flex items-center space-x-4 px-10 py-6 backdrop-blur-xl bg-white/20 hover:bg-white/30 border-2 border-white/30 rounded-4xl font-black text-xl uppercase tracking-widest shadow-2xl hover:shadow-white/40 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 group"
              >
                <span>Explore {operations[activeSection].title}</span>
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Overview */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Production Capacity
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'Daily Output', value: '25,000 pcs' },
              { label: 'Operators', value: '100+' },
              { label: 'Machines', value: '60+' },
              { label: 'QC Stages', value: '6 levels' },
              { label: 'Fabric Utilization', value: '95%+' },
              { label: 'Defect Rate', value: '<0.5%' }
            ].map((stat, index) => (
              <div key={index} className="p-8 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-4xl shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-500 group">
                <div className="text-4xl md:text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-white/60 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Operations;
