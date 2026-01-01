import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as AuthService from '../services/authService'
import * as roomService from '../services/roomService'
import { httpClient, BASE_URL } from '../utils/api'
import Button from '../components/ui/Button'
import { toast } from 'sonner'

const AdminPage = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState('menu')

    const [menu, setMenu] = useState<any[]>([])
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('Przystawki')

    const [rooms, setRooms] = useState<any[]>([])
    const [roomType, setRoomType] = useState('')
    const [pricePerNight, setPricePerNight] = useState(0)
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [amenities, setAmenities] = useState('')
    const [images, setImages] = useState<File[]>([])

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate('/')
            return
        }
        loadData()
    }, [])

    const loadData = async () => {
        const menuRes = await httpClient.get('/api/v1/menu')
        const roomsRes = await roomService.getRooms()
        setMenu(menuRes.data)
        setRooms(roomsRes)
    }

    const addMenuItem = async () => {
        await httpClient.post('/api/v1/menu', { name, description: desc, price, category })
        toast.success('Added!')
        setName(''); setDesc(''); setPrice(0)
        loadData()
    }

    const deleteMenuItem = async (id: number) => {
        await httpClient.delete(`/api/v1/menu/${id}`)
        loadData()
    }

    const addRoom = async () => {
        const newRoom = await roomService.createRoom({
            roomType,
            pricePerNight,
            capacityAdults: adults,
            capacityChildren: children,
            amenities: amenities.split(',').map(x => x.trim()),
            imageUrls: []
        }
        )

        if (images.length > 0) {
            console.log('📸 DEBUG - Wysyłam zdjęć:', images.length)
            images.forEach((img, i) => {
                console.log(`  Plik ${i}: nazwa="${img.name}", rozmiar=${img.size} bajtów`)
            })

            const form = new FormData()
            images.forEach(img => form.append('images', img))

            const uploadResponse = await httpClient.post(`/api/v1/images/rooms/${newRoom.id}`, form,
                {
                    headers: { 'Content-Type': undefined }
                }
            )
            console.log('📸 DEBUG - Odpowiedź z backendu:', uploadResponse.data)
        }


        toast.success('Dodano pokoj')
        setRoomType(''); setPricePerNight(0); setAdults(1); setChildren(0); setAmenities(''); setImages([]);
        loadData()
    }

    const deleteRoom = async (id: number) => {
        await roomService.deleteRoom(id)
        loadData()
    }

    return (
        <div className="min-h-screen bg-grand-cream p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="flex gap-4 mb-6">
                <button onClick={() => setTab('menu')} className={tab === 'menu' ? 'bg-grand-gold px-4 py-2 rounded' : 'bg-white px-4 py-2 rounded'}>Menu</button>
                <button onClick={() => setTab('rooms')} className={tab === 'rooms' ? 'bg-grand-gold px-4 py-2 rounded' : 'bg-white px-4 py-2 rounded'}>Rooms</button>
            </div>

            {tab === 'menu' && (
                <div className="bg-white p-6 rounded-xl">
                    <h2 className="font-bold mb-4">Dodaj pozycje</h2>
                    <div className="flex gap-2 mb-4 flex-wrap">
                        <input placeholder="Nazwa" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" />
                        <input placeholder="Opis" value={desc} onChange={e => setDesc(e.target.value)} className="border p-2 rounded" />
                        <input type="number" placeholder="Cena" value={price || ''} onChange={e => setPrice(Number(e.target.value))} className="border p-2 rounded w-24" />
                        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
                            <option>Przystawki</option>
                            <option>Dania Główne</option>
                            <option>Desery</option>
                            <option>Napoje</option>
                        </select>
                        <Button onClick={addMenuItem}>Dodaj</Button>
                    </div>

                    {menu.map(m => (
                        <div key={m.id} className="flex justify-between border-b py-2">
                            <span>{m.name} - {m.price} zł ({m.category})</span>
                            <button onClick={() => deleteMenuItem(m.id)} className="text-red-500">Usuń</button>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'rooms' && (
                <div className="bg-white p-6 rounded-xl">
                    <h2 className="font-bold mb-4">Dodaj Pokój</h2>
                    <div className="flex gap-2 mb-4 flex-wrap">
                        <input placeholder="Typ Pokoju" value={roomType} onChange={e => setRoomType(e.target.value)} className="border p-2 rounded" />
                        <input type="number" placeholder="Zł/noc" value={pricePerNight || ''} onChange={e => setPricePerNight(Number(e.target.value))} className="border p-2 rounded w-24" />
                        <input type="number" placeholder="Dorosłych" value={adults} onChange={e => setAdults(Number(e.target.value))} className="border p-2 rounded w-20" />
                        <input type="number" placeholder="Dzieci" value={children} onChange={e => setChildren(Number(e.target.value))} className="border p-2 rounded w-20" />
                        <input placeholder="Wyposażenie" value={amenities} onChange={e => setAmenities(e.target.value)} className="border p-2 rounded" />
                        <input type="file" multiple onChange={e => setImages(Array.from(e.target.files || []))} className="border p-2 rounded" />
                        <Button onClick={addRoom}>Dodaj</Button>
                    </div>

                    {rooms.map(r => (
                        <div key={r.id} className="flex justify-between border-b py-2">
                            <div>
                                <span className="font-bold">{r.roomType}</span> - {r.pricePerNight} zł/noc
                                <span className="text-sm text-gray-500 ml-2">({r.capacityAdults} dorosłych, {r.capacityChildren} dzieci)</span>
                            </div>
                            <button onClick={() => deleteRoom(r.id)} className="text-red-500">Usuń</button>
                        </div>
                    ))}
                </div>

            )}
        </div>
    )
}

export default AdminPage