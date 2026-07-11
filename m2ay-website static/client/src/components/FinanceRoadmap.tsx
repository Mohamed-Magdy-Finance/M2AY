import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  chapters: number[];
}

const stages: RoadmapStage[] = [
  {
    id: "foundation",
    title: "Foundation",
    description: "Philosophy & Core Concepts",
    chapters: [1, 2, 3, 4],
  },
  {
    id: "analysis",
    title: "Analysis",
    description: "Financial Modeling & Frameworks",
    chapters: [5, 6, 7, 8, 9],
  },
  {
    id: "strategy",
    title: "Strategy",
    description: "Business & Career Strategy",
    chapters: [10, 11, 12, 13, 14],
  },
  {
    id: "execution",
    title: "Execution",
    description: "Practical Tools & Templates",
    chapters: [15, 16, 17, 18, 19],
  },
  {
    id: "leadership",
    title: "Leadership",
    description: "CFO & Executive Skills",
    chapters: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  },
];

interface FinanceRoadmapProps {
  currentChapterId?: number;
  language: "en" | "ar";
}

export default function FinanceRoadmap({ currentChapterId = 0, language }: FinanceRoadmapProps) {
  const currentStageIndex = stages.findIndex((stage) =>
    stage.chapters.includes(currentChapterId)
  );

  const progressPercentage = ((currentStageIndex + 1) / stages.length) * 100;

  return (
    <div className="py-12 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">
          {language === "en" ? "Your Learning Journey" : "رحلتك التعليمية"}
        </h3>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 text-center">
            {language === "en"
              ? `${Math.round(progressPercentage)}% Complete`
              : `${Math.round(progressPercentage)}% مكتمل`}
          </p>
        </div>

        {/* Roadmap Stages */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                    : isCurrent
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-lg"
                      : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {stage.title}
                  </h4>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Circle className="w-5 h-5 text-blue-500" />
                    </motion.div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {stage.description}
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                  {language === "en"
                    ? `${stage.chapters.length} chapters`
                    : `${stage.chapters.length} فصول`}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Current Stage Info */}
        {currentStageIndex >= 0 && currentStageIndex < stages.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 p-4 bg-white dark:bg-slate-700 rounded-lg border-l-4 border-blue-500"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {language === "en"
                ? `You are currently in the "${stages[currentStageIndex].title}" stage. Keep exploring to unlock the next level!`
                : `أنت حالياً في مرحلة "${stages[currentStageIndex].title}". استمر في الاستكشاف لفتح المستوى التالي!`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
