import React from 'react';

const Loader = () => {
    return (
       <div className="flex items-center justify-center space-x-2">
	
	<div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600">
        <img src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png" alt="" />
    </div>
</div>
    );
};

export default Loader;