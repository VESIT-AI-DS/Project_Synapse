export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 py-8 md:py-12 border-t  mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-lg">
              © {currentYear} <span className="font-semibold text-white">Project Synapse</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
