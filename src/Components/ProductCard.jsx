import React from 'react';

const ProductCard = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png" alt="Product Image" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Product Name</div>
                <p className="text-gray-700 text-base">
                    This is a brief description of the product. It highlights key features and benefits to entice customers.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$19.99</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;