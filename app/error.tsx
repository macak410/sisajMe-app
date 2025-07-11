"use client";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <main className="flex justify-center items-center py-32 flex-col gap-6">
      <h1 className="text-3xl font-semibold">Nešto je pošlo po zlu!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Pokušajte ponovno
      </button>
    </main>
  );
};

export default Error;
