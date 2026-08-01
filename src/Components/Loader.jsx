const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://res.cloudinary.com/dcdmktxtz/image/upload/v1772729679/Manami_wjbweo.png"
          alt="Loading"
          className="w-12 h-12 object-contain animate-pulse"
        />
        <div className="w-8 h-[2px] bg-gray-200 rounded overflow-hidden">
          <div className="w-full h-full bg-black animate-[slide_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
