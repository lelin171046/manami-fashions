import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Buyers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const buyers = [
    {
      name: "Zara",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Zara_Logo.svg",
      country: "Spain",
    },
    {
      name: "H&M",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
      country: "Sweden",
    },
    {
      name: "Mango",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Mango-Logo.png",
      country: "Spain",
    },
    {
      name: "Uniqlo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Uniqlo_logo.svg",
      country: "Japan",
    },
    {
      name: "Next",
      logo: "https://www.next.co.uk/assets/next/logo/next-logo.png",
      country: "UK",
    },
    {
      name: "Primark",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Primark_logo.svg",
      country: "Ireland",
    },
    {
      name: "LocalMart",
      logo: "https://via.placeholder.com/200x80?text=LOCAL+MART",
      country: "BD",
    },
    {
      name: "FashionHub",
      logo: "https://via.placeholder.com/200x80?text=FASHION+HUB",
      country: "BD",
    },
    {
      name: "StyleBD",
      logo: "https://via.placeholder.com/200x80?text=STYLE+BD",
      country: "BD",
    },
    {
      name: "Aarong",
      logo: "https://via.placeholder.com/200x80?text=AARONG",
      country: "BD",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-10 pb-24 text-gray-800">

    

      {/* Hero */}
      <section className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Trusted By Leading Brands
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          Our garments are trusted by international fashion brands and local
          partners who value quality and reliability.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "50+", label: "Global Brands" },
            { value: "10+", label: "Years Experience" },
            { value: "5M+", label: "Garments Produced" },
            { value: "99.8%", label: "Quality Score" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-6 shadow-sm"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Buyers Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Buyers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {buyers.map((buyer, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 flex items-center justify-center hover:shadow-md transition"
            >
              <img
                src={buyer.logo}
                alt={buyer.name}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Why Brands Choose Us */}
      <section className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Why Brands Choose Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "⚡",
              title: "Fast Turnaround",
              desc: "7-30 days delivery",
            },
            {
              icon: "🎯",
              title: "High Quality",
              desc: "99.8% pass rate",
            },
            {
              icon: "🌍",
              title: "Global Standard",
              desc: "BSCI compliant",
            },
            {
              icon: "💰",
              title: "Factory Price",
              desc: "Competitive cost",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-8 shadow-sm"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Buyers;