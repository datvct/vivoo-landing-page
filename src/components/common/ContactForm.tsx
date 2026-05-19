"use client";

import { FormState } from "@/types/contact-types";
import { useState } from "react";

import { useCreateContactMutation } from "@/services/contacts/mutations";

export default function ContactForm() {
  const createContactMutation = useCreateContactMutation(() => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      postal: "",
      message: "",
    });
    setTouched({});
  });

  const [form, setForm] =
    useState<FormState>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      postal: "",
      message: "",
    });

  const [touched, setTouched] =
    useState<Record<string, boolean>>(
      {}
    );

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]: value,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
    >
  ) => {
    setTouched((t) => ({
      ...t,
      [e.target.name]: true,
    }));
  };

  const validate = () => {
    return {
      firstName:
        form.firstName.trim() === "",
      email: form.email.trim() === "",
      phone: form.phone.trim() === "",
      company:
        form.company.trim() === "",
      postal: form.postal.trim() === "",
    };
  };

  const errors = validate();

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      email: true,
      phone: true,
      company: true,
      postal: true,
    });

    const hasError =
      Object.values(errors).some(
        Boolean
      );
    if (hasError) return;

    createContactMutation.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      postal: form.postal,
      message: form.message || "Requesting a quote.",
    });
  };

  const submitted = createContactMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl rounded-lg bg-white p-4 shadow-[0_30px_50px_rgba(2,6,23,0.08)] lg:p-10"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input
            name="firstName"
            placeholder="First name*"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
              touched.firstName &&
              errors.firstName
                ? "ring-2 ring-red-400"
                : ""
            }`}
            aria-invalid={
              touched.firstName &&
              errors.firstName
            }
          />
          {touched.firstName &&
            errors.firstName && (
              <p className="mt-2 text-sm text-red-500">
                Please complete this
                required field.
              </p>
            )}
        </div>

        <div>
          <input
            name="lastName"
            placeholder="Last name*"
            value={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Work Email*"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
              touched.email &&
              errors.email
                ? "ring-2 ring-red-400"
                : ""
            }`}
          />
        </div>

        <div>
          <input
            name="phone"
            placeholder="Phone number*"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
              touched.phone &&
              errors.phone
                ? "ring-2 ring-red-400"
                : ""
            }`}
          />
        </div>

        <div>
          <input
            name="company"
            placeholder="Company name*"
            value={form.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
              touched.company &&
              errors.company
                ? "ring-2 ring-red-400"
                : ""
            }`}
          />
        </div>

        <div>
          <input
            name="postal"
            placeholder="Postal code*"
            value={form.postal}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
              touched.postal &&
              errors.postal
                ? "ring-2 ring-red-400"
                : ""
            }`}
          />
        </div>
      </div>

      <div className="mt-6">
        <textarea
          name="message"
          placeholder="Optional: Tell us about your security needs or projects"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className="w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-black/85"
          disabled={submitted}
        >
          {submitted
            ? "Sending..."
            : "GET MY QUOTE"}
        </button>
      </div>
    </form>
  );
}
