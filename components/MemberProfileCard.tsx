import { Member } from "@/types";
import { BadgeCheck, Phone } from "lucide-react";

export default function MemberProfileCard({ member }: { member: Member }) {
  const url = `/members/${member.id}`;

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-sky/30 bg-gradient-to-br from-panel to-night p-4 shadow-command sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="grid h-32 w-32 shrink-0 place-items-center self-center rounded-2xl border border-sky/25 bg-sky/10 text-4xl font-black text-sky sm:h-40 sm:w-40 sm:text-5xl md:self-start">
          {member.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="kicker justify-center md:justify-start">Digital Membership ID</p>
          <h1 className="heading-md mt-4 break-words">{member.name}</h1>
          <p className="mt-2 text-sm text-sky sm:text-base">{member.rank} • {member.unit}</p>
          <div className="mt-6 grid gap-3 text-left text-sm text-steel sm:grid-cols-2">
            <p><b className="text-white">Department:</b> {member.department}</p>
            <p><b className="text-white">Status:</b> {member.status}</p>
            <p className="flex items-center gap-2"><Phone size={16} /> {member.phone}</p>
            <p><b className="text-white">Emergency:</b> {member.emergencyContact}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-sky/20 bg-night/70 p-4 sm:p-5">
        <p className="flex flex-wrap items-center gap-2 text-sm font-black uppercase text-white">
          <BadgeCheck className="text-sky" /> QR-Code Ready Profile URL
        </p>
        <code className="mt-3 block overflow-x-auto rounded-xl bg-black/30 p-3 text-xs text-sky sm:text-sm">{url}</code>
      </div>
    </div>
  );
}
