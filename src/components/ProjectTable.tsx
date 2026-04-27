import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { dbs, getProjectsByYear } from "../db/data";

interface ProjectData {
  grpno: number;
  title: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  guide: string;
  coguide: string;
  description: string;
  github: string;
  ppt?: string;
  demo: string;
  domain: string;
  division?: string;
}

export default function ProjectTable() {
  const navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(
    Object.keys(dbs)[0], // default first year dynamically
  );

  const yearProjects: ProjectData[] = getProjectsByYear(selectedYear);

  const hasDivision = yearProjects.some((p) => p.division);

  const filteredProjects = selectedDomain ? yearProjects.filter((p) => p.domain?.includes(selectedDomain)) : yearProjects;

  const availableDomains = Array.from(new Set(yearProjects.map((p) => p.domain))).filter(Boolean);

  const colCount = hasDivision ? 5 : 4;

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:justify-between gap-6">
          <h1 className="text-4xl font-bold text-slate-900">Project Gallery</h1>

          {/* Year Selector */}
          <div className="relative w-full md:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedDomain("");
              }}
              className="w-full md:w-48 appearance-none bg-white border-2 border-slate-200 px-4 py-3 rounded-lg font-semibold"
            >
              {Object.keys(dbs).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr className="bg-slate-100 text-sm uppercase text-slate-600">
                  <th className="px-6 py-4">#</th>
                  {hasDivision && <th className="px-6 py-4">Division</th>}
                  <th className="px-6 py-4">Title</th>

                  

                  <th className="px-6 py-4">
                    Domain
                    <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)} className="ml-2 border px-2 py-1 rounded">
                      <option value="">All</option>
                      {availableDomains.map((domain) => (
                        <option key={domain} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                  </th>

                  <th className="px-6 py-4">Guide</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr
                      key={project.grpno}
                      className="hover:bg-blue-50 cursor-pointer"
                      onClick={() =>
                        navigate(
                          project.division
                            ? `/project/${selectedYear}/${project.grpno}/${project.division}`
                            : `/project/${selectedYear}/${project.grpno}`,
                        )
                      }
                    >
                      <td className="px-6 py-4">{project.grpno}</td>
                      {hasDivision && <td className="px-6 py-4">{project.division || "-"}</td>}
                      <td className="px-6 py-4">{project.title}</td>

                      

                      <td className="px-6 py-4">{project.domain || "General"}</td>

                      <td className="px-6 py-4">{project.guide || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={colCount} className="text-center py-10">
                      No projects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 flex justify-between">
            <p>
              Showing {filteredProjects.length} of {yearProjects.length}
            </p>

            {selectedDomain && (
              <button onClick={() => setSelectedDomain("")} className="text-blue-600">
                Clear filter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
