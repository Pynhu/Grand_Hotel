export interface User {
  id: string
  email: string
  password: string // W produkcji byłoby hashowane!
  firstName: string
  lastName: string
  phone?: string
  createdAt: string
}

export interface AuthResponse {
  jwt: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}

// Mockowa baza użytkowników
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'test@test.pl',
    password: 'test123',
    firstName: 'Piotr',
    lastName: 'Testowy',
    phone: '+48 123 456 789',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'user-2',
    email: 'admin@grandhotel.pl',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'Grand Hotel',
    phone: '+48 987 654 321',
    createdAt: new Date('2023-01-01').toISOString(),
  },
]
export const generateMockJWT = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24h
    })
  )
  const signature = btoa('mock-signature-' + userId)
  return `${header}.${payload}.${signature}`
}

// Helper do dodawania nowych użytkowników (dla rejestracji)
export const addMockUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  mockUsers.push(newUser)
  return newUser
}

// Helper do znajdowania użytkownika
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

