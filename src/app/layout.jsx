/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         🏠 MISE EN PAGE PRINCIPALE                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Layout racine de l'application Atlas :                                   ║
 * ║  • En-tête avec logo et navigation                                        ║
 * ║  • Authentification Clerk (français)                                      ║
 * ║  • Pied de page                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "Atlas | Réservation d'hôtels au Maroc",
  description: "Trouvez et réservez les meilleurs hôtels au Maroc.",
};

export default function Layout({ children }) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={`${geist.variable} font-sans min-h-screen bg-gray-50`}>
          <Providers>
            
            {/* ═══════════════ EN-TÊTE ═══════════════ */}
            <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:scale-105 transition">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-lg font-bold text-white">
                    A
                  </span>
                  <span className="text-xl font-bold">Atlas</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/recherche" className="text-sm text-gray-600 hover:text-emerald-600">
                    🔍 Rechercher
                  </Link>
                  <Link href="/reservations" className="text-sm text-gray-600 hover:text-emerald-600">
                    📋 Mes réservations
                  </Link>
                </nav>

                {/* Authentification */}
                <div className="flex items-center gap-3">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                        Connexion
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="hidden sm:block rounded-full border px-5 py-2 text-sm hover:bg-gray-50">
                        Inscription
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </header>

            {/* ═══════════════ CONTENU ═══════════════ */}
            <main className="mx-auto max-w-6xl px-4 py-8">
              {children}
            </main>

            {/* ═══════════════ PIED DE PAGE ═══════════════ */}
            <footer className="border-t bg-white py-8 mt-16">
              <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
                <p>© 2024 Atlas - Reservation hotels au Maroc</p>
                <p className="mt-1">Projet EMSI - Prepare par Oussama SAJJI</p>
                <p className="mt-1 text-xs">Next.js + Clerk + Tailwind + Prisma MySQL</p>
              </div>
            </footer>
            
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
