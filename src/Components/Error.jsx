import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white px-6">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-9xl text-gray-200">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl tracking-tight mb-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default Error;
