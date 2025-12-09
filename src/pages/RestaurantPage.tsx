import {useState,useRef} from "react"
import {mockMenu} from "../data/mockMenu"

import MenuCard from "../components/restaurants/MenuCard"



const RestaurantPage = () => {
  const categories=['Przystawki','Dania Główne','Desery','Napoje']
  const categoryRefs=useRef<any>({})

  const groupedItems=categories.reduce((cat:any,category)=>{
    cat[category]=mockMenu.filter((item:any)=>item.category===category)
    return cat
  },{})

  const handleCategoClick=(category:string)=>{
    categoryRefs.current[category]?.scrollIntoView({
      behavior:'smooth',
      block:'start'
    })
  }

  return(
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-grand-navy mb-4">
          Restauracja Grand Hotel
        </h1>
        <p className="text-base sm:text-lg text-grand-600 max-w-2xl mx-auto px-4">
          Zapraszamy do zapoznania sie z kartą. Dania przygotowane z najświeższych składników
        </p>
      </div>

      <div className="sticky top-16 z-10 bg-grand-cream py-4 mb-8 shadow-md border-b border-grand-gold/20">
        <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-0 md:gap-4">
          {categories.map(category=>(
            <button
              key={category}
              onClick={()=>handleCategoClick(category)}
              className="px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap bg-white
              text-grand-slate hover:bg-grand-gold hover:text-grand-navy shadow-sm hover:shadow-mc hover:scale-105"
                >
                  {category}
                </button>

          ))}
        </div>
      </div>
      {categories.map(category=>(
        <div
          key={category}
          ref={(el:any)=>categoryRefs.current[category]=el}
          className='mb-16 scroll-mt-32'>

            <h2 className="text-2xl sm:text-3xl font-bold text-grand-navy mb-6 border-b-2 border-grand-gold pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedItems[category].map((item:any)=>(
                <MenuCard key={item.id} item={item}/>
              ))}
            </div>
          </div>
      ))}


    </div>
  )
}


export default RestaurantPage