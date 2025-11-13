import type { MenuItem,TableReservation,TableReservCreate,TableReservUpdate,
    TableReserStatus
 } from "../types/restaurant.types";

 import { httpClient,USE_MOCKS } from "../utils/api";


const mockMenu:MenuItem[]= [
    {
        id: 1,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon served with roasted vegetables and lemon sauce',
        price: 24.99,
    },
    {
        id: 2,
        name: 'Wagyu A5',
        description: 'Najwyższej klasy wołowina serwowana z truflami i koniakiem',
        price: 420,
    },
]


const mockTableReservations:TableReservation[]=[]

const nextMockReservationId=()=>
    mockTableReservations.length?Math.max(...mockTableReservations.map((r)=>r.id))+1:1



export const getMenu=async():Promise<MenuItem[]>=>{
    if(USE_MOCKS){
        return mockMenu
    }
    const {data}=await httpClient.get<MenuItem[]>('/api/v1/restaurant/menu')
    return data
}

export const getTableReservations=async(id:number):Promise<TableReservation|null>=>{
    if(USE_MOCKS){
        return mockTableReservations.find((reserv)=>reserv.id===id)??null
    }

    try{
        const {data}=await httpClient.get<TableReservation>(`/api/v1/restaurant/reservations/${id}`)
        return data
    }catch (error){
        console.error("Nie znaleziono stolika",error)
        return null
    }
}


export const createTableReservation =async(payload:TableReservCreate):Promise<TableReservation>=>{
    if(USE_MOCKS){
        const newReservation:TableReservation={
            id:nextMockReservationId(),
            status:'PENDING',
            ...payload,
        }
        mockTableReservations.push(newReservation)
        return newReservation
    }
    const {data}=await httpClient.post<TableReservation>('/api/v1/restaurant/reservations',payload)
    return data
}

export const updateReservation=async(id:number,payload:TableReservUpdate):Promise<TableReservation>=>{
    if(USE_MOCKS){
        const index=mockTableReservations.findIndex((res)=>res.id===id)
        if(index===-1){
            throw new Error(`rezerwacja stolika o id ${id} nie istnieje`)
        }
        mockTableReservations[index]={...mockTableReservations[index],...payload}
        return mockTableReservations[index]
    }
    const {data}=await httpClient.put<TableReservation>(`/api/v1/restaurant/reservations/${id}`,payload)
    return data   
}

export const cancelTableReservation=async(id:number):Promise<void>=>{
    if(USE_MOCKS){
        const index=mockTableReservations.findIndex((res)=>res.id===id)
        if(index!==-1){
            mockTableReservations.splice(index,1)
        }
        return
    }
    await httpClient.delete(`/api/v1/restaurant/revervations/${id}`)
}


