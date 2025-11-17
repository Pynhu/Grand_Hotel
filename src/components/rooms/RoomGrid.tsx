import {RoomCard} from './RoomCard'
import type {Room} from '../../types/room.types'

interface RoomGridProps{
    rooms:Room[]
}

export const RoomGrid=({rooms}:RoomGridProps)=>{
    if(rooms.length===0){
        return(
            <div className="text-center py-12">
                <p className="text-gray-500"> Brak pokoi</p>
            </div>
        )
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room=>(
                <RoomCard key={room.id} room={room}/>
            ))}

        </div>
    )
}
