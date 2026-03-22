import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code2, Globe, Cpu, ShoppingCart } from "lucide-react";

const projects = [
  {
    title: "Online Hospital",
    subtitle: "MERN Stack & SQL",
    description: "A comprehensive hospital management system with patient registration, appointment scheduling, doctor management, and medical records using MERN stack integrated with SQL database.",
    tags: ["MongoDB", "Express", "React", "Node.js", "SQL"],
    icon: Globe,
    color: "#a855f7",
    gradient: "from-purple-600/20 to-purple-900/10",
  },
  {
    title: "Personal Portfolio",
    subtitle: "React + Three.js",
    description: "This very portfolio — a futuristic 3D animated portfolio website featuring RGB neon effects, React Three Fiber 3D visuals, and smooth multi-page transitions.",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind"],
    icon: Code2,
    color: "#06b6d4",
    gradient: "from-cyan-600/20 to-cyan-900/10",
  },
  {
    title: "E-Commerce Website",
    subtitle: "Full-Stack",
    description: "A fully functional e-commerce platform with product catalog, shopping cart, user authentication, and a complete checkout flow for online shopping experience.",
    tags: ["HTML", "CSS", "JavaScript", "SQL"],
    icon: ShoppingCart,
    color: "#ec4899",
    gradient: "from-pink-600/20 to-pink-900/10",
  },
  {
    title: "Smart Mini Computer",
    subtitle: "Hardware & Software",
    description: "An innovative smart mini computer project combining hardware design with software implementation, showcasing skills in embedded systems and computer architecture.",
    tags: ["C", "Hardware", "Embedded", "Systems"],
    icon: Cpu,
    color: "#3b82f6",
    gradient: "from-blue-600/20 to-blue-900/10",
  },
];

function TiltCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const rgbColors = [project.color, "#a855f7", "#06b6d4", "#ec4899"];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); setColorIndex((colorIndex + 1) % rgbColors.length); }}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-2xl cursor-pointer"
    >
      {/* RGB Animated Border */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `linear-gradient(135deg, ${project.color}, #a855f7, #06b6d4, #ec4899)`,
          backgroundSize: "300% 300%",
          animation: isHovered ? "rgb-text-shift 2s linear infinite" : "none",
          padding: "2px",
          borderRadius: "1rem",
        }}
      />

      <div
        className={`relative glass-dark rounded-2xl p-6 h-full bg-gradient-to-br ${project.gradient}`}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="p-3 rounded-xl"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              boxShadow: `0 0 15px ${project.color}30`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: project.color }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display tracking-wide">{project.title}</h3>
            <p className="text-sm" style={{ color: project.color }}>{project.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full font-medium"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4">
            <span className="rgb-text">PROJECTS</span>
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4, #ec4899)" }} />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Real-world solutions built with passion and precision
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project, i) => (
            <TiltCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
