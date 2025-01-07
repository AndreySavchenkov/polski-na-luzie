import { lazy, Suspense } from "react";
import { useParams } from "next/navigation";

const Lesson1 = lazy(() => import("./components/Lesson1"));
const Lesson2 = lazy(() => import("./components/Lesson2"));
const Lesson3 = lazy(() => import("./components/Lesson3"));
const Lesson4 = lazy(() => import("./components/Lesson4"));

const lessons = [
  {
    id: "677a694b2b7dcea86fc71198",
    component: Lesson1,
  },
  {
    id: "677bcbe9adb6f974bd2473af",
    component: Lesson2,
  },
  {
    id: "677c34ecadb6f974bd2474d9",
    component: Lesson3,
  },
  {
    id: "677cca2e01aac7136b90af48",
    component: Lesson4,
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
