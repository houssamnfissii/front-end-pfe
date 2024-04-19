import React from 'react'
import './newsletter.css'
import {Container,Row,Col} from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png';
export default function Newsletter() {
  return (
    <section className='newsletter'>
        <Container>
                <Row>
                    <Col lg='6'>
                        <div className='newsletter__content '>
                            <h2>Subscribe now to get useful traveling information.</h2>
                              
                              <div className='newsletter__input'>
                                  <input type='email' placeholder='enter your email'/>
                                  <button className='btn newsletter__btn'>Subscribe</button>
                              </div>
                              <p>lorem lorem ipsum dolorlorem lorem ipsum dolorlorem lorem ipsum dolorlorem lorem ipsum dolor

                              </p>
                            </div>
                        
                    </Col>
                    <Col lg='6'>
                        <div className='newsletter__img'>
                            <img src={maleTourist} alt='male-tourist' />

                        </div>
                    </Col>
                   

               
                   
                </Row>
            </Container>
    </section>
  )
}
