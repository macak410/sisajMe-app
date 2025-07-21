"use client";

import { logIn } from "@/lib/actions/customer.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button";
import FormRow from "./FormRow";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (!email || !password) {
        setError("Oba polja su obavezna.");
        return;
      }

      const response = await logIn({ email, password });

      router.push("/account");
    } catch (err: any) {
      setError("Pogrešni korisnički podatci. Pokušajte ponovno!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-12 space-y-2.5">
        <h1 className="heading-h1">Dobrodošli natrag</h1>
        <p className="regular-text">Molimo unesite svoje korisničke podatke za prijavu</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <FormRow label="E-mail :" htmlFor="email">
          <input
            type="email"
            className="input"
            placeholder="Unesite Vaš e-mail"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Password :" htmlFor="password">
          <input
            type="password"
            className="input"
            placeholder="Unesite Vaš password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <Button size="full" className="mt-10" disabled={isLoading}>
        {!isLoading ? "Prijava" : "Prijava...pričekajte"}
      </Button>
      <Link className="inline-block mt-2.5" href="/sign-up">
        Nemate račun?{" "}
        <span className="text-yellow-500 font-medium">
          Izradi novi račun.
        </span>
      </Link>
    </form>
  );
};

export default LoginForm;
