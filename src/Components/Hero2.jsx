const Hero2 = () => {
  const images = [
  
    "https://res.cloudinary.com/dg04kyz8n/image/upload/v1787583369/1730187215394-Our-Visionaries_yayjrv.jpg",
    "https://res.cloudinary.com/dg04kyz8n/image/upload/v1787583227/WhatsApp_Image_2026-08-24_at_8.52.56_PM_n7l9cq.jpg",
    "https://res.cloudinary.com/dg04kyz8n/image/upload/v1787583369/1730187215394-Our-Visionaries_yayjrv.jpg",
    "https://res.cloudinary.com/dg04kyz8n/image/upload/v1787583227/WhatsApp_Image_2026-08-24_at_8.52.56_PM_n7l9cq.jpg",
   
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
