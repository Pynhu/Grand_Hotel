import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import UserMenu from "./UserMenu";
import * as AuthService from "../../services/authService";

const Links = [
    { to: '/', label: "Strona Główna" },
    { to: '/rooms', label: "Pokoje" },
    { to: '/restaurant', label: "Restauracja" },
]

const Navbar = () => {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const checkAuth = async () => {
            const loggedIn = AuthService.isAuthenticated()
            setIsLoggedIn(loggedIn)
            if (loggedIn) {
                const user = await AuthService.getUser()
                if (user) {
                    setUserName(user.firstName)
                }
            }
        }
        checkAuth()

    }, [])

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
        return () => {
            document.body.classList.remove('menu-open')
        }
    }, [mobileMenuOpen])

    const handleLogOut = () => {
        AuthService.logout()
    }
    return (
        <>
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-xl border-b border-gray-100">
                <div className="mx-auto flex justify-between items-center max-w-[1600px] px-4 md:px-24 py-4">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-grand-navy 
                            hover:text-grand-gold transition-colors"
                    >
                        <span className="text-grand-gold">Grand</span> Hotel
                    </Link>



                    <nav className="hidden md:flex items-center gap-8 justify-center">
                        {Links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
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
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-3xl text-grand-navy">
                            ☰
                        </button>
                        <div className="hidden md:block">
                            {isLoggedIn ? (
                                <UserMenu
                                    userName={userName}
                                    onLogout={handleLogOut} />
                            ) : (
                                <Button
                                    variant="linie"
                                    size="male"
                                    onClick={() => navigate('/login')}>Zaloguj sie</Button>
                            )}

                        </div>
                    </div>
                </div>
            </header>


            <div
                className={`fixed inset-0 bg-black/50 z-[90] md:hidden transition-opacity duration-300
                    ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileMenuOpen(false)}>
            </div>
            <div className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-[100] md:hidden overflow-y-auto
                transition-transform duration-300 ease-out
                ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                        <span className="text-xl font-bold text-grand-navy">Menu</span>
                        <button onClick={() => setMobileMenuOpen(false)} className="text-4xl text-grand-navy leading-none">×</button>
                    </div>
                    <nav className="flex flex-col gap-4 px-6 py-6">
                        {Links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => `text-lg font-medium py-3 px-4 rounded-lg transition-colors
                                ${isActive ? 'bg-grand-gold/10 text-grand-gold' : 'text-grand-slate hover:bg-gray-100'}`}>
                                {link.label}
                            </NavLink>
                        ))}
                        <hr className="my-2 border-gray-200" />
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile" className="text-lg font-medium text-grand-slate py-3 px-4 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}>Moj Profil</Link>
                                <Link to="/my-bookings" className="text-lg font-medium text-grand-slate py-3 px-4 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}>Moje Rezerwacje</Link>
                                <button onClick={() => { handleLogOut(); setMobileMenuOpen(false) }}
                                    className="text-left text-lg font-medium text-red-500 py-3 px-4 hover:bg-red-50 rounded-lg">
                                    Wyloguj się
                                </button>
                            </>
                        ) : (
                            <div className="px-4">
                                <Button variant="pierwszy" fullWidth onClick={() => {
                                    navigate('/login'); setMobileMenuOpen(false)
                                }}>
                                    Zaloguj się
                                </Button>
                            </div>
                        )}

                    </nav>
                </div>
            </div>
        </>

    )
}

export default Navbar

