'use client'

import { useUser } from '@clerk/nextjs'
import { getMockBookings, formatMAD } from '@/lib/index.js'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Skeleton } from '@/components/ui.jsx'

function BookingCard({ booking }) {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    confirmed: 'Confirmée',
    pending: 'En attente',
    cancelled: 'Annulée'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img
            src={booking.hotel.image}
            alt={booking.hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="flex-1 p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg">{booking.hotel.name}</h3>
              <p className="text-sm text-muted-foreground">
                📍 {booking.hotel.location}
              </p>
            </div>
            <Badge className={statusColors[booking.status]}>
              {statusLabels[booking.status]}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-muted-foreground">Arrivée</span>
              <p className="font-medium">{booking.checkIn}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Départ</span>
              <p className="font-medium">{booking.checkOut}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Chambre</span>
              <p className="font-medium">{booking.room.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Voyageurs</span>
              <p className="font-medium">{booking.guests} personne(s)</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <span className="text-sm text-muted-foreground">Total</span>
              <p className="text-xl font-bold text-primary">
                {formatMAD(booking.totalPrice)}
              </p>
            </div>
            {booking.status === 'confirmed' && (
              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                Annuler
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function BookingsList() {
  const { user } = useUser()
  const bookings = getMockBookings()

  if (bookings.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold mb-2">Aucune réservation</h3>
        <p className="text-muted-foreground mb-4">
          Vous n'avez pas encore de réservations
        </p>
        <Button asChild>
          <a href="/search">Rechercher un hôtel</a>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}

export default function MyBookingsPage() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Connexion requise</h2>
          <p className="text-muted-foreground mb-4">
            Connectez-vous pour voir vos réservations
          </p>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            📋 Mes Réservations
          </h1>
          <p className="text-muted-foreground">
            Bienvenue {user.firstName || 'cher client'} ! Voici vos réservations.
          </p>
        </div>

        <BookingsList />
      </div>
    </main>
  )
}
