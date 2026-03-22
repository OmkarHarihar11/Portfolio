import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Star, Award, BookOpen, Target, Zap } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "2nd Prize — DiPEx 25's at COEP",
    description: "Secured 2nd place at the prestigious DiPEx 25 competition held at College of Engineering, Pune — competing against top engineering teams.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Star,
    title: "5+ Competition Wins",
    description: "Won and achieved runner-up positions in more than 5 technical competitions, demonstrating consistent excellence in problem-solving and innovation.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    icon: Award,
    title: "12+ Project Competitions",
    description: "Actively participated in over 12 project competitions, showcasing diverse technical skills and a passion for building real-world solutions.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: BookOpen,
    title: "Java Placement Training",
    description: "Currently enrolled in an intensive Java Placement Training Program, building a strong foundation in core Java, OOP concepts, and DSA for career readiness.",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: Target,
    title: "Interview Preparation",
    description: "Actively preparing for technical interviews by practicing data structures, algorithms, and aptitude — committed to becoming industry-ready.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Zap,
    title: "Technical Clubs & Innovation",
    description: "Interested in and actively pursuing opportunities in technical clubs and innovation activities to collaborate, learn, and build cutting-edge projects.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
  },
];

const stats = [
  { value: 12, suffix: "+", label: "Project Competitions" },
  { value: 5, suffix: "+", label: "Competition Wins" },
  { value: 4, suffix: "", label: "Major Projects" },
  { value: 89, suffix: ".9%", label: "Diploma Score" },
];

function CounterNumber({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (value / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-black rgb-text">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-1">{label}</div>
    </div>
  );
}

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const Icon = achievement.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl p-5 glass transition-all duration-300"
      style={{
        border: `1px solid ${achievement.color}30`,
        boxShadow: hovered ? `0 0 20px ${achievement.glow}, 0 0 40px ${achievement.glow}` : "none",
      }}
    >
      <div className="flex gap-4 items-start">
        <motion.div
          animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="p-3 rounded-xl flex-shrink-0"
          style={{
            background: `${achievement.color}15`,
            border: `1px solid ${achievement.color}40`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: achievement.color }} />
        </motion.div>
        <div>
          <h3
            className="font-bold text-base mb-1"
            style={{ color: hovered ? achievement.color : "white" }}
          >
            {achievement.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
        </div>
      </div>

      {/* Particle dots on hover */}
      {hovered && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [(Math.random() - 0.5) * 80],
                y: [(Math.random() - 0.5) * 80],
              }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                background: achievement.color,
                top: "50%",
                left: "10%",
                boxShadow: `0 0 6px ${achievement.color}`,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

export default function AchievementsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4">
            <span className="rgb-text">ACHIEVEMENTS</span>
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4, #ec4899)" }} />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Milestones of excellence and relentless pursuit of growth
          </p>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 glass rounded-2xl p-8"
          style={{ border: "1px solid rgba(168,85,247,0.2)" }}
        >
          {stats.map((stat) => (
            <CounterNumber key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
