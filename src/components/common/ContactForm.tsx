"use client";

import { FormState } from "@/types/contact-types";
import { useState } from "react";
import Link from "next/link";

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
      firstName: form.firstName.trim() === "",
      lastName: form.lastName.trim() === "",
      email: form.email.trim() === "",
      phone: form.phone.trim() === "",
      company: form.company.trim() === "",
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
      lastName: true,
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

  if (createContactMutation.isSuccess) {
    return (
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-[0_30px_50px_rgba(2,6,23,0.08)] lg:p-16 text-center flex flex-col items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-black mb-3">
          Thank you!
        </h3>
        <p className="text-base text-black/60 max-w-md mb-8 leading-relaxed">
          Your message has been sent successfully. We will get back to you as soon as possible.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-white transition hover:bg-black/85"
        >
          Back to Home
        </Link>
      </div>
    );
  }

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
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${touched.firstName &&
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
                Please complete this required field.
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
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${touched.lastName &&
              errors.lastName
              ? "ring-2 ring-red-400"
              : ""
              }`}
            aria-invalid={
              touched.lastName &&
              errors.lastName
            }
          />
          {touched.lastName &&
            errors.lastName && (
              <p className="mt-2 text-sm text-red-500">
                Please complete this required field.
              </p>
            )}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Work Email*"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${touched.email &&
              errors.email
              ? "ring-2 ring-red-400"
              : ""
              }`}
            aria-invalid={
              touched.email &&
              errors.email
            }
          />
          {touched.email &&
            errors.email && (
              <p className="mt-2 text-sm text-red-500">
                Please complete this required field.
              </p>
            )}
        </div>

        <div>
          <input
            name="phone"
            placeholder="Phone number*"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${touched.phone &&
              errors.phone
              ? "ring-2 ring-red-400"
              : ""
              }`}
            aria-invalid={
              touched.phone &&
              errors.phone
            }
          />
          {touched.phone &&
            errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                Please complete this required field.
              </p>
            )}
        </div>

        <div>
          <input
            name="company"
            placeholder="Company name*"
            value={form.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${touched.company &&
              errors.company
              ? "ring-2 ring-red-400"
              : ""
              }`}
            aria-invalid={
              touched.company &&
              errors.company
            }
          />
          {touched.company &&
            errors.company && (
              <p className="mt-2 text-sm text-red-500">
                Please complete this required field.
              </p>
            )}
        </div>

        <div>
          <input
            name="postal"
            placeholder="Postal code*"
            value={form.postal}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-sm border border-black/20 px-4 py-3 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-blue-200 focus:outline-none ${touched.postal &&
              errors.postal
              ? "ring-2 ring-red-400"
              : ""
              }`}
            aria-invalid={
              touched.postal &&
              errors.postal
            }
          />
          {touched.postal &&
            errors.postal && (
              <p className="mt-2 text-sm text-red-500">
                Please complete this required field.
              </p>
            )}
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
          className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-black/85"
          disabled={submitted}
        >
          {submitted
            ? "Sending..."
            : "Submit"}
        </button>
      </div>
    </form>
  );
}
