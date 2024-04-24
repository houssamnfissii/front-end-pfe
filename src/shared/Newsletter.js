import React from 'react';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

export default function Newsletter() {
  return (
    <section className='newsletter'>
      <Container>
        <Row className='align-items-center flex-column-reverse flex-lg-row'>
          <Col lg='6'>
            <div className='newsletter__content'>
              <h4 className="text-lg md:text-sm lg:text-xs xl:text-5xl">Subscribe now to get useful traveling information.</h4>
              <div className='newsletter__input'>
                <input type='email' placeholder='Enter your email' />
                <button className='btn newsletter__btn lg:text-xs xl:text-5xl'>Subscribe</button>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
  );
}
