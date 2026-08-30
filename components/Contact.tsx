"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";

const projectTypes = [
  "Landing Page",
  "Business Website",
  "Web Application",
  "Backend & API",
  "Admin System",
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

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  description: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const setField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
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
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    // First version: simulate submission and show success state.
    // Connect to an email service / backend API here when ready.
    window.setTimeout(() => {
      setStatus("success");
      setForm(emptyForm);
    }, 900);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fgFaint transition-colors ${
      hasError
        ? "border-red-500/60 focus:border-red-500"
        : "border-line focus:border-lime"
    }`;

  const labelClass = "mb-1.5 block text-sm text-fgMuted";

  return (
    <section id="contact" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            label="Contact"
            title="Start Your Project"
            description="Tell me about your idea and I'll get back to you. You can also reach me directly through any channel below."
          />
          <p className="-mt-6 text-sm text-fgMuted">
            Prefer a quick conversation? Message me on Telegram — it's the
            fastest way to reach me.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-xl border border-lime/30 bg-panel p-8 text-center"
                role="status"
              >
                <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-lime" />
                <h3 className="mt-4 text-xl font-semibold text-fg">
                  Message Sent
                </h3>
                <p className="mt-2 max-w-sm text-sm text-fgMuted">
                  Thanks for reaching out! I'll get back to you as soon as
                  possible. Meanwhile, you can message me directly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-secondary mt-6"
                >
                  Send Another Message
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
                      onChange={(e) => setField("name", e.target.value)}
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
                      onChange={(e) => setField("email", e.target.value)}
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

                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Telegram / Phone *
                  </label>
                  <input
                    id="contact-phone"
                    type="text"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-type" className={labelClass}>
                      Project Type *
                    </label>
                    <select
                      id="contact-type"
                      value={form.projectType}
                      onChange={(e) => setField("projectType", e.target.value)}
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
                      onChange={(e) => setField("budget", e.target.value)}
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
                    onChange={(e) => setField("description", e.target.value)}
                    className={fieldClass(!!errors.description)}
                    placeholder="Briefly describe what you'd like to build..."
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "err-desc" : undefined}
                  />
                  {errors.description ? (
                    <p id="err-desc" className="mt-1 text-xs text-red-400">
                      {errors.description}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
