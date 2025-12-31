/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         🏠 PAGE D'ACCUEIL                                  ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Page principale avec :                                                   ║
 * ║  • Section Hero                                                           ║
 * ║  • Destinations populaires                                                ║
 * ║  • Caractéristiques de l'app                                              ║
 * ║  • Appel à l'action                                                       ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/composants.jsx";
import { DESTINATIONS, FEATURES } from "@/lib/donnees.js";

export default function Accueil() {
  return (
    <div className="space-y-16">
      
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-500 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative max-w-2xl space-y-6">
          <p className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium">
            🇲🇦 N°1 de la réservation au Maroc
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Trouvez l&apos;hôtel parfait pour votre séjour
          </h1>
          <p className="text-lg text-emerald-50/90">
            Des riads traditionnels aux resorts de luxe, découvrez les meilleures adresses du royaume.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Link href="/recherche">🔍 Rechercher un hôtel</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link href="/reservations">Mes réservations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ DESTINATIONS ═══════════════ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">🗺️ Destinations populaires</h2>
          <Link href="/recherche" className="text-sm font-medium text-emerald-600 hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.city}
              href={`/recherche?city=${dest.city}`}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
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

      {/* ═══════════════ CARACTÉRISTIQUES ═══════════════ */}
      <section className="space-y-6">
        <h2 className="text-center text-2xl font-bold">✨ Pourquoi choisir Atlas ?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="text-center hover:shadow-lg transition">
              <CardHeader>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                  {f.icon}
                </div>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">{f.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ═══════════════ APPEL À L'ACTION ═══════════════ */}
      <section className="rounded-2xl bg-gray-900 p-8 md:p-12 text-center text-white shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold">🚀 Prêt à réserver votre prochain séjour ?</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          Rejoignez des milliers de voyageurs qui font confiance à Atlas pour leurs réservations.
        </p>
        <Button asChild size="lg" className="mt-6 bg-emerald-500 hover:bg-emerald-600">
          <Link href="/recherche">Commencer maintenant</Link>
        </Button>
      </section>
    </div>
  );
}
