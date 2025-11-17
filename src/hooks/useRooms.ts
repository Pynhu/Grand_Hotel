import { useQuery } from '@tanstack/react-query'
import * as roomService from '../services/roomService'

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: roomService.getRooms,
  })
}

export const useRoom = (id: number) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => roomService.getRoom(id),
    enabled: !!id,
  })
}

export const useFilterRooms = (filters: any) => {
  return useQuery({
    queryKey: ['rooms', 'filter', filters],
    queryFn: () => roomService.filterRooms(filters),
  })
}