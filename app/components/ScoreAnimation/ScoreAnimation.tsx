import { motion, AnimatePresence } from "framer-motion";

interface ScoreAnimationProps {
  show: boolean;
}

export const ScoreAnimation = ({ show }: ScoreAnimationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -125 }}
          animate={{ opacity: 1,  y: -2, x: -22}}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-2 right-0 text-green-500 font-bold"
        >
          +1
        </motion.div>
      )}
    </AnimatePresence>
  );
};
