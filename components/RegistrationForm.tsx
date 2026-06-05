"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationInput } from "@/lib/validation";

export default function RegistrationForm() {
  const [ok, setOk] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationInput>({ resolver: zodResolver(registrationSchema) });

  async function onSubmit(data: RegistrationInput) {
    setOk(false);
    setServerError(null);

    if (!accessKey) {
      setServerError("Web3Forms access key is missing.");
      return;
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New registration from Army of Salvation",
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        message: data.message,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      setServerError(result.message || "Unable to submit registration. Please try again.");
      return;
    }

    setOk(true);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-4xl rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-4 shadow-command backdrop-blur-xl sm:p-6 lg:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="reg-name">Personal Name</label>
          <input id="reg-name" className="input-field" placeholder="Full Name" {...register("name")} />
          {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="reg-email">Signal Link</label>
          <input id="reg-email" className="input-field" placeholder="Email Address" {...register("email")} />
          {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="reg-phone">Phone</label>
          <input id="reg-phone" className="input-field" placeholder="Phone Number" {...register("phone")} />
          {errors.phone && <p className="mt-2 text-xs text-red-300">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="reg-age">Age</label>
          <input id="reg-age" className="input-field" placeholder="Age" {...register("age")} />
          {errors.age && <p className="mt-2 text-xs text-red-300">{errors.age.message}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label className="label" htmlFor="reg-message">Motivation Protocol</label>
        <textarea
          id="reg-message"
          className="input-field min-h-32 resize-y"
          placeholder="Why do you wish to join?"
          {...register("message")}
        />
        {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message.message}</p>}
      </div>
      <button disabled={isSubmitting} className="command-btn mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? "Establishing Connection..." : "Establish Connection"}
      </button>
      {serverError && (
        <p className="mt-4 rounded-xl border border-red-400/25 bg-red-400/10 p-3 text-center text-sm text-red-200">
          {serverError}
        </p>
      )}
      {ok && (
        <p className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-center text-sm text-emerald-200">
          Registration received successfully. Command will contact you soon.
        </p>
      )}
    </form>
  );
}
