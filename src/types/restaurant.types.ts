export type TableReserStatus=
|'PENDING'
|'CONFIRMED'
|'CANCELED'
|'SEATED'
|'COMPLETED' 

export interface MenuItem{
    id:number
    name:string
    description?:string
    price:number
}

export interface TableReservation{
    id:number
    date:string
    time:string
    guests:number
    status:TableReserStatus
}

export interface TableReservCreate{
    date:string
    time:string
    guests:number
}

export interface TableReservUpdate{
    date?:string
    time?:string
    guests?:number
    status?:TableReserStatus
}