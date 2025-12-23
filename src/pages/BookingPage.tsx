import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createReservation } from '../services/bookingService'
import { useRoom } from '../hooks/useRooms'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { toast } from 'sonner'



const BookingPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const roomId = Number(searchParams.get('roomID'))
    const roomData = useRoom(roomId)

    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [numberOfAdults, setNumberOfAdults] = useState(1)
    const [numberOfChildren, setNumberOfChildren] = useState(0)
    const [submit, setSubmit] = useState(false)

    if (!roomId) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <p>Brak podanego pokoju</p>
                <Button onClick={() => navigate('/rooms')}>
                    Wróc
                </Button>
            </div>
        )
    }

    if (roomData.isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <p >
                    Ładowanie
                </p>
                <Button onClick={() => navigate('/rooms')}>
                    Wróc
                </Button>
            </div>
        )
    }

    const room: any = roomData.data
    if (!room) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <p>Pokoj nie istnieje</p>
                <Button onClick={() => navigate('/rooms')}>
                    Wróc
                </Button>
            </div>
        )
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!checkInDate || !checkOutDate || !numberOfAdults) {
            toast.error('Wszystkie pola sa wymagane')
            return
        }
        setSubmit(true)
        try {
            await createReservation({
                roomId: room.id,
                checkInDate,
                checkOutDate,
                numberOfAdults: Number(numberOfAdults),
                numberOfChildren: Number(numberOfChildren),
            })
            toast.success("rezerwacja utworzona")
            navigate(`/my-bookings`)

        } catch (error) {
            toast.error("blad podczas rezerwacji")
        } finally {
            setSubmit(false)
        }

    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Button onClick={() => navigate(`/rooms/${roomId}`)} variant="linie" className="mb-6">Wróc do pokoju</Button>

            <h1 className="text-4xl font-bold text-grand-navy mb-8">Rezerwacja</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="font-bold text-grand-navy mb-4">Wybrany pokój</h3>
                    <img src={room.heroImage || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80'}
                        alt={room.name || room.roomType}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />

                    <h4 className="text-lg font-bold text-grand-navy">
                        {room.name || room.roomType}
                    </h4>
                    <p className="text-2xl font-bold text-grand-gold mt-2">
                        {room.pricePerNight}zł/noc
                    </p>
                </Card>

                <Card>
                    <h3>Szczegóły rezerwacji</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Data przyjazdu"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                        <Input
                            label="Data wyjazdu"
                            type="date"
                            min={checkInDate ? new Date(new Date(checkInDate).getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                            }
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                        <Input
                            label="Liczba dorosłych"
                            type="number"
                            value={String(numberOfAdults)}
                            onChange={(e) => setNumberOfAdults(Number(e.target.value))}
                        />
                        <Input
                            label="Liczba dzieci"
                            type="number"
                            value={String(numberOfChildren)}
                            onChange={(e) => setNumberOfChildren(Number(e.target.value))}
                        />

                        <Button type="submit" variant="pierwszy" size="duze" fullWidth disabled={submit}>
                            {submit ? 'Przetwarzanie...' : 'Rezerwuj'}
                        </Button>
                    </form>
                </Card>

            </div>
        </div>
    )
}
export default BookingPage