import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";

export const RoomFilters =({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    guests,
    setGuests,
    roomType,
    setRoomType,
    selectedAmenities,
    setSelectedAmenities,
    onClose
}:any)=>{
    const navigate=useNavigate()

    const handleAmenity=(amenity:string)=>{
        if(selectedAmenities.includes(amenity)){
            setSelectedAmenities(selectedAmenities.filter((a:string)=>a!==amenity))
        }else{
            setSelectedAmenities([...selectedAmenities,amenity])
        }
    }


    const handleClear=()=>{
        setMinPrice('')
        setMaxPrice('')
        setGuests('')
        setRoomType('')
        setSelectedAmenities([])
        navigate('/rooms')
        if(onClose){
            onClose()
        }
    }

    return(
        <div className="bg-white p-6 rounded-lg shadow-lg lg:sticky top-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-grand-navy">
                    Filtry
                </h2>          
                    <button
                        onClick={handleClear}
                        className="text-sm text-grand-gold hover:underline">         
                        Wyczyść
                    </button>
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-grand-navy mb-3">
                        Popularne filtry
                    </h3>
                    <div className="space-y-2">
                    {['Wi-Fi','Room Service','Balcony','Mini Bar','Smart TV'].map(amenity => (
                        <label
                            key={amenity} 
                            className="flex items-center gap-2 cursor-pointer">
                            <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={()=>handleAmenity(amenity)}
                            className="w-4 h-4 text-grand-gold border-gray-300 rounded focus:ring-grand-gold"
                            />
                            <span className="text-grand-slate">{amenity}</span>
                        </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-grand-navy mb-3">Przedział cenowy</h3>
                    <div className="space-y-2">
                        <Input
                            label="min"
                            type="number"
                            min="0"
                            value={minPrice}
                            onChange={(e)=>setMinPrice(e.target.value)}
                            placeholder="0"/>
                        <Input
                            label="max"
                            type="number"
                            min="0"
                            value={maxPrice}
                            onChange={(e)=>setMaxPrice(e.target.value)}
                            placeholder="1000"/>
                    </div>
                </div>
                <div>
                    <h3 className='font-semibold text-grand-navy mb-3'>Typ pokoju</h3>
                    <select
                        value={roomType}
                        onChange={(e)=>setRoomType(e.target.value)}
                        className="w-full px-4 py-2,5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-grand-gold
                        focus:ring-grand-gold transition-colors"
                        >
                            <option value="">Wszystkie</option>
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                        </select>
                </div>
                <div>
                <Input
                    label="Guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="1"/>
                </div>
                

            </div>

        </div>
    )

}