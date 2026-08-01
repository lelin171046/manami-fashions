import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  const crumbs = segments.map((seg, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
    return { label, path, isLast: i === segments.length - 1 };
  });

  return (
    <nav className="flex items-center gap-1 text-xs text-gray-400 mb-4">
      <Link to="/admin" className="hover:text-gray-600 transition-colors">
        <Home size={12} />
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.path} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {crumb.isLast ? (
            <span className="text-gray-700 font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-gray-600 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
