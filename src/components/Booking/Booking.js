import React from 'react'
import './booking.css'
import {Container ,Row ,Button, Col,Form , FormGroup ,ListGroup ,ListGroupItem} from 'reactstrap'

export default function Booking({tour,avgRating}) {
    const {price,reviews ,totalRating}=tour;
    const handleChange =()=>{

    }
  return (
    <div className='booking'>
        <div className='booking__top d-flex align-items-center justify-align-center justify-between'>
            <h3 className='text-xl font-bold'>
                {price}DH <span>/per person</span>
            </h3>
            <span className='tour__rating d-flex align-align-items-center gap-1'>
                    <i class="ri-star-fill" style={{ color:'var(--secondary-color)' }}></i> {avgRating===0 ? null : avgRating} 
                    {totalRating===0 ? 'Not rated' : 
                            <span>({reviews?.length})</span>}
                      
            </span>
        </div>
         {/* booking form start */}
         <div>
             <h5 className='text-xl font-bold'>Information</h5>
             <Form className='booking__form'>
                   <div className='booking__info-form'>
                   <FormGroup >
                        <input type="text"  placeholder='full name' id='fullName' onChange={handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <input type="number"  placeholder='Phone' id='phone' onChange={handleChange} required/>
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                         <input type="date"  placeholder='full name' id='bookAt' onChange={handleChange} required/>
                        <input type="number"  placeholder='full name' id='guestSize' onChange={handleChange} required/>
                    </FormGroup>
                   </div>
             </Form>
         </div>
            {/* booking form end */}

            {/* booking bottom */}
                <div className="booking__bottom">
                    <ListGroup>
                        <ListGroupItem className='border-0 px-0'>
                            <h5 className='text-sm font-bold d-flex align-items-center gap-1'>{price}DH <i className='ri-close-line'></i> 1 person</h5>
                            <span>{price}DH</span>
                        </ListGroupItem>
                        <ListGroupItem className='border-0 px-0'>
                            <h5 className='text-sm font-bold'>Service charge</h5>
                            <span>10DH</span>
                        </ListGroupItem>
                        <ListGroupItem className='border-0 px-0'>
                            <h5 className='text-sm font-bold'>Total</h5>
                            <span>109DH</span>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            {/* booking bottom  end*/}

    </div>
  )
}
