export type RoomType = string
export const ROOM_TYPES: RoomType[] = [
  'Standard',
  'Deluxe Suite',
  'Junior Suite',
  'Grand Suite',
  'Family',
]

export interface Room {
  id: number
  roomType: RoomType
  pricePerNight: number
  capacityAdults: number
  capacityChildren: number
  amenities: string[]
  imageUrls: string[]
  name?: string
  description?: string
  heroImage?: string
  gallery?: string[]

}

export interface RoomFilter {
  checkInDate?: string
  checkOutDate?: string
  numberOfAdults?: number
  numberOfChildren?: number
  roomTypes?: RoomType[]
  minPrice?: number
  maxPrice?: number
}