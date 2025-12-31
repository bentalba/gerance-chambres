/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         🔍 PAGE RECHERCHE                                  ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Page de recherche d'hôtels avec :                                        ║
 * ║  • Filtres (destination, dates, voyageurs, budget)                        ║
 * ║  • Grille de résultats                                                    ║
 * ║  • Cartes d'hôtels avec réservation                                       ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button, Card, Badge, Input, Label, Select, DateRangePicker, Skeleton, useToast } from "@/composants.jsx";
import { searchHotels, formatMAD, DESTINATIONS } from "@/lib/donnees.js";
import { creerReservation } from "./actions";

// ─────────────────────────────────────────────────────────────────────────────
// 🎛️ FILTRES DE RECHERCHE
// ─────────────────────────────────────────────────────────────────────────────

function Filtres({ filtres, setFiltres }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">🎛️ Filtres</h2>
      <div className="space-y-4">
        
        {/* Destination */}
        <div>
          <Label htmlFor="destination">📍 Destination</Label>
          <Select
            value={filtres.ville}
            onChange={(e) => setFiltres({ ...filtres, ville: e.target.value })}
          >
            <option value="">Toutes les destinations</option>
            {DESTINATIONS.map((d) => (
              <option key={d.city} value={d.city}>{d.city}</option>
            ))}
          </Select>
        </div>

        {/* Dates */}
        <div>
          <Label>📅 Dates de séjour</Label>
          <DateRangePicker
            value={filtres.dates}
            onChange={(dates) => setFiltres({ ...filtres, dates })}
          />
        </div>

        {/* Voyageurs */}
        <div>
          <Label htmlFor="voyageurs">👥 Voyageurs</Label>
          <Input
            id="voyageurs"
            type="number"
            min="1"
            max="10"
            value={filtres.voyageurs}
            onChange={(e) => setFiltres({ ...filtres, voyageurs: parseInt(e.target.value) || 1 })}
          />
        </div>

        {/* Budget */}
        <div>
          <Label htmlFor="budget">💰 Budget max (MAD)</Label>
          <Input
            id="budget"
            type="number"
            min="0"
            step="100"
            value={filtres.budgetMax}
            onChange={(e) => setFiltres({ ...filtres, budgetMax: parseInt(e.target.value) || 0 })}
            placeholder="Ex: 2000"
          />
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🏨 CARTE D'HÔTEL
// ─────────────────────────────────────────────────────────────────────────────

function CarteHotel({ hotel }) {
  const { isSignedIn } = useUser();
  const { addToast } = useToast();
  const [chambreChoisie, setChambreChoisie] = useState(hotel.rooms[0]);
  const [enCours, setEnCours] = useState(false);
  const [dates, setDates] = useState({ from: null, to: null });

  // Calcul du nombre de nuits
  const nuits = useMemo(() => {
    if (!dates.from || !dates.to) return 1;
    const diff = dates.to.getTime() - dates.from.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [dates]);

  const prixTotal = chambreChoisie.price * nuits;

  // Gestion de la réservation
  const reserver = async () => {
    if (!isSignedIn) {
      addToast("⚠️ Veuillez vous connecter pour réserver", "error");
      return;
    }
    if (!dates.from || !dates.to) {
      addToast("⚠️ Veuillez sélectionner vos dates", "error");
      return;
    }

    setEnCours(true);
    try {
      const resultat = await creerReservation({
        hotelId: hotel.id,
        hotelNom: hotel.name,
        chambreType: chambreChoisie.type,
        arrivee: dates.from.toISOString(),
        depart: dates.to.toISOString(),
        prixTotal,
        voyageurs: 2,
      });
      if (resultat.success) {
        addToast("✅ Réservation confirmée !", "success");
      } else {
        addToast(resultat.error || "Erreur lors de la réservation", "error");
      }
    } catch {
      addToast("❌ Erreur lors de la réservation", "error");
    }
    setEnCours(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        {hotel.featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">⭐ Populaire</Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* En-tête */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{hotel.name}</h3>
            <p className="text-sm text-gray-500">📍 {hotel.city}</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <span>★</span>
            <span className="font-medium text-gray-700">{hotel.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

        {/* Équipements */}
        <div className="flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 3).map((a) => (
            <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
          ))}
        </div>

        {/* Sélection chambre */}
        <div>
          <Label>🛏️ Type de chambre</Label>
          <Select
            value={chambreChoisie.type}
            onChange={(e) => {
              const chambre = hotel.rooms.find((r) => r.type === e.target.value);
              if (chambre) setChambreChoisie(chambre);
            }}
          >
            {hotel.rooms.map((r) => (
              <option key={r.type} value={r.type}>
                {r.name} - {formatMAD(r.price)}/nuit
              </option>
            ))}
          </Select>
        </div>

        {/* Sélection dates */}
        <div>
          <Label>📅 Dates</Label>
          <DateRangePicker value={dates} onChange={setDates} />
        </div>

        {/* Prix et réservation */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <p className="text-sm text-gray-500">{nuits} nuit{nuits > 1 ? "s" : ""}</p>
            <p className="text-xl font-bold text-emerald-600">{formatMAD(prixTotal)}</p>
          </div>
          <Button onClick={reserver} disabled={enCours}>
            {enCours ? "⏳ En cours..." : "Réserver"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 📋 LISTE DES RÉSULTATS
// ─────────────────────────────────────────────────────────────────────────────

function ListeResultats({ filtres }) {
  const [hotels, setHotels] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      const resultats = searchHotels(filtres.ville);
      if (!cancelled) {
        setHotels(resultats);
        setChargement(false);
      }
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filtres]);

  if (chargement) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-gray-500">Aucun hôtel trouvé pour ces critères.</p>
        <p className="text-sm text-gray-400 mt-2">Essayez de modifier vos filtres.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <CarteHotel key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 📄 CONTENU PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

function ContenuRecherche() {
  const searchParams = useSearchParams();
  const [filtres, setFiltres] = useState({
    ville: searchParams.get("city") || "",
    dates: { from: null, to: null },
    voyageurs: parseInt(searchParams.get("guests")) || 2,
    budgetMax: 0,
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Retour</Button>
        </Link>
        <h1 className="text-2xl font-bold">Recherche hotels</h1>
      </div>

      {/* Grille filtres + résultats */}
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Filtres filtres={filtres} setFiltres={setFiltres} />
        </div>
        <div className="lg:col-span-3">
          <ListeResultats filtres={filtres} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🚀 EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function PageRecherche() {
  return (
    <Suspense fallback={<div className="py-8 text-center">⏳ Chargement...</div>}>
      <ContenuRecherche />
    </Suspense>
  );
}
