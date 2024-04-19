import React  from 'react'
import {Container,Row,Button} from 'reactstrap'
import { NavLink ,Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './header.css'
import { useEffect, useRef } from 'react'
const nav__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/hotels',
    display:'Hotels'
  },
  {
    path:'/tours',
    display:'Tours'
  },
  {
    path:'/cars',
    display:'Cars'
  },
  {
    path:'/restorents',
    display:'Restorents'
  },
 
]
export default function Header() {
  const headerRef = useRef(null)
  const stickyHeaderFunc = () => {
     window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop >80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
     })
  }

  useEffect(()=>{
    stickyHeaderFunc()
    return window.removeEventListener('scroll', stickyHeaderFunc)
  },[])
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
              {/* =logo= */}
              <div className='logo'>
                <img src={logo} alt="logo" />
              </div>
              {/* =logo end= */}
              {/* =menu start= */}
                  <div className='navigation'>
                    <ul className='menu d-flex align-items-center gap-5'>
                  {nav__links.map((link,index)=>(
                    <li className="nav__item" key={index}>
                      <NavLink to={link.path} className={navClass=>navClass.isActive ? 'active__link' :''}>{link.display}</NavLink>
                    </li>
                  ))}
                    </ul>
                  </div>
              {/* =menu start= */}
              <div className='nav__right d-flex align-items-center gap-4'>
                <div className='nav__btns d-flex align-items-center gap-4'>
                  <Button className='btn secondary__btn'><Link to={'/login'}>Login</Link></Button>
                  <Button className='btn primary__btn'><Link to={'/Register'}>Register</Link></Button>
                </div>
                <span className='mobile__menu'>
              <i class="ri-menu-3-line"></i>
              </span>
              </div>
             
          </div>
        </Row>
      </Container>
    </header>
  )
}
