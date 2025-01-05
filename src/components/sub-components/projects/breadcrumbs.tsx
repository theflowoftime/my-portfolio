import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Breadcrumb() {
  const location = useLocation();

  return (
    <div className="flex items-center gap-x-2 absolute text-xs font-mono -tracking-[0.03em]">
      <Link
        className="hover:underline transition duration-150 ease-in-out opacity-60"
        to="/projects/all"
      >
        all projects
        {/* needs to be dynamic */}
      </Link>
      <ChevronRight size={16} />
      <span>{decodeURIComponent(location.pathname.split("/")[2])}</span>
    </div>
  );
}
