# Dokumentacja Techniczna Frontend - Grand Hotel

## Spis Treści

1. [Opis Projektu](#opis-projektu)
2. [Stack Technologiczny](#stack-technologiczny)
3. [Struktura Projektu](#struktura-projektu)
4. [Architektura Aplikacji](#architektura-aplikacji)
5. [Serwisy (Services)](#serwisy-services)
6. [Custom Hooks](#custom-hooks)
7. [Komponenty UI](#komponenty-ui)
8. [Komponenty Funkcjonalne](#komponenty-funkcjonalne)
9. [Strony (Pages)](#strony-pages)
10. [Typy TypeScript](#typy-typescript)
11. [Utilities](#utilities)
12. [Routing](#routing)
13. [Zarządzanie Stanem](#zarządzanie-stanem)
14. [Komunikacja z API](#komunikacja-z-api)

---

## Opis Projektu

**Grand Hotel** to aplikacja frontendowa systemu rezerwacji hotelowej zbudowana w React z TypeScript. Aplikacja umożliwia:
- Przeglądanie i rezerwację pokoi hotelowych
- Rezerwację stolików w restauracji
- Korzystanie z asystenta AI (chatbota) z obsługą głosową
- Zarządzanie profilem użytkownika
- Panel administracyjny do zarządzania pokojami i menu

---

## Stack Technologiczny

| Technologia | Wersja | Opis |
|-------------|--------|------|
| **React** | 19.1.1 | Biblioteka do budowy interfejsu użytkownika |
| **TypeScript** | ~5.9.3 | Statyczne typowanie JavaScript |
| **Vite** | 7.1.7 | Narzędzie do budowania i serwera deweloperskiego |
| **React Router DOM** | 7.9.4 | Routing po stronie klienta |
| **TanStack React Query** | 5.90.10 | Zarządzanie stanem serwera i cache'owanie |
| **Axios** | 1.12.2 | Klient HTTP do komunikacji z API |
| **Tailwind CSS** | 3.4.14 | Framework CSS utility-first |
| **Sonner** | 2.0.7 | Biblioteka do wyświetlania powiadomień toast |
| **date-fns** | 4.1.0 | Manipulacja datami |
| **Lucide React** | 0.562.0 | Ikony |
| **React Markdown** | 10.1.0 | Renderowanie Markdown |

---

## Struktura Projektu

```
src/
├── App.tsx                 # Główny komponent z definicją routingu
├── main.tsx                # Punkt wejścia aplikacji
├── index.css               # Globalne style CSS
├── App.css                 # Style głównego komponentu
│
├── components/             # Komponenty wielokrotnego użytku
│   ├── booking/            # Komponenty związane z rezerwacją
│   ├── chat/               # Komponent chatbota AI
│   ├── layout/             # Komponenty layoutu (Navbar, Footer)
│   ├── restaurants/        # Komponenty restauracji
│   ├── rooms/              # Komponenty pokoi
│   └── ui/                 # Bazowe komponenty UI
│
├── context/                # React Context (placeholdery)
│   ├── BookingContext.tsx
│   └── ChatContext.tsx
│
├── data/                   # Dane mockowe do testowania
│   ├── mockConversations.ts
│   ├── mockMenu.ts
│   ├── mockRooms.ts
│   └── mockUsers.ts
│
├── hooks/                  # Custom React Hooks
│   ├── useBooking.ts
│   ├── useChat.ts
│   ├── useRooms.ts
│   └── useScrollReveal.ts
│
├── layout/                 # Layouty stron
│   └── RootLayout.tsx
│
├── pages/                  # Komponenty stron
│   ├── AdminPage.tsx
│   ├── BookingPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── MyBookingsPage.tsx
│   ├── MyProfilePage.tsx
│   ├── NotFoundPage.tsx
│   ├── RegisterPage.tsx
│   ├── RestaurantPage.tsx
│   ├── RestaurantReservationPage.tsx
│   ├── RoomDetailPage.tsx
│   └── RoomsPage.tsx
│
├── services/               # Serwisy do komunikacji z API
│   ├── authService.ts
│   ├── bookingService.ts
│   ├── chatService.ts
│   ├── restaurantService.ts
│   └── roomService.ts
│
├── types/                  # Definicje typów TypeScript
│   ├── booking.types.ts
│   ├── chat.types.ts
│   ├── restaurant.types.ts
│   └── room.types.ts
│
└── utils/                  # Funkcje pomocnicze
    ├── api.ts
    ├── currency.ts
    └── date.ts
```

---

## Architektura Aplikacji

### Diagram Architektury

```
┌─────────────────────────────────────────────────────────────┐
│                         UŻYTKOWNIK                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      WARSTWA UI (Pages)                     │
│   HomePage, RoomsPage, BookingPage, RestaurantPage, etc.    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              KOMPONENTY (Components)                         │
│   Button, Card, Input, Navbar, RoomCard, Chat, etc.         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  HOOKS + SERVICES                            │
│   useRooms, useScrollReveal + authService, roomService, etc.│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    HTTP CLIENT (Axios)                       │
│               Interceptory, Token Refresh                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API                             │
│              REST API (Spring Boot / Node.js)                │
└─────────────────────────────────────────────────────────────┘
```

---

## Serwisy (Services)

### 1. authService.ts

**Ścieżka:** `src/services/authService.ts`

**Opis:** Serwis odpowiedzialny za zarządzanie autentykacją użytkowników - logowanie, rejestrację, wylogowanie oraz weryfikację stanu autoryzacji.

#### Funkcje:

| Funkcja | Parametry | Typ Zwracany | Opis |
|---------|-----------|--------------|------|
| `login(credentials)` | `{email: string, password: string}` | `Promise<any>` | Loguje użytkownika, zapisuje JWT w localStorage |
| `register(userData)` | `{email, password, firstName, lastName, phone}` | `Promise<any>` | Rejestruje nowego użytkownika |
| `refreshToken()` | - | `Promise<any>` | Odświeża token JWT |
| `logout()` | - | `void` | Wylogowuje użytkownika, czyści localStorage |
| `isAuthenticated()` | - | `boolean` | Sprawdza czy użytkownik jest zalogowany |
| `getToken()` | - | `string \| null` | Zwraca aktualny token JWT |
| `getUser()` | - | `Promise<any>` | Pobiera dane zalogowanego użytkownika z API |
| `isAdmin()` | - | `boolean` | Sprawdza czy użytkownik ma rolę ADMIN (decoduje JWT) |

#### Przykład użycia:
```typescript
import * as AuthService from '../services/authService'

// Logowanie
await AuthService.login({ email: 'user@email.com', password: 'hasło' })

// Sprawdzenie autoryzacji
if (AuthService.isAuthenticated()) {
  const user = await AuthService.getUser()
}

// Sprawdzenie roli admina
if (AuthService.isAdmin()) {
  // pokaż panel admina
}
```

---

### 2. bookingService.ts

**Ścieżka:** `src/services/bookingService.ts`

**Opis:** Serwis do zarządzania rezerwacjami pokoi hotelowych. Obsługuje tryb mockowy (localStorage) oraz komunikację z API.

#### Funkcje:

| Funkcja | Parametry | Typ Zwracany | Opis |
|---------|-----------|--------------|------|
| `createReservation(payload)` | `ReservationRequest` | `Promise<ReservationResponse>` | Tworzy nową rezerwację pokoju |
| `getReservations()` | - | `Promise<ReservationResponse[]>` | Pobiera rezerwacje zalogowanego użytkownika |
| `getReservationById(id)` | `string` | `Promise<ReservationResponse \| null>` | Pobiera szczegóły rezerwacji po ID |
| `updateReservation(id, payload)` | `string, ReservationUpdatePayload` | `Promise<ReservationRequest>` | Aktualizuje rezerwację |
| `cancelReservation(id)` | `string` | `Promise<void>` | Anuluje rezerwację |

#### Funkcje pomocnicze (prywatne):
| Funkcja | Opis |
|---------|------|
| `getReservationsFromStorage()` | Pobiera rezerwacje z localStorage (tryb mock) |
| `saveReservationsToStorage(reservations)` | Zapisuje rezerwacje do localStorage |

#### Przykład użycia:
```typescript
import { createReservation, getReservations } from '../services/bookingService'

// Tworzenie rezerwacji
const reservation = await createReservation({
  roomId: 1,
  checkInDate: '2024-01-15',
  checkOutDate: '2024-01-20',
  numberOfAdults: 2,
  numberOfChildren: 0
})

// Pobieranie rezerwacji użytkownika
const myReservations = await getReservations()
```

---

### 3. chatService.ts

**Ścieżka:** `src/services/chatService.ts`

**Opis:** Serwis do komunikacji z agentem AI (chatbotem). Obsługuje wiadomości tekstowe oraz głosowe.

#### Konfiguracja:
- **AGENT_URL:** Pobierany z zmiennej środowiskowej `VITE_AGENT_URL` lub domyślnie `http://localhost:8000`
- **Interceptor:** Automatycznie dodaje token JWT do nagłówka Authorization

#### Funkcje:

| Funkcja | Parametry | Typ Zwracany | Opis |
|---------|-----------|--------------|------|
| `sendMessage(message)` | `string` | `Promise<any>` | Wysyła wiadomość tekstową do agenta AI |
| `sendVoiceMessage(base64Audio, mimeType)` | `string, string` | `Promise<any>` | Wysyła wiadomość głosową (audio w base64) |
| `checkHealth()` | - | `Promise<any>` | Sprawdza status agenta AI |
| `clearSession()` | - | `void` | Czyści ID sesji chatowej |
| `startNewConversation()` | - | `string` | Rozpoczyna nową konwersację, zwraca nowe sessionId |

#### Funkcja pomocnicza (prywatna):
| Funkcja | Opis |
|---------|------|
| `getSessionId()` | Pobiera lub tworzy sessionId przechowywaną w localStorage |

#### Struktura żądania do API:
```typescript
// Wiadomość tekstowa
{
  sessionId: string,
  message: string,
  voiceMode: false
}

// Wiadomość głosowa
{
  sessionId: string,
  audio: {
    mimeType: string,
    data: string // base64
  },
  voiceMode: true
}
```

---

### 4. restaurantService.ts

**Ścieżka:** `src/services/restaurantService.ts`

**Opis:** Serwis do zarządzania menu restauracji oraz rezerwacjami stolików.

#### Funkcje:

| Funkcja | Parametry | Typ Zwracany | Opis |
|---------|-----------|--------------|------|
| `getMenu()` | - | `Promise<MenuItem[]>` | Pobiera listę pozycji menu restauracji |
| `getAllTableReservations()` | - | `Promise<TableReservation[]>` | Pobiera rezerwacje stolików użytkownika |
| `createTableReservation(payload)` | `TableReservCreate` | `Promise<TableReservation>` | Tworzy rezerwację stolika |
| `updateReservation(id, payload)` | `number, TableReservUpdate` | `Promise<TableReservation>` | Aktualizuje rezerwację |
| `cancelTableReservation(id)` | `number` | `Promise<void>` | Anuluje rezerwację stolika |

#### Funkcje pomocnicze (prywatne):
| Funkcja | Opis |
|---------|------|
| `getTableReservationsFromStorage()` | Pobiera rezerwacje z localStorage (tryb mock) |
| `saveTableReservationsToStorage(reservations)` | Zapisuje rezerwacje do localStorage |
| `nextMockReservationId()` | Generuje następne ID dla mock |

---

### 5. roomService.ts

**Ścieżka:** `src/services/roomService.ts`

**Opis:** Serwis do zarządzania pokojami hotelowymi - pobieranie, filtrowanie, tworzenie, edycja i usuwanie.

#### Funkcje:

| Funkcja | Parametry | Typ Zwracany | Opis |
|---------|-----------|--------------|------|
| `getRooms()` | - | `Promise<Room[]>` | Pobiera listę wszystkich pokoi |
| `getRoom(id)` | `number` | `Promise<Room>` | Pobiera szczegóły pojedynczego pokoju |
| `filterRooms(filters)` | `RoomFilter` | `Promise<Room[]>` | Filtruje pokoje wg kryteriów |
| `createRoom(roomData)` | `Omit<Room, 'id'>` | `Promise<Room>` | Tworzy nowy pokój (admin) |
| `updateRoom(id, roomData)` | `number, Partial<Room>` | `Promise<Room>` | Aktualizuje pokój (admin) |
| `deleteRoom(id)` | `number` | `Promise<void>` | Usuwa pokój (admin) |

---

## Custom Hooks

### 1. useRooms.ts

**Ścieżka:** `src/hooks/useRooms.ts`

**Opis:** Hook do pobierania listy pokoi i pojedynczego pokoju.

#### Eksportowane hooki:

```typescript
// Hook do pobierania wszystkich pokoi
export const useRooms = () => {
  // Stan
  const [data, setData] = useState(null)      // Lista pokoi
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Automatyczne pobieranie przy mount
  useEffect(() => {
    roomService.getRooms()
      .then(rooms => { setData(rooms); setIsLoading(false) })
      .catch(error => { setError(error); setIsLoading(false) })
  }, [])
  
  return { data, isLoading, error }
}

// Hook do pobierania pojedynczego pokoju
export const useRoom = (id: any) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    if (!id) return
    roomService.getRoom(id)
      .then(room => { setData(room); setIsLoading(false) })
      .catch(error => { setError(error); setIsLoading(false) })
  }, [id])
  
  return { data, isLoading, error }
}
```

#### Przykład użycia:
```typescript
const { data: rooms, isLoading, error } = useRooms()
const { data: room } = useRoom(roomId)
```

---

### 2. useScrollReveal.ts

**Ścieżka:** `src/hooks/useScrollReveal.ts`

**Opis:** Hook do animacji "reveal" elementów przy scrollowaniu - wykorzystuje Intersection Observer API.

#### Implementacja:
```typescript
export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Jednokrotna animacja
        }
      },
      {
        threshold: 0.1,           // 10% elementu widoczne
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return { ref, isVisible }
}
```

#### Przykład użycia:
```typescript
const section = useScrollReveal()

return (
  <section 
    ref={section.ref}
    className={section.isVisible ? 'opacity-100' : 'opacity-0'}
  >
    Treść animowana przy scrollu
  </section>
)
```

---

## Komponenty UI

### 1. Button.tsx

**Ścieżka:** `src/components/ui/Button.tsx`

**Opis:** Uniwersalny komponent przycisku z wariantami stylów i rozmiarów.

#### Props:

| Prop | Typ | Domyślna | Opis |
|------|-----|----------|------|
| `children` | `ReactNode` | - | Treść przycisku |
| `variant` | `'pierwszy' \| 'drugi' \| 'linie'` | `'pierwszy'` | Wariant kolorystyczny |
| `size` | `'male' \| 'srednie' \| 'duze'` | `'male'` | Rozmiar przycisku |
| `fullWidth` | `boolean` | `false` | Czy przycisk ma zajmować 100% szerokości |
| `className` | `string` | `''` | Dodatkowe klasy CSS |
| `type` | `'button' \| 'submit'` | `'button'` | Typ przycisku HTML |
| `disabled` | `boolean` | `false` | Czy przycisk jest nieaktywny |

#### Warianty kolorystyczne:
- **pierwszy** (primary) - złote tło, granatowy tekst
- **drugi** (secondary) - granatowe tło, biały tekst  
- **linie** (outline) - złota ramka, złoty tekst, hover wypełnia

#### Przykład:
```tsx
<Button variant="pierwszy" size="duze" fullWidth onClick={handleClick}>
  Rezerwuj teraz
</Button>
```

---

### 2. Card.tsx

**Ścieżka:** `src/components/ui/Card.tsx`

**Opis:** Komponent karty kontenera z konfigurowalnymi paddingiem i cieniem.

#### Props:

| Prop | Typ | Domyślna | Opis |
|------|-----|----------|------|
| `children` | `ReactNode` | - | Zawartość karty |
| `className` | `string` | `''` | Dodatkowe klasy CSS |
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Padding wewnętrzny |
| `shadow` | `boolean` | `true` | Czy wyświetlać cień |
| `hover` | `boolean` | `false` | Czy dodać efekt hover z większym cieniem |

#### Mapowanie paddingu:
- `none` → `p-0`
- `small` → `p-4`
- `medium` → `p-6`
- `large` → `p-8`

---

### 3. Input.tsx

**Ścieżka:** `src/components/ui/Input.tsx`

**Opis:** Uniwersalny komponent pola tekstowego z obsługą walidacji i etykiet.

#### Props:

| Prop | Typ | Domyślna | Opis |
|------|-----|----------|------|
| `label` | `string` | - | Etykieta nad inputem |
| `type` | `string` | `'text'` | Typ inputa (text, email, password, date, number, etc.) |
| `placeholder` | `string` | - | Placeholder |
| `error` | `string` | - | Komunikat błędu (zmienia styl na czerwony) |
| `value` | `string` | - | Wartość |
| `onChange` | `(e: ChangeEvent) => void` | - | Handler zmiany |
| `disabled` | `boolean` | `false` | Czy pole jest nieaktywne |
| `required` | `boolean` | `false` | Czy pole jest wymagane (dodaje * do etykiety) |
| `onKeyPress` | `(e: KeyboardEvent) => void` | - | Handler naciśnięcia klawisza |
| `min` | `string` | - | Minimalna wartość (dla date/number) |
| `max` | `string` | - | Maksymalna wartość |

---

## Komponenty Funkcjonalne

### 1. Navbar.tsx

**Ścieżka:** `src/components/layout/Navbar.tsx`

**Opis:** Nawigacja główna aplikacji z menu mobilnym i integracją autoryzacji.

#### Funkcjonalności:
- Responsywny design (desktop/mobile)
- Menu hamburger na mobile (wysuwane z prawej strony)
- Dynamiczne linki nawigacyjne z podkreśleniem aktywnej strony
- Integracja z AuthService - wyświetla UserMenu dla zalogowanych
- Przycisk "Zaloguj się" dla niezalogowanych
- Efekt backdrop-blur na sticky header

#### Linki nawigacyjne:
```typescript
const Links = [
  { to: '/', label: "Strona Główna" },
  { to: '/rooms', label: "Pokoje" },
  { to: '/restaurant', label: "Restauracja" },
]
```

---

### 2. Footer.tsx

**Ścieżka:** `src/components/layout/Footer.tsx`

**Opis:** Stopka strony z informacjami kontaktowymi, linkami i formularzem newslettera.

#### Sekcje:
1. **Logo i opis** - Grand Hotel + linki social media (Facebook, Instagram, Twitter)
2. **Kontakt** - email, telefon, adres
3. **Szybkie linki** - Pokoje, Rezerwacje, Restauracja
4. **Newsletter** - formularz zapisu na email

---

### 3. UserMenu.tsx

**Ścieżka:** `src/components/layout/UserMenu.tsx`

**Opis:** Rozwijane menu użytkownika w nawigacji (po zalogowaniu).

#### Props:
| Prop | Typ | Opis |
|------|-----|------|
| `userName` | `string` | Imię użytkownika do wyświetlenia |
| `onLogout` | `() => void` | Callback wylogowania |

#### Elementy menu:
- Avatar z inicjałami użytkownika
- Link do profilu ("Zarządzaj kontem")
- Link do rezerwacji ("Moje rezerwacje")
- Przycisk wylogowania

---

### 4. Chat.tsx

**Ścieżka:** `src/components/chat/Chat.tsx`

**Opis:** Chatbot AI z obsługą tekstu i głosu - główny komponent asystenta.

#### Stany komponentu:
```typescript
const [messages, setMessages] = useState<any[]>([...])  // Historia wiadomości
const [inputMessage, setInputMessage] = useState('')    // Aktualna wiadomość
const [isLoading, setIsLoading] = useState(false)       // Czy czeka na odpowiedź
const [isRecording, setIsRecording] = useState(false)   // Czy nagrywa głos
const [isPlaying, setIsPlaying] = useState(false)       // Czy odtwarza audio
```

#### Główne funkcje:

| Funkcja | Opis |
|---------|------|
| `handleSendMessage()` | Wysyła wiadomość tekstową do API |
| `startRecording()` | Rozpoczyna nagrywanie głosu (MediaRecorder API) |
| `stopRecording()` | Zatrzymuje nagrywanie i wysyła audio |
| `sendAudio(blob)` | Konwertuje audio do base64 i wysyła |
| `handleResponse(response)` | Przetwarza odpowiedź API, odtwarza audio |
| `stopPlaying()` | Zatrzymuje odtwarzanie audio |

#### Funkcjonalności:
- Wiadomości tekstowe z renderowaniem Markdown (ReactMarkdown)
- Nagrywanie głosu przez MediaRecorder API
- Odtwarzanie odpowiedzi głosowych od AI
- Auto-scroll do najnowszej wiadomości
- Overlay z animacją podczas odtwarzania audio
- Reset sesji konwersacji

---

### 5. BookingWidget.tsx

**Ścieżka:** `src/components/booking/BookingWidget.tsx`

**Opis:** Widget szybkiego wyszukiwania pokoi (na stronie głównej).

#### Pola formularza:
- Data przyjazdu (min: dzisiaj)
- Data wyjazdu (min: dzień po check-in)
- Typ pokoju (Standard, Deluxe, Suite)
- Liczba gości

#### Walidacja:
- Sprawdza czy daty są wypełnione
- Minimalna rezerwacja: 1 noc

#### Akcja:
Przekierowuje do `/rooms` z parametrami URL: `?checkIn=...&checkOut=...&roomType=...&guests=...`

---

### 6. RoomCard.tsx

**Ścieżka:** `src/components/rooms/RoomCard.tsx`

**Opis:** Karta pojedynczego pokoju w liście.

#### Props:
```typescript
interface RoomCardProps {
  room: Room
}
```

#### Wyświetlane informacje:
- Zdjęcie pokoju (z BASE_URL)
- Cena za noc (badge w rogu)
- Nazwa/typ pokoju
- Opis (opcjonalnie)
- Pierwsze 3 udogodnienia jako tagi
- Przycisk "Zobacz pokój" (link do szczegółów)

---

### 7. RoomFilters.tsx

**Ścieżka:** `src/components/rooms/RoomFilters.tsx`

**Opis:** Panel filtrów dla listy pokoi.

#### Filtry:
1. **Popularne filtry** (checkboxy) - Wi-Fi, Room Service, Balcony, Mini Bar, Smart TV
2. **Przedział cenowy** - min/max zł
3. **Typ pokoju** - select (Wszystkie, Standard, Deluxe, Suite)

#### Props (controlled component):
- `minPrice`, `setMinPrice`
- `maxPrice`, `setMaxPrice`
- `guests`, `setGuests`
- `roomType`, `setRoomType`
- `selectedAmenities`, `setSelectedAmenities`
- `onClose` - callback do zamknięcia na mobile

---

### 8. RoomGrid.tsx

**Ścieżka:** `src/components/rooms/RoomGrid.tsx`

**Opis:** Siatka pokoi (grid) wyświetlająca listę RoomCard.

```typescript
interface RoomGridProps {
  rooms: Room[]
}

// Wyświetla komunikat "Brak pokoi" gdy lista pusta
// 3 kolumny na desktop, 2 na tablet, 1 na mobile
```

---

### 9. MenuCard.tsx

**Ścieżka:** `src/components/restaurants/MenuCard.tsx`

**Opis:** Karta pozycji menu restauracji.

#### Wyświetlane:
- Nazwa dania
- Cena (zł)
- Opis
- Kategoria (tag)

---

### 10. MenuGrid.tsx

**Ścieżka:** `src/components/restaurants/MenuGrid.tsx`

**Opis:** Siatka pozycji menu.

---

## Strony (Pages)

### 1. HomePage.tsx

**Ścieżka:** `src/pages/HomePage.tsx`

**Opis:** Strona główna aplikacji - landing page.

#### Sekcje:
1. **Hero section** - tło zdjęciowe, tytuł, Chat (dla zalogowanych) lub CTA logowania, BookingWidget
2. **Featured Rooms** - 3 polecane pokoje z animacją scroll reveal
3. **Amenities** - udogodnienia hotelu (WiFi, Basen, Restauracja, Parking) z ikonami emoji
4. **About** - sekcja "O nas" z tekstem i zdjęciem

#### Użyte hooki:
- `useScrollReveal()` - animacje sekcji
- `useNavigate()` - nawigacja
- `useEffect` - sprawdzenie autoryzacji

---

### 2. RoomsPage.tsx

**Ścieżka:** `src/pages/RoomsPage.tsx`

**Opis:** Lista wszystkich pokoi z filtrami.

#### Funkcjonalności:
- Pobieranie pokoi przez `useRooms()` hook
- Filtrowanie po: cenie (min/max), liczbie gości, typie pokoju, udogodnieniach
- Responsywny panel filtrów (domyślnie ukryty na mobile)
- Obsługa parametrów URL z BookingWidget

---

### 3. RoomDetailPage.tsx

**Ścieżka:** `src/pages/RoomDetailPage.tsx`

**Opis:** Szczegóły pojedynczego pokoju.

#### Sekcje:
- Galeria zdjęć (główne + dodatkowe)
- Nazwa i cena
- Informacje (pojemność, typ)
- Opis
- Lista udogodnień
- Przycisk "Rezerwuj" (wymaga logowania)

---

### 4. BookingPage.tsx

**Ścieżka:** `src/pages/BookingPage.tsx`

**Opis:** Formularz rezerwacji pokoju.

#### Wymagane:
- roomID w URL (`?roomID=123`)
- Zalogowany użytkownik

#### Pola formularza:
- Data przyjazdu
- Data wyjazdu
- Liczba dorosłych
- Liczba dzieci

#### Po sukcesie:
Przekierowuje do `/my-bookings`

---

### 5. RestaurantPage.tsx

**Ścieżka:** `src/pages/RestaurantPage.tsx`

**Opis:** Menu restauracji z nawigacją po kategoriach.

#### Funkcjonalności:
- Sticky menu kategorii z efektem hide/show przy scrollu
- Smooth scroll do kategorii
- Grupowanie dań po kategoriach (Przystawki, Dania Główne, Desery, Napoje)
- Przycisk rezerwacji stolika

---

### 6. RestaurantReservationPage.tsx

**Ścieżka:** `src/pages/RestaurantReservationPage.tsx`

**Opis:** Formularz rezerwacji stolika.

#### Pola:
- Data (min: dzisiaj)
- Godzina (10:00 - 22:00)
- Liczba gości (1-20)

---

### 7. LoginPage.tsx

**Ścieżka:** `src/pages/LoginPage.tsx`

**Opis:** Strona logowania.

#### Pola:
- Email
- Hasło

#### Po sukcesie:
`window.location.href = '/'` (pełne przeładowanie dla odświeżenia stanu)

---

### 8. RegisterPage.tsx

**Ścieżka:** `src/pages/RegisterPage.tsx`

**Opis:** Strona rejestracji.

#### Pola:
- Imię
- Nazwisko
- Email
- Telefon
- Hasło (min 8 znaków)
- Potwierdzenie hasła

#### Walidacja:
- Wszystkie pola wymagane
- Hasła muszą się zgadzać
- Min. 8 znaków w haśle

---

### 9. MyProfilePage.tsx

**Ścieżka:** `src/pages/MyProfilePage.tsx`

**Opis:** Profil użytkownika.

#### Wyświetlane:
- Avatar z inicjałami
- Imię i nazwisko
- Dane kontaktowe (email, telefon)
- Przyciski: Moje rezerwacje, Wyloguj się

---

### 10. MyBookingsPage.tsx

**Ścieżka:** `src/pages/MyBookingsPage.tsx`

**Opis:** Lista rezerwacji użytkownika.

#### Sekcje:
1. **Pokoje** - rezerwacje pokoi z możliwością anulowania
2. **Stoliki** - rezerwacje stolików z możliwością anulowania

#### Wyświetlane dla pokoi:
- ID rezerwacji
- Daty check-in/check-out
- Liczba dorosłych/dzieci
- Status

---

### 11. AdminPage.tsx

**Ścieżka:** `src/pages/AdminPage.tsx`

**Opis:** Panel administracyjny (tylko dla użytkowników z rolą ADMIN).

#### Zakładki:
1. **Menu** - dodawanie/usuwanie pozycji menu restauracji
2. **Rooms** - dodawanie/usuwanie pokoi (z upload zdjęć)

#### Zabezpieczenia:
- Sprawdzenie `AuthService.isAdmin()` przy mount
- Przekierowanie na `/` jeśli nie admin

---

### 12. NotFoundPage.tsx

**Ścieżka:** `src/pages/NotFoundPage.tsx`

**Opis:** Strona 404 (placeholder).

---

## Typy TypeScript

### 1. booking.types.ts

```typescript
// Status rezerwacji pokoju
export type BookingStatus =
  | 'PENDING'      // Oczekująca
  | 'CONFIRMED'    // Potwierdzona
  | 'CANCELLED'    // Anulowana
  | 'CHECKED_IN'   // Zameldowany
  | 'CHECKED_OUT'  // Wymeldowany

// Żądanie tworzenia rezerwacji
export interface ReservationRequest {
  roomId: number
  checkInDate: string      // Format: 'YYYY-MM-DD'
  checkOutDate: string
  numberOfAdults: number
  numberOfChildren: number
}

// Odpowiedź z danymi rezerwacji
export interface ReservationResponse extends ReservationRequest {
  id: string
  userId: string
  totalPrice: number
  status: BookingStatus
}
```

---

### 2. chat.types.ts

```typescript
// Nadawca wiadomości
export type MessageSender = 'user' | 'assistant' | 'system'

// Typ wiadomości
export type MessageType = 'text' | 'room_recommendation' | 'booking_summary'

// Wiadomość w chacie
export interface ChatMessage {
  id: string
  sender: MessageSender
  type: MessageType
  content: string
  timestamp: string
  roomId?: number                    // Opcjonalne ID polecanego pokoju
  metadata?: Record<string, unknown>
}

// Stan konwersacji
export interface ConversationState {
  messages: ChatMessage[]
  isLoading: boolean
  error?: string
}
```

---

### 3. restaurant.types.ts

```typescript
// Status rezerwacji stolika
export type TableReserStatus =
  | 'PENDING'    // Oczekująca
  | 'CONFIRMED'  // Potwierdzona
  | 'CANCELED'   // Anulowana
  | 'SEATED'     // Przy stoliku
  | 'COMPLETED'  // Zakończona

// Pozycja menu
export interface MenuItem {
  id: number
  name: string
  description?: string
  price: number
}

// Rezerwacja stolika
export interface TableReservation {
  id: number
  userId: string
  date: string      // Format: 'YYYY-MM-DD'
  time: string      // Format: 'HH:MM'
  guests: number
  status: TableReserStatus
}

// Tworzenie rezerwacji stolika
export interface TableReservCreate {
  date: string
  time: string
  guests: number
}

// Aktualizacja rezerwacji stolika
export interface TableReservUpdate {
  date?: string
  time?: string
  guests?: number
  status?: TableReserStatus
}
```

---

### 4. room.types.ts

```typescript
// Typ pokoju (aliast stringa dla elastyczności)
export type RoomType = string

// Predefiniowane typy pokoi
export const ROOM_TYPES: RoomType[] = [
  'Standard',
  'Deluxe Suite',
  'Junior Suite',
  'Grand Suite',
  'Family',
]

// Pokój hotelowy
export interface Room {
  id: number
  roomType: RoomType
  pricePerNight: number
  capacityAdults: number
  capacityChildren: number
  amenities: string[]        // Lista udogodnień
  imageUrls: string[]        // Ścieżki do zdjęć
  name?: string              // Opcjonalna nazwa
  description?: string       // Opcjonalny opis
  heroImage?: string         // Główne zdjęcie
  gallery?: string[]         // Galeria zdjęć
}

// Filtry wyszukiwania pokoi
export interface RoomFilter {
  checkInDate?: string
  checkOutDate?: string
  numberOfAdults?: number
  numberOfChildren?: number
  roomTypes?: RoomType[]
  minPrice?: number
  maxPrice?: number
}
```

---

## Utilities

### 1. api.ts

**Ścieżka:** `src/utils/api.ts`

**Opis:** Konfiguracja klienta HTTP Axios z interceptorami.

#### Eksporty:
```typescript
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'
export const httpClient = axios.create({ ... })
```

#### Request Interceptor:
- Dodaje nagłówek `Authorization: Bearer <jwt>` z localStorage
- Pomija dla endpointu `/auth/refresh`

#### Response Interceptor:
- Obsługuje błąd 401 (Unauthorized)
- Automatycznie odpala refresh tokena
- Powtarza oryginalne żądanie z nowym tokenem
- Przy niepowodzeniu refresha czyści localStorage

---

### 2. currency.ts

**Ścieżka:** `src/utils/currency.ts`

**Opis:** Formatowanie walut.

```typescript
export const formatCurrency = (
  amount: number,
  locale: string = 'pl-PL',
  currency: string = 'PLN',
) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

// Przykład: formatCurrency(199.99) → "199,99 zł"
```

---

### 3. date.ts

**Ścieżka:** `src/utils/date.ts`

**Opis:** Pomocnicze funkcje do manipulacji datami (wykorzystuje date-fns).

```typescript
import { format, parseISO } from 'date-fns'

// Konwertuje Date do string ISO
export const toISODate = (date: Date) => date.toISOString()

// Parsuje string ISO do Date
export const fromISODate = (value: string) => parseISO(value)

// Formatuje datę do wyświetlenia
export const formatDisplayDate = (value: string | Date, pattern = 'dd MMM yyyy') =>
  format(typeof value === 'string' ? parseISO(value) : value, pattern)

// Przykład: formatDisplayDate('2024-01-15') → "15 Jan 2024"
```

---

## Routing

### Konfiguracja

**Plik:** `src/App.tsx`

```typescript
const App = () => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/rooms/:id" element={<RoomDetailPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
      <Route path="/restaurant/reservation" element={<RestaurantReservationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)
```

### Tabela tras

| Ścieżka | Komponent | Opis | Wymagana autoryzacja |
|---------|-----------|------|----------------------|
| `/` | HomePage | Strona główna | Nie |
| `/rooms` | RoomsPage | Lista pokoi | Nie |
| `/rooms/:id` | RoomDetailPage | Szczegóły pokoju | Nie |
| `/booking` | BookingPage | Formularz rezerwacji | Tak |
| `/restaurant` | RestaurantPage | Menu restauracji | Nie |
| `/restaurant/reservation` | RestaurantReservationPage | Rezerwacja stolika | Tak |
| `/login` | LoginPage | Logowanie | Nie |
| `/register` | RegisterPage | Rejestracja | Nie |
| `/profile` | MyProfilePage | Profil użytkownika | Tak |
| `/my-bookings` | MyBookingsPage | Moje rezerwacje | Tak |
| `/admin` | AdminPage | Panel admina | Tak (rola ADMIN) |
| `*` | NotFoundPage | Strona 404 | Nie |

---

## Zarządzanie Stanem

### Strategia

Aplikacja wykorzystuje **lokalny stan komponentów** (`useState`) zamiast globalnego state managera (Redux/Zustand).

#### Przechowywanie danych:

| Dane | Metoda | Opis |
|------|--------|------|
| Token JWT | localStorage (`jwt`) | Persistentny między sesjami |
| Status logowania | localStorage (`isLoggedIn`) | Szybka walidacja bez decodowania |
| Session ID chatu | localStorage (`chatSessionId`) | Utrzymanie kontekstu konwersacji |
| Dane mock | localStorage (różne klucze) | Symulacja backendu w trybie dev |

### React Query

**TanStack React Query** jest skonfigurowany w `main.tsx`:
```typescript
const queryClient = new QueryClient()

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

Aktualnie nie jest aktywnie wykorzystywany - hooki (`useRooms`) używają `useState` + `useEffect` zamiast `useQuery`.

---

## Komunikacja z API

### Endpointy Backend

| Moduł | Metoda | Endpoint | Opis |
|-------|--------|----------|------|
| **Auth** | POST | `/auth/login` | Logowanie |
| | POST | `/auth/register` | Rejestracja |
| | POST | `/auth/refresh` | Odświeżenie tokena |
| | GET | `/auth/me` | Dane użytkownika |
| **Rooms** | GET | `/api/v1/rooms` | Lista pokoi |
| | GET | `/api/v1/rooms/:id` | Szczegóły pokoju |
| | POST | `/api/v1/rooms` | Dodaj pokój (admin) |
| | PUT | `/api/v1/rooms/:id` | Edytuj pokój (admin) |
| | DELETE | `/api/v1/rooms/:id` | Usuń pokój (admin) |
| | POST | `/api/v1/rooms/filter` | Filtruj pokoje |
| **Reservations** | GET | `/api/v1/reservations` | Rezerwacje użytkownika |
| | POST | `/api/v1/reservations` | Utwórz rezerwację |
| | GET | `/api/v1/reservations/:id` | Szczegóły rezerwacji |
| | PUT | `/api/v1/reservations/:id` | Edytuj rezerwację |
| | DELETE | `/api/v1/reservations/:id` | Anuluj rezerwację |
| **Restaurant** | GET | `/api/v1/menu` | Menu restauracji |
| | POST | `/api/v1/menu` | Dodaj pozycję (admin) |
| | DELETE | `/api/v1/menu/:id` | Usuń pozycję (admin) |
| | GET | `/api/v1/restaurant/reservations` | Rezerwacje stolików |
| | POST | `/api/v1/restaurant/reservations` | Zarezerwuj stolik |
| | PUT | `/api/v1/restaurant/reservations/:id` | Edytuj rezerwację |
| | DELETE | `/api/v1/restaurant/reservations/:id` | Anuluj rezerwację |
| **Images** | POST | `/api/v1/images/rooms/:id` | Upload zdjęć pokoju |
| **AI Agent** | POST | `/agent/chat` | Wiadomość do chatbota |
| | GET | `/agent/health` | Status agenta AI |

### Zmienne środowiskowe

```env
VITE_API_URL=http://localhost:8080    # URL backendu
VITE_AGENT_URL=http://localhost:8000  # URL agenta AI
VITE_USE_MOCKS=false                  # Tryb mockowy
```

---

## Podsumowanie

Aplikacja frontendowa **Grand Hotel** to nowoczesna aplikacja SPA zbudowana w oparciu o React 19 i TypeScript. Architektura opiera się na:

- **Komponentach funkcyjnych** z React Hooks
- **Service layer** do izolacji logiki komunikacji z API
- **Custom hooks** do reużywalnej logiki
- **TypeScript** dla type safety
- **Tailwind CSS** dla szybkiego stylowania
- **Modularnej strukturze** ułatwiającej rozwój i testowanie

Kluczowe funkcjonalności:
1. System rezerwacji pokoi hotelowych
2. System rezerwacji stolików w restauracji
3. Chatbot AI z obsługą głosu
4. Panel administracyjny
5. Pełna autoryzacja JWT z refresh tokenem
