import { Link,NavLink,useNavigate} from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";
import UserMenu from "./UserMenu";

const Links=[
    {to: '/',label:"Strona Główna"},
    {to: '/chat',label:"Chat"},
    {to:'/rooms',label:"Pokoje"},
    {to:'/restaurant',label:"Restauracja"},
]

const Navbar=()=>{
    const navigate=useNavigate()
    const [mobileMenuOpen,setMobileMenuOpen]=useState(false)
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [userName,setUserName]=useState("Piotr")

    const handLogOut=()=>{
        setIsLoggedIn(false)
        navigate('/')
        alert("wylogowano")
    }
    return(
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-xl border-b border-gray-100">
            <div className="mx-auto grid grid-cols-3 max-w-[1600px] items-center  px-24 py-4">
                <Link
                    to="/"
                    className="text-2xl font-bold text-grand-navy 
                        hover:text-grand-gold transition-colors"
                >
             🏨 <span className="text-grand-gold">Grand</span> Hotel
           </Link>
                <nav className="hidden md:flex items-center gap-8 justify-center">
                    {Links.map((link)=>(
                        <NavLink 
                          key={link.to}
                          to={link.to}
                          className={({isActive})=>
                            `font-medium transition-colors relative
                            after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                            after:bg-grand-gold after:transition-all after:duration-300 
                            hover:after:w-full
                            ${isActive ? 'text-grand-gold after:w-full' : 'text-grand-slate'}`
                         }
                          >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden md:block justify-self-end">
                    {isLoggedIn?(
                        <UserMenu
                            userName={userName}
                            onLogout={handLogOut}/>
                    ):(
                        <Button
                        variant="linie"
                        size="male"
                        onClick={()=>setIsLoggedIn(true)}>
                            Zaloguj sie
                        </Button>
                    )}

                </div>
            </div>
        </header>
    )
}

export default Navbar

