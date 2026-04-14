import React from 'react';

const Hero = () => {
    return (
        <div>
			<section className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-center p-2 mx-auto sm:py-12 lg:py-4 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-2 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772875746/WhatsApp_Image_2026-03-07_at_3.27.11_PM_jsogyo.jpg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			
			<section className="bg-black text-white min-h-[80vh] flex flex-col justify-center px-8 md:px-20">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6">
        LEADERSHIP <br /> THROUGH EXCELLENCE.
      </h1>
      <p className="max-w-xl text-gray-400 text-lg font-light leading-relaxed mb-8">
        Established in 2010. A 100% export-oriented garment manufacturer 
        committed to innovation and ethical production in Bangladesh.
      </p>
      <button className="border border-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300">
        Explore Capabilities
      </button>
    </motion.div>
  </section>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<button rel="noopener noreferrer" to={'/contact'} className="px-8 py-3 text-lg font-semibold rounded dark:bg-black dark:text-gray-50">About us</button>
			</div>
		</div>
	</div>
</section>
        </div>
    );
};

export default Hero;