import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Quote } from "lucide-react";

const AboutCanvas = lazy(() => import("@/components/AboutCanvas"));

const education = [
  {
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    institution: "Modern Education Society's Wadia College of Engineering, Pune",
    status: "Currently Pursuing",
    color: "#a855f7",
  },
  {
    degree: "Diploma in Computer Engineering",
    field: "Computer Engineering",
    institution: "JSPM Hadapsar, Pune",
    status: "Completed — 89.90%",
    color: "#06b6d4",
  },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
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
            <span className="rgb-text">ABOUT ME</span>
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4, #ec4899)" }}
          />
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Intro */}
            <FadeInSection>
              <div
                className="glass rounded-2xl p-6"
                style={{ border: "1px solid rgba(168,85,247,0.2)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse-neon"
                    style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }}
                  />
                  <span className="text-sm text-muted-foreground font-mono tracking-wider">
                    profile.txt
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  I am{" "}
                  <span className="text-white font-semibold">Omkar Harihar</span>, a passionate
                  Computer Engineering student with a strong interest in software development and
                  problem-solving. I enjoy turning ideas into practical solutions using programming
                  and logical thinking.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  I am continuously learning new technologies and improving my skills to become{" "}
                  <span style={{ color: "#a855f7" }}>industry-ready</span>.
                </p>
              </div>
            </FadeInSection>

            {/* Location */}
            <FadeInSection delay={0.1}>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" style={{ color: "#06b6d4" }} />
                <span className="text-sm">Pune, Maharashtra, India</span>
              </div>
            </FadeInSection>

            {/* Education Timeline */}
            <FadeInSection delay={0.2}>
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" style={{ color: "#a855f7" }} />
                  Education
                </h2>
                <div className="space-y-4 relative">
                  {/* Timeline line */}
                  <div
                    className="absolute left-3 top-2 bottom-2 w-px"
                    style={{ background: "linear-gradient(180deg, #a855f7, #06b6d4)" }}
                  />
                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      viewport={{ once: true }}
                      className="pl-10 relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute left-0 top-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: `${edu.color}20`,
                          border: `2px solid ${edu.color}`,
                          boxShadow: `0 0 10px ${edu.color}60`,
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: edu.color }}
                        />
                      </div>

                      <div
                        className="glass rounded-xl p-4"
                        style={{ border: `1px solid ${edu.color}20` }}
                      >
                        <div className="text-sm font-bold text-white">{edu.degree}</div>
                        <div
                          className="text-xs mb-1"
                          style={{ color: edu.color }}
                        >
                          {edu.field}
                        </div>
                        <div className="text-xs text-muted-foreground">{edu.institution}</div>
                        <div
                          className="text-xs mt-2 font-mono"
                          style={{ color: "#10b981" }}
                        >
                          {edu.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right: 3D Panel */}
          <FadeInSection delay={0.3}>
            <div className="h-80 lg:h-[500px] relative">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full animate-spin-slow" style={{ border: "2px solid transparent", borderTop: "2px solid #a855f7" }} />
                </div>
              }>
                <AboutCanvas />
              </Suspense>
            </div>
          </FadeInSection>
        </div>

        {/* Quote / Personal Branding */}
        <FadeInSection delay={0.2}>
          <div className="text-center max-w-2xl mx-auto">
            <Quote className="w-8 h-8 mx-auto mb-4 rgb-glow" style={{ color: "#a855f7" }} />
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed relative">
              "A motivated computer engineering student focused on{" "}
              <span className="rgb-text font-bold">
                building real-world solutions
              </span>{" "}
              through code."
            </p>
            {/* Neon underline */}
            <div
              className="h-0.5 mx-auto mt-4 rounded-full"
              style={{
                width: "60%",
                background: "linear-gradient(90deg, transparent, #a855f7, #06b6d4, #ec4899, transparent)",
              }}
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
