import React from "react";

const BrandSlider = () => {

  const logos = [
    "https://staging-hrxbackenddata.sgp1.digitaloceanspaces.com/1730193829452-15.png",
    "https://staging-hrxbackenddata.sgp1.digitaloceanspaces.com/1730193879057-23.png",
    "https://staging-hrxbackenddata.sgp1.digitaloceanspaces.com/1730193772043-12.png",
    "https://staging-hrxbackenddata.sgp1.digitaloceanspaces.com/1730193515467-4.png",
    "https://staging-hrxbackenddata.sgp1.digitaloceanspaces.com/1730193742135-7.png",
    "https://1000logos.net/wp-content/uploads/2021/04/Puma-logo.png"
  ];

  return (
    <section className="bg-gray-100 py-16">

      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-gray-800">
          Brands We Work With
        </h2>
        <p className="text-gray-600 mt-2">
          We focused on efficiency and innovation seriously. That is why they trust us.
        </p>
      </div>

      {/* Slider */}
      <div className="overflow-hidden w-full">
        <div className="flex animate-slide whitespace-nowrap">

          {/* first set */}
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand"
              className="h-16 mx-14 object-contain"
            />
          ))}

          {/* duplicate set for infinity */}
          {logos.map((logo, index) => (
            <img
              key={"dup-" + index}
              src={logo}
              alt="brand"
              className="h-16 mx-14 object-contain"
            />
          ))}

        </div>
      </div>

    </section>
  );
};

export default BrandSlider;