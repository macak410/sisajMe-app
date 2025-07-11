"use client";

import Link from "next/link";
import Button from "../Button";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { signUpClient, logInClient, getCurrentClientUser } from "@/lib/auth.client";
import { createCustomerOnServer } from "@/lib/actions/customer.actions";
import { Gender, SignupParams } from "@/types";
import { sanitizeAppwriteId } from "@/lib/utils";

interface Inputs extends SignupParams {}

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    try {
      await signUpClient(data.email, data.password, data.fullName);
      await logInClient(data.email, data.password);

      const user = await getCurrentClientUser();

      const rawId = user.$id;
      if (!user?.$id) throw new Error("user ID nije definiran");

      const safeId = sanitizeAppwriteId(rawId);             

      await createCustomerOnServer({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        customerId: safeId,
        password: "", 
      });

      toast.success("Registracija uspješna!");
      router.push("/success");
    } catch (err) {
      console.error("Greška:", err);
      toast.error("Registracija nije uspjela.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10 space-y-2.5">
        <h1 className="heading-h1">Izradite svoj račun</h1>
        <p className="regular-text">Započnite s terminom za šišanje</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <FormRow label="Ime i prezime" htmlFor="fullName" error={errors?.fullName?.message}>
          <input
            type="text"
            id="fullName"
            placeholder="Tomislav Mačinković"
            disabled={isLoading}
            className="input"
            {...register("fullName", { required: "Obavezno polje." })}
          />
        </FormRow>

        <div className="flex md:flex-row gap-5">
          <FormRow label="E-mail" htmlFor="email" error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              placeholder="macak410@gmail.com"
              disabled={isLoading}
              className="input"
              {...register("email", {
                required: "Obavezno polje.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Neispravna e-mail adresa.",
                },
              })}
            />
          </FormRow>

          <FormRow label="Mobitel" htmlFor="phone" error={errors?.phone?.message}>
            <input
              type="tel"
              id="phone"
              placeholder="+385 99 9876543"
              disabled={isLoading}
              className="input"
              {...register("phone", {
                required: "Obavezno polje.",
                pattern: {
                  value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
                  message: "Neispravan broj telefona.",
                },
              })}
            />
          </FormRow>
        </div>

        <FormRow label="Lozinka" htmlFor="password" error={errors?.password?.message}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="********"
              disabled={isLoading}
              className="input pr-10" // ostavi prostor za ikonu
              {...register("password", {
                required: "Obavezno polje.",
                minLength: {
                  value: 8,
                  message: "Lozinka mora imati najmanje 8 znakova.",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0112 20C7.03 20 2.73 16.11 1 12a16.88 16.88 0 013.36-5.28M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18" />
                </svg> // oko precrtan
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg> // oko otvoren
              )}
            </button>
          </div>
        </FormRow>

        <FormRow label="Spol" htmlFor="gender" error={errors?.gender?.message}>
          <select
            id="gender"
            disabled={isLoading}
            className="input"
            {...register("gender", { required: "Odaberite spol." })}
          >
            <option value="">Odaberite...</option>
            <option value="Male">Muško</option>
            <option value="Female">Žensko</option>
          </select>
        </FormRow>
      </div>

      <Button size="full" className="mt-8" disabled={isLoading}>
        {!isLoading ? "Registriraj se" : "Učitavanje..."}
      </Button>

      <Link className="inline-block mt-2.5" href="/sign-in">
        Već imate račun?{" "}
        <span className="text-yellow-500 font-medium">Prijavite se</span>
      </Link>
    </form>
  );
};

export default RegisterForm;