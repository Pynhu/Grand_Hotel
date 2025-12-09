import {MenuCard} from "./MenuCard"

export const MenuGrid=({items}:any)=>{
    if(items.length===0){
        return(
            <div className="text-center py-12">
                <p className="text-gray-500">Brak dań</p>
            </div>
        )
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item:any)=>(
                <MenuCard key={item.id} item={item}/>
            ))}
        </div>
    )
}