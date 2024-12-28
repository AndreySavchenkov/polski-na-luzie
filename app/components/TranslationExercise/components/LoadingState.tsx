import { TimerIcon } from "@radix-ui/react-icons";


export const LoadingState = () => (
  <div className="flex gap-2 items-center justify-center mt-4">
    <TimerIcon className="animate-spin" />
    <h2>Подготовка урока...</h2>
  </div>
);