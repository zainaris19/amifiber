import { useState } from "react";
import axios from "axios";
import { Reveal, SectionLabel } from "./Reveal";
import { SERVICE_OPTIONS } from "@/data/content";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const INITIAL = { full_name: "", company: "", email: "", phone: "", service: "", message: "", website: "" };

const inputBase =
  "mt-2 h-12 w-full border bg-white px-4 text-base text-brand-ink placeholder:text-brand-faint transition-colors focus:border-brand-net focus:outline-none focus:ring-2 focus:ring-brand-net/30";

function Field({ id, label, required, error, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-brand-ink">
        {label} {required && <span className="text-brand-blue" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.full_name.trim().length < 2) next.full_name = "Please enter your full name.";
    if (form.company.trim().length < 2) next.company = "Please enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid business email.";
    if (!form.service) next.service = "Please select a service.";
    if (form.message.trim().length < 10) next.message = "Please describe your requirements (at least 10 characters).";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("loading");
    setServerError("");
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form, { timeout: 25000 });
      setStatus("success");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setServerError(
        typeof detail === "string"
          ? detail
          : "Something went wrong while submitting your inquiry. Please try again."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setServerError("");
    setStatus("idle");
  };

  const field = (id, error) => ({
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${inputBase} ${error ? "border-red-400" : "border-brand-line"}`,
  });

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              Start a conversation with our infrastructure team.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-brand-slate sm:text-lg">
              Tell us about your connectivity requirements and our team will help identify the right infrastructure
              solution.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7" data-testid="contact-form-container">
          {status === "success" ? (
            <div
              data-testid="contact-form-success"
              role="status"
              className="flex h-full flex-col items-center justify-center border border-brand-line bg-brand-mist p-10 text-center sm:p-14"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5 9.5 18 20 6.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-brand-ink">Inquiry received.</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-brand-slate">
                Thank you for contacting AMIFIBER. Our infrastructure team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={reset}
                data-testid="contact-form-reset-button"
                className="mt-8 inline-flex h-11 items-center border border-brand-blue px-6 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate data-testid="contact-form" className="relative">
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
              </div>

              {status === "error" && (
                <div data-testid="contact-form-error" role="alert" className="mb-8 border border-red-200 bg-red-50 p-5">
                  <p className="text-sm font-semibold text-red-700">{serverError}</p>
                  <p className="mt-1 text-sm text-red-600">Your inquiry was not sent. Please review and try again.</p>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="full_name" label="Full Name" required error={errors.full_name}>
                  <input
                    {...field("full_name", errors.full_name)}
                    data-testid="contact-form-name-input"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={form.full_name}
                    onChange={set("full_name")}
                  />
                </Field>
                <Field id="company" label="Company" required error={errors.company}>
                  <input
                    {...field("company", errors.company)}
                    data-testid="contact-form-company-input"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={form.company}
                    onChange={set("company")}
                  />
                </Field>
                <Field id="email" label="Business Email" required error={errors.email}>
                  <input
                    {...field("email", errors.email)}
                    data-testid="contact-form-email-input"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </Field>
                <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
                  <input
                    {...field("phone", errors.phone)}
                    data-testid="contact-form-phone-input"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+62 …"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </Field>
                <Field id="service" label="Service Required" required error={errors.service} className="sm:col-span-2">
                  <div className="relative">
                    <select
                      {...field("service", errors.service)}
                      data-testid="contact-form-service-select"
                      value={form.service}
                      onChange={set("service")}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-slate"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2.5 5 7 9.5 11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </Field>
                <Field id="message" label="Message" required error={errors.message} className="sm:col-span-2">
                  <textarea
                    {...field("message", errors.message)}
                    data-testid="contact-form-message-input"
                    rows={5}
                    placeholder="Tell us about your network, capacity and connectivity requirements."
                    value={form.message}
                    onChange={set("message")}
                    className={`${inputBase} ${errors.message ? "border-red-400" : "border-brand-line"} h-auto py-3`}
                  />
                </Field>
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-brand-faint">Fields marked with * are required.</p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-testid="contact-form-submit-button"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-brand-blue px-10 text-sm font-semibold text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                        aria-hidden="true"
                      />
                      Submitting…
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
