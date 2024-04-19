import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Router from '../../router/Router'
export default function Layout() {
  return (
    <div>
      <Header/>
        <Router/>
      <Footer/>
    </div>
  )
}
