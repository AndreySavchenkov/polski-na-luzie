import { lazy, Suspense } from "react";
import { useParams } from "next/navigation";

const Lesson1 = lazy(() => import("./components/Lesson1/Lesson1"));

const lessons = [
  {
    id: "677a694b2b7dcea86fc71198",
    component: Lesson1,
  },
];

export const Theory = () => {
  const params = useParams();
  const currentLesson = lessons.find((lesson) => lesson.id === params.lessonId);

  if (!currentLesson) {
    return (
      <div className="text-center text-gray-400">
        Теоретический материал для этого урока пока не доступен
      </div>
    );
  }

  const LessonComponent = currentLesson.component;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Suspense fallback={<div>Загрузка...</div>}>
        <LessonComponent />
      </Suspense>
    </div>
  );
};
