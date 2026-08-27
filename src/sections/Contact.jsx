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
    <section id="contact" className="py-16 lg:py-24 px-2">
      <p
        className="font-mono text-xs tracking-widest uppercase mb-2.5"
        style={{ color: "var(--color-green)" }}
      >
        get in touch
      </p>
      <h2 className="font-display font-semibold text-2xl md:text-3xl xl:text-4xl mb-6">
        Contact
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* ---------- LEFT: code-snippet-styled info panel ---------- */}
        <GlassCard
          hover={false}
          className="w-full md:w-[300px] shrink-0 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-5">
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
            className="flex items-center gap-2.5 pt-5 mt-5"
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="your name"
              required
              value={form.name}
              onChange={handleChange}
              className="font-sans text-sm rounded-xl px-4 py-3 outline-none"
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="your email"
              required
              value={form.email}
              onChange={handleChange}
              className="font-sans text-sm rounded-xl px-4 py-3 outline-none"
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="your message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="font-sans text-sm rounded-xl px-4 py-3 outline-none resize-none"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 text-sm md:text-base font-medium px-5.5 py-3 rounded-xl transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              style={{
                background: "var(--color-green)",
                color: "#06120C",
                border: "1px solid var(--color-green)",
              }}
            >
              {status === "sending" ? "sending..." : "send message"}
            </button>

            {status === "sent" && (
              <p className="text-sm" style={{ color: "var(--color-green)" }}>
                Message sent — thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm" style={{ color: "#E05A5A" }}>
                Something went wrong. Try again, or email me directly.
              </p>
            )}
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
