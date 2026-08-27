export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`rounded-[18px] p-6 transition-all duration-300 ${hover ? "hover:-translate-y-1" : ""} ${className}`}
      style={{
        background: "var(--glass-fill)",
        backdropFilter: "blur(var(--glass-blur-strong)) saturate(180%)",
        WebkitBackdropFilter: "blur(var(--glass-blur-strong)) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "inset 0 1px 0 var(--glass-sheen)",
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.borderColor = "var(--glass-border-hover)";
        e.currentTarget.style.boxShadow =
          "0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(53,212,136,0.08), inset 0 1px 0 var(--glass-sheen)";
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        e.currentTarget.style.borderColor = "var(--glass-border)";
        e.currentTarget.style.boxShadow = "inset 0 1px 0 var(--glass-sheen)";
      }}
    >
      {children}
    </div>
  );
}
