import { httpClient, USE_MOCKS } from "../utils/api";
import type { BookingStatus, ReservationRequest,ReservationResponse } from "../types/booking.types";

const mockReservation: ReservationResponse[]=[]

type ReservationUpdatePayload=Partial<ReservationRequest>&{status?:BookingStatus}

export const createReservation=async(payload:ReservationRequest):Promise<ReservationResponse>=>{
    if(USE_MOCKS){
        const newReservation: ReservationResponse={
            id:crypto.randomUUID(),
            status:'PENDING',
            totalPrice:0,
            ...payload,
        }
        mockReservation.push(newReservation)
        return newReservation
    }
    const {data}=await httpClient.post<ReservationResponse>('/api/v1/reservations',payload)
    return data
}

export const getReservations =async(): Promise<ReservationResponse[]>=>{
    if(USE_MOCKS){
        return mockReservation
    }
    const {data} =await httpClient.get<ReservationResponse[]>('/api/v1/reservations')
    return data
}

export const getReservationById=async(id:string):Promise<ReservationResponse|null>=>{
    if(USE_MOCKS){
        return mockReservation.find((reservation)=>reservation.id===id)??null
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
    if(USE_MOCKS){
        const index = mockReservation.findIndex((reservation)=>reservation.id===id)
        if(index===-1){
            throw new Error(`Nie znaleziono rezerwacji z tym id ${id}`)
        }
        mockReservation[index]={...mockReservation[index],...payload}
        return mockReservation[index]
    }
    const {data}=await httpClient.put<ReservationResponse>(`/api/v1/reservations/${id}`,payload)
    return data
}

export const cancelReservation=async(id:string):Promise<void>=>{
    if(USE_MOCKS){
        const index=mockReservation.findIndex((reservation)=>reservation.id===id)
        if(index!==-1){
            mockReservation.splice(index,1)
        }
        return
    }
    await httpClient.delete(`/api/v1/reservations/${id}`)
}