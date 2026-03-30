// src/app/page.tsx — Home page (route: /)

import HeroBanner from '@/components/features/home/HeroBanner';
import EventsPreview from '@/components/features/home/EventsPreview';
import ProgramTeaser from '@/components/features/home/ProgramTeaser';
import ProjectsPreview from '@/components/features/home/ProjectsPreview';
import SocialCta from '@/components/features/home/SocialCta';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <EventsPreview />
      <ProgramTeaser />
      <ProjectsPreview />
      <SocialCta />
    </>
  );
}
