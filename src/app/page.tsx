import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedWork from "@/components/sections/FeaturedWork";
import SkillsStack from "@/components/sections/SkillsStack";
import ByTheNumbers from "@/components/sections/ByTheNumbers";
import Timeline from "@/components/sections/Timeline";
import Terminal from "@/components/sections/Terminal";
import DesignWork from "@/components/sections/DesignWork";
import BlogPreview from "@/components/sections/BlogPreview";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedWork />
      <SkillsStack />
      <ByTheNumbers />
      <Timeline />
      <Terminal />
      <DesignWork />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
