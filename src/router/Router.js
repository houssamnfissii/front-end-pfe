import React from 'react'
import {Routes , Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import Cars from '../pages/Cars'
import CarDetails from '../pages/CarDetails'
import Hotel from '../pages/Hotel'
import HotelDetails from '../pages/HotelDetails'
import Restaurant from '../pages/Restaurant'
import RestaurantDetails from '../pages/RestaurantDetails'
import SlideClient from '../pages/SlideClient'
import RegisterHosterForm from '../pages/HostRegistration'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home'/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/tours" element={<Tours/>} />
      <Route path="/tours/:id" element={<TourDetails/>} />
      <Route path="/cars" element={<Cars/>} />
      <Route path="/cars/:id" element={<CarDetails/>} />
      <Route path="/hotels" element={<Hotel/>} />
      <Route path="/hotels/:id" element={<HotelDetails/>} />
      <Route path="/restaurants" element={<Restaurant/>} />
      <Route path="/restaurants/:id" element={<RestaurantDetails/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/RegisterHosterForm" element={<RegisterHosterForm/>} />
    
     
    </Routes>
  )
}
