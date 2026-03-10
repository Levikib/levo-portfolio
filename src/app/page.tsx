import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedWork from "@/components/sections/FeaturedWork";
import DesignWork from "@/components/sections/DesignWork";
import StorePreview from "@/components/sections/StorePreview";
import BlogPreview from "@/components/sections/BlogPreview";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedWork />
      <DesignWork />
      <StorePreview />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
