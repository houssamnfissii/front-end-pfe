import React, { useRef, useState } from 'react'
import '../styles/tour-details.css';
import {Container ,Row , Col,Form , ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom';
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking';
export default function TourDetails() {
  const {id} =useParams()
  
  const tour = tourData.find(t => t.id === id)
  

  const {title,city, photo ,price ,address ,featured,reviews,maxGroupSize,distance,desc} = tour;
  const {totalRating ,avgRating} = calculateAvgRating(reviews)

  const options={ day:'numeric',month:'long',year:'numeric' }

  const reviewMsgRef=useRef('')
  const [tourRating,setTourRating]=useState(null)

  // submit request to the server
  const handleSubmit = (e) => {
    e.preventDefault()
    const reviewMsg=reviewMsgRef.current.value
    console.log(reviewMsg + tourRating)
    if(reviewMsg){
      const newReview={
        name:reviewMsgRef.current.value,
        rating:tourRating
      }
      reviews.push(newReview)
      reviewMsgRef.current.value=''
      setTourRating(null)
    }
  }
  return (
    <section>
      <Container>
        <Row>
          <Col  lg="8" >
            <div className='tour__content'>
               <img src={photo} alt=''/>
               <div className='tour__info'>
                  <h2 className='text-3xl font-bold mb-4'>{title}</h2>
                  <div className='d-flex align-items-center gap-5'>
                  <span className='tour__rating d-flex align-align-items-center gap-1'>
                    <i class="ri-star-fill" style={{ color:'var(--secondary-color)' }}></i> {calculateAvgRating===0 ? null : avgRating} 
                    {totalRating===0 ? 'Not rated' : 
                            <span>({reviews?.length})</span>}
                      
                    </span>
                      <span>
                      <i class="ri-map-pin-fill"></i> {address}
                      </span>
                  </div>
                  <div className='tour__extra-details'>
                    <span><i class="ri-map-pin-line"></i> {city}</span>
                    <span><i class="ri-wallet-3-line"></i> {price}DH /per person</span>
                    <span><i class="ri-pin-distance-line"></i>{distance}k/m</span>
                    <span><i class="ri-group-line"></i> {maxGroupSize} people</span>
                  </div>
                  <h5 className='text-xl font-bold mb-4'>Description</h5>
                  <p>{desc}</p>
               </div>

               {/* tour reviews section  start */}
               <div className='tour__reviews mt-4'>
                 <h4 className='text-xl font-bold mb-4'>({reviews?.length} reviews)</h4>
                 <Form onSubmit={handleSubmit}>
                    <div className='d-flex align-align-items-center gap-3 mb-4 rating__group'>
                         <span onClick={()=>setTourRating(1)}>1 <i class="ri-star-s-fill"></i></span>
                         <span onClick={()=>setTourRating(2)}>2 <i class="ri-star-s-fill"></i></span>
                         <span onClick={()=>setTourRating(3)}>3 <i class="ri-star-s-fill"></i></span>
                         <span onClick={()=>setTourRating(4)}>4 <i class="ri-star-s-fill"></i></span>
                         <span onClick={()=>setTourRating(5)}>5 <i class="ri-star-s-fill"></i></span>
                    </div>
                    <div className='review__input'>
                        <input  type='text' placeholder='share your thoughts' ref={reviewMsgRef} required/>
                        <button className='btn primary__btn text-white' type='submit'>Submit</button>
                    </div>
                 </Form>

                 <ListGroup className='user__reviews'>

                      {
                        reviews?.map(review => (
                         <div className='review__item'>
                            <img src={avatar} alt="" />

                            <div className='w-100'>
                              <div className='d-flex align-align-items-center justify-content-between'>
                                <div>
                                    <h5  className='text-sm font-bold '>Houssam</h5>
                                    <p>{new Date('01-18-2024').toLocaleTimeString('en-US', options)}</p>

                                </div>
                                <span className='d-flex align-items-center'>
                                   5<i class="ri-star-fill"></i>
                                </span>
                              </div>
                              <h6>Amazing tour</h6>
                            </div>
                         </div>
                        ))
                      }
                   
                 </ListGroup>

               </div>
               {/* tour reviews section  end */}
            </div>
          </Col>
          <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating}/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
