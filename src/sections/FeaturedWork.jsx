import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Chess Openings Coach",
    description:
      "An AI-powered chess openings coach — real-time opening analysis, personalized training plans, and interactive lessons powered by chess engines and LLMs. Built with React, TypeScript, Vite, and Groq API.",
    tags: ["typescript", "react", "vite", "chess.js", "react-chessboard", "eve", "groq api"],
    sourceUrl: "https://github.com/Quichoo/chess-coach",
    demoUrl: "https://chess-coach-frontend-six.vercel.app/",
    image: "/Chess-coach-ai.png",
    isAI: true,
  },
  {
    title: "Resumator V2",
    description:
      "AI-driven resume builder — generates tailored resumes and cover letters from job descriptions using LLMs, with ATS optimization, real-time preview, and export to PDF. Built with Next.js, TypeScript, Mantine, PostgreSQL, Neon, Drizzle ORM, Better Auth, and Eve.",
    tags: ["typescript", "next.js", "react", "mantine", "postgresql", "neon", "drizzle orm", "better auth", "eve"],
    sourceUrl: "https://github.com/Quichoo/ResumatorV2",
    demoUrl: "https://resumator-v2.vercel.app/sign-in",
    image: "/Resumator.png",
    isAI: true,
  },
  {
    title: "Fitness AI",
    description:
      "An AI-integrated fitness companion — Django REST backend with Supabase, an AI coach layer for workout guidance, and a React/TypeScript frontend deployed across Render and Vercel.",
    tags: ["react", "typescript", "django", "supabase"],
    sourceUrl: "https://github.com/Quichoo/fitness-ai",
    demoUrl: "https://fitness-ai-sepia.vercel.app/",
    image: "/fitness-ai.png",
    isAI: true,
  },
  {
    title: "Pickle Cave",
    description:
      "A full-stack booking system for an indoor pickleball venue — live availability, contiguity-checked reservations, real-time admin notifications, and a full admin panel, deployed and running for an actual business.",
    tags: ["next.js", "typescript", "supabase", "mui"],
    sourceUrl: "https://github.com/Quichoo/pickle-cave",
    demoUrl: "https://pickle-cave-blush.vercel.app/",
    image: "/pickle-cave.png",
    isAI: false,
  },
  {
    title: "He[art] 'n Crumbs",
    description:
      "A cookie ordering and admin dashboard app for a home-based bakery — dynamic Firestore-backed catalog, real-time order notifications, sales reporting with PDF/Excel export.",
    tags: ["react", "firebase", "tailwind"],
    sourceUrl: "https://github.com/Quichoo/heart-n-crumbs",
    demoUrl: "https://heart-in-crumbles.web.app/",
    image: "/heart-n-crumbs.png",
    isAI: false,
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".project-reveal");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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
    <section id="projects" ref={sectionRef} className="py-12 lg:py-16 px-4 md:px-8">
      <div className="mx-auto max-w-[900px]">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--color-green)" }}
        >
          selected work
        </p>
        <h2 className="font-display font-semibold text-xl md:text-2xl xl:text-3xl mb-4">
          Featured projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project) => (
            <div key={project.title} className="project-reveal">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
