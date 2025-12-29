import { useState, useRef, useEffect } from "react"
import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { mockMenu } from "../data/mockMenu"
import MenuCard from "../components/restaurants/MenuCard"
import { toast } from 'sonner'
import * as AuthService from '../services/authService'
import * as restaurantService from '../services/restaurantService'


const RestaurantPage = () => {
  const navigate = useNavigate()
  const categories = ['Przystawki', 'Dania Główne', 'Desery', 'Napoje']
  const categoryRefs = useRef<any>({})

  const [menu, setMenu] = useState<any>([])
  const [showStickyMenu, setShowStickyMenu] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    restaurantService.getMenu().then(data => setMenu(data))
  }, [])

  const groupedItems = categories.reduce((cat: any, category) => {
    cat[category] = menu.filter((item: any) => item.category === category)
    return cat
  }, {})

  const handleCategoClick = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 100) {
        setShowStickyMenu(true)
      }
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowStickyMenu(false)
      }
      else if (currentScrollY < lastScrollY) {
        setShowStickyMenu(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-grand-navy mb-4">
          Restauracja Grand Hotel
        </h1>
        <p className="text-base sm:text-lg text-grand-600 max-w-2xl mx-auto px-4">
          Zapraszamy do zapoznania sie z kartą. Dania przygotowane z najświeższych składników
        </p>
        <Button
          onClick={() => {
            if (!AuthService.isAuthenticated()) {
              toast.error('Musisz się zalogować, aby zarezerwować stolik')
              navigate('/login')
              return
            }
            navigate('/restaurant/reservation')
          }}
          className="mt-6">
          Zarezerwuj Stolik
        </Button>
      </div>

      <div
        className={`
          sticky top-20 md:top-24 z-10 bg-grand-cream py-4 mb-8 
          shadow-md border-b border-grand-gold/20
          transition-all duration-300 ease-in-out
          ${showStickyMenu ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-0 md:gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoClick(category)}
              className="px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap bg-white
              text-grand-slate hover:bg-grand-gold hover:text-grand-navy shadow-sm hover:shadow-mc hover:scale-105"
            >
              {category}
            </button>

          ))}
        </div>
      </div>
      {categories.map(category => (
        <div
          key={category}
          ref={(el: any) => categoryRefs.current[category] = el}
          className='mb-16 scroll-mt-32'>

          <h2 className="text-2xl sm:text-3xl font-bold text-grand-navy mb-6 border-b-2 border-grand-gold pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedItems[category].map((item: any) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}


    </div>
  )
}


export default RestaurantPage