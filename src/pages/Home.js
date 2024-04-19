import React from 'react';
import '../styles/home.css';
import {Container,Row,Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img02.jpg';
import worldImg from '../assets/images/world.png';
import heroVideo from '../assets/images/hero-video.mp4';
import experienceImg from '../assets/images/experience.png'
import Subtitle from '../shared/Subtitle';


import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';

import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';
import Subsucbe from '../shared/Subsucbe';
export default function Home() {
  return (
    <>
    {/* hero section start */}
        <section>
            <Container>
                 <Row>
                    <Col lg='6'>
                        <div className='hero__content'>
                             <div className='hero__subtitle d-flex align-items-center '>
                                <Subtitle subtitle={'Know Before You Go'}/>
                                <img src={worldImg}  />
                             </div>
                             <h1>Traveling opens the door to creating 
                              <span className='highlight'> memories</span>
                             </h1>
                             <p>lorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consectetur
                             </p>

                        </div>
                    </Col>

                     <Col lg='2'>
                        <div className='hero__img-box'>
                            <img src={heroImg} alt='hero-img' />
                        </div>
                     </Col>
                     <Col lg='2'>
                        <div className='hero__img-box mt-4'>
                            <video src={heroVideo} alt='hero-video'  controls/>
                        </div>
                     </Col>
                     <Col lg='2'>
                        <div className='hero__img-box mt-5'>
                            <img src={heroImg02} alt='hero-img' />
                        </div>
                     </Col>
                 </Row>
            </Container>
        </section>
         {/* hero section end */}

         <section>
            <Container>
                <Row>
                    <Col lg='3'>
                        <h5 className='services__subtitle'>What we serve</h5>
                        <h2 className='services__title'>We offer our best services</h2>
                    </Col>
                    <ServiceList/>
                </Row>
            </Container>
         </section>

          {/* featured  tour section start */}

          <section>
              <Container>
                 <Row>
                    <Col lg='12' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Tours
                         </h2>
                    </Col>
                    <FeaturedTourList/>
                 </Row>
              </Container>
          </section>
          <section>
              <Container>
                 <Row>
                    <Col lg='12' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Hotls
                         </h2>
                    </Col>
                    <FeaturedTourList/>
                 </Row>
              </Container>
          </section>
          <section>
              <Container>
                 <Row>
                    <Col lg='12' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Cars
                         </h2>
                    </Col>
                    <FeaturedTourList/>
                 </Row>
              </Container>
          </section>
          <section>
              <Container>
                 <Row>
                    <Col lg='12' className='mb-5'>
                         <Subtitle subtitle={'Explore'}/>
                         <h2 className='featured__tour-title'>
                                Our featured Restorents
                         </h2>
                    </Col>
                    <FeaturedTourList/>
                 </Row>
              </Container>
          </section>
          {/* featured  tour section end */}

          {/* Experience section start */}

          <section>
              <Container>
                 <Row>
                    <Col lg='6' >
                        <div className='exprience__content'>
                        <Subtitle subtitle={'Exprience'}/>
                         <h2 className=''>
                               with our all exprience <br/> we will serve You 
                         </h2>
                         <p>
                            lorem ipsum dolor sit amet, 
                            <br/>
                            consecteturlorem ipsum dolor 
                         </p>
                        </div>
                        <div className='counter__wrapper d-flex align-items-center gap-5'>
                            <div className='counter__box'>
                                <span className='counter__number'>12k+</span>
                                <h6 className='counter__text'>Successfull tours</h6>
                            </div>
                            <div className='counter__box'>
                                <span className='counter__number'>2k+</span>
                                <h6 className='counter__text'>Regular clients</h6>
                            </div>
                            <div className='counter__box'>
                                <span className='counter__number'>15</span>
                                <h6 className='counter__text'>Years experience</h6>
                            </div>
                        </div>
                    </Col>
                    <Col lg='6'>
                        <div className='exprience__img'>
                            <img src={experienceImg} alt='hero-img' />
                        </div>
                    </Col>
                    
                 </Row>
              </Container>
          </section>
          {/* Experience section end */}

          {/* Gallery section start */}
          <section>
          <Container>
                 <Row>
                    <Col lg='12' >
                         <Subtitle subtitle={'Gallery'}/>
                         <h2 className='gallery-title'>
                                Visit our customers tour gallery
                         </h2>
                    </Col>
                    <Col lg='12' >
                       <MasonryImagesGallery/>
                    </Col>
                    
                 </Row>
              </Container>
          </section>

          {/* Gallery section end */}

          {/* testimonial section start */}

          {/* <section>
          <Container>
                 <Row>
                    <Col lg='12'  >
                         <Subtitle subtitle={'Fans Love'}/>
                         <h2 className='testimonial-title'>
                                What our fans say about us
                         </h2>
                    </Col>
                    <Col lg='12' >
                       <Testimonials/>
                    </Col>
                    
                 </Row>
              </Container>
          </section> */}

          {/* testimonial section end */}
          <Newsletter/>
    </>
  )
}
