import { useEffect, useState } from "react";
import { Home, User, Code2, Monitor, Mail, Moon, Sun } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { id: "home", label: "home", Icon: Home },
  { id: "about", label: "about", Icon: User },
  { id: "skills", label: "skills", Icon: Code2 },
  { id: "projects", label: "projects", Icon: Monitor },
  { id: "contact", label: "contact", Icon: Mail },
];

export default function Navigation() {
  const { theme, toggle } = useTheme();
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);

        if (visible.length === 0) return;

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );

        setActiveId(topMost.target.id);
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        setActiveId("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => () => setActiveId(id);

  return (
    <>
      {/* ---------- DESKTOP: floating glass sidebar ---------- */}
      <aside
        className="hidden md:block w-[220px] lg:w-[260px] xl:w-[280px] shrink-0 h-fit sticky top-7 rounded-3xl p-4 lg:p-5"
        style={{
          background: "var(--glass-fill)",
          backdropFilter: "blur(var(--glass-blur-strong)) saturate(180%)",
          WebkitBackdropFilter: "blur(var(--glass-blur-strong)) saturate(180%)",
          border: "1px solid var(--glass-border)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 var(--glass-sheen)",
        }}
      >
        <div
          className="flex items-center gap-2.5 px-2 pb-4 mb-3"
          style={{ borderBottom: "1px solid var(--glass-border)" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "#FFFFFF" }}
          >
            <img
              src="/Logo.png"
              alt="Brian logo"
              className="w-5 h-5 object-contain"
            />
          </div>

          <span
            className="font-mono text-sm lg:text-xl"
            style={{ color: "var(--text-primary)" }}
          >
            brian.dev
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = id === activeId;

            return (
              <a
                key={id}
                href={"#" + id}
                onClick={handleNavClick(id)}
                className="no-underline flex items-center gap-3 px-3 py-2.5 lg:py-3 rounded-xl text-sm lg:text-xl font-mono transition-colors"
                style={{
                  color: active
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  background: active
                    ? "var(--color-green-glow)"
                    : "transparent",
                  border: active
                    ? "1px solid var(--glass-border-hover)"
                    : "1px solid transparent",
                }}
              >
                <Icon size={18} strokeWidth={1.8} />

                <span>{label}</span>

                {active && (
                  <span
                    className="ml-auto relative w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-green)" }}
                  >
                    <span
                      className="absolute -inset-1.5 rounded-full animate-ping"
                      style={{
                        border: "1px solid var(--color-green)",
                      }}
                    />
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        <div
          className="flex items-center gap-2.5 pt-4 mt-3"
          style={{
            borderTop: "1px solid var(--glass-border)",
          }}
        >
          <a
            href="#https://github.com/Quichoo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            <FaGithub size={14} />
          </a>

          <a
            href="#https://www.linkedin.com/in/quian/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            <FaLinkedin size={14} />
          </a>

          <button
            onClick={toggle}
            className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            {theme === "dark" ? (
              <Moon size={14} strokeWidth={1.8} />
            ) : (
              <Sun size={14} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </aside>

      {/* ---------- MOBILE: fixed glass bottom nav ---------- */}
      <nav
        className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex items-center justify-around rounded-2xl px-3 py-2.5"
        style={{
          background: "var(--glass-fill-strong)",
          backdropFilter: "blur(var(--glass-blur-strong)) saturate(180%)",
          WebkitBackdropFilter: "blur(var(--glass-blur-strong)) saturate(180%)",
          border: "1px solid var(--glass-border)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.45), inset 0 1px 0 var(--glass-sheen)",
        }}
      >
        {NAV_ITEMS.map(({ id, Icon }) => {
          const active = id === activeId;

          return (
            <a
              key={id}
              href={"#" + id}
              onClick={handleNavClick(id)}
              className="no-underline flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-colors"
              style={{
                color: active ? "var(--color-green)" : "var(--text-secondary)",
                background: active ? "var(--color-green-glow)" : "transparent",
              }}
            >
              <Icon size={20} strokeWidth={1.8} />
            </a>
          );
        })}

        <button
          onClick={toggle}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {theme === "dark" ? (
            <Moon size={18} strokeWidth={1.8} />
          ) : (
            <Sun size={18} strokeWidth={1.8} />
          )}
        </button>
      </nav>
    </>
  );
}
