import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import * as RestaurantService from '../services/restaurantService'


const RestaurantReservationPage = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [guests, setGuests] = useState(2)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!date || !time || !guests) {
            toast.error('Wszystkie pola sa wymagane')
            return
        }
        setIsLoading(true)
        try {
            const reservationData = {
                date,
                time,
                guests: Number(guests),
            }
            await RestaurantService.createTableReservation(reservationData)
            toast.success('Rezerwacja stolika zarezerwowana')
            navigate('/my-bookings')
        } catch (error) {
            toast.error('Błąd podczas rezerwacji stolika')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-grand-cream to-white flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-grand-navy mb-2 text-center">
                    Rezerwacja stolika
                </h1>
                <p className="text-grand-slate/70 mb-6 text-center">
                    Zarezerwuj u nas stolik
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-grand-slate mb-1">
                            Data *
                        </label>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-grand-slate mb-1">
                            Godzina *
                        </label>
                        <Input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-grand-slate mb-1">
                            Liczba gosci *
                        </label>
                        <Input
                            type="number"
                            value={String(guests)}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            min="1"
                            max="20"
                            required />
                    </div>
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="linie"
                            onClick={() => navigate('/restaurant')}
                            className="flex-1">
                            Anuluj
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? 'Rezerwuję...' : 'Zarezerwuj'}
                        </Button>
                    </div>

                </form>
            </div>

        </div>
    )
}
export default RestaurantReservationPage