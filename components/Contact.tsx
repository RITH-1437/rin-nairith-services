"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2, Lock } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";

const projectTypes = [
  "Landing Page",
  "Business Website",
  "Web Application",
  "Backend & API",
  "Admin System",
  "AI or Data Application",
  "Cloud Deployment",
  "Software Maintenance",
  "Other",
];

const budgets = [
  "Under $100",
  "$100–$300",
  "$300–$500",
  "$500–$1,000",
  "$1,000+",
  "Not sure yet",
];

/** Mirrors the server-side caps in /api/contact. */
const fieldLimits = {
  name: 100,
  company: 150,
  email: 200,
  phone: 100,
  description: 5000,
} as const;

const fieldOrder = [
  "name",
  "email",
  "phone",
  "projectType",
  "description",
] as const;

const fieldIds: Record<(typeof fieldOrder)[number], string> = {
  name: "contact-name",
  email: "contact-email",
  phone: "contact-phone",
  projectType: "contact-type",
  description: "contact-desc",
};

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
}

const emptyForm: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  description: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  const setField = (field: keyof FormData, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Please enter a phone or Telegram contact.";
    if (!form.projectType) next.projectType = "Please choose a project type.";
    if (!form.description.trim())
      next.description = "Please briefly describe your project.";
    setErrors(next);

    const firstInvalid = fieldOrder.find((field) => next[field]);
    if (firstInvalid) {
      document.getElementById(fieldIds[firstInvalid])?.focus();
    }

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Guard against a second submit landing before React re-renders the
    // disabled button state.
    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({ ok: false }));

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong sending your message.");
      }

      setStatus("success");
      setWarning(data.warning ?? null);
      setForm(emptyForm);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (submissionError) {
      setStatus("error");
      setWarning(null);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Could not send your message. Please try again or contact us directly."
      );
    } finally {
      submittingRef.current = false;
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fgFaint transition-colors ${
      hasError ? "border-red-500/60 focus:border-red-500" : "border-line focus:border-lime"
    }`;

  const labelClass = "mb-1.5 block text-sm text-fgMuted";

  return (
    <section id="contact" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            label="Contact"
            title="Start Your Project"
            description="Tell us what you are building, what problem you want to solve, and what a successful outcome looks like."
          />
          <p className="-mt-6 text-sm leading-relaxed text-fgMuted">
            Prefer a quick conversation? Email or Telegram is the fastest way
            to reach the team.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                ref={successRef}
                tabIndex={-1}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-xl border border-lime/30 bg-panel p-8 text-center"
                role="status"
              >
                <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-lime" />
                <h3 className="mt-4 text-xl font-semibold text-fg">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-fgMuted">
                  Thanks for reaching out. We&apos;ll review the details and get
                  back to you as soon as possible.
                </p>
                {warning ? (
                  <p className="mt-3 max-w-sm rounded-md border border-amber-400/50 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
                    Note: {warning}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setWarning(null);
                  }}
                  className="btn-secondary mt-6"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                aria-busy={status === "submitting"}
                className="space-y-5 rounded-xl border border-line bg-panel p-6 sm:p-7"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      maxLength={fieldLimits.name}
                      onChange={(event) => setField("name", event.target.value)}
                      className={fieldClass(!!errors.name)}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                    />
                    {errors.name ? (
                      <p id="err-name" className="mt-1 text-xs text-red-400">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      maxLength={fieldLimits.email}
                      onChange={(event) => setField("email", event.target.value)}
                      className={fieldClass(!!errors.email)}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                    />
                    {errors.email ? (
                      <p id="err-email" className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      maxLength={fieldLimits.company}
                      onChange={(event) => setField("company", event.target.value)}
                      className={fieldClass(false)}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>
                      Telegram / Phone *
                    </label>
                    <input
                      id="contact-phone"
                      type="text"
                      autoComplete="tel"
                      value={form.phone}
                      maxLength={fieldLimits.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      className={fieldClass(!!errors.phone)}
                      placeholder="@username or phone number"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                    {errors.phone ? (
                      <p id="err-phone" className="mt-1 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-type" className={labelClass}>
                      Project Type *
                    </label>
                    <select
                      id="contact-type"
                      value={form.projectType}
                      onChange={(event) => setField("projectType", event.target.value)}
                      className={fieldClass(!!errors.projectType)}
                      aria-invalid={!!errors.projectType}
                      aria-describedby={errors.projectType ? "err-type" : undefined}
                    >
                      <option value="" disabled>
                        Select a type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType ? (
                      <p id="err-type" className="mt-1 text-xs text-red-400">
                        {errors.projectType}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className={labelClass}>
                      Budget
                    </label>
                    <select
                      id="contact-budget"
                      value={form.budget}
                      onChange={(event) => setField("budget", event.target.value)}
                      className={fieldClass(false)}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-desc" className={labelClass}>
                    Project Description *
                  </label>
                  <textarea
                    id="contact-desc"
                    rows={4}
                    value={form.description}
                    maxLength={fieldLimits.description}
                    onChange={(event) => setField("description", event.target.value)}
                    className={fieldClass(!!errors.description)}
                    placeholder="Briefly describe what you would like to build..."
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "err-desc" : undefined}
                  />
                  {errors.description ? (
                    <p id="err-desc" className="mt-1 text-xs text-red-400">
                      {errors.description}
                    </p>
                  ) : null}
                </div>

                {error ? (
                  <div
                    role="alert"
                    className="rounded-md border border-red-500/50 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400"
                  >
                    {error}
                  </div>
                ) : null}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send aria-hidden="true" className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-fgMuted">
                    <Lock aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Your information is used only to respond to your project
                    inquiry.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
