import { Link } from "react-router-dom";
import homeLogo from "../assets/images/home_logo.png";
import data from "../db/output.json";
import { useState } from "react";
import { Search, X } from "lucide-react";

interface ProjectData {
  grpno: number;
  title: string;
  domain: string;
  guide: string;
}

interface SearchResult extends ProjectData {
  year: string;
}

interface ProjectDataByYear {
  [year: string]: ProjectData[];
}

export default function Navbar() {
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const projectData = data as unknown as ProjectDataByYear;

  const performSearch = (term: string) => {
    if (term !== "" && term.length >= 3) {
      const results: SearchResult[] = [];

      Object.entries(projectData).forEach(([year, projects]) => {
        const yearResults = projects
          .filter((project) => project.title.toLowerCase().includes(term.toLowerCase()))
          .map((project) => ({
            ...project,
            year,
          }));

        results.push(...yearResults);
      });

      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(performSearch, 500);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedSearch(value);
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchResult([]);
  };

  return (
    <nav className="bg-slate-800 text-white fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-slate-700">
      <div className="flex items-center justify-between py-3 px-4 md:px-8 lg:px-12 max-w-full">
        {/* Logo */}
        <Link to={"/"} className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <img src={homeLogo} alt="VESIT Logo" className="h-16 w-auto" />
        </Link>

        {/* Branding - Hidden on mobile */}
        <div className="hidden md:flex flex-col flex-1 ml-8">
          <p className="text-xl text-slate-300 font-medium">Department of Artificial Intelligence & Data Science</p>
          <p className="text-base md:text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">Project Synapse</p>
        </div>
      </div>
    </nav>
  );
}
