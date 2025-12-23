
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import * as AuthService from '../services/authService.mock'


const RegisterPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!email || !password || !firstName || !lastName || !phone) {
            toast.error('Wszystkie pola sa wymagane')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Hasla musza byc takie same')
            return
        }
        if (password.length < 8) {
            toast.error('Haslo musi miec conajmniej 8 znakow')
            return
        }
        setIsLoading(true)

        try {
            await AuthService.register({ email, password, firstName, lastName, phone })
            toast.success("Zarejestrowano")
            navigate('/')
        } catch (error) {
            toast.error("blad rejestracji")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grand-cream to-grand-gold/20 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-grand-gold">Grand Hotel</h1>
                    <p className="text-gray-600">Stworz swoje konto</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Imie"
                        type="text"
                        placeholder="Imie"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required />
                    <Input
                        label="Nazwisko"
                        type="text"
                        placeholder="Nazwisko"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="przykladowy@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <Input
                        label="telefon"
                        type="tel"
                        placeholder="+48 121 121 121"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required />
                    <Input
                        label="Haslo"
                        type="password"
                        placeholder="Min 8 znaków"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <Input
                        label="Potwierdz haslo"
                        type="password"
                        placeholder="Powtorz haslo"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                    <Button
                        type="submit"
                        variant="pierwszy"
                        fullWidth
                        disabled={isLoading}>
                        {isLoading ? 'Rejestrowanie...' : 'Zarejestruj sie'}
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Masz juz konto?</p>
                    <Link
                        to="/login"
                        className="text-grand-gold font-medium hover:underline">
                        Zaloguj sie
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default RegisterPage
