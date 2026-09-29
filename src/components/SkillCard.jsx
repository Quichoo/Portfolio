import GlassCard from "./GlassCard";

export default function SkillCard({ category, skills }) {
  return (
    <GlassCard>
      <h3
        className="font-mono text-xs tracking-widest uppercase mb-3"
        style={{ color: "var(--color-green)" }}
      >
        {category}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-xs px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
