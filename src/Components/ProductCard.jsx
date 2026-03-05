import React from 'react';

const ProductCard = () => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/path/to/product-image.jpg" alt="Product" className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">Product Name</h3>
                <p className="text-gray-600">$29.99</p>
            </div>
        </div>
    );
};

export default ProductCard;