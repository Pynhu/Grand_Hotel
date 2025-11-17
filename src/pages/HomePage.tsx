import Chat from "../components/chat/Chat"
import Booking from "../components/booking/BookingWidget"
const HomePage = () => (
      <>
        <section className="min-h-screen bg-cover bg-center bg-no-repeat relative"
          style={{backgroundImage:"url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920')"}}
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
                <Chat/>
              </div>
              <Booking/>
            </div>
               
        </section> 
        <section>
          <div className="grid gap-6 md:grid-cols-3">
              <div className="group rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl teansition-all cursor-pointer">
                <div className="h-56 bg-cover bg-center relative"
                  style={{backgroundImage:"url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80')"}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparen flex items-end p-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-grand-gold">599zł</span>
                        <span className="text-sm text-white/80">/noc</span>
                      </div>
                    </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-grand-navy mb-2">
                    Deluxe Aurora Suite
                  </h3>
                  <p className="text-sm grand-slate/80 leading-relaxed">
                    Panorama miasta,spa
                  </p>
                </div>
              </div>

            </div> 
        </section>  
      </>
     )

     export default HomePage