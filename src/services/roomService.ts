import { httpClient, USE_MOCKS } from "../utils/api";
import { mockRooms } from "../data/mockRooms";
import type { Room,RoomFilter, RoomType } from "../types/room.types";

export const getRooms=async():Promise<Room[]>=>{
    if(USE_MOCKS){
        return mockRooms
    }
    const{data}=await httpClient.get<Room[]>('/api/v1/rooms')
    return data
}


export const getRoom=async (id:number):Promise<Room>=>{
    if(USE_MOCKS){
        const room=mockRooms.find(r=>r.id==id)
        if (!room){
            throw new Error("nie istnieje taki pokoj")
        }
        return room
    }
    try{
        const {data}=await httpClient.get<Room>(`/api/v1/rooms/${id}`)
        return data

    }catch(error:any){
        throw new Error("Pokoj nie istnieje")
    }
}



export const filterRooms=async(filters:RoomFilter):Promise<Room[]>=>{
    if(USE_MOCKS){
        return mockRooms.filter(room => {
            if (filters.minPrice && room.pricePerNight < filters.minPrice) return false
            if (filters.maxPrice && room.pricePerNight > filters.maxPrice) return false
            return true
        })
    }
    try{
        const {data}=await httpClient.post<Room[]>('/api/v1/rooms/filter',filters)
        return data
    }catch(error:any){
        throw new Error("Pokoj nie istnieje")
    } 
}

export const createRoom=async (roomData:Omit<Room,'id'>):Promise<Room>=>{
    if(USE_MOCKS){
         const nextId = mockRooms.length ? Math.max(...mockRooms.map((r) => r.id)) + 1 : 1
         const newRoom: Room = { ...roomData, id: nextId }
         mockRooms.push(newRoom)
         return newRoom
       }
    const {data}=await httpClient.post<Room>('/api/v1/rooms',roomData)
    return data
}

export const updateRoom = async(id:number,roomData:Partial<Room>):Promise<Room>=>{
    if (USE_MOCKS) {
         const index = mockRooms.findIndex((r) => r.id === id)
         if (index === -1) {
           throw new Error(`Pokój o ID ${id} nie istnieje`)
         }
         mockRooms[index] = { ...mockRooms[index], ...roomData }
         return mockRooms[index]
       }
    const{data}=await httpClient.put<Room>(`/api/v1/rooms/${id}`,roomData)
    return data
    
}

export const deleteRoom = async(id:number):Promise<void>=>{
     if (USE_MOCKS) {
         const index = mockRooms.findIndex((r) => r.id === id)
         if (index === -1) {
           throw new Error(`Pokój o ID ${id} nie istnieje`)
         }
         mockRooms.splice(index, 1)
         return
       }
    await httpClient.delete(`/api/v1/rooms/${id}`)

}