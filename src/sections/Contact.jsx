import { useState } from "react";
import emailjs from "@emailjs/browser";
import GlassCard from "../components/GlassCard";

const inputStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--glass-border)",
  color: "var(--text-primary)",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-16 px-4 md:px-8">
      <div className="mx-auto max-w-[900px]">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--color-green)" }}
        >
          get in touch
        </p>
        <h2 className="font-display font-semibold text-xl md:text-2xl xl:text-3xl mb-4">
          Contact
        </h2>

        <div className="flex flex-col md:flex-row gap-5 items-stretch">
          {/* ---------- LEFT: code-snippet-styled info panel ---------- */}
          <GlassCard
            hover={false}
            className="w-full md:w-[280px] shrink-0 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#FF5F56" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#FFBD2E" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#27C93F" }}
                />
                <span
                  className="font-mono text-xs ml-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  contact.json
                </span>
              </div>

              <pre
                className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--text-secondary)" }}
              >
                {"{\n"}
                {"  "}
                <span style={{ color: "var(--color-green)" }}>"name"</span>:
                "Brian Quicho",{"\n"}
                {"  "}
                <span style={{ color: "var(--color-green)" }}>"role"</span>: "web
                developer",{"\n"}
                {"  "}
                <span style={{ color: "var(--color-green)" }}>"location"</span>:
                "Porac, PH",{"\n"}
                {"  "}
                <span style={{ color: "var(--color-green)" }}>
                  "status"
                </span>: <span style={{ color: "#7CFCC0" }}>"available"</span>
                {"\n"}
                {"}"}
              </pre>
            </div>

            <div
              className="flex items-center gap-2.5 pt-4 mt-4"
              style={{ borderTop: "1px solid var(--glass-border)" }}
            >
              <div
                className="relative w-2 h-2 rounded-full"
                style={{ background: "var(--color-green)" }}
              >
                <span
                  className="absolute -inset-1.5 rounded-full animate-ping"
                  style={{ border: "1px solid var(--color-green)" }}
                />
              </div>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                usually replies within a day
              </span>
            </div>
          </GlassCard>

          {/* ---------- RIGHT: the actual form ---------- */}
          <GlassCard hover={false} className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                type="text"
                name="name"
                placeholder="your name"
                required
                value={form.name}
                onChange={handleChange}
                className="font-sans text-sm rounded-xl px-4 py-2.5 outline-none"
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="your email"
                required
                value={form.email}
                onChange={handleChange}
                className="font-sans text-sm rounded-xl px-4 py-2.5 outline-none"
                style={inputStyle}
              />
              <textarea
                name="message"
                placeholder="your message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="font-sans text-sm rounded-xl px-4 py-2.5 outline-none resize-none"
                style={inputStyle}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                style={{
                  background: "var(--color-green)",
                  color: "#06120C",
                  border: "1px solid var(--color-green)",
                }}
              >
                {status === "sending" ? "sending..." : "send message"}
              </button>

              {status === "sent" && (
                <p className="text-xs" style={{ color: "var(--color-green)" }}>
                  Message sent — thanks for reaching out.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs" style={{ color: "#E05A5A" }}>
                  Something went wrong. Try again, or email me directly.
                </p>
              )}
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
