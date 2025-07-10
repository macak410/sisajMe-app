export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-3xl font-bold mb-4">404 – Stranica nije pronađena</h1>
      <p className="text-lg mb-6">Ups! Nešto si krivo kliknuo ili stranica više ne postoji.</p>
      <a
        href="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
      >
        Vrati me na početnu
      </a>
    </div>
  );
}