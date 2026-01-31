interface AuthorCardProps {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string | null;
}

const AuthorCard = ({ name, role, bio, avatarUrl }: AuthorCardProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className="h-full w-full object-cover" src={avatarUrl} />
        ) : (
          initials
        )}
}

const AuthorCard = ({ name, role, bio }: AuthorCardProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>
      <div className="flex-1">
        <p className="text-base font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
        <p className="mt-2 text-sm text-slate-600">{bio}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
