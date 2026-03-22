import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, Send, Zap } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "omkarharihar1118@gmail.com",
    href: "mailto:omkarharihar1118@gmail.com",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/omkarharihar",
    href: "https://linkedin.com/in/omkarharihar",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/OmkarHarihar11",
    href: "https://github.com/OmkarHarihar11",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
  },
];

function FloatingParticle({ delay, color }: { delay: number; color: string }) {
  const randX = Math.random() * 100;
  const randSize = 3 + Math.random() * 5;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: randSize,
        height: randSize,
        left: `${randX}%`,
        background: color,
        boxShadow: `0 0 ${randSize * 2}px ${color}`,
      }}
      animate={{
        y: [0, -120, 0],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      initial={{ bottom: "0%" }}
    />
  );
}

export default function ContactPage() {
  const particleColors = ["#a855f7", "#06b6d4", "#ec4899", "#3b82f6"];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Floating Particles BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.4}
            color={particleColors[i % particleColors.length]}
          />
        ))}
      </div>

      {/* Radial glow BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(168,85,247,0.12), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4">
            <span className="rgb-text">CONTACT</span>
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4, #ec4899)" }}
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Let's connect and build something amazing together
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rgb-border-animated mb-8"
        >
          <div className="glass-dark rounded-2xl p-8 md:p-10">
            {/* Name & Status */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-display text-xl font-black"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                  boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                }}
              >
                OH
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Omkar Harihar</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse-neon"
                    style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }}
                  />
                  Open to opportunities
                </div>
              </div>
              <Zap
                className="ml-auto w-5 h-5 rgb-glow"
                style={{ color: "#a855f7" }}
              />
            </div>

            {/* Contact Links */}
            <div className="space-y-4">
              {contacts.map((contact, i) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                    style={{
                      background: `${contact.color}08`,
                      border: `1px solid ${contact.color}20`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${contact.glow}`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${contact.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.borderColor = `${contact.color}20`;
                    }}
                  >
                    <div
                      className="p-2.5 rounded-lg flex-shrink-0"
                      style={{
                        background: `${contact.color}15`,
                        border: `1px solid ${contact.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: contact.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-0.5">{contact.label}</div>
                      <div className="text-sm text-white truncate font-medium">{contact.value}</div>
                    </div>
                    <ExternalLink
                      className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      style={{ color: contact.color }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="mailto:omkarharihar1118@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              boxShadow: "0 0 20px rgba(168,85,247,0.4), 0 0 40px rgba(6,182,212,0.2)",
            }}
          >
            <Send className="w-4 h-4" />
            Send a Message
          </a>
        </motion.div>
      </div>
    </div>
  );
}
