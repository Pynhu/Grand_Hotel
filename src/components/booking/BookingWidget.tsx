import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {toast} from "sonner";

const Booking = ()=>{
    const navigate=useNavigate()
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [roomType,setRoomType]=useState('standard')
    const [guests,setGuests]=useState('1')

    const handleSearch=()=>{
        if(!checkIn || !checkOut){
            toast.error('Wybierz daty')
            return
        }
        
        const checkInDate=new Date(checkIn)
        const checkOutDate=new Date(checkOut)
        const diff=(checkOutDate.getTime()-checkInDate.getTime())/(1000*60*60*24)

        if (diff<1){
            toast.error('Mimimalna rezerwacja to 1 noc')
            return
        }
        navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}&guests=${guests}`)

    }

    const today=new Date().toISOString().split('T')[0]
    const minCheckOut=checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]:today
    return(
        <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl" padding="small">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <Input
                    label="Data przyjazdu"
                    type="date"
                    value={checkIn}
                    onChange={(e)=>setCheckIn(e.target.value)}
                    min={today}
                    required/>
                <Input
                    label="Data wyjazdu"
                    type="date"
                    min={minCheckOut}
                    value={checkOut}
                    onChange={(e)=>setCheckOut(e.target.value)}
                    required
                    />
                <div className="w-full">
                    <label className="block text-sm font-medium mb-1 text-grand-slate">
                        Typ pokoju
                    </label>
                    <select 
                        value={roomType}
                        onChange={(e)=>setRoomType(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                                focus:outline-none focus:ring-2 focus:border-grand-gold
                                focus:ring-grand-gold transition-colors text-grand-slate"
                        >
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                    </select>
                </div>
                <Input
                    label="Goście"
                    type="number"
                    value={guests}
                    onChange={(e)=>setGuests(e.target.value)}
                    placeholder="1"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button 
                    variant="pierwszy"
                    size="srednie"
                    fullWidth
                    onClick={handleSearch}>
                        Szukaj
                    </Button>

            </div>
        </Card>
    )
}
export default Booking