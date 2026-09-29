import { useEffect, useState } from "react";
import { Home, User, Code2, Monitor, Mail, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { id: "home", label: "home", Icon: Home },
  { id: "about", label: "about", Icon: User },
  { id: "skills", label: "skills", Icon: Code2 },
  { id: "projects", label: "projects", Icon: Monitor },
  { id: "contact", label: "contact", Icon: Mail },
];

export default function Navigation({ collapsed = false, onToggle }) {
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
        className={`hidden md:block shrink-0 h-fit sticky top-5 rounded-2xl transition-all duration-300 ${
          collapsed
            ? "w-[72px] p-3"
            : "w-[180px] lg:w-[210px] xl:w-[230px] p-3 lg:p-4"
        }`}
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
          className="flex items-center justify-between px-2 pb-3 mb-2"
          style={{ borderBottom: "1px solid var(--glass-border)" }}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#FFFFFF" }}
              >
                <img
                  src="/Logo.png"
                  alt="Brian logo"
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span
                className="font-mono text-xs lg:text-base"
                style={{ color: "var(--text-primary)", whiteSpace: "nowrap" }}
              >
                brian.dev
              </span>
            </div>
          )}
          <button
            onClick={() => onToggle(!collapsed)}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
            style={{
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
              background: "var(--glass-fill)",
            }}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            {collapsed ? (
              <ChevronRight size={14} strokeWidth={2} />
            ) : (
              <ChevronLeft size={14} strokeWidth={2} />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = id === activeId;

            return (
              <a
                key={id}
                href={"#" + id}
                onClick={handleNavClick(id)}
                className={`no-underline flex items-center gap-2 px-2.5 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-mono transition-colors ${
                  collapsed ? "justify-center" : ""
                }`}
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
                title={collapsed ? label : undefined}
              >
                <Icon size={16} strokeWidth={1.8} className="flex-shrink-0" />

                {!collapsed && (
                  <span className="truncate">{label}</span>
                )}

                {!collapsed && active && (
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

        {!collapsed && (
          <div
            className="flex items-center gap-2 pt-3 mt-2"
            style={{
              borderTop: "1px solid var(--glass-border)",
            }}
          >
            <a
              href="https://github.com/Quichoo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              <FaGithub size={13} />
            </a>

            <a
              href="https://www.linkedin.com/in/quian/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              <FaLinkedin size={13} />
            </a>

            <button
              onClick={toggle}
              className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              {theme === "dark" ? (
                <Moon size={13} strokeWidth={1.8} />
              ) : (
                <Sun size={13} strokeWidth={1.8} />
              )}
            </button>
          </div>
        )}
      </aside>

      {/* ---------- MOBILE: fixed glass bottom nav ---------- */}
      <nav
        className="md:hidden fixed bottom-3 left-3 right-3 z-50 flex items-center justify-around rounded-xl px-2.5 py-2"
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
              className="no-underline flex flex-col items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{
                color: active ? "var(--color-green)" : "var(--text-secondary)",
                background: active ? "var(--color-green-glow)" : "transparent",
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
            </a>
          );
        })}

        <button
          onClick={toggle}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {theme === "dark" ? (
            <Moon size={16} strokeWidth={1.8} />
          ) : (
            <Sun size={16} strokeWidth={1.8} />
          )}
        </button>
      </nav>
    </>
  );
}
