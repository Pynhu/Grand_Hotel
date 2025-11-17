import { useRooms } from "../hooks/useRooms"
import {RoomGrid} from "../components/rooms/RoomGrid"

const RoomsPage = () => {
  const roomsData=useRooms()

  if(roomsData.isLoading){
    return(
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Ładowanie</p>
      </div>
    )
  }
  if(roomsData.isError){
    return(
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xl">błąd podczas ładowania</p>
      </div>
    )
  }
  return(
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-grand-navy mb-8">
        Pokoje
      </h1>
      <RoomGrid rooms={roomsData.data||[]}/>
    </div>
  )
}
export default RoomsPage