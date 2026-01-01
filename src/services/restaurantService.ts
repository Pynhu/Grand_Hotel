import type { MenuItem, TableReservation, TableReservCreate, TableReservUpdate, TableReserStatus } from "../types/restaurant.types";

import { httpClient, USE_MOCKS } from "../utils/api";


const mockMenu: MenuItem[] = [
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


const getTableReservationsFromStorage = (): TableReservation[] => {
    const stored = localStorage.getItem('tableReservations')
    return stored ? JSON.parse(stored) : []
}
const saveTableReservationsToStorage = (reservations: TableReservation[]) => {
    localStorage.setItem('tableReservations', JSON.stringify(reservations))
}

const nextMockReservationId = () => {
    const reservations = getTableReservationsFromStorage()
    return reservations.length ? Math.max(...reservations.map((r) => r.id)) + 1 : 1
}





export const getMenu = async (): Promise<MenuItem[]> => {
    if (USE_MOCKS) {
        return mockMenu
    }
    const { data } = await httpClient.get<MenuItem[]>('/api/v1/menu')
    return data
}

export const getAllTableReservations = async (): Promise<TableReservation[]> => {
    if (USE_MOCKS) {
        const userStr = localStorage.getItem('user')
        if (!userStr) {
            return []
        }
        const user = JSON.parse(userStr)
        const reservations = getTableReservationsFromStorage()
        return reservations.filter((res) => res.userId === user.id)
    }
    const { data } = await httpClient.get<TableReservation[]>(`/api/v1/restaurant/reservations`)
    return data
}


export const createTableReservation = async (payload: TableReservCreate): Promise<TableReservation> => {
    if (USE_MOCKS) {
        const userStr = localStorage.getItem('user')
        if (!userStr) {
            throw new Error('Musisz być zalogowany zeby zarezerwowac')
        }
        const user = JSON.parse(userStr)
        const newReservation: TableReservation = {
            id: nextMockReservationId(),
            userId: user.id,
            status: 'PENDING',
            ...payload,
        }
        const reservations = getTableReservationsFromStorage()
        reservations.push(newReservation)
        saveTableReservationsToStorage(reservations)
        return newReservation

    }
    const { data } = await httpClient.post<TableReservation>('/api/v1/restaurant/reservations', payload)
    return data
}

export const updateReservation = async (id: number, payload: TableReservUpdate): Promise<TableReservation> => {
    if (USE_MOCKS) {
        const reservations = getTableReservationsFromStorage()
        const index = reservations.findIndex((res) => res.id === id)

        if (index === -1) {
            throw new Error(`rezerwacja stolika o id ${id} nie istnieje`)
        }

        reservations[index] = { ...reservations[index], ...payload }
        saveTableReservationsToStorage(reservations)

        return reservations[index]
    }
    const { data } = await httpClient.put<TableReservation>(`/api/v1/restaurant/reservations/${id}`, payload)
    return data
}

export const cancelTableReservation = async (id: number): Promise<void> => {
    if (USE_MOCKS) {
        const reservations = getTableReservationsFromStorage()
        const index = reservations.findIndex((res) => res.id === id)

        if (index !== -1) {
            reservations.splice(index, 1)
            saveTableReservationsToStorage(reservations)
        }
        return
    }
    await httpClient.delete(`/api/v1/restaurant/reservations/${id}`)
}


