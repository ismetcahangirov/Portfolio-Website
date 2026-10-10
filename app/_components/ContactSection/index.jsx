"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { siGithub } from "simple-icons";
import BrandIcon from "@/components/BrandIcon";
import Container from "../Container";

const EMAIL = "cahangirovismat@gmail.com";
const PHONE = "+994552972759";
const PHONE_LABEL = "+994 55 297 27 59";

const methods = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
  { label: "Phone", value: PHONE_LABEL, href: `tel:${PHONE}`, Icon: Phone },
  { label: "GitHub", value: "ismetcahangirov", href: "https://github.com/ismetcahangirov", brand: siGithub },
  { label: "Location", value: "Baku, Azerbaijan", Icon: MapPin },
];

const empty = { name: "", email: "", message: "" };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, error, textarea, ...props }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-2xl border bg-white/60 px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink focus:bg-white ${
          textarea ? "min-h-[150px] resize-y" : ""
        } ${error ? "border-signal" : "border-ink/10"}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!emailRegex.test(form.email.trim())) next.email = "Enter an email address like name@example.com.";
    if (form.message.trim().length < 10) next.message = "Write at least a sentence about your project.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    const subject = encodeURIComponent(`Project inquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Your email app is opening with the message ready to send.");
    setForm(empty);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-fog py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="flex items-center gap-2.5 text-[13px] font-medium text-ink/70">
              <span className="h-3.5 w-px bg-signal" />
              Contact
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              Have a product
              <br />
              in mind?
              <br />
              <span className="text-graphite/70">Let&apos;s build it.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-ink/65">
              Freelance projects, full-time roles or a second opinion on your architecture. I usually reply within a
              day.
            </p>

            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {methods.map(({ label, value, href, Icon, brand }) => {
                const content = (
                  <>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-signal">
                      {brand ? <BrandIcon icon={brand} name={label} className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">{label}</span>
                      <span className="block truncate text-[16px] font-semibold text-ink sm:text-[18px]">{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRight className="h-5 w-5 text-ink/40 transition-all group-hover:rotate-45 group-hover:text-ink" />
                    )}
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 py-4"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="glass self-start rounded-[28px] p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.3)] sm:p-8"
          >
            <p className="font-display text-[22px] font-semibold tracking-tight">Write me a message</p>
            <p className="mt-1 text-[14px] text-ink/55">It opens in your email app, ready to send.</p>
            <div className="mt-7 space-y-5">
              <Field id="name" name="name" label="Name" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} placeholder="Your name" />
              <Field id="email" name="email" type="email" label="Email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} placeholder="name@example.com" />
              <Field id="message" name="message" label="Project" textarea value={form.message} onChange={onChange} error={errors.message} placeholder="What are you building, and when do you need it?" />
            </div>
            <button
              type="submit"
              className="group mt-7 inline-flex w-full items-center justify-between gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition-colors hover:bg-ember"
            >
              Send message
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
