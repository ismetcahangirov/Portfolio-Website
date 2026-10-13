"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { siGithub } from "simple-icons";
import BrandIcon from "@/components/BrandIcon";
import { getDict } from "@/app/_i18n";
import { githubUrl, telHref } from "@/lib/contact-defaults";
import Container from "../Container";

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

export default function ContactSection({ lang, contact }) {
  const t = getDict(lang).contact;
  const methods = [
    { label: t.methods.email, value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
    { label: t.methods.phone, value: contact.phone, href: telHref(contact.phone), Icon: Phone },
    { label: t.methods.github, value: contact.github, href: githubUrl(contact.github), brand: siGithub },
    { label: t.methods.location, value: contact.location[lang] || contact.location.az, Icon: MapPin },
  ];
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [company, setCompany] = useState("");
  const [sending, setSending] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t.errors.name;
    if (!emailRegex.test(form.email.trim())) next.email = t.errors.email;
    if (form.message.trim().length < 10) next.message = t.errors.message;
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company, lang }),
      });
      if (res.ok) {
        toast.success(t.toast);
        setForm(empty);
      } else {
        toast.error(res.status === 429 ? t.rateLimited : t.failed);
      }
    } catch {
      toast.error(t.failed);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-fog py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="flex items-center gap-2.5 text-[13px] font-medium text-ink/70">
              <span className="h-3.5 w-px bg-signal" />
              {t.label}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              {t.headline[0]}
              <br />
              {t.headline[1]}
              <br />
              <span className="text-graphite/70">{t.headline[2]}</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-ink/65">
              {t.body}
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
            <p className="font-display text-[22px] font-semibold tracking-tight">{t.formTitle}</p>
            <p className="mt-1 text-[14px] text-ink/55">{t.formSub}</p>
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="mt-7 space-y-5">
              <Field id="name" name="name" label={t.nameLabel} autoComplete="name" value={form.name} onChange={onChange} error={errors.name} placeholder={t.namePlaceholder} />
              <Field id="email" name="email" type="email" label={t.emailLabel} autoComplete="email" value={form.email} onChange={onChange} error={errors.email} placeholder={t.emailPlaceholder} />
              <Field id="message" name="message" label={t.messageLabel} textarea value={form.message} onChange={onChange} error={errors.message} placeholder={t.messagePlaceholder} />
            </div>
            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="group mt-7 inline-flex w-full items-center justify-between gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition-colors hover:bg-ember disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? t.sending : t.submit}
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
