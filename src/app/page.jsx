/**
 * =============================================================================
 * ATLAS - Page d'Accueil
 * =============================================================================
 * Page principale avec hero, destinations populaires et caractéristiques.
 */

import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui.jsx";
import { DESTINATIONS, FEATURES } from "@/lib/index.js";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-8 text-white shadow-2xl md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-6">
          <p className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            🇲🇦 N°1 de la réservation au Maroc
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Trouvez l&apos;hôtel parfait pour votre séjour
          </h1>
          <p className="text-lg text-emerald-50/90">
            Des riads traditionnels aux resorts de luxe, découvrez les meilleures adresses du royaume.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="bg-white text-emerald-600 shadow-lg hover:bg-gray-100">
              <Link href="/search">🔍 Rechercher un hôtel</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
              <Link href="/my-bookings">Mes réservations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Populaires */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Destinations populaires</h2>
          <Link href="/search" className="text-sm font-medium text-emerald-600 hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.city}
              href={`/search?city=${dest.city}`}
              className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{dest.city}</h3>
                <p className="text-sm text-white/80">{dest.hotels} hôtels</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight">Pourquoi choisir Atlas ?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="border-border/50 bg-white/60 text-center backdrop-blur-sm transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                  {f.icon}
                </div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{f.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white shadow-xl md:p-12">
        <h2 className="text-2xl font-bold md:text-3xl">Prêt à réserver votre prochain séjour ?</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          Rejoignez des milliers de voyageurs qui font confiance à Atlas pour leurs réservations.
        </p>
        <Button asChild size="lg" className="mt-6 bg-emerald-500 hover:bg-emerald-600">
          <Link href="/search">Commencer maintenant</Link>
        </Button>
      </section>
    </div>
  );
}
