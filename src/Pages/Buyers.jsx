import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Buyers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // International & Local Brands (Replace with your actual buyers)
  const buyers = [
    { name: 'Zara', logo: 'https://res.cloudinary.com/dcdmktxtz/image/upload/v1768888323/cld-sample-5.jpg', country: 'Spain' },
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/H%26M-logo.svg/512px-H%26M-logo.svg.png', country: 'Sweden' },
    { name: 'Mango', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Mango-Logo.png', country: 'Spain' },
    { name: 'Uniqlo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Uniqlo_logo.svg/512px-Uniqlo_logo.svg.png', country: 'Japan' },
    { name: 'Next', logo: 'https://www.next.co.uk/assets/next/logo/next-logo.png', country: 'UK' },
    { name: 'Primark', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Primark_logo.svg/512px-Primark_logo.svg.png', country: 'Ireland' },
    { name: 'LocalMart', logo: 'https://via.placeholder.com/200x80/333/fff?text=LOCAL+MART', country: 'BD' },
    { name: 'FashionHub', logo: 'https://via.placeholder.com/200x80/444/fff?text=FASHION+HUB', country: 'BD' },
    { name: 'StyleBD', logo: 'https://via.placeholder.com/200x80/555/fff?text=STYLE+BD', country: 'BD' },
    { name: 'Aarong', logo: 'https://via.placeholder.com/200x80/666/fff?text=AARONG', country: 'BD' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] opacity-20" />
      
      {/* Breadcrumb */}
      <div className="px-4 mb-12 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1" />
          <span className="text-sm font-medium uppercase tracking-wider">Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="px-4 mb-24 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-8 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl shadow-2xl mb-8">
            <img src="https://via.placeholder.com/40x40/fff/000?text=🏆" alt="Trusted" className="mr-4" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Trusted By
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Partnering with world-class brands and local favorites. Proven quality trusted by industry leaders.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Global Brands' },
              { value: '10+', label: 'Years Experience' },
              { value: '5M+', label: 'Garments Produced' },
              { value: '99.8%', label: 'Quality Score' }
            ].map((stat, index) => (
              <div key={index} className="p-8 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-4xl shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-500 group">
                <div className="text-4xl md:text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg uppercase tracking-wider text-white/60 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Sliders */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* International Brands Slider */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              International Buyers
            </h2>
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl p-8">
              
              {/* Slider Track 1 */}
              <div className="flex animate-slide gap-12 items-center h-32">
                {[...buyers.slice(0, 6), ...buyers.slice(0, 6)].map((buyer, index) => (
                  <div
                    key={`int1-${index}`}
                    className="flex-shrink-0 w-48 h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-white/30"
                  >
                    <img 
                      src={buyer.logo} 
                      alt={buyer.name}
                      className="h-16 w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {buyer.country}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Track 2 (Opposite direction) */}
              <div className="flex animate-slide-reverse gap-12 items-center h-32 mt-8">
                {[...buyers.slice(6), ...buyers.slice(6), ...buyers.slice(0, 3)].map((buyer, index) => (
                  <div
                    key={`int2-${index}`}
                    className="flex-shrink-0 w-48 h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-white/30"
                  >
                    <img 
                      src={buyer.logo} 
                      alt={buyer.name}
                      className="h-16 w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {buyer.country}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local Brands Slider */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Local Partners
            </h2>
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl p-8">
              
              {/* Local Slider Track 1 */}
              <div className="flex animate-slide gap-12 items-center h-32">
                {Array(8).fill(0).flatMap((_, i) => buyers.slice(6)).map((buyer, index) => (
                  <div
                    key={`local1-${index}`}
                    className="flex-shrink-0 w-48 h-24 bg-emerald-500/10 backdrop-blur-sm rounded-2xl border border-emerald-400/30 flex items-center justify-center hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-500/30"
                  >
                    <img 
                      src={buyer.logo} 
                      alt={buyer.name}
                      className="h-16 w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 filter brightness-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Local Slider Track 2 */}
              <div className="flex animate-slide-reverse gap-12 items-center h-32 mt-8">
                {Array(8).fill(0).flatMap((_, i) => buyers.slice(6)).map((buyer, index) => (
                  <div
                    key={`local2-${index}`}
                    className="flex-shrink-0 w-48 h-24 bg-emerald-500/10 backdrop-blur-sm rounded-2xl border border-emerald-400/30 flex items-center justify-center hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-500/30"
                  >
                    <img 
                      src={buyer.logo} 
                      alt={buyer.name}
                      className="h-16 w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 filter brightness-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Why Brands Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: 'Fast Turnaround', desc: '7-30 days delivery' },
              { icon: '🎯', title: 'Zero Defects', desc: '99.8% quality pass rate' },
              { icon: '🌍', title: 'Global Standards', desc: 'BSCI & WRAP certified' },
              { icon: '💰', title: 'Competitive Pricing', desc: 'Direct factory rates' }
            ].map((badge, index) => (
              <div key={index} className="p-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-4xl shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-500 group">
                <div className="text-5xl mb-6 opacity-75 group-hover:opacity-100 transition-opacity">{badge.icon}</div>
                <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {badge.title}
                </h3>
                <p className="text-white/60 font-medium">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buyers;
