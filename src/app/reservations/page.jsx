/**
 * PAGE RESERVATIONS - Projet EMSI par Oussama SAJJI
 */

import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { listerReservations } from "@/lib/hotelService.js";
import { Card, CardContent, Badge, Button } from "@/composants.jsx";

function CarteReservation({ reservation }) {
  const couleurStatut = {
    EnCours: "bg-blue-100 text-blue-800",
    Validee: "bg-green-100 text-green-800",
    Annulee: "bg-red-100 text-red-800",
    Expiree: "bg-gray-100 text-gray-800",
  };

  const labelStatut = {
    EnCours: "En cours",
    Validee: "Validee",
    Annulee: "Annulee",
    Expiree: "Expiree",
  };

  const chambres = reservation.chambres?.map((c) => c.chambre?.numero).join(", ") || "-";
  const client = reservation.client;
  const fmt = (d) => format(new Date(d), "dd MMM yyyy HH:mm", { locale: fr });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">Reservation {reservation.code}</h3>
            <p className="text-sm text-gray-500">{client?.prenom} {client?.nom}</p>
          </div>
          <Badge className={couleurStatut[reservation.etat] || "bg-gray-100 text-gray-800"}>
            {labelStatut[reservation.etat] || reservation.etat}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Arrivee</span>
            <p className="font-medium">{fmt(reservation.dateDebut)}</p>
          </div>
          <div>
            <span className="text-gray-500">Depart</span>
            <p className="font-medium">{fmt(reservation.dateFin)}</p>
          </div>
          <div>
            <span className="text-gray-500">Chambres</span>
            <p className="font-medium">{chambres}</p>
          </div>
          <div>
            <span className="text-gray-500">Client</span>
            <p className="font-medium">{client?.prenom} {client?.nom}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <span className="text-sm text-gray-500">Etat</span>
            <p className="text-lg font-semibold">{labelStatut[reservation.etat] || reservation.etat}</p>
          </div>
          <div className="text-sm text-gray-500">Creee le {fmt(reservation.createdAt)}</div>
        </div>
      </CardContent>
    </Card>
  );
}

async function ListeReservations() {
  const reservations = await listerReservations();

  if (!reservations || reservations.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold mb-2">Aucune reservation</h3>
        <p className="text-gray-500 mb-4">Aucune reservation en base.</p>
        <Button asChild>
          <Link href="/recherche">Creer une reservation</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <CarteReservation key={reservation.code} reservation={reservation} />
      ))}
    </div>
  );
}

export default function PageReservations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">Retour</Button>
        </Link>
        <h1 className="text-2xl font-bold">Mes reservations</h1>
      </div>

      {/* @ts-expect-error Async Server Component */}
      <ListeReservations />
    </div>
  );
}
