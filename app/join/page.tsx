import type { Metadata } from "next";import SectionHeader from "@/components/SectionHeader";import RegistrationForm from "@/components/RegistrationForm";
export const metadata:Metadata={title:"Join Us",description:"Register to join the Boys Brigade."};
export default function Join(){return <section className="section-pad min-h-screen bg-panel/40 pt-28 sm:pt-32"><div className="container-pad"><SectionHeader title="Answer The Call" subtitle="Submit your recruitment details and prepare to begin the journey of faith, discipline, and leadership."/><RegistrationForm/></div></section>}
