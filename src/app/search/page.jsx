'use client''use client''use client'"use client";



import React, { Suspense, useState } from 'react'

import { useQueryState, parseAsString, parseAsInteger } from 'nuqs'

import { format } from 'date-fns'import React, { Suspense, useState } from 'react'import { useState, useMemo } from "react";

import { fr } from 'date-fns/locale/fr'

import { searchHotels, formatMAD } from '@/lib/index.js'import { useQueryState, parseAsString, parseAsInteger } from 'nuqs'

import { 

  Card, CardContent, CardHeader, CardTitle,import { format } from 'date-fns'import { Suspense } from 'react'import { useSearchParams, useRouter } from "next/navigation";

  Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem,

  DateRangePicker, Skeleton, Badgeimport { fr } from 'date-fns/locale/fr'

} from '@/components/ui.jsx'

import { searchHotels, formatMAD } from '@/lib/index.js'import { useQueryState, parseAsString, parseAsInteger } from 'nuqs'import { searchHotels } from "@/lib/data";

function SearchFilters() {

  const [city, setCity] = useQueryState('city', parseAsString.withDefault(''))import { 

  const [guests, setGuests] = useQueryState('guests', parseAsInteger.withDefault(2))

  const [checkIn, setCheckIn] = useQueryState('checkIn', parseAsString.withDefault(''))  Card, CardContent, CardHeader, CardTitle,import { format } from 'date-fns'import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton } from "@/components/ui";

  const [checkOut, setCheckOut] = useQueryState('checkOut', parseAsString.withDefault(''))

  Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem,

  const handleDateChange = (range) => {

    if (range?.from) setCheckIn(format(range.from, 'yyyy-MM-dd'))  DateRangePicker, Skeleton, Badgeimport { fr } from 'date-fns/locale/fr'import { HotelCard } from "@/components/HotelCard";

    if (range?.to) setCheckOut(format(range.to, 'yyyy-MM-dd'))

  }} from '@/components/ui.jsx'



  const dateRange = {import { searchHotels, formatMAD } from '@/lib'

    from: checkIn ? new Date(checkIn) : undefined,

    to: checkOut ? new Date(checkOut) : undefined// Composant de filtres de recherche

  }

function SearchFilters() {import { function SearchFilters({ city, guests, rating, onSearch }) {

  return (

    <Card className="mb-8">  const [city, setCity] = useQueryState('city', parseAsString.withDefault(''))

      <CardHeader>

        <CardTitle className="flex items-center gap-2">  const [guests, setGuests] = useQueryState('guests', parseAsInteger.withDefault(2))  Card, CardContent, CardHeader, CardTitle,  return (

          <span className="text-2xl">🔍</span>

          Filtrer votre recherche  const [checkIn, setCheckIn] = useQueryState('checkIn', parseAsString.withDefault(''))

        </CardTitle>

      </CardHeader>  const [checkOut, setCheckOut] = useQueryState('checkOut', parseAsString.withDefault(''))  Button, Input, Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem,    <div className="rounded-xl border bg-white/80 backdrop-blur p-6 shadow-sm">

      <CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="space-y-2">

            <Label htmlFor="city">Ville</Label>  const handleDateChange = (range) => {  DateRangePicker, Skeleton, Badge      <h3 className="mb-4 font-semibold text-lg">Filtres</h3>

            <Select value={city} onValueChange={setCity}>

              <SelectTrigger id="city">    if (range?.from) {

                <SelectValue placeholder="Toutes les villes" />

              </SelectTrigger>      setCheckIn(format(range.from, 'yyyy-MM-dd'))} from '@/components/ui'      <form onSubmit={(e) => { e.preventDefault(); onSearch(Object.fromEntries(new FormData(e.target))); }} className="space-y-4">

              <SelectContent>

                <SelectItem value="">Toutes les villes</SelectItem>    }

                <SelectItem value="marrakech">Marrakech</SelectItem>

                <SelectItem value="casablanca">Casablanca</SelectItem>    if (range?.to) {        <div>

                <SelectItem value="tanger">Tanger</SelectItem>

                <SelectItem value="merzouga">Merzouga</SelectItem>      setCheckOut(format(range.to, 'yyyy-MM-dd'))

                <SelectItem value="chefchaouen">Chefchaouen</SelectItem>

              </SelectContent>    }// Composant de filtres de recherche          <Label className="text-sm">Destination</Label>

            </Select>

          </div>  }



          <div className="space-y-2">function SearchFilters() {          <Select name="city" defaultValue={city}>

            <Label htmlFor="guests">Voyageurs</Label>

            <Select value={String(guests)} onValueChange={(v) => setGuests(parseInt(v))}>  const dateRange = {

              <SelectTrigger id="guests">

                <SelectValue placeholder="Nombre" />    from: checkIn ? new Date(checkIn) : undefined,  const [city, setCity] = useQueryState('city', parseAsString.withDefault(''))            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Toutes les villes" /></SelectTrigger>

              </SelectTrigger>

              <SelectContent>    to: checkOut ? new Date(checkOut) : undefined

                {[1, 2, 3, 4, 5, 6].map(n => (

                  <SelectItem key={n} value={String(n)}>  }  const [guests, setGuests] = useQueryState('guests', parseAsInteger.withDefault(2))            <SelectContent>

                    {n} {n === 1 ? 'voyageur' : 'voyageurs'}

                  </SelectItem>

                ))}

              </SelectContent>  return (  const [checkIn, setCheckIn] = useQueryState('checkIn', parseAsString.withDefault(''))              <SelectItem value="all">Toutes les villes</SelectItem>

            </Select>

          </div>    <Card className="mb-8">



          <div className="space-y-2 md:col-span-2">      <CardHeader>  const [checkOut, setCheckOut] = useQueryState('checkOut', parseAsString.withDefault(''))              <SelectItem value="Marrakech">Marrakech</SelectItem>

            <Label>Dates de séjour</Label>

            <DateRangePicker        <CardTitle className="flex items-center gap-2">

              value={dateRange}

              onChange={handleDateChange}          <span className="text-2xl">🔍</span>              <SelectItem value="Casablanca">Casablanca</SelectItem>

              placeholder="Sélectionnez les dates"

            />          Filtrer votre recherche

          </div>

        </div>        </CardTitle>  const handleDateChange = (range) => {              <SelectItem value="Fes">Fès</SelectItem>

      </CardContent>

    </Card>      </CardHeader>

  )

}      <CardContent>    if (range?.from) {              <SelectItem value="Chefchaouen">Chefchaouen</SelectItem>



function HotelCard({ hotel }) {        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0])

          <div className="space-y-2">      setCheckIn(format(range.from, 'yyyy-MM-dd'))              <SelectItem value="Essaouira">Essaouira</SelectItem>

  return (

    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">            <Label htmlFor="city">Ville</Label>

      <div className="relative h-48 overflow-hidden">

        <img            <Select value={city} onValueChange={setCity}>    }            </SelectContent>

          src={hotel.heroImage}

          alt={hotel.name}              <SelectTrigger id="city">

          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

        />                <SelectValue placeholder="Toutes les villes" />    if (range?.to) {          </Select>

        <div className="absolute top-3 right-3">

          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">              </SelectTrigger>

            ⭐ {hotel.rating}

          </Badge>              <SelectContent>      setCheckOut(format(range.to, 'yyyy-MM-dd'))        </div>

        </div>

      </div>                <SelectItem value="">Toutes les villes</SelectItem>

      

      <CardContent className="p-5">                <SelectItem value="marrakech">Marrakech</SelectItem>    }        <div>

        <div className="flex justify-between items-start mb-2">

          <div>                <SelectItem value="casablanca">Casablanca</SelectItem>

            <h3 className="font-bold text-lg">{hotel.name}</h3>

            <p className="text-sm text-muted-foreground">📍 {hotel.city}, {hotel.country}</p>                <SelectItem value="tanger">Tanger</SelectItem>  }          <Label className="text-sm">Voyageurs</Label>

          </div>

        </div>                <SelectItem value="merzouga">Merzouga</SelectItem>



        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>                <SelectItem value="essaouira">Essaouira</SelectItem>          <Input name="guests" type="number" min={1} max={10} defaultValue={guests || 2} className="mt-1.5" />



        <div className="space-y-3">              </SelectContent>

          <div className="space-y-2">

            <Label className="text-xs font-medium">Type de chambre</Label>            </Select>  const dateRange = {        </div>

            <Select 

              value={selectedRoom.id}           </div>

              onValueChange={(id) => setSelectedRoom(hotel.rooms.find(r => r.id === id))}

            >    from: checkIn ? new Date(checkIn) : undefined,        <div>

              <SelectTrigger className="h-9">

                <SelectValue />          <div className="space-y-2">

              </SelectTrigger>

              <SelectContent>            <Label htmlFor="guests">Voyageurs</Label>    to: checkOut ? new Date(checkOut) : undefined          <Label className="text-sm">Note minimum</Label>

                {hotel.rooms.map(room => (

                  <SelectItem key={room.id} value={room.id}>            <Select value={String(guests)} onValueChange={(v) => setGuests(parseInt(v))}>

                    {room.name} - {formatMAD(room.price)}/nuit

                  </SelectItem>              <SelectTrigger id="guests">  }          <Select name="rating" defaultValue={rating || "all"}>

                ))}

              </SelectContent>                <SelectValue placeholder="Nombre" />

            </Select>

          </div>              </SelectTrigger>            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>



          <div className="flex items-center justify-between pt-2 border-t">              <SelectContent>

            <div>

              <span className="text-2xl font-bold text-primary">{formatMAD(selectedRoom.price)}</span>                {[1, 2, 3, 4, 5, 6].map(n => (  return (            <SelectContent>

              <span className="text-sm text-muted-foreground">/nuit</span>

            </div>                  <SelectItem key={n} value={String(n)}>

            <Button className="bg-primary hover:bg-primary/90">Réserver</Button>

          </div>                    {n} {n === 1 ? 'voyageur' : 'voyageurs'}    <Card className="mb-8">              <SelectItem value="all">Toutes les notes</SelectItem>

        </div>

      </CardContent>                  </SelectItem>

    </Card>

  )                ))}      <CardHeader>              <SelectItem value="4">4+ etoiles</SelectItem>

}

              </SelectContent>

function ResultsSkeleton() {

  return (            </Select>        <CardTitle className="flex items-center gap-2">              <SelectItem value="4.5">4.5+ etoiles</SelectItem>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {[1, 2, 3, 4, 5, 6].map(i => (          </div>

        <Card key={i} className="overflow-hidden">

          <Skeleton className="h-48 w-full" />          <span className="text-2xl">🔍</span>            </SelectContent>

          <CardContent className="p-5 space-y-3">

            <Skeleton className="h-6 w-3/4" />          <div className="space-y-2 md:col-span-2">

            <Skeleton className="h-4 w-1/2" />

            <Skeleton className="h-16 w-full" />            <Label>Dates de séjour</Label>          Filtrer votre recherche          </Select>

            <Skeleton className="h-10 w-full" />

          </CardContent>            <DateRangePicker

        </Card>

      ))}              value={dateRange}        </CardTitle>        </div>

    </div>

  )              onChange={handleDateChange}

}

              placeholder="Sélectionnez les dates"      </CardHeader>        <Button type="submit" className="w-full">Rechercher</Button>

function HotelResults() {

  const [city] = useQueryState('city', parseAsString.withDefault(''))            />

  const hotels = searchHotels(city || undefined)

          </div>      <CardContent>      </form>

  if (hotels.length === 0) {

    return (        </div>

      <Card className="p-12 text-center">

        <div className="text-6xl mb-4">🏨</div>      </CardContent>        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">    </div>

        <h3 className="text-xl font-semibold mb-2">Aucun hôtel trouvé</h3>

        <p className="text-muted-foreground">Essayez de modifier vos critères de recherche</p>    </Card>

      </Card>

    )  )          <div className="space-y-2">  );

  }

}

  return (

    <div>            <Label htmlFor="city">Ville</Label>}

      <p className="text-muted-foreground mb-4">

        {hotels.length} hôtel{hotels.length > 1 ? 's' : ''} trouvé{hotels.length > 1 ? 's' : ''}// Carte d'hôtel avec sélection de chambre

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">function HotelCard({ hotel }) {            <Select value={city} onValueChange={setCity}>

        {hotels.map(hotel => (

          <HotelCard key={hotel.id} hotel={hotel} />  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0])

        ))}

      </div>              <SelectTrigger id="city">export default function SearchPage() {

    </div>

  )  return (

}

    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">                <SelectValue placeholder="Toutes les villes" />  const params = useSearchParams();

export default function SearchPage() {

  return (      <div className="relative h-48 overflow-hidden">

    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">

      <div className="container mx-auto px-4 py-8">        <img              </SelectTrigger>  const router = useRouter();

        <div className="mb-8">

          <h1 className="text-3xl font-bold mb-2">🏨 Trouvez votre hôtel idéal</h1>          src={hotel.heroImage}

          <p className="text-muted-foreground">Découvrez les meilleurs établissements au Maroc</p>

        </div>          alt={hotel.name}              <SelectContent>  const [loading, setLoading] = useState(false);



        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

          <SearchFilters />

        </Suspense>        />                <SelectItem value="">Toutes les villes</SelectItem>  const city = params.get("city") || "";



        <Suspense fallback={<ResultsSkeleton />}>        <div className="absolute top-3 right-3">

          <HotelResults />

        </Suspense>          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">                <SelectItem value="marrakech">Marrakech</SelectItem>  const guests = parseInt(params.get("guests") || "2");

      </div>

    </main>            ⭐ {hotel.rating}

  )

}          </Badge>                <SelectItem value="casablanca">Casablanca</SelectItem>  const rating = params.get("rating") || "all";


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
