const Hero2 = () => {
  const images = [
    "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254793/WhatsApp_Image_2026-04-11_at_3.52.45_PM_clvgrl.jpg",
    "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254793/WhatsApp_Image_2026-04-11_at_3.52.45_PM_clvgrl.jpg",
    "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776708037/IMG_8167.JPG_jackdx.jpg",
    "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254793/WhatsApp_Image_2026-04-11_at_5.25.27_PM_c8rrrs.jpg",
    "https://res.cloudinary.com/dcdmktxtz/image/upload/v1776254791/WhatsApp_Image_2026-04-11_at_2.15.35_PM_mu5m8k.jpg",
    "https://res.cloudinary.com/dg04kyz8n/image/upload/v1787583369/1730187215394-Our-Visionaries_yayjrv.jpg",
  ];

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="text-center mb-12 mt-10">
        <h2 className="text-xl tracking-[4px] text-gray-700 uppercase">
          Our <span className="text-gray-400">&mdash;</span> Visionaries
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden shadow hover:scale-105 transition-transform duration-500"
            >
              <img
                src={`${img}?auto=format&fit=crop&w=600&q=80`}
                alt={`Manami Fashions team member ${index + 1}`}
                className="w-full h-[350px] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero2;
