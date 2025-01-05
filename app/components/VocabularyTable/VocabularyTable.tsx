import { SpeakerLoudIcon } from "@radix-ui/react-icons";
import { speak } from "@/helpers";
import { motion } from "framer-motion";

interface VocabularyItem {
  polish: string;
  pronunciation: string;
  translation: string;
  context?: string;
}

interface VocabularyTableProps {
  title: string;
  items: VocabularyItem[];
  className?: string;
}

export const VocabularyTable = ({
  title,
  items,
  className = "",
}: VocabularyTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-xl border border-gray-700 ${className}`}
    >
      <div className="bg-gray-800/50 px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-indigo-400">{title}</h3>
      </div>

      <div className="divide-y divide-gray-700">
        {items.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-900/30 hover:bg-gray-800/30 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speak(item.polish)}
                  className="text-xl font-medium text-white hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  {item.polish}
                  <SpeakerLoudIcon className="w-5 h-5 text-gray-400 hover:text-gray-300" />
                </button>
              </div>
              <p className="text-sm text-gray-400">[{item.pronunciation}]</p>
            </div>

            <div className="flex flex-col items-start sm:items-end flex-1">
              <p className="text-gray-300">{item.translation}</p>
              <span className="text-sm text-indigo-400">{item.context}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
