"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validation";

export default function ContactForm() {
  const [ok, setOk] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit() {
    setOk(false);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setOk(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="command-card w-full">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="contact-name">Name</label>
          <input id="contact-name" className="input-field" {...register("name")} />
          {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="contact-email">Email</label>
          <input id="contact-email" className="input-field" {...register("email")} />
          {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email.message}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label className="label" htmlFor="contact-message">Message</label>
        <textarea id="contact-message" className="input-field min-h-36 resize-y" {...register("message")} />
        {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message.message}</p>}
      </div>
      <button disabled={isSubmitting} className="command-btn mt-5 disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? "Sending..." : "Send Signal"}
      </button>
      {ok && <p className="mt-4 text-sm text-emerald-300">Signal delivered successfully.</p>}
    </form>
  );
}
