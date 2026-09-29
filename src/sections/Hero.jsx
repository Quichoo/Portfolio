import { Canvas } from "@react-three/fiber";
import ParticleField from "../components/ParticleField";
import FallingField from "../components/FallingField";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <div
      id="home"
      className="relative pt-16 pb-16 lg:pb-24 px-2 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          {theme === "dark" ? (
            <ParticleField count={250} />
          ) : (
            <FallingField count={200} color="#27af6d" />
          )}
        </Canvas>
      </div>

      <div
        className="absolute -top-24 left-[10%] md:left-[35%] w-[70vw] max-w-[520px] aspect-square rounded-full pointer-events-none blur-[45px] md:blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-green-glow) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <p
          className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
          style={{ color: "var(--color-green)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--color-green)",
              boxShadow: "0 0 8px var(--color-green)",
            }}
          />
          available for select projects
        </p>

        <h1 className="font-display font-semibold leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-3 mb-3">
          Hi, I'm Brian —
          <br />I turn{" "}
          <span
            style={{
              background: "linear-gradient(90deg, var(--color-green), #7CFCC0)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ideas
          </span>
          <br />
          into working websites.
        </h1>

        <p
          className="max-w-3xl text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          I'm a web developer focused on building clean, responsive, and
          functional web applications. I work primarily with React, while
          expanding into Python, backend development, and modern web
          technologies.
        </p>

        <div className="flex gap-3 mt-6">
          <a
            href="#projects"
            className="no-underline inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 md:px-6 md:py-3 rounded-xl transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--color-green)",
              color: "#06120C",
              border: "1px solid var(--color-green)",
            }}
          >
            view projects
          </a>
          <a
            href="#contact"
            className="no-underline text-sm font-medium px-5 py-2.5 md:px-6 md:py-3 rounded-xl transition-colors"
            style={{
              background: "var(--glass-fill)",
              backdropFilter: "blur(var(--glass-blur)) saturate(180%)",
              WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(180%)",
              color: "var(--text-primary)",
              border: "1px solid var(--glass-border)",
            }}
          >
            get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
