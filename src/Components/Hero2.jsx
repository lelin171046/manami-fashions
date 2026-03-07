import React from "react";
import Hero from "./Hero";

const Hero2 = () => {
  const images = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b"
  ];

  return (
    <section className="w-full bg-gray-100 py-10">
      
      {/* Heading */}
      <div className="text-center mb-18">
        <h2 className="text-sm tracking-[4px] text-gray-700">
          CELEBRATING DESIGN | DELIVERING EXCELLENCE
        </h2>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden  shadow hover:scale-115 transition duration-300"
            >
              <img
                src={`${img}?auto=format&fit=crop&w=600&q=80`}
                alt="gallery"
                className="w-full h-[350px] object-cover"
              />
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default Hero2;