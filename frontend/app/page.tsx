import { Hero } from "@/components/landing/hero";
import { AboutUs } from "@/components/landing/about-us";
import { AboutHouse } from "@/components/landing/about-house";
import { ApplicationForm } from "@/components/landing/application-form";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4">
      <Hero />
      <Separator />
      <AboutUs />
      <Separator />
      <AboutHouse />
      <Separator />
      <ApplicationForm />
    </main>
  );
}
