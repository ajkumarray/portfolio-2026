"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const fieldClasses =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong.");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="mt-4 text-lg font-semibold">Message sent</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          className={cn(fieldClasses, errors.name && "border-red-500/60")}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          className={cn(fieldClasses, errors.email && "border-red-500/60")}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about the role or the problem you're solving…"
          className={cn(
            fieldClasses,
            "resize-y",
            errors.message && "border-red-500/60"
          )}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-500" role="alert">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
