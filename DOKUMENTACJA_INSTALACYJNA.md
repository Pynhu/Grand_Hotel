# Dokumentacja Instalacyjno-Konfiguracyjna
## Aplikacja Frontend - Grand Hotel

---

## Spis Treści

1. [Wymagania Systemowe](#wymagania-systemowe)
2. [Instalacja](#instalacja)
3. [Konfiguracja Środowiska](#konfiguracja-środowiska)
4. [Uruchomienie Projektu](#uruchomienie-projektu)
5. [Budowanie Produkcyjne](#budowanie-produkcyjne)
6. [Struktura Plików Konfiguracyjnych](#struktura-plików-konfiguracyjnych)
7. [Integracja z Backendem](#integracja-z-backendem)
8. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)

---

## Wymagania Systemowe

### Minimalne wymagania

| Komponent | Wersja minimalna | Zalecana |
|-----------|------------------|----------|
| **Node.js** | 18.x | 20.x LTS |
| **npm** | 9.x | 10.x |
| **Przeglądarka** | Chrome 90+, Firefox 88+, Edge 90+ | Najnowsza |
| **RAM** | 4 GB | 8 GB |
| **Dysk** | 500 MB wolnego miejsca | 1 GB |

### Weryfikacja wersji Node.js i npm

```bash
# Sprawdź wersję Node.js
node --version
# Oczekiwany wynik: v18.x.x lub nowszy

# Sprawdź wersję npm
npm --version
# Oczekiwany wynik: 9.x.x lub nowszy
```

### Instalacja Node.js (jeśli brak)

**Windows:**
1. Pobierz instalator z [nodejs.org](https://nodejs.org/)
2. Wybierz wersję LTS (Long Term Support)
3. Uruchom instalator i postępuj zgodnie z instrukcjami

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS (Homebrew):**
```bash
brew install node
```

---

## Instalacja

### Krok 1: Sklonowanie repozytorium

```bash
# Klonowanie repozytorium
git clone <URL_REPOZYTORIUM>

# Przejście do katalogu projektu
cd Grand_Hotel_Front
```

### Krok 2: Instalacja zależności

```bash
# Instalacja wszystkich pakietów
npm install
```

**Oczekiwany wynik:**
```
added XXX packages in Xs
```

### Krok 3: Weryfikacja instalacji

```bash
# Sprawdzenie czy wszystko zostało zainstalowane
npm list --depth=0
```

### Lista głównych zależności

#### Zależności produkcyjne (dependencies)

| Pakiet | Wersja | Opis |
|--------|--------|------|
| `react` | ^19.1.1 | Biblioteka UI |
| `react-dom` | ^19.1.1 | Renderowanie React do DOM |
| `react-router-dom` | ^7.9.4 | Routing |
| `@tanstack/react-query` | ^5.90.10 | Zarządzanie stanem serwera |
| `axios` | ^1.12.2 | Klient HTTP |
| `date-fns` | ^4.1.0 | Manipulacja datami |
| `lucide-react` | ^0.562.0 | Ikony |
| `react-markdown` | ^10.1.0 | Renderowanie Markdown |
| `remark-gfm` | ^4.0.1 | Plugin GitHub Markdown |
| `sonner` | ^2.0.7 | Powiadomienia toast |

#### Zależności deweloperskie (devDependencies)

| Pakiet | Wersja | Opis |
|--------|--------|------|
| `vite` | ^7.1.7 | Bundler i dev server |
| `typescript` | ~5.9.3 | Kompilator TypeScript |
| `tailwindcss` | ^3.4.14 | Framework CSS |
| `@vitejs/plugin-react` | ^5.0.4 | Plugin React dla Vite |
| `eslint` | ^9.36.0 | Linter JavaScript |
| `postcss` | ^8.5.6 | Procesor CSS |
| `autoprefixer` | ^10.4.21 | Automatyczne prefixy CSS |

---

## Konfiguracja Środowiska

### Zmienne środowiskowe

Projekt wykorzystuje zmienne środowiskowe do konfiguracji. Stwórz plik `.env` na podstawie przykładu:

```bash
# Skopiuj plik przykładowy
cp .env.example .env
```

### Zawartość pliku `.env`

```env
# URL backendu REST API
VITE_API_URL=http://localhost:8080

# Tryb mockowy (true = bez backendu, false = wymaga backendu)
VITE_USE_MOCKS=false

# URL WebSocket (opcjonalnie)
VITE_WS_URL=ws://localhost:8080/ws

# URL agenta AI (chatbota)
VITE_AGENT_URL=http://localhost:8000
```

### Opis zmiennych środowiskowych

| Zmienna | Typ | Domyślna | Opis |
|---------|-----|----------|------|
| `VITE_API_URL` | URL | `http://localhost:8080` | Adres backendu REST API (Spring Boot) |
| `VITE_USE_MOCKS` | Boolean | `false` | Włącza tryb mockowy bez backendu |
| `VITE_WS_URL` | URL | - | Adres WebSocket (opcjonalny) |
| `VITE_AGENT_URL` | URL | `http://localhost:8000` | Adres serwera AI (chatbot) |

### Konfiguracja dla różnych środowisk

#### Środowisko deweloperskie (development)
```env
VITE_API_URL=http://localhost:8080
VITE_USE_MOCKS=false
VITE_AGENT_URL=http://localhost:8000
```

#### Środowisko testowe (bez backendu)
```env
VITE_API_URL=http://localhost:8080
VITE_USE_MOCKS=true
```

#### Środowisko produkcyjne
```env
VITE_API_URL=https://api.grandhotel.pl
VITE_USE_MOCKS=false
VITE_AGENT_URL=https://ai.grandhotel.pl
```

---

## Uruchomienie Projektu

### Tryb deweloperski

```bash
npm run dev
```

**Oczekiwany wynik:**
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Aplikacja jest dostępna pod adresem: **http://localhost:5173**

### Opcje uruchomienia deweloperskiego

```bash
# Standardowe uruchomienie
npm run dev

# Z dostępem z sieci (inne urządzenia w LAN)
npm run dev -- --host

# Na innym porcie
npm run dev -- --port 3000
```

### Tryb podglądu produkcyjnego

```bash
# Najpierw zbuduj aplikację
npm run build

# Uruchom podgląd
npm run preview
```

---

## Budowanie Produkcyjne

### Budowanie aplikacji

```bash
npm run build
```

**Co się dzieje:**
1. TypeScript kompiluje kod do JavaScript
2. Vite buduje zoptymalizowaną wersję
3. Tailwind CSS generuje minimalny plik stylów
4. Wynik trafia do katalogu `dist/`

**Oczekiwany wynik:**
```
vite v7.x.x building for production...
✓ XXX modules transformed.
dist/index.html                   0.65 kB │ gzip:  0.42 kB
dist/assets/index-XXXX.css       XX.XX kB │ gzip:  X.XX kB
dist/assets/index-XXXX.js       XXX.XX kB │ gzip: XX.XX kB
✓ built in Xs
```

### Struktura katalogu `dist/`

```
dist/
├── index.html           # Główny plik HTML
├── vite.svg             # Favicon
└── assets/
    ├── index-XXXX.css   # Skompilowane style
    └── index-XXXX.js    # Skompilowany JavaScript
```

### Wdrożenie na serwer

Zawartość katalogu `dist/` można wdrożyć na dowolny serwer statyczny:

- **Nginx** - skopiuj do `/var/www/html/`
- **Apache** - skopiuj do `/var/www/html/`
- **Vercel/Netlify** - podłącz repozytorium
- **Docker** - użyj obrazu nginx

#### Przykładowa konfiguracja Nginx

```nginx
server {
    listen 80;
    server_name grandhotel.pl;
    root /var/www/grandhotel/dist;
    index index.html;

    # SPA - przekierowanie wszystkich ścieżek do index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache dla zasobów statycznych
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Struktura Plików Konfiguracyjnych

### vite.config.ts

Konfiguracja bundlera Vite:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

**Opis:**
- `plugins: [react()]` - włącza wsparcie dla React (JSX, Fast Refresh)

### tsconfig.json

Główna konfiguracja TypeScript (referencje do plików szczegółowych):

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json

Konfiguracja TypeScript dla kodu aplikacji:

```json
{
  "compilerOptions": {
    "target": "ES2022",          // Cel kompilacji
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",          // System modułów
    "jsx": "react-jsx",          // Wsparcie JSX
    "strict": true,              // Ścisłe sprawdzanie typów
    "noUnusedLocals": true,      // Błąd przy nieużywanych zmiennych
    "noUnusedParameters": true,  // Błąd przy nieużywanych parametrach
    "moduleResolution": "bundler",
    "noEmit": true               // Tylko sprawdzanie, nie generuje plików
  },
  "include": ["src"]
}
```

### tailwind.config.js

Konfiguracja Tailwind CSS:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Własne fonty
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      // Własna paleta kolorów
      colors: {
        grand: {
          navy: '#0b1a30',   // Granatowy - główny kolor
          gold: '#d4af37',   // Złoty - akcent
          cream: '#f5f1e6',  // Kremowy - tło
          slate: '#1f2d3d',  // Szary - teksty
        },
      },
      // Własne animacje
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### postcss.config.js

Konfiguracja PostCSS:

```javascript
export default {
  plugins: {
    tailwindcss: {},    // Przetwarzanie Tailwind
    autoprefixer: {},   // Automatyczne prefixy (-webkit, -moz, etc.)
  },
}
```

### eslint.config.js

Konfiguracja ESLint (linter):

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),  // Ignoruj katalog dist
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

### index.html

Główny plik HTML:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>hotel-app</title>
    <!-- Fonty Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Integracja z Backendem

### Wymagane endpointy API

Frontend oczekuje następujących endpointów na backendzie:

#### Autentykacja (`/auth/*`)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/auth/login` | Logowanie użytkownika |
| POST | `/auth/register` | Rejestracja użytkownika |
| POST | `/auth/refresh` | Odświeżenie tokena JWT |
| GET | `/auth/me` | Pobranie danych zalogowanego użytkownika |

#### Pokoje (`/api/v1/rooms/*`)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/v1/rooms` | Lista wszystkich pokoi |
| GET | `/api/v1/rooms/:id` | Szczegóły pokoju |
| POST | `/api/v1/rooms` | Dodanie pokoju (admin) |
| PUT | `/api/v1/rooms/:id` | Edycja pokoju (admin) |
| DELETE | `/api/v1/rooms/:id` | Usunięcie pokoju (admin) |
| POST | `/api/v1/rooms/filter` | Filtrowanie pokoi |

#### Rezerwacje (`/api/v1/reservations/*`)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/v1/reservations` | Rezerwacje użytkownika |
| POST | `/api/v1/reservations` | Utworzenie rezerwacji |
| GET | `/api/v1/reservations/:id` | Szczegóły rezerwacji |
| PUT | `/api/v1/reservations/:id` | Edycja rezerwacji |
| DELETE | `/api/v1/reservations/:id` | Anulowanie rezerwacji |

#### Menu i restauracja (`/api/v1/menu/*`, `/api/v1/restaurant/*`)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/v1/menu` | Lista pozycji menu |
| POST | `/api/v1/menu` | Dodanie pozycji (admin) |
| DELETE | `/api/v1/menu/:id` | Usunięcie pozycji (admin) |
| GET | `/api/v1/restaurant/reservations` | Rezerwacje stolików |
| POST | `/api/v1/restaurant/reservations` | Rezerwacja stolika |
| DELETE | `/api/v1/restaurant/reservations/:id` | Anulowanie rezerwacji |

#### Zdjęcia (`/api/v1/images/*`)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/v1/images/rooms/:id` | Upload zdjęć pokoju |

### Konfiguracja CORS na backendzie

Backend musi zezwalać na żądania z frontendu. Przykład dla Spring Boot:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

### Format tokena JWT

Frontend oczekuje tokena JWT w formacie:

**Payload:**
```json
{
  "sub": "user@email.com",
  "role": [
    { "authority": "ROLE_USER" },
    { "authority": "ROLE_ADMIN" }
  ],
  "exp": 1234567890
}
```

---

## Rozwiązywanie Problemów

### Problem: `npm install` kończy się błędem

**Rozwiązanie:**
```bash
# Wyczyść cache npm
npm cache clean --force

# Usuń node_modules i package-lock.json
rm -rf node_modules package-lock.json

# Zainstaluj ponownie
npm install
```

### Problem: Błąd "EACCES permission denied"

**Rozwiązanie (Linux/macOS):**
```bash
# Zmień właściciela katalogu npm
sudo chown -R $(whoami) ~/.npm
```

### Problem: Strona nie ładuje się po `npm run dev`

**Sprawdź:**
1. Czy port 5173 nie jest zajęty
2. Czy firewall nie blokuje połączenia
3. Sprawdź konsolę przeglądarki (F12) na błędy

### Problem: Błędy CORS

**Rozwiązanie:**
1. Sprawdź czy backend działa
2. Sprawdź konfigurację CORS na backendzie
3. Upewnij się że `VITE_API_URL` wskazuje na prawidłowy adres

### Problem: "Cannot find module" przy imporcie

**Rozwiązanie:**
```bash
# Zainstaluj brakujące typy
npm install --save-dev @types/nazwa-pakietu
```

### Problem: Błędy TypeScript

**Rozwiązanie:**
```bash
# Sprawdź błędy TypeScript
npx tsc --noEmit

# Uruchom linter
npm run lint
```

### Problem: Stare dane w przeglądarce

**Rozwiązanie:**
1. Wyczyść localStorage (F12 → Application → Local Storage → Clear)
2. Wyczyść cache przeglądarki (Ctrl+Shift+Delete)
3. Użyj trybu incognito

---

## Polecenia npm

| Polecenie | Opis |
|-----------|------|
| `npm install` | Instalacja zależności |
| `npm run dev` | Uruchomienie w trybie deweloperskim |
| `npm run build` | Budowanie wersji produkcyjnej |
| `npm run preview` | Podgląd wersji produkcyjnej |
| `npm run lint` | Sprawdzenie kodu linterem ESLint |

---

## Podsumowanie

Po wykonaniu powyższych kroków aplikacja frontendowa Grand Hotel powinna być w pełni skonfigurowana i gotowa do pracy. W razie problemów sprawdź sekcję "Rozwiązywanie Problemów" lub skontaktuj się z zespołem deweloperskim.

**Minimalne kroki do uruchomienia:**
```bash
git clone <repo>
cd Grand_Hotel_Front
cp .env.example .env
npm install
npm run dev
```
