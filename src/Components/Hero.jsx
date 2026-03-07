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
			
			<p className="mt-2 mb-4 text-lg sm:mb-10">MANAMI is known as an entity whose main driven force is its human resources. We utilize the strength of the young workforce available in Bangladesh. MANAMI is committed to achieve best customer satisfaction with best quality readymade garments through effective quality management system and continuous improvement.
				<br  className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
			</p>
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