import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Ruler,
  Monitor,
  Scissors,
  Zap,
  Shirt,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const Operations = () => {
  const [activeSection, setActiveSection] = useState(0);

  const operations = [
    {
      id: 0,
      slug: "sample",
      title: "Sample Development",
      icon: Ruler,
      description:
        "Prototype creation & fit testing to ensure perfect garment construction before mass production.",
      details: [
        "Pattern prototyping",
        "Fabric testing & fit trials",
        "Client approval samples",
        "Size set development",
        "Pre-production samples",
      ],
      image:
        "https://images.unsplash.com/photo-1584630342462-67d1abbf479e?w=600",
    },
    {
      id: 1,
      slug: "cad",
      title: "CAD Pattern Making",
      icon: Monitor,
      description:
        "Digital pattern design using advanced CAD software for precision grading & marker planning.",
      details: [
        "Gerber AccuMark software",
        "Multi-size pattern grading",
        "Digital marker optimization",
        "Zero wastage planning",
      ],
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76bbb17f?w=600",
    },
    {
      id: 2,
      slug: "cutting",
      title: "Precision Cutting",
      icon: Scissors,
      description:
        "Computerized straight knife cutting for perfect edges & fabric utilization.",
      details: [
        "Straight knife machines",
        "Auto fabric spreaders",
        "Laser edge sealing",
        "Numbering & bundling",
      ],
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
    },
    {
      id: 3,
      slug: "fusing",
      title: "Fusing & Interlining",
      icon: Zap,
      description:
        "High-pressure fusing machines bond interlining for shape retention & durability.",
      details: [
        "Continuous fusing machines",
        "Collar & cuff fusing",
        "Temperature control",
        "Quality adhesion testing",
      ],
      image:
        "https://images.unsplash.com/photo-1602940659805-770d1b3b729e?w=600",
    },
    {
      id: 4,
      slug: "sewing",
      title: "Expert Sewing",
      icon: Shirt,
      description:
        "Skilled sewing operators using modern machines for flawless construction.",
      details: [
        "Juki & Brother machines",
        "Overlock & flatseam stitching",
        "Inline quality checking",
        "Embroidery unit",
      ],
      image:
        "https://images.unsplash.com/photo-1574251150896-225d2f8dd8dd?w=600",
    },
    {
      id: 5,
      slug: "finishing",
      title: "Final Finishing",
      icon: CheckCircle,
      description:
        "Complete finishing with ironing, tagging and final inspection.",
      details: [
        "Quality control",
        "Steam ironing",
        "Thread trimming",
        "Final shipment inspection",
      ],
      image:
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-20 text-gray-800">
      {/* Hero */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Operations</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our complete garment production workflow from sampling to finishing.
        </p>
      </div>

      {/* Process Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-20">
        {operations.map((operation, index) => {
          const Icon = operation.icon;

          return (
            <div
              key={operation.id}
              onClick={() => setActiveSection(index)}
              className={`p-8 rounded-xl border cursor-pointer transition
              ${
                activeSection === index
                  ? "bg-black text-white"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <Icon size={36} className="mb-4" />

              <h3 className="text-xl font-semibold mb-2">{operation.title}</h3>

              <p
                className={`text-sm ${
                  activeSection === index ? "text-gray-200" : "text-gray-600"
                }`}
              >
                {operation.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Section */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 px-4 items-center">
        <img
          src={operations[activeSection].image}
          alt={operations[activeSection].title}
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold mb-6">
            {operations[activeSection].title}
          </h2>

          <p className="text-gray-600 mb-8">
            {operations[activeSection].description}
          </p>

          <ul className="space-y-3 mb-8">
            {operations[activeSection].details.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            to={`/operations/${operations[activeSection].slug}`}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            View Details
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* Capacity Section */}
      <div className="max-w-6xl mx-auto text-center mt-24 px-4">
        <h2 className="text-3xl font-bold mb-10">Production Capacity</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: "Daily Output", value: "25,000 pcs" },
            { label: "Operators", value: "100+" },
            { label: "Machines", value: "60+" },
            { label: "QC Stages", value: "6 levels" },
            { label: "Fabric Use", value: "95%" },
            { label: "Defect Rate", value: "<0.5%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Operations;