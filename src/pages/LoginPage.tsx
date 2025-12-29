import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import * as AuthService from '../services/authService'


const LoginPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Wszystkie pola sa wymagane')
            return
        }
        setIsLoading(true)

        try {
            await AuthService.login({ email, password })
            toast.success("Zalogowano")
            window.location.href = '/'
        } catch (error) {
            toast.error("nieprawidlowe dane")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grand-cream to-grand-gold/20 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-grand-gold">Grand Hotel</h1>
                    <p className="text-gray-600">Zaloguj sie do konta</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="przykladowy@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <Input
                        label="Haslo"
                        type="password"
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <Button
                        type="submit"
                        variant="pierwszy"
                        fullWidth
                        disabled={isLoading}>
                        {isLoading ? 'Przetwarzanie...' : 'Zaloguj'}
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Nie masz konta?</p>
                    <Link
                        to="/register"
                        className="text-grand-gold font-medium hover:underline">
                        Zarejestruj sie
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default LoginPage
