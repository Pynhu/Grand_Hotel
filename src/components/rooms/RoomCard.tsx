import { Link } from 'react-router-dom'
import type { Room } from '../../types/room.types'
import Card from '../ui/Card'
import Button from '../ui/Button'


interface RoomCardProps {
    room: Room
}


export const RoomCard = ({ room }: RoomCardProps) => {
    return (
        <Card className="overflow-hidden hove:shadow-xl transition-shadow">
            <div className="relative h-48 bg-gray-200">
                <img src={room.heroImage || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600'}
                    alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-grand-gold px-3 py-1 rounded-lg">
                    <span className="font-bold">{room.pricePerNight}zł</span>
                    <span className="text-sm text-white/80">/noc</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-grand-navy mb-2">
                    {room.name || room.roomType}
                </h3>
                {room.description && (
                    <p className="text-sm text-gray-600 mb-3">
                        {room.description}
                    </p>
                )}
                <div>
                    {room.amenities.slice(0, 3).map((i, j) => (
                        <span key={j} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {i}
                        </span>
                    ))}
                </div>

                <Link to={`/rooms/${room.id}`}>
                    <Button variant="pierwszy" className="w-full mt-4">
                        Zobacz pokój
                    </Button>
                </Link>
            </div>
        </Card>
    )
}