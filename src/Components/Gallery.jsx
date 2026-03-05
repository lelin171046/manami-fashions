import React from 'react';

const imges = [
   "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772735929/0x0_orjjmg.webp",
   "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772735928/d9017240-6a85-11ef-ae6b-69d5f77804f0_whcu7n.jpg",
   "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772735928/teaser-newsroom_l4otax.jpg",
   "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772735928/skylark_soft_manami_signing-scaled_eveaf0.jpg"  ,
   "https://res.cloudinary.com/dcdmktxtz/image/upload/v1772735926/images_u3dgz8.jpg"
]
const Gallery = () => {
    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
	<div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
		{imges.map((img, i) => (
            <img src={img} alt="" className="w-full rounded-md dark:bg-gray-500 aspect-square" key={i} />
        ))}
	</div>
</section>
    );
};

export default Gallery;