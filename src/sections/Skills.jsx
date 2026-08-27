import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCard from "../components/SkillCard";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: "frontend",
    skills: ["React", "Vite", "Next.js", "JavaScript", "Tailwind CSS"],
  },
  {
    category: "backend & data",
    skills: [
      "Python",
      "Django",
      "Firebase",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    category: "development tools",
    skills: ["Git", "GitHub", "VS Code", "Cursor", "Claude Code"],
  },
  {
    category: "design & creative",
    skills: ["Figma", "UI Design", "Prototyping", "Responsive Design"],
  },
  {
    category: "other interests",
    skills: [
      "AI Tools",
      "Automation",
      "Web Research",
      "Data Management",
      "Technical Troubleshooting",
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".skill-reveal");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-16 lg:py-24 px-2">
      <p
        className="font-mono text-xs tracking-widest uppercase mb-2.5"
        style={{ color: "var(--color-green)" }}
      >
        capabilities
      </p>
      <h2 className="font-display font-semibold text-2xl md:text-3xl xl:text-4xl mb-6">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category} className="skill-reveal">
            <SkillCard category={group.category} skills={group.skills} />
          </div>
        ))}
      </div>
    </section>
  );
}
