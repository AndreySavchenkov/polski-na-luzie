import { motion, AnimatePresence } from "framer-motion";

interface ScoreAnimationProps {
  show: boolean;
}

export const ScoreAnimation = ({ show }: ScoreAnimationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12, x: -15 }}
            animate={{ opacity: 1, y: -5, x: -35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-2 -right-2 text-green-500 font-bold"
          >
            +1
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full border-2 border-green-500"
          />
        </>
      )}
    </AnimatePresence>
  );
};
