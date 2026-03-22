import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const SkillsCanvas = lazy(() => import("@/components/SkillsCanvas"));

const skillCategories = [
  {
    title: "Programming Languages",
    color: "#a855f7",
    skills: [
      { name: "Java", level: 80 },
      { name: "C", level: 75 },
      { name: "C++", level: 72 },
    ],
  },
  {
    title: "Web Technologies",
    color: "#06b6d4",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 78 },
    ],
  },
  {
    title: "Database",
    color: "#ec4899",
    skills: [
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Core Concepts",
    color: "#3b82f6",
    skills: [
      { name: "OOPs", level: 82 },
      { name: "DBMS", level: 75 },
      { name: "Data Structures", level: 70 },
    ],
  },
  {
    title: "Tools",
    color: "#10b981",
    skills: [
      { name: "VS Code", level: 88 },
      { name: "Eclipse", level: 75 },
      { name: "Git", level: 65 },
      { name: "MS Office", level: 85 },
    ],
  },
  {
    title: "Soft Skills",
    color: "#f59e0b",
    skills: [
      { name: "Communication", level: 88 },
      { name: "Quick Learner", level: 92 },
      { name: "Team Player", level: 90 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="mb-3"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 shimmer"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", backgroundSize: "200% 100%", animation: "shimmer 2s linear infinite" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
      style={{
        border: `1px solid ${category.color}20`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${category.color}25, 0 0 40px ${category.color}10`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <h3
        className="font-display text-sm font-bold tracking-wider mb-4 uppercase"
        style={{ color: category.color }}
      >
        {category.title}
      </h3>
      <div>
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Neon badges */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t" style={{ borderColor: `${category.color}15` }}>
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="px-2 py-0.5 text-xs rounded-full"
            style={{
              background: `${category.color}12`,
              border: `1px solid ${category.color}30`,
              color: category.color,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4">
            <span className="rgb-text">SKILLS</span>
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4, #ec4899)" }}
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* 3D Orbs Canvas */}
        <div className="h-52 mb-12 relative">
          <Suspense fallback={null}>
            <SkillsCanvas />
          </Suspense>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
