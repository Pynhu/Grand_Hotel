import { useEffect, useState } from 'react'
import { getReservations, cancelReservation } from '../services/bookingService'
import { getAllTableReservations, cancelTableReservation } from '../services/restaurantService'
import type { ReservationResponse } from '../types/booking.types'
import type { TableReservation } from '../types/restaurant.types'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { toast } from 'sonner'


const MyBookingsPage = () => {
    const [roomReservations, setRoomReservations] = useState<ReservationResponse[]>([])
    const [tableReservations, setTableReservations] = useState<TableReservation[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadReservations = async () => {
        try {
            const [room, tables] = await Promise.all([
                getReservations(),
                getAllTableReservations(),
            ])
            setRoomReservations(room)
            setTableReservations(tables)
        } catch (error) {
            toast.error('Błąd podczas ładowania rezerwacji')
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadReservations()
    }, [])

    const handleCancelRoom = async (id: string) => {
        if (!confirm('Czy na pewno chcesz anulować rezerwację?')) {
            return
        }
        try {
            await cancelReservation(String(id))
            toast.success('Rezerwacja anulowana')
            loadReservations()
        } catch (error) {
            toast.error('Błąd podczas anulowania rezerwacji')
        }

    }
    const handleCancelTable = async (id: number) => {
        if (!confirm('Czy na pewno chcesz anulować rezerwację?')) {
            return
        }
        try {
            await cancelTableReservation(Number(id))
            toast.success('Rezerwacja anulowana')
            loadReservations()
        } catch (error) {
            toast.error('Błąd podczas anulowania rezerwacji')
        }
    }
    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <p>Ładowanie rezerwacji...</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-grand-navy mb-8">
                Moje Rezerwacje
            </h1>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-grand-navy mb-4">
                    Pokoje
                </h2>
                {roomReservations.length === 0 ? (
                    <p className="text-gray-500">Brak rezerwacji pokoi</p>

                ) : (
                    <div className="grid gap-4">
                        {roomReservations.map((reservation) => (
                            <Card key={reservation.id}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-grand-navy mb-2">
                                            Rezerwacja #{String(reservation.id).slice(0, 8)}
                                        </h3>
                                        <p>Check-in: {reservation.checkInDate}</p>
                                        <p>Check-out: {reservation.checkOutDate}</p>
                                        <p>Dorośli: {reservation.numberOfAdults}</p>
                                        <p>Dzieci: {reservation.numberOfChildren}</p>
                                        <p>Status: {reservation.status}</p>
                                    </div>
                                    <Button
                                        variant="linie"
                                        onClick={() => handleCancelRoom(reservation.id)}>
                                        Anuluj Rezerwację
                                    </Button>

                                </div>
                            </Card>
                        ))}

                    </div>
                )
                }
            </section>


            <section className="mb-12">
                <h2 className="text-2xl font-bold text-grand-navy mb-4">
                    Stoliki
                </h2>
                {tableReservations.length === 0 ? (
                    <p className="text-gray-500">Brak zarezerwowanych stolików</p>
                ) : (
                    <div className="grid gap-4">
                        {tableReservations.map((reservations) => (
                            <Card key={reservations.id}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-grand-navy mb-2">
                                            Stolik #{String(reservations.id).slice(0, 8)}
                                        </h3>
                                        <p>Data: {reservations.date}</p>
                                        <p>Godzina: {reservations.time}</p>
                                        <p>Liczba gości: {reservations.guests}</p>
                                    </div>
                                    <Button
                                        variant="linie"
                                        onClick={() => handleCancelTable(reservations.id)}>
                                        Anuluj Rezerwacje
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )

}

export default MyBookingsPage