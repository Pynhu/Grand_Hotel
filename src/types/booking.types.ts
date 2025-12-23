export type BookingStatus =
  |'PENDING'
  |'CONFIRMED'
  |'CANCELLED'
  |'CHECKED_IN'
  |'CHECKED_OUT'

export interface ReservationRequest {
  roomId: number
  checkInDate: string
  checkOutDate: string
  numberOfAdults: number
  numberOfChildren: number
}

export interface ReservationResponse extends ReservationRequest {
  id: string
  userId: string
  totalPrice: number
  status: BookingStatus
}