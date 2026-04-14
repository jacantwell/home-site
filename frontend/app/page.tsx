import { Hero } from "@/components/landing/hero";
import { AboutUs } from "@/components/landing/about-us";
import { AboutHouse } from "@/components/landing/about-house";
import { ApplicationForm } from "@/components/landing/application-form";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <Hero />
      </div>
      <AboutUs />
      <AboutHouse />
      <ApplicationForm />
    </main>
  );
}
