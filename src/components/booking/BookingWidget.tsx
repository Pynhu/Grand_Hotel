import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Booking = ()=>{
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [roomType,setRoomType]=useState('standard')
    const [guests,setGuests]=useState('1')

    const handleSearch=()=>{
        window.location.href=`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}&guests=${guests}`
    }

    return(
        <Card className="w-full max-w-3xl mx-auto" padding="small">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <Input
                    label="Data przyjazdu"
                    type="date"
                    value={checkIn}
                    onChange={(e)=>setCheckIn(e.target.value)}
                    required/>
                <Input
                    label="Data wyjazdu"
                    type="date"
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