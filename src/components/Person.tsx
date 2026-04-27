import validator from "validator";
import defaultProfile from "../assets/images/default_profile.png";

export default function Person({ name, photo }: { name: string; photo: string }) {
  const photoUrl = photo && validator.isURL(photo) ? photo : defaultProfile;

  return (
    <div className="group flex flex-col items-center">
      {/* Profile Card Container */}
      <div className="relative">
        {/* Glow Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 to-slate-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>

        {/* Profile Image */}
        <div className="relative w-36 h-36">
          <img
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
            src={photoUrl}
            alt={name}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-slate-900">{name}</p>
      </div>
    </div>
  );
}
