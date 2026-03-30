// src/app/program/page.tsx — Program page (route: /program)
// Lists courses and workshops, data fetched server-side

import { getCourses } from '@/services/programService';
import CourseCard from '@/components/features/program/CourseCard';
import PageWrapper from '@/components/layout/PageWrapper';

export default async function ProgramPage() {
  const courses = await getCourses();

  return (
    <PageWrapper>
      <h1>Programme BUT MMI</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
