import Navigation from "../components/Navigation";

export default function AppLayout({ children }) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-void)", color: "var(--text-primary)" }}
    >
      <div className="flex gap-6 md:gap-28 px-4 md:px-20 mx-auto">
        <Navigation />
        <main className="flex-1 min-w-0 pb-24 md:pb-0">{children}</main>
      </div>
    </div>
  );
}
