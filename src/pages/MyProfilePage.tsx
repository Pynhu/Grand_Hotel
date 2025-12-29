import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as AuthService from '../services/authService'
import Button from '../components/ui/Button'
import { toast } from 'sonner'

interface UserData {
    firstName: string
    lastName: string
    email: string
    phone: string
}

const ProfilePage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<UserData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        AuthService.getUser().then(data => {
            setUser(data)
            setIsLoading(false)
        })
    }, [navigate])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Ładowanie..</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Błąd pobierania danych..</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-grand-cream to-white py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-grand-gold 
                    to-grand-navy rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-grand-navy">
                        {user.firstName} {user.lastName}
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-grand-navy mb-4">Dane osobowe</h2>
                        <p><strong>Imię:</strong>{user.firstName}</p>
                        <p><strong>Nazwisko:</strong>{user.lastName}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-grand-navy mb-4">Dane kontaktowe</h2>
                        <p><strong>Email:</strong>{user.email}</p>
                        <p><strong>Telefon:</strong>{user.phone}</p>
                    </div>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate('/my-bookings')}>
                        Moje rezerwacje
                    </Button>
                    <Button variant="drugi" onClick={() => AuthService.logout()}>
                        Wyloguj się
                    </Button>
                </div>

            </div>

        </div>

    )

}
export default ProfilePage