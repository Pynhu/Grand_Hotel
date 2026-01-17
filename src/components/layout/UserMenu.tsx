import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


interface UserMenuProps{
    userName?:string
    onLogout:()=>void
}
const UserMenu=({userName,onLogout}:UserMenuProps)=>{
    const [isOpen,setIsOpen]=useState(false)
    const menuRef=useRef<HTMLDivElement>(null)

    useEffect (()=>{
        const handleClickOut=(event:MouseEvent)=>{
            if(menuRef.current&& !menuRef.current.contains(event.target as Node)){
                setIsOpen(false)
            }
        }
        if(isOpen){
            document.addEventListener('mousedown',handleClickOut)
        }
        return ()=>{
            document.removeEventListener('mousedown',handleClickOut)
        }
    },[isOpen]
)
    return(
        <div className="relative" ref={menuRef}>
            <button onClick={()=>setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-grand-cream transition-colors">

                <div className="w-9 h-9 rounded-full bg-grand-gold flex items-center justify-center text-grand-navy font-bold text-sm">
                    {userName?.substring(0,2).toUpperCase()}
                </div> 
                <span className="text-sm font-medium text-grand-slate">
                    {userName}
                </span>
            <svg
                className={`w-4 h-4 text-grand-slate transition-transform
                    ${isOpen?
                        'rotate-180':'' }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
                {isOpen&&(
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                        <Link
                            to="/profile"
                            onClick={()=>setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-grand-slate
                            hover:bg-grand-cream transition-colors">
                                <span>Zarządzaj kontem</span>
                        </Link>
                        <Link
                            to="/my-bookings"
                            onClick={()=>setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-grand-slate
                            hover:bg-grand-cream transition-colors">
                                <span>Moje rezerwacje</span>
                        </Link>

                        <button
                            onClick={()=>{
                                onLogout()
                                setIsOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-grand-slate
                            hover:bg-grand-cream transition-colors">
                                <span>Wyloguj się</span>
                        </button>
                    </div>
                )}
        </div>
    )
}
export default UserMenu