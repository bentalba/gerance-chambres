/**
 * =============================================================================
 * ATLAS - Layout Principal
 * =============================================================================
 * Layout racine de l'application avec navigation et authentification Clerk.
 */

import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "Atlas | Réservation d'hôtels au Maroc",
  description: "Trouvez et réservez les meilleurs hôtels au Maroc. Des riads traditionnels aux resorts de luxe.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={`${geist.variable} font-sans min-h-screen`}>
          {/* Navigation */}
          <header className="sticky top-0 z-40 border-b border-border/40 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-bold text-white shadow-md">
                  A
                </span>
                <span className="text-xl font-bold tracking-tight text-foreground">Atlas</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden items-center gap-6 md:flex">
                <Link href="/search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600">
                  Rechercher
                </Link>
                <Link href="/my-bookings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600">
                  Mes réservations
                </Link>
              </nav>

              {/* Authentification */}
              <div className="flex items-center gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg">
                      Connexion
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="hidden rounded-full border border-border bg-white px-5 py-2 text-sm font-medium transition-all hover:bg-gray-50 sm:block">
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

          {/* Contenu */}
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border/40 bg-white/50 py-8">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
              <p>© 2024 Atlas - Réservation d'hôtels au Maroc</p>
              <p className="mt-1">Projet de démonstration - Next.js 15 + Clerk + Tailwind</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
