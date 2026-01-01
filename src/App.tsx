import { Routes, Route } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import HomePage from './pages/HomePage'
import RoomsPage from './pages/RoomsPage'
import BookingPage from './pages/BookingPage'
import RestaurantPage from './pages/RestaurantPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/MyProfilePage'
import MyBookingsPage from './pages/MyBookingsPage'
import RoomDetailPage from './pages/RoomDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RestaurantReservationPage from './pages/RestaurantReservationPage'
import AdminPage from './pages/AdminPage'


const App = () => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/rooms/:id" element={<RoomDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/restaurant/reservation" element={<RestaurantReservationPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Route>
  </Routes>
)

export default App