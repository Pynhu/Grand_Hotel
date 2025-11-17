import { useState } from "react";
import Input from "../ui/Input";

export const RoomFilters=({onFilter}:any)=>{
    const [minPrice,setMinPrice]=useState('')
    const [maxPrice,setMaxPrice]=useState('')

    return(
        <div>
            <h3>Filtry</h3>
            <div>
                <Input
                label="Cena min"
                type="number"
                value={minPrice}
                onChange={(e)=>setMinPrice(e.target.value)}
                />
                <Input
                label="Cena max"
                type="number"
                value={maxPrice}
                onChange={(e)=>setMaxPrice(e.target.value)}
                />
            </div>
        </div>
    )
}