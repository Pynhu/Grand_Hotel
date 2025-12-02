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
            <div className="mx-auto flex justify-between items-center max-w-[1600px] px-4 md:px-24 py-4">
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
                <div className="justify-self-end">
                    <button
                        onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-3xl text-grand-navy">
                            ☰
                    </button>
                    <div className="hidden md:block">
                        {isLoggedIn?(
                            <UserMenu
                                userName={userName}
                                onLogout={handLogOut}/>
                        ):(
                            <Button
                                variant="linie"
                                size="male"
                                onClick={()=>setIsLoggedIn(true)}>Zaloguj sie</Button>
                        )}

                    </div>
                </div>
            </div>
            <div
                className={`fixed inset-0 bg-black z-50 md:hidden transition-opacity duration-300
                    ${mobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={()=>setMobileMenuOpen(false)}>
            </div>
            <div
                className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl z-[60] md:hidden
                transform transition-transform duration-300 ease-out overflow-y-auto
                ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    onClick={()=>setMobileMenuOpen(false)}>
                        <div
                            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl 
                            transform translate-x-0 transition-transform duration-300 ease-out"
                            onClick={(e)=>e.stopPropagation()}>
                                <div className="p-6">
                                    <button
                                        onClick={()=>setMobileMenuOpen(false)}
                                        className="text-3xl text-grand-navy">
                                            ×
                                        </button>
                                        <nav className="flex flex-col gap-6">
                                            {Links.map((Link)=>(
                                                <NavLink
                                                    key={Link.to}
                                                    to={Link.to}
                                                    onClick={()=>setMobileMenuOpen(false)}
                                                    className={({isActive})=>
                                                        `text-lg font-medium ${isActive? 'text-grand-gold':'text-grand-slate'}`
                                                }>
                                                    {Link.label}
                                                </NavLink>
                                            ))}
                                            <hr className="my-2"/>
                                            {isLoggedIn?(
                                                <>
                                                    <Link 
                                                        to="/my-profile"
                                                        className="text-lg font-medium text-grand-slate"
                                                        onClick={()=>setMobileMenuOpen(false)}>
                                                            Moj Profil
                                                    </Link>
                                                    <Link 
                                                        to="/my-bookings"
                                                        className="text-lg font-medium text-grand-slate"
                                                        onClick={()=>setMobileMenuOpen(false)}>
                                                            Moje Rezerwacje
                                                    </Link>
                                                    <button
                                                        onClick={()=>{
                                                            handLogOut()
                                                            setMobileMenuOpen(false)
                                                        }}
                                                        className="text-left text-lg font-medium text-red-500">
                                                            Wyloguj
                                                    </button>
                                                </>
                                            ):(

                                                <Button
                                                    variant="linie"
                                                    fullWidth
                                                    onClick={()=>{
                                                        setIsLoggedIn(true)
                                                        setMobileMenuOpen(false)
                                                    }}
                                                    >
                                                        Zaloguj sie
                                                    </Button>
                                            )}
                                        </nav>
                                </div>
                        </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

