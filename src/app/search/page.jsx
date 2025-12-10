'use client''use client'"use client";



import React, { Suspense, useState } from 'react'import { useState, useMemo } from "react";

import { useQueryState, parseAsString, parseAsInteger } from 'nuqs'

import { format } from 'date-fns'import { Suspense } from 'react'import { useSearchParams, useRouter } from "next/navigation";

import { fr } from 'date-fns/locale/fr'

import { searchHotels, formatMAD } from '@/lib/index.js'import { useQueryState, parseAsString, parseAsInteger } from 'nuqs'import { searchHotels } from "@/lib/data";

import { 

  Card, CardContent, CardHeader, CardTitle,import { format } from 'date-fns'import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton } from "@/components/ui";

  Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem,

  DateRangePicker, Skeleton, Badgeimport { fr } from 'date-fns/locale/fr'import { HotelCard } from "@/components/HotelCard";

} from '@/components/ui.jsx'

import { searchHotels, formatMAD } from '@/lib'

// Composant de filtres de recherche

function SearchFilters() {import { function SearchFilters({ city, guests, rating, onSearch }) {

  const [city, setCity] = useQueryState('city', parseAsString.withDefault(''))

  const [guests, setGuests] = useQueryState('guests', parseAsInteger.withDefault(2))  Card, CardContent, CardHeader, CardTitle,  return (

  const [checkIn, setCheckIn] = useQueryState('checkIn', parseAsString.withDefault(''))

  const [checkOut, setCheckOut] = useQueryState('checkOut', parseAsString.withDefault(''))  Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem,    <div className="rounded-xl border bg-white/80 backdrop-blur p-6 shadow-sm">



  const handleDateChange = (range) => {  DateRangePicker, Skeleton, Badge      <h3 className="mb-4 font-semibold text-lg">Filtres</h3>

    if (range?.from) {

      setCheckIn(format(range.from, 'yyyy-MM-dd'))} from '@/components/ui'      <form onSubmit={(e) => { e.preventDefault(); onSearch(Object.fromEntries(new FormData(e.target))); }} className="space-y-4">

    }

    if (range?.to) {        <div>

      setCheckOut(format(range.to, 'yyyy-MM-dd'))

    }// Composant de filtres de recherche          <Label className="text-sm">Destination</Label>

  }

function SearchFilters() {          <Select name="city" defaultValue={city}>

  const dateRange = {

    from: checkIn ? new Date(checkIn) : undefined,  const [city, setCity] = useQueryState('city', parseAsString.withDefault(''))            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Toutes les villes" /></SelectTrigger>

    to: checkOut ? new Date(checkOut) : undefined

  }  const [guests, setGuests] = useQueryState('guests', parseAsInteger.withDefault(2))            <SelectContent>



  return (  const [checkIn, setCheckIn] = useQueryState('checkIn', parseAsString.withDefault(''))              <SelectItem value="all">Toutes les villes</SelectItem>

    <Card className="mb-8">

      <CardHeader>  const [checkOut, setCheckOut] = useQueryState('checkOut', parseAsString.withDefault(''))              <SelectItem value="Marrakech">Marrakech</SelectItem>

        <CardTitle className="flex items-center gap-2">

          <span className="text-2xl">🔍</span>              <SelectItem value="Casablanca">Casablanca</SelectItem>

          Filtrer votre recherche

        </CardTitle>  const handleDateChange = (range) => {              <SelectItem value="Fes">Fès</SelectItem>

      </CardHeader>

      <CardContent>    if (range?.from) {              <SelectItem value="Chefchaouen">Chefchaouen</SelectItem>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="space-y-2">      setCheckIn(format(range.from, 'yyyy-MM-dd'))              <SelectItem value="Essaouira">Essaouira</SelectItem>

            <Label htmlFor="city">Ville</Label>

            <Select value={city} onValueChange={setCity}>    }            </SelectContent>

              <SelectTrigger id="city">

                <SelectValue placeholder="Toutes les villes" />    if (range?.to) {          </Select>

              </SelectTrigger>

              <SelectContent>      setCheckOut(format(range.to, 'yyyy-MM-dd'))        </div>

                <SelectItem value="">Toutes les villes</SelectItem>

                <SelectItem value="marrakech">Marrakech</SelectItem>    }        <div>

                <SelectItem value="casablanca">Casablanca</SelectItem>

                <SelectItem value="tanger">Tanger</SelectItem>  }          <Label className="text-sm">Voyageurs</Label>

                <SelectItem value="merzouga">Merzouga</SelectItem>

                <SelectItem value="essaouira">Essaouira</SelectItem>          <Input name="guests" type="number" min={1} max={10} defaultValue={guests || 2} className="mt-1.5" />

              </SelectContent>

            </Select>  const dateRange = {        </div>

          </div>

    from: checkIn ? new Date(checkIn) : undefined,        <div>

          <div className="space-y-2">

            <Label htmlFor="guests">Voyageurs</Label>    to: checkOut ? new Date(checkOut) : undefined          <Label className="text-sm">Note minimum</Label>

            <Select value={String(guests)} onValueChange={(v) => setGuests(parseInt(v))}>

              <SelectTrigger id="guests">  }          <Select name="rating" defaultValue={rating || "all"}>

                <SelectValue placeholder="Nombre" />

              </SelectTrigger>            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>

              <SelectContent>

                {[1, 2, 3, 4, 5, 6].map(n => (  return (            <SelectContent>

                  <SelectItem key={n} value={String(n)}>

                    {n} {n === 1 ? 'voyageur' : 'voyageurs'}    <Card className="mb-8">              <SelectItem value="all">Toutes les notes</SelectItem>

                  </SelectItem>

                ))}      <CardHeader>              <SelectItem value="4">4+ etoiles</SelectItem>

              </SelectContent>

            </Select>        <CardTitle className="flex items-center gap-2">              <SelectItem value="4.5">4.5+ etoiles</SelectItem>

          </div>

          <span className="text-2xl">🔍</span>            </SelectContent>

          <div className="space-y-2 md:col-span-2">

            <Label>Dates de séjour</Label>          Filtrer votre recherche          </Select>

            <DateRangePicker

              value={dateRange}        </CardTitle>        </div>

              onChange={handleDateChange}

              placeholder="Sélectionnez les dates"      </CardHeader>        <Button type="submit" className="w-full">Rechercher</Button>

            />

          </div>      <CardContent>      </form>

        </div>

      </CardContent>        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">    </div>

    </Card>

  )          <div className="space-y-2">  );

}

            <Label htmlFor="city">Ville</Label>}

// Carte d'hôtel avec sélection de chambre

function HotelCard({ hotel }) {            <Select value={city} onValueChange={setCity}>

  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0])

              <SelectTrigger id="city">export default function SearchPage() {

  return (

    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">                <SelectValue placeholder="Toutes les villes" />  const params = useSearchParams();

      <div className="relative h-48 overflow-hidden">

        <img              </SelectTrigger>  const router = useRouter();

          src={hotel.heroImage}

          alt={hotel.name}              <SelectContent>  const [loading, setLoading] = useState(false);

          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

        />                <SelectItem value="">Toutes les villes</SelectItem>  const city = params.get("city") || "";

        <div className="absolute top-3 right-3">

          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">                <SelectItem value="marrakech">Marrakech</SelectItem>  const guests = parseInt(params.get("guests") || "2");

            ⭐ {hotel.rating}

          </Badge>                <SelectItem value="casablanca">Casablanca</SelectItem>  const rating = params.get("rating") || "all";

        </div>

      </div>                <SelectItem value="fes">Fès</SelectItem>

      

      <CardContent className="p-5">                <SelectItem value="chefchaouen">Chefchaouen</SelectItem>  const hotels = useMemo(() => {

        <div className="flex justify-between items-start mb-2">

          <div>                <SelectItem value="essaouira">Essaouira</SelectItem>    let results = searchHotels(city === "all" ? "" : city);

            <h3 className="font-bold text-lg">{hotel.name}</h3>

            <p className="text-sm text-muted-foreground">📍 {hotel.city}, {hotel.country}</p>              </SelectContent>    if (rating && rating !== "all") results = results.filter(h => h.rating >= parseFloat(rating));

          </div>

        </div>            </Select>    return results;



        <p className="text-sm text-gray-600 mb-4 line-clamp-2">          </div>  }, [city, rating]);

          {hotel.description}

        </p>



        <div className="space-y-3">          <div className="space-y-2">  const handleSearch = (data) => {

          <div className="space-y-2">

            <Label className="text-xs font-medium">Type de chambre</Label>            <Label htmlFor="guests">Voyageurs</Label>    setLoading(true);

            <Select 

              value={selectedRoom.id}             <Select value={String(guests)} onValueChange={(v) => setGuests(parseInt(v))}>    const sp = new URLSearchParams();

              onValueChange={(id) => setSelectedRoom(hotel.rooms.find(r => r.id === id))}

            >              <SelectTrigger id="guests">    if (data.city && data.city !== "all") sp.set("city", data.city);

              <SelectTrigger className="h-9">

                <SelectValue />                <SelectValue placeholder="Nombre" />    if (data.guests) sp.set("guests", data.guests);

              </SelectTrigger>

              <SelectContent>              </SelectTrigger>    if (data.rating && data.rating !== "all") sp.set("rating", data.rating);

                {hotel.rooms.map(room => (

                  <SelectItem key={room.id} value={room.id}>              <SelectContent>    router.push("/search?" + sp.toString());

                    {room.name} - {formatMAD(room.price)}/nuit

                  </SelectItem>                {[1, 2, 3, 4, 5, 6].map(n => (    setTimeout(() => setLoading(false), 300);

                ))}

              </SelectContent>                  <SelectItem key={n} value={String(n)}>  };

            </Select>

          </div>                    {n} {n === 1 ? 'voyageur' : 'voyageurs'}



          <div className="flex items-center justify-between pt-2 border-t">                  </SelectItem>  return (

            <div>

              <span className="text-2xl font-bold text-primary">                ))}    <div className="min-h-screen bg-gradient-to-b from-background via-emerald-50/20 to-background">

                {formatMAD(selectedRoom.price)}

              </span>              </SelectContent>      <div className="container py-8">

              <span className="text-sm text-muted-foreground">/nuit</span>

            </div>            </Select>        <div className="mb-8">

            <Button className="bg-primary hover:bg-primary/90">

              Réserver          </div>          <h1 className="text-3xl font-bold tracking-tight">{city && city !== "all" ? "Hotels a " + city : "Tous les hotels"}</h1>

            </Button>

          </div>          <p className="mt-2 text-muted-foreground">{hotels.length} hebergement{hotels.length !== 1 ? "s" : ""} trouve{hotels.length !== 1 ? "s" : ""}</p>

        </div>

      </CardContent>          <div className="space-y-2 md:col-span-2">        </div>

    </Card>

  )            <Label>Dates de séjour</Label>        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

}

            <DateRangePicker          <aside className="lg:sticky lg:top-24 lg:h-fit">

// Squelette de chargement

function ResultsSkeleton() {              value={dateRange}            <SearchFilters city={city || "all"} guests={guests} rating={rating} onSearch={handleSearch} />

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">              onChange={handleDateChange}          </aside>

      {[1, 2, 3, 4, 5, 6].map(i => (

        <Card key={i} className="overflow-hidden">              placeholder="Sélectionnez les dates"          <main className="space-y-6">

          <Skeleton className="h-48 w-full" />

          <CardContent className="p-5 space-y-3">            />            {loading ? (

            <Skeleton className="h-6 w-3/4" />

            <Skeleton className="h-4 w-1/2" />          </div>              <div className="space-y-6">{[1, 2, 3].map((i) => (<div key={i} className="rounded-xl border bg-white/80 p-6"><div className="md:flex gap-6"><Skeleton className="h-56 w-full md:w-80 rounded-lg" /><div className="flex-1 space-y-4 mt-4 md:mt-0"><Skeleton className="h-8 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /><div className="grid grid-cols-2 gap-4"><Skeleton className="h-10" /><Skeleton className="h-10" /></div><Skeleton className="h-12 w-full" /></div></div></div>))}</div>

            <Skeleton className="h-16 w-full" />

            <Skeleton className="h-10 w-full" />        </div>            ) : hotels.length === 0 ? (

          </CardContent>

        </Card>      </CardContent>              <div className="rounded-xl border bg-white/80 p-12 text-center"><p className="text-lg font-medium">Aucun hotel trouve</p><p className="mt-2 text-muted-foreground">Essayez d ajuster vos filtres</p></div>

      ))}

    </div>    </Card>            ) : (

  )

}  )              hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)



// Liste des résultats}            )}

function HotelResults() {

  const [city] = useQueryState('city', parseAsString.withDefault(''))          </main>

  const hotels = searchHotels({ city: city || undefined })

// Carte d'hôtel avec sélection de chambre        </div>

  if (hotels.length === 0) {

    return (function HotelCard({ hotel }) {      </div>

      <Card className="p-12 text-center">

        <div className="text-6xl mb-4">🏨</div>  const [selectedRoom, setSelectedRoom] = React.useState(hotel.rooms[0])    </div>

        <h3 className="text-xl font-semibold mb-2">Aucun hôtel trouvé</h3>

        <p className="text-muted-foreground">  );

          Essayez de modifier vos critères de recherche

        </p>  return (}

      </Card>

    )    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">

  }      <div className="relative h-48 overflow-hidden">

        <img

  return (          src={hotel.image}

    <div>          alt={hotel.name}

      <p className="text-muted-foreground mb-4">          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

        {hotels.length} hôtel{hotels.length > 1 ? 's' : ''} trouvé{hotels.length > 1 ? 's' : ''}        />

      </p>        <div className="absolute top-3 right-3">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">

        {hotels.map(hotel => (            ⭐ {hotel.rating}

          <HotelCard key={hotel.id} hotel={hotel} />          </Badge>

        ))}        </div>

      </div>      </div>

    </div>      

  )      <CardContent className="p-5">

}        <div className="flex justify-between items-start mb-2">

          <div>

// Page principale            <h3 className="font-bold text-lg">{hotel.name}</h3>

export default function SearchPage() {            <p className="text-sm text-muted-foreground">📍 {hotel.location}</p>

  return (          </div>

    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">        </div>

      <div className="container mx-auto px-4 py-8">

        <div className="mb-8">        <p className="text-sm text-gray-600 mb-4 line-clamp-2">

          <h1 className="text-3xl font-bold mb-2">          {hotel.description}

            🏨 Trouvez votre hôtel idéal        </p>

          </h1>

          <p className="text-muted-foreground">        <div className="space-y-3">

            Découvrez les meilleurs établissements au Maroc          <div className="space-y-2">

          </p>            <Label className="text-xs font-medium">Type de chambre</Label>

        </div>            <Select 

              value={selectedRoom.id} 

        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>              onValueChange={(id) => setSelectedRoom(hotel.rooms.find(r => r.id === id))}

          <SearchFilters />            >

        </Suspense>              <SelectTrigger className="h-9">

                <SelectValue />

        <Suspense fallback={<ResultsSkeleton />}>              </SelectTrigger>

          <HotelResults />              <SelectContent>

        </Suspense>                {hotel.rooms.map(room => (

      </div>                  <SelectItem key={room.id} value={room.id}>

    </main>                    {room.name} - {formatMAD(room.price)}/nuit

  )                  </SelectItem>

}                ))}

              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <span className="text-2xl font-bold text-primary">
                {formatMAD(selectedRoom.price)}
              </span>
              <span className="text-sm text-muted-foreground">/nuit</span>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Réserver
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Squelette de chargement
function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Liste des résultats
function HotelResults() {
  const [city] = useQueryState('city', parseAsString.withDefault(''))
  const hotels = searchHotels({ city: city || undefined })

  if (hotels.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">🏨</div>
        <h3 className="text-xl font-semibold mb-2">Aucun hôtel trouvé</h3>
        <p className="text-muted-foreground">
          Essayez de modifier vos critères de recherche
        </p>
      </Card>
    )
  }

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        {hotels.length} hôtel{hotels.length > 1 ? 's' : ''} trouvé{hotels.length > 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

// Page principale
import React from 'react'

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            🏨 Trouvez votre hôtel idéal
          </h1>
          <p className="text-muted-foreground">
            Découvrez les meilleurs établissements au Maroc
          </p>
        </div>

        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>
          <SearchFilters />
        </Suspense>

        <Suspense fallback={<ResultsSkeleton />}>
          <HotelResults />
        </Suspense>
      </div>
    </main>
  )
}
