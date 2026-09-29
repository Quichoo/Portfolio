import { useState } from "react";
import Navigation from "../components/Navigation";

export default function AppLayout({ children }) {
  const [navCollapsed, setNavCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-void)", color: "var(--text-primary)" }}
    >
      <div className="flex gap-6 md:gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 mx-auto max-w-[1400px]">
        <Navigation collapsed={navCollapsed} onToggle={setNavCollapsed} />
        <main className={`flex-1 min-w-0 pb-24 md:pb-0 transition-all duration-300 ${navCollapsed ? "md:mx-auto max-w-[900px]" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
