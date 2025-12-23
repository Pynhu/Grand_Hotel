import { httpClient, USE_MOCKS } from "../utils/api";
import type { BookingStatus, ReservationRequest,ReservationResponse } from "../types/booking.types";

const mockReservation: ReservationResponse[]=[]

const getReservationsFromStorage=():ReservationResponse[]=>{
    const stored = localStorage.getItem('reservations')
    return stored ? JSON.parse(stored):[]
  }

const saveReservationsToStorage = (reservations: ReservationResponse[])=>{
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }

type ReservationUpdatePayload=Partial<ReservationRequest>&{status?:BookingStatus}

export const createReservation=async(payload: ReservationRequest): Promise<ReservationResponse>=>{
    if(USE_MOCKS){
        const userStr = localStorage.getItem('user')
        if (!userStr){
            throw new Error('Musisz być zalogowany aby zarezerwować')
        }
        const user = JSON.parse(userStr)
        const newReservation: ReservationResponse={
            id: crypto.randomUUID(),
            userId: user.id,  
            status: 'PENDING',
            totalPrice: 0, 
            ...payload,
        }
        const reservations = getReservationsFromStorage()
        reservations.push(newReservation)
        saveReservationsToStorage(reservations)
        return newReservation
    }
    const {data} = await httpClient.post<ReservationResponse>('/api/v1/reservations', payload)
    return data
}

export const getReservations =async(): Promise<ReservationResponse[]>=>{
    const userStr = localStorage.getItem('user')
    if(USE_MOCKS){
        if (!userStr){
            return []  
        }
        const user = JSON.parse(userStr)
        const reservations = getReservationsFromStorage()
        return reservations.filter((reservation)=>reservation.userId===user.id)
    }
    
    const {data} =await httpClient.get<ReservationResponse[]>('/api/v1/reservations')
    return data
}

export const getReservationById=async(id:string):Promise<ReservationResponse|null>=>{
    if(USE_MOCKS) {
        const reservations = getReservationsFromStorage()
        return reservations.find((reservation) => reservation.id === id) ?? null
    }
    try{
        const {data}=await httpClient.get<ReservationResponse>(`/api/v1/reservations/${id}`)
        return data
    }catch(error){
        console.error("Nie znalezniono rezerwacji",error)
        return null
    }
}

export const updateReservation=async(id:string,payload:ReservationUpdatePayload):Promise<ReservationRequest>=>{
    if(USE_MOCKS) {
        const reservations = getReservationsFromStorage()
        const index = reservations.findIndex((reservation) => reservation.id === id)
        
        if(index === -1){
            throw new Error(`Nie znaleziono rezerwacji z tym id ${id}`)
        }
        reservations[index] = { ...reservations[index], ...payload }
        saveReservationsToStorage(reservations)
        return reservations[index]
    }
    const {data}=await httpClient.put<ReservationResponse>(`/api/v1/reservations/${id}`,payload)
    return data
}

export const cancelReservation=async(id:string):Promise<void>=>{
    if(USE_MOCKS){
        const reservations = getReservationsFromStorage()
        const index = reservations.findIndex((reservation) => reservation.id === id)
        if(index !== -1) {
            reservations.splice(index, 1)
            saveReservationsToStorage(reservations)
        }
        return
    }
    await httpClient.delete(`/api/v1/reservations/${id}`)
}