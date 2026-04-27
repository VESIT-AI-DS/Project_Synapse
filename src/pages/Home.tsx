import homeLogo from "../assets/images/home_logo.png";
import { ProjectTable } from "../components";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className=" min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Institution Info */}
          <div className="mb-8 md:mb-12">
            <p className="text-lg md:text-xl font-semibold text-slate-700 mb-6">Department of Artificial Intelligence & Data Science</p>

            <img src={homeLogo} alt="VESIT Logo" className="w-24 h-full mx-auto mb-8 drop-shadow-lg" />
            <div className="space-y-2 mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-red-700 leading-tight">Vivekanand Education Society&apos;s</h1>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 ">Institute of Technology</h2>
            </div>
            <p className="text-slate-600 text-base md:text-lg font-medium max-w-2xl mx-auto mb-4">
              An <span className="font-semibold">Autonomous Institute</span> Affiliated to University of Mumbai,
            </p>
            <p className="text-slate-600 text-base md:text-lg font-medium">
              Approved by <span className="font-semibold">AICTE</span> & Recognized by <span className="font-semibold">Govt. of Maharashtra</span>
            </p>
          </div>

          {/* Project Synapse Section */}
          <div className="mb-16 md:mb-20">
            <p className="text-5xl md:text-7xl font-bold text-yellow-500  mb-3">Project Synapse</p>
            <p className="text-slate-600 text-lg md:text-xl font-medium">BE Major Projects, Academic Year 2023-24</p>
          </div>

          {/* Animated Robot */}
          {/* <div className="relative mb-12 md:mb-20">
            <div className="flex flex-col items-center">
              <img src={airobo} alt="AI Robot" className="w-48 md:w-64 animate-bounce drop-shadow-2xl" />
              <img src={airoboshadow} alt="Robot Shadow" className="w-48 md:w-64 -mt-8 animate-pulse opacity-60" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white">
        <ProjectTable />
      </div>
    </div>
  );
}
