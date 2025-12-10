"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button, Card, Badge, Input, Label, Select, DateRangePicker, Skeleton, useToast } from "@/components/ui.jsx";
import { HOTELS, searchHotels, formatMAD, DESTINATIONS } from "@/lib/index.js";
import { createBooking } from "../actions";

function SearchFilters({ filters, setFilters, onSearch }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Filtres</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="">Toutes les destinations</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest.city} value={dest.city}>{dest.city}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Dates</Label>
          <DateRangePicker
            dateRange={filters.dateRange}
            onDateRangeChange={(range) => setFilters({ ...filters, dateRange: range })}
          />
        </div>
        <div>
          <Label htmlFor="guests">Voyageurs</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={filters.guests}
            onChange={(e) => setFilters({ ...filters, guests: parseInt(e.target.value) || 1 })}
          />
        </div>
        <div>
          <Label htmlFor="priceRange">Budget max (MAD)</Label>
          <Input
            id="priceRange"
            type="number"
            min="0"
            step="100"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 0 })}
            placeholder="Ex: 2000"
          />
        </div>
        <Button onClick={onSearch} className="w-full">Rechercher</Button>
      </div>
    </Card>
  );
}

function HotelCard({ hotel }) {
  const { isSignedIn } = useUser();
  const { addToast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]);
  const [isBooking, setIsBooking] = useState(false);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const nights = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return 1;
    const diff = dateRange.to.getTime() - dateRange.from.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [dateRange]);

  const totalPrice = selectedRoom.price * nights;

  const handleBooking = async () => {
    if (!isSignedIn) {
      addToast("Veuillez vous connecter pour réserver", "error");
      return;
    }
    if (!dateRange.from || !dateRange.to) {
      addToast("Veuillez sélectionner vos dates", "error");
      return;
    }
    setIsBooking(true);
    try {
      const result = await createBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomType: selectedRoom.type,
        checkIn: dateRange.from.toISOString(),
        checkOut: dateRange.to.toISOString(),
        totalPrice,
        guests: 2,
      });
      if (result.success) {
        addToast("Réservation confirmée !", "success");
      } else {
        addToast(result.error || "Erreur lors de la réservation", "error");
      }
    } catch (error) {
      addToast("Erreur lors de la réservation", "error");
    }
    setIsBooking(false);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
        {hotel.featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">Populaire</Badge>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{hotel.name}</h3>
            <p className="text-sm text-gray-500">{hotel.city}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{hotel.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
        <div className="flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>
          ))}
        </div>
        <div>
          <Label>Type de chambre</Label>
          <Select
            value={selectedRoom.type}
            onChange={(e) => {
              const room = hotel.rooms.find((r) => r.type === e.target.value);
              if (room) setSelectedRoom(room);
            }}
          >
            {hotel.rooms.map((room) => (
              <option key={room.type} value={room.type}>
                {room.type} - {formatMAD(room.price)}/nuit
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Dates de séjour</Label>
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <p className="text-sm text-gray-500">{nights} nuit{nights > 1 ? "s" : ""}</p>
            <p className="text-xl font-bold text-primary">{formatMAD(totalPrice)}</p>
          </div>
          <Button onClick={handleBooking} disabled={isBooking}>
            {isBooking ? "Réservation..." : "Réserver"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function HotelResults({ filters }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const results = searchHotels(filters);
      setHotels(results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  if (loading) {
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
        <p className="text-gray-500">Aucun hôtel trouvé pour ces critères.</p>
        <p className="text-sm text-gray-400 mt-2">Essayez de modifier vos filtres.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    dateRange: { from: null, to: null },
    guests: parseInt(searchParams.get("guests")) || 2,
    maxPrice: 0,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline">← Retour</Button>
        </Link>
        <h1 className="text-2xl font-bold">Recherche d'hôtels</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <SearchFilters
            filters={filters}
            setFilters={setFilters}
            onSearch={() => {}}
          />
        </div>
        <div className="lg:col-span-3">
          <HotelResults filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Chargement...</div>}>
      <SearchContent />
    </Suspense>
  );
}
