import { useParams, useNavigate } from "react-router-dom"
import { useRoom } from "../hooks/useRooms"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import type { Room } from "../types/room.types"
import { toast } from 'sonner'
import * as AuthService from '../services/authService'
import { BASE_URL } from '../utils/api'

const RoomDetailPage = () => {

    const params = useParams()
    const navigate = useNavigate()
    const roomId = Number(params.id)
    const roomData = useRoom(roomId)

    if (roomData.isLoading) {
        return (
            <div className="flex justicfy-center items-center min-h-screen">
                <p className="text-xl">ładowanie</p>
            </div>
        )
    }
    if (!roomData.data) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <p className="text-red-500">
                    Nie znaleziono pokoju
                </p>

                <Button onClick={() => navigate('/rooms')}>Wróć</Button>
            </div>
        )
    }

    const room: Room = roomData.data

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <Button onClick={() => navigate('/rooms')}>Wróć</Button>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={room.imageUrls?.[0] ? `${BASE_URL}${room.imageUrls[0]}` : 'https://images.unsplash.com/...'}
                        alt={room.name || room.roomType}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                    {room.imageUrls && room.imageUrls.length > 1 && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {room.imageUrls.slice(1).map((url: string, index: number) => (
                                <img key={index} src={`${BASE_URL}${url}`}
                                    alt={room.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-grand-navy mb-4">
                        {room.name || room.roomType}
                    </h1>
                    <div className="text-3xl font-bold text-grand-gold mb-6">
                        {room.pricePerNight}zł/noc
                    </div>
                    <Card className="mb-6">
                        <h3 className="text-3xl font-bold text-grand-gold mb-6">Informacje</h3>
                        <div className="space-y-2 text-gray-600">
                            <p>Do {Number(room.capacityAdults) + Number(room.capacityChildren)} osób</p>
                            <p>{room.roomType}</p>
                        </div>
                    </Card>

                    {room.description && (
                        <Card className="mb-6">
                            <h3 className="text-3xl font-bold text-grand-gold mb-6">Opis</h3>
                            <p className="text-gray-600">{room.description}</p>
                        </Card>
                    )}
                    <Card className="mb-6">
                        <h3 className="text-3xl font-bold text-grand-gold mb-6">Udogodnienia</h3>
                        <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity: string, index: number) => (
                                <span
                                    key={index}
                                    className="bg-grand-cream text-grand-navy px-3 py-1 rounded-full text-sm">
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </Card>

                    <Button
                        variant="pierwszy"
                        fullWidth
                        onClick={() => {
                            if (!AuthService.isAuthenticated()) {
                                toast.error('Musisz się zalogować, aby zarezerwować pokój')
                                navigate('/login')
                                return
                            }
                            navigate(`/booking?roomID=${roomId}`)
                        }}>
                        Rezerwuj
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default RoomDetailPage