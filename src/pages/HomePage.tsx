import Chat from "../components/chat/Chat"
import Booking from "../components/booking/BookingWidget"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as AuthService from "../services/authService"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"

const featuredRooms = [
  {
    id: 1,
    name: "Deluxe Aurora Suite",
    price: 599,
    description: "Panorama miasta, spa, balkon z widokiem",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"
  },
  {
    id: 2,
    name: "Grand Presidential Suite",
    price: 1299,
    description: "Luksusowy apartament, prywatny taras",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80"
  },
  {
    id: 3,
    name: "Family Comfort Room",
    price: 449,
    description: "Idealny dla rodzin, przestronny pokój",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80"
  }
]
const amenities = [
  {
    id: 1,
    icon: "📶",
    title: "Darmowe WiFi",
    description: "Szybki internet w całym hotelu"
  },
  {
    id: 2,
    icon: "🏊",
    title: "Basen & Spa",
    description: "Strefa relaksu z jacuzzi"
  },
  {
    id: 3,
    icon: "🍽️",
    title: "Restauracja",
    description: "Wykwintna kuchnia na miejscu"
  },
  {
    id: 4,
    icon: "🅿️",
    title: "Parking",
    description: "Bezpłatny parking dla gości"
  }
]
const HomePage = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated())
  }, [])
  const roomsSection = useScrollReveal()
  const amenitiesSection = useScrollReveal()
  const aboutSection = useScrollReveal()
  return (
    <>
      <section className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-grand-navy/90 via-grand-slate/80 to-grand-navy/90" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 py-20 px-6">
          <header className="text-center pt-20">
            <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              Witaj w <span className="text-grand-gold">Grand Hotel</span>
            </h1>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto">
              Twój wyjątkowy pobyt własnie się zaczyna
            </p>
          </header>
          <div className="w-full max-w-6xl">
            {isLoggedIn ? (
              <Chat />
            ) : (
              <Card className="w-full max-w-3xl mx-auto backdrop-blur-lg bg-white/95 text-center py-12">

                <h3 className="text-2xl font-bold text-grand-navy mb-4">
                  Chat dostępny tylko dla zalogowanych gości
                </h3>
                <p className="text-grand-slate/70 mb-6">
                  Zaloguj się, aby korzystać z asystenta AI Grand Hotel
                </p>
                <Button
                  variant="pierwszy"
                  size="duze"
                  onClick={() => navigate('/login')}
                >
                  Zaloguj się
                </Button>
              </Card>
            )}
          </div>
          <Booking />
        </div>
      </section>
      <section
        ref={roomsSection.ref}
        className={`max-w-7xl mx-auto px-6 py-20 transition-all duration-700
            ${roomsSection.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/rooms/${room.id}`)}
              className="group rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div
                className="h-56 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${room.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-grand-gold">{room.price}zł</span>
                    <span className="text-sm text-white/80">/noc</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-grand-navy mb-2">
                  {room.name}
                </h3>
                <p className="text-sm text-grand-slate/80 leading-relaxed">
                  {room.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        ref={amenitiesSection.ref}
        className={`bg-gradient-to-br from-grand-navy to-grand-slate py-20 transition-all duration-700
            ${amenitiesSection.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Nasze Udogodnienia
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Wszystko czego potrzebujesz dla niezapomnianego pobytu
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-grand-gold/20 rounded-2xl flex items-center justify-center 
                group-hover:bg-grand-gold group-hover:scale-110 transition-all duration-300"
                >
                  <span className="text-4xl">{amenity.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {amenity.title}
                </h3>
                <p className="text-sm text-white/70">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        ref={aboutSection.ref}
        className={`py-20 bg-gradient-to-br from-grand-cream to-white transition-all duration-700
            ${aboutSection.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Tekst */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-grand-navy mb-6">
                Witaj w Grand Hotel
              </h2>
              <p className="text-lg text-grand-slate/80 mb-6 leading-relaxed">
                Od ponad 15 lat Grand Hotel jest symbolem elegancji i luksusu.
                Położony w sercu miasta, oferujemy naszym gościom wyjątkowe
                doświadczenia łączące komfort, wyśmienitą kuchnię i najwyższej
                klasy obsługę.
              </p>
              <p className="text-lg text-grand-slate/80 mb-8 leading-relaxed">
                Każdy pokój został zaprojektowany z myślą o Twoim komforcie,
                a nasz zespół dba o każdy detal, aby Twój pobyt był niezapomniany.
              </p>
            </div>
            <div className="h-96 bg-cover bg-center rounded-2xl shadow-2xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800')" }}>
            </div>
          </div>
        </div>
      </section>



    </>
  )
}

export default HomePage