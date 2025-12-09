import {Routes,Route} from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import RoomsPage from './pages/RoomsPage'
import BookingPage from './pages/BookingPage'
import RestaurantPage from './pages/RestaurantPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/MyProfilePage'
import MyBookingsPage from './pages/MyBookingsPage'
import RoomDetailPage from './pages/RoomDetailPage'
import RestaurantDetailPage from './pages/RestaurantPage'


const App=()=>(
  <Routes>
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
      <Route path="/rooms" element={<RoomsPage/>}/>
      <Route path="/booking" element={<BookingPage/>}/>
      <Route path="/restaurant" element={<RestaurantPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/my-bookings" element={<MyBookingsPage/>} />
      <Route path="/rooms/:id" element={<RoomDetailPage/>} />
      <Route path="/restaurant" element={<RestaurantDetailPage/>} />
    </Route>
  </Routes>
)

export default App