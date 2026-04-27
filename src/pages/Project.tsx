import { useNavigate, useParams } from "react-router-dom";
import { Team } from "../components";
import { useEffect } from "react";
import { Presentation, FolderGit2, Play } from "lucide-react";
import { dbs } from "../db/data";

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
  sdg_goals?: string[];
  "Research Paper Doc"?: string;
  "Fundings Received"?: boolean;
  "member1 photo"?: string;
  "member2 photo"?: string;
  "member3 photo"?: string;
  "member4 photo"?: string;
  "guide photo"?: string;
  "coguide photo"?: string;
}

interface ProjectInfo {
  "Group No.": number;
  "Project Title": string;
  "Team Members": string[];
  Guide: string;
  "Co-guide": string;
  "Project Description": string;
  "GitHub Link": string;
  "PPT Link"?: string;
  "Demo Video Link": string;
  "Project Domain": string;
  Year: string;
  Photos: string[];
  "Guide Photo": string;
  "Co-guide Photo": string;
  "SDG Goals"?: string[];
}

export default function Project() {
  const { projectId, year, division } = useParams();
  const navigate = useNavigate();

  // 🔥 GENERALIZED PROJECT FETCH
  const getProject = (): ProjectData | undefined => {
    if (!year || !projectId) return;

    const yearData = dbs[year];

    if (!yearData) return;

    // Case 1: No division (array)
    if (Array.isArray(yearData)) {
      return yearData.find((p) => p.grpno.toString() === projectId);
    }

    // Case 2: Division exists (object)
    if (division && yearData[division]) {
      return yearData[division].find((p: ProjectData) => p.grpno.toString() === projectId);
    }

    // Fallback: search all divisions
    return (Object.values(yearData) as ProjectData[][]).flat().find((p) => p.grpno.toString() === projectId);
  };

  const projectData = getProject();

  // 🔥 DEFAULT DATA
  const defaultProjectInfo: ProjectInfo = {
    "Group No.": 0,
    "Project Title": "Project title",
    "Team Members": [],
    Guide: "Guide",
    "Co-guide": "Co-guide",
    "Project Description": "Project Description",
    "GitHub Link": "#",
    "Demo Video Link": "",
    "Project Domain": "Project Domain",
    Year: year || "",
    Photos: [],
    "Guide Photo": "",
    "Co-guide Photo": "",
    "SDG Goals": [],
  };

  // 🔥 TRANSFORM DATA
  const projectInfo: ProjectInfo = projectData
    ? {
        "Group No.": projectData.grpno,
        "Project Title": projectData.title,
        "Team Members": [projectData.member1, projectData.member2, projectData.member3, projectData.member4].filter((member): member is string =>
          Boolean(member),
        ),
        Guide: projectData.guide,
        "Co-guide": projectData.coguide,
        "Project Description": projectData.description,
        "GitHub Link": projectData.github,
        "PPT Link": projectData.ppt,
        "Demo Video Link": projectData.demo,
        "Project Domain": projectData.domain,
        Year: year || "",
        Photos: [projectData["member1 photo"], projectData["member2 photo"], projectData["member3 photo"], projectData["member4 photo"]].filter(
          (photo): photo is string => Boolean(photo),
        ),
        "Guide Photo": projectData["guide photo"] || "",
        "Co-guide Photo": projectData["coguide photo"] || "",
        "SDG Goals": projectData.sdg_goals || [],
      }
    : defaultProjectInfo;

  // 🔥 REDIRECT IF NOT FOUND
  useEffect(() => {
    if (!projectData) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [projectData, navigate]);

  const teamInfo = [projectInfo["Guide"], projectInfo["Co-guide"]].filter(Boolean).concat(projectInfo["Team Members"]);

  const teamPhotos = [projectInfo["Guide Photo"], projectInfo["Co-guide Photo"]].filter(Boolean).concat(projectInfo["Photos"]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* HEADER */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Group {projectInfo["Group No."]}</span>

                    {projectInfo["Year"] && <span className="bg-slate-100 px-3 py-1 rounded-full">{projectInfo["Year"]}</span>}

                    <span className="bg-slate-100 px-3 py-1 rounded-lg">{projectInfo["Project Domain"]}</span>
                  </div>

                  <h1 className="text-3xl font-bold">{projectInfo["Project Title"]}</h1>

                  {/* SDG Goals */}
                  {projectInfo["SDG Goals"] && projectInfo["SDG Goals"]!.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {projectInfo["SDG Goals"]!.map((goal) => (
                        <span key={goal} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {goal}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {division && (
                <p className="text-sm text-slate-600">
                  <strong>Division:</strong> {division}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-xl font-bold mb-4">Project Description</h2>
              <p className="text-slate-700  text-justify">{projectInfo["Project Description"]}</p>
            </div>

            {/* VIDEO */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-xl font-bold mb-4 flex gap-2">
                <Play className="w-5 h-5" />
                Demo Video
              </h2>

              {projectInfo["Demo Video Link"] ? (
                <iframe className="w-full aspect-video rounded-xl" src={projectInfo["Demo Video Link"]} allowFullScreen />
              ) : (
                <p>No video available</p>
              )}
            </div>

            {/* LINKS */}
            <div className="grid md:grid-cols-2 gap-4">
              <a href={projectInfo["GitHub Link"]} target="_blank" className="p-6 bg-white rounded-2xl shadow border flex gap-3">
                <FolderGit2 />
                GitHub
              </a>

              {projectInfo["PPT Link"] && (
                <a
                  href={projectInfo["PPT Link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-white rounded-2xl shadow border flex gap-3 hover:scale-[1.02] transition"
                >
                  <Presentation className="w-5 h-5" />
                  View PPT
                </a>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Team
                guide={projectInfo["Guide"]}
                coguide={projectInfo["Co-guide"]}
                members={projectInfo["Team Members"]}
                guidePhoto={projectInfo["Guide Photo"]}
                coguidePhoto={projectInfo["Co-guide Photo"]}
                memberPhotos={projectInfo["Photos"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
