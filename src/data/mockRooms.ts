import type { Room } from '../types/room.types'

export const mockRooms: Room[] = [
  {
    id: 101,
    roomType: 'Standard',
    pricePerNight: 420,
    capacity: 2,
    amenities: ['Wi-Fi', 'Smart TV', 'Climate Control', 'King Bed'],
    name: 'Standard Elegance',
    description: 'Przytulny pokój z eleganckim wykończeniem, idealny na romantyczny city break.',
    heroImage:
      'https://images.unsplash.com/photo-1605328670876-17554aac10e7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559599238-9d3618f5c9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617099391242-0423ebfaa5a0?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 201,
    roomType: 'Deluxe Suite',
    pricePerNight: 620,
    capacity: 3,
    amenities: ['Wi-Fi', 'Smart TV', 'Balcony', 'Rain Shower', 'Coffee Machine'],
    name: 'Deluxe Aurora Suite',
    description: 'Apartament z prywatnym tarasem, widokiem na morze i personalizowaną obsługą.',
    heroImage:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 301,
    roomType: 'Junior Suite',
    pricePerNight: 780,
    capacity: 3,
    amenities: ['Wi-Fi', 'Smart TV', 'Separate Lounge', 'Rain Shower', 'Mini Bar'],
    name: 'Junior Suite Harmonia',
    description: 'Elegancka przestrzeń dzienna i sypialna, idealna na dłuższe pobyty w GrandHotelu.',
    heroImage:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 401,
    roomType: 'Grand Suite',
    pricePerNight: 1100,
    capacity: 4,
    amenities: [
      'Wi-Fi',
      'Smart TV',
      'Private Spa',
      'Panoramic View',
      'Butler Service',
      'Private Bar',
    ],
    name: 'Grand Royale Suite',
    description: 'Luksusowy penthouse z prywatnym spa, panoramicznymi widokami i dedykowanym concierge.',
    heroImage:
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542317854-0d6bd52c1f5b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534606380158-76e0bc79fdee?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 501,
    roomType: 'Family',
    pricePerNight: 650,
    capacity: 5,
    amenities: ['Wi-Fi', 'Smart TV', 'Two Bedrooms', 'Kids Zone', 'Kitchenette'],
    name: 'Family Horizon Suite',
    description: 'Dwupoziomowy apartament rodzinny z aneksem kuchennym i strefą zabaw dla dzieci.',
    heroImage:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521783593447-5702af86e8e5?auto=format&fit=crop&w=800&q=80',
    ],
  },
]
