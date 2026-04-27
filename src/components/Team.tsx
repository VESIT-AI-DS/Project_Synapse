import Person from "./Person";

interface TeamProps {
  guide: string;
  coguide?: string;
  members: string[];
  guidePhoto?: string;
  coguidePhoto?: string;
  memberPhotos: string[];
}

export default function Team({
  guide,
  coguide,
  members,
  guidePhoto,
  coguidePhoto,
  memberPhotos,
}: TeamProps) {
  return (
    <div className="flex flex-col md:gap-10 mt-10 md:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
  <div className="flex flex-col items-center gap-2">
    <p className="text-sm font-bold uppercase tracking-wide">
      Guide
    </p>
    <Person name={guide} photo={guidePhoto || ""} />
  </div>

  {coguide && (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-bold uppercase tracking-wide">
        Co-guide
      </p>
      <Person name={coguide} photo={coguidePhoto || ""} />
    </div>
  )}
</div>

      <div className="flex flex-col gap-5">
        <p className="font-medium text-xl">Team</p>

        <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-5">
          {members.map((member, index) => (
            <Person
              key={member}
              name={member}
              photo={memberPhotos[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}