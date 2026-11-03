import { HeroSection } from "@/domains/about/components/HeroSection";
import { AboutSection } from "@/domains/about/components/AboutSection";
import { ProjectDisplay } from "@/domains/projects/components/ProjectDisplay";
import { ExperienceTimeline } from "@/domains/experience/components/ExperienceTimeline";
import { BlogFeed } from "@/domains/blog/components/BlogFeed";
import { ContactForm } from "@/domains/contact/components/ContactForm";
import { StarDust } from "@/domains/contact/components/StarDust";

export default function PortfolioHome() {
  return (
    <main className="text-slate-50 min-h-screen">
      {/* 0. Hero - Earth/Space Entrance */}
      <HeroSection />

      {/* 1. About - 소개 · 스킬 · 수상 */}
      <AboutSection />

      {/* 2. Projects - Flight/Travel Concept */}
      <ProjectDisplay />

      {/* 3. Experience - Flight Log Timeline */}
      <ExperienceTimeline />

      {/* 4. Blog - Transmission Feed */}
      <BlogFeed />

      {/* 5. Contact - Space terminal */}
      <ContactForm />

      {/* 푸터에서 About까지 좌우 여백으로 떠오르는 별 */}
      <StarDust topId="about" />
    </main>
  );
}
