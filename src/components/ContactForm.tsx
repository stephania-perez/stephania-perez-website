"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type ProjectType =
  | "newConstruction"
  | "renovation"
  | "kitchen"
  | "furnishingsOnly";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  projectTypes: ProjectType[];
  scope: string;
  referral: string;
};

type FormErrors = Partial<Record<keyof FormFields | "projectTypes", string>>;

const projectTypeOptions: ProjectType[] = [
  "newConstruction",
  "renovation",
  "kitchen",
  "furnishingsOnly",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\d\s+().-]{7,}$/;

function FloatingField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  multiline = false,
}: {
  id: keyof FormFields;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  multiline?: boolean;
}) {
  const errorId = error ? `${id}-error` : undefined;
  const baseClass =
    "peer w-full border border-border bg-transparent px-4 pt-6 pb-2 text-sm outline-none transition-colors focus:border-foreground";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`${baseClass} resize-y min-h-[140px]`}
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={baseClass}
          placeholder=" "
          autoComplete={
            id === "email" ? "email" : id === "phone" ? "tel" : "name"
          }
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px]"
      >
        {label}
      </label>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("Form");
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    projectTypes: [],
    scope: "",
    referral: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  function validate(values: FormFields): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = t("errors.required");
    if (!values.email.trim()) next.email = t("errors.required");
    else if (!emailPattern.test(values.email.trim()))
      next.email = t("errors.email");
    if (!values.phone.trim()) next.phone = t("errors.required");
    else if (!phonePattern.test(values.phone.trim()))
      next.phone = t("errors.phone");
    if (values.projectTypes.length === 0)
      next.projectTypes = t("errors.projectType");
    if (!values.scope.trim()) next.scope = t("errors.required");
    if (!values.referral.trim()) next.referral = t("errors.required");
    return next;
  }

  function toggleProjectType(type: ProjectType) {
    setFields((prev) => {
      const exists = prev.projectTypes.includes(type);
      return {
        ...prev,
        projectTypes: exists
          ? prev.projectTypes.filter((item) => item !== type)
          : [...prev.projectTypes, type],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="border border-border bg-neutral-50 px-8 py-12 text-center"
        role="status"
      >
        <p className="font-serif text-xl uppercase tracking-[0.12em]">
          {t("successTitle")}
        </p>
        <p className="mt-3 text-sm text-muted">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
      aria-busy={status === "submitting"}
    >
      <FloatingField
        id="name"
        label={t("name")}
        value={fields.name}
        error={errors.name}
        onChange={(value) => setFields((p) => ({ ...p, name: value }))}
      />
      <FloatingField
        id="email"
        label={t("email")}
        type="email"
        value={fields.email}
        error={errors.email}
        onChange={(value) => setFields((p) => ({ ...p, email: value }))}
      />
      <FloatingField
        id="phone"
        label={t("phone")}
        type="tel"
        value={fields.phone}
        error={errors.phone}
        onChange={(value) => setFields((p) => ({ ...p, phone: value }))}
      />

      <fieldset className="space-y-3">
        <legend className="text-[10px] uppercase tracking-[0.18em] text-muted">
          {t("projectType")}
        </legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {projectTypeOptions.map((option) => {
            const checked = fields.projectTypes.includes(option);
            return (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground/90"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center border ${
                    checked ? "border-foreground bg-foreground" : "border-border"
                  }`}
                >
                  {checked ? (
                    <span className="h-1.5 w-1.5 bg-white" aria-hidden />
                  ) : null}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleProjectType(option)}
                />
                {t(option)}
              </label>
            );
          })}
        </div>
        {errors.projectTypes ? (
          <p className="text-xs text-red-700" role="alert">
            {errors.projectTypes}
          </p>
        ) : null}
      </fieldset>

      <FloatingField
        id="scope"
        label={t("scope")}
        value={fields.scope}
        error={errors.scope}
        multiline
        onChange={(value) => setFields((p) => ({ ...p, scope: value }))}
      />
      <FloatingField
        id="referral"
        label={t("referral")}
        value={fields.referral}
        error={errors.referral}
        onChange={(value) => setFields((p) => ({ ...p, referral: value }))}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-accent py-4 text-xs uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
