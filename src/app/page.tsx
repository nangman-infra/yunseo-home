import { HeroSection } from "@/domains/about/components/HeroSection";
import { ProjectDisplay } from "@/domains/projects/components/ProjectDisplay";
import { ExperienceTimeline } from "@/domains/experience/components/ExperienceTimeline";
import { BlogFeed } from "@/domains/blog/components/BlogFeed";
import { ContactForm } from "@/domains/contact/components/ContactForm";

export default function PortfolioHome() {
  return (
    <main className="bg-[#0A0A0A] text-slate-50 min-h-screen">
      {/* 1. About - Earth/Space Entrance */}
      <HeroSection />

      {/* 2. Projects - Flight/Travel Concept */}
      <ProjectDisplay />

      {/* 3. Experience - Flight Log Timeline */}
      <ExperienceTimeline />

      {/* 4. Blog - Transmission Feed */}
      <BlogFeed />

      {/* 5. Contact - Space terminal */}
      <ContactForm />
    </main>
  );
}
