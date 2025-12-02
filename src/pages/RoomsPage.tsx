import {useState} from "react"
import {useSearchParams} from "react-router-dom"
import { useRooms } from "../hooks/useRooms"
import {RoomGrid} from "../components/rooms/RoomGrid"
import {RoomFilters} from "../components/rooms/RoomFilters"


const RoomsPage = () => {
  const[searchParams]=useSearchParams()
  const roomsData=useRooms()

  const [minPrice,setMinPrice]=useState(searchParams.get('minPrice') || '')
  const [maxPrice,setMaxPrice]=useState(searchParams.get('maxPrice') || '')
  const [guests, setGuests] = useState(searchParams.get('guests') || '')
  const [roomType,setRoomType]=useState(searchParams.get('roomType')||'')
  const [selectedAmenities,setSelectedAmenities]=useState<string[]>([])
  const [isFilterOpen,setIsFilterOpen]=useState(false)

  if(roomsData.isLoading){
    return(
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Ładowanie</p>
      </div>
    )
  }
  if(roomsData.error){
    return(
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xl">błąd podczas ładowania</p>
      </div>
    )
  }

  let filteredRooms=roomsData.data||[]
  if(minPrice){
    filteredRooms=filteredRooms.filter((room:any)=>room.pricePerNight>=Number(minPrice))
  }
  if(maxPrice){
    filteredRooms=filteredRooms.filter((room:any)=>room.pricePerNight<=Number(maxPrice))
  }
  if(guests){
    filteredRooms=filteredRooms.filter((room:any)=>room.capacity>=Number(guests))
  }
  if(roomType){
    filteredRooms=filteredRooms.filter((room:any)=>room.roomType.toLowerCase().includes(roomType.toLowerCase()))
  }
  if(selectedAmenities.length>0){
    filteredRooms=filteredRooms.filter((room:any)=>selectedAmenities.every((amenity:string)=>
      room.amenities?.some((a:string)=>a.toLowerCase().includes(amenity.toLowerCase()))))
  }

  return(
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-grand-navy">
          Pokoje
        </h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden px-4 py-2 bg-grand-gold text-white rounded-lg font-medium"
        >
          {isFilterOpen ? 'Schowaj filtry' : 'Pokaż filtry'}
        </button>
      </div>
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className={`${isFilterOpen ?'block' : 'hidden'} lg:block max-w-md lg:w-80 mb-8 lg:mb-0 order-1 lg:order-2`}>
            <RoomFilters 
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              guests={guests}
              setGuests={setGuests}
              roomType={roomType}
              setRoomType={setRoomType}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
            />
        </div>
        <div className="flex-1 order-2 lg:order-1">
            {filteredRooms.length===0?(
              <p className="text-center text-gray-500 mt-8">
                Brak pokoi o podanych filtrach
              </p>
            ):(
              <RoomGrid rooms={filteredRooms}/>
            )}
        </div>
      </div> 
    </div>
  )
}
export default RoomsPage