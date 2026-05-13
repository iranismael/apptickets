import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-black text-zinc-900 dark:text-white">
      
      {/* HEADER */}
      <header className="w-full border-b border-zinc-300 dark:border-zinc-800 backdrop-blur bg-white/70 dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            App Tickets
          </h1>

          <nav className="flex items-center gap-4">
            <Link href="/">
              <span className="hover:text-blue-500 transition">
                Inicio
              </span>
            </Link>

            <Link href="/tickets">
              <span className="hover:text-blue-500 transition">
                Tickets
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO / BANNER */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          
          <div className="mb-6 inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Sistema de Tickets
          </div>

          <h2 className="text-5xl font-extrabold tracking-tight mb-6">
            Gestiona tus tickets de manera rápida y sencilla
          </h2>

          {/*<p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
            Plataforma moderna creada con Next.js, Tailwind y componentes UI.
          </p>*/}

          <Link href="/tickets">
            <Button className="text-base px-8 py-6 rounded-xl">
              Ir a Tickets
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-300 dark:border-zinc-800 py-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        © 2026 Ismael Flores Dev - Todos los derechos reservados
      </footer>
    </main>
  );
}