import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import GlassCard from "./GlassCard";

export default function ProjectCard({
  title,
  description,
  tags,
  sourceUrl,
  demoUrl,
  image,
}) {
  const cardRef = useRef(null);

  // Raw mouse position within the card, normalized to -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out sudden mouse jumps so the tilt feels fluid, not jittery
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  // Map normalized position to a small rotation range — kept subtle per the brief
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
    >
      <GlassCard>
        <div
          className="h-[250px] rounded-xl mb-4.5 overflow-hidden flex items-center justify-center font-mono text-xs"
          style={{
            background:
              "linear-gradient(135deg, rgba(53,212,136,0.12), rgba(53,212,136,0.02))",
            border: "1px solid var(--glass-border)",
            color: "var(--text-muted)",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={`${title} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            "preview image"
          )}
        </div>

        <h3 className="font-display font-semibold text-lg xl:text-xl mb-2">
          {title}
        </h3>
        <p
          className="text-sm xl:text-base leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              source ↗
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              live demo ↗
            </a>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
