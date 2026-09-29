import GlassCard from "../components/GlassCard";

export default function About() {
  return (
    <section id="about" className="py-12 lg:py-16 px-4 md:px-8">
      <div className="mx-auto max-w-[900px]">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--color-green)" }}
        >
          who I am
        </p>
        <h2 className="font-display font-semibold text-xl md:text-2xl xl:text-3xl mb-4">
          About
        </h2>

        <div className="flex flex-col md:flex-row gap-5 items-start">
          <GlassCard
            hover={false}
            className="w-[280px] md:w-[200px] mx-auto md:mx-0 shrink-0 flex flex-col items-center text-center"
          >
            <div
              className="w-full aspect-[3/4] rounded-xl mb-3 overflow-hidden flex items-center justify-center"
              style={{
                background: "var(--charcoal-2)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <img
                src="/profile.png"
                alt="Brian Quicho"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-display font-semibold text-sm">Brian Quicho</p>
            <p
              className="font-mono text-xs mt-0.5"
              style={{ color: "var(--color-green)" }}
            >
              web developer
            </p>
            <div
              className="flex items-center gap-1.5 mt-2.5 px-2 py-0.5 rounded-full font-mono text-[10px]"
              style={{
                background: "var(--color-green-glow)",
                color: "var(--color-green)",
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--color-green)" }}
              />
              available
            </div>
          </GlassCard>

          <GlassCard hover={false} className="flex-1">
            <p
              className="text-xs md:text-sm leading-relaxed mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              I'm Brian, a developer and technology enthusiast based in Porac,
              Pampanga. My main focus is web development, but I'm interested in
              much more than just building websites. I enjoy exploring different
              technologies, experimenting with new ideas, and working on projects
              that challenge me to learn something new.
            </p>
            <p
              className="text-xs md:text-sm leading-relaxed mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              I primarily work with React and modern frontend technologies, and I
              also have experience building full-stack applications, working with
              databases, APIs, authentication, and backend systems. I'm currently
              expanding further into Python and backend development while
              exploring other tools and frameworks that can help me build better
              and more complete products.
            </p>
            <p
              className="text-xs md:text-sm leading-relaxed mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Outside of development, I enjoy working on personal projects,
              learning about technology, staying active, gaming, and exploring
              different interests. I like taking an idea and turning it into
              something tangible—whether that's a web application, a small
              experiment, a tool that solves a problem, or simply something I
              built out of curiosity.
            </p>
            <p
              className="text-xs md:text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I'm still growing as a developer, and that's something I genuinely
              enjoy. Rather than limiting myself to one stack or one type of
              project, I want to keep learning, experimenting, and building. My
              long-term goal is to create useful, well-designed digital products
              and reusable systems that can solve real problems for people and
              businesses.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
