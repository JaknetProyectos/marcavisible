import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { StorySection } from "@/components/home/story-section";
import { DifferenceSection } from "@/components/home/difference-section";
import { ContactSection } from "@/components/home/contact-section";
import { ContactForm } from "@/components/home/contact-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StorySection />
      <DifferenceSection />
      <ContactSection />
      <ContactForm />
    </>
  );
}
