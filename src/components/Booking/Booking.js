import React, { useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';

export default function Booking({ tour, avgRating }) {
    const { price_per_person, offer, totalRating, id: tourId } = tour;
    const [guestSize, setGuestSize] = useState(1);
    const [message, setMessage] = useState('');

    const serviceCharge = 10; // Example service charge value, you can change this according to your needs

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'guestSize':
                setGuestSize(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/reservations/store_tour', {
                tour_id: tourId,
                client_id: 1, // Assuming client ID is fixed or you can get it from the logged-in user
                offer_id: offer.id,
                nbr_guests: guestSize
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while processing your request.');
        }
    };

    const total = price_per_person * guestSize + serviceCharge;

    return (
        <div className='booking'>
            {/* Booking details */}
            <div className='booking__top d-flex align-items-center justify-between'>
                <h3 className='text-xl font-bold'>
                    {price_per_person}DH <span>/per person</span>
                </h3>
                <span className='tour__rating d-flex align-items-center gap-1'>
                    <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? 'Not rated' : <span>({offer.reviews?.length})</span>}
                </span>
            </div>

            {/* Booking form */}
            <div>
                <h5 className='text-xl font-bold'>Information</h5>
                <Form className='booking__form' onSubmit={handleSubmit}>
                    <div className='booking__info-form'>
                        <FormGroup className='d-flex align-items-center gap-3'>
                            <input type="number" placeholder='Number of guests' value={guestSize} id='guestSize' max={10} onChange={handleChange} min={1} required />
                        </FormGroup>
                        <button type="submit">Reserve</button>
                    </div>
                </Form>
            </div>

            {/* Display success or error message */}
            {message && <p>{message}</p>}

            {/* Booking details summary */}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h3 className='text-xl font-bold d-flex align-items-center gap-1'>{price_per_person}DH <i className='ri-close-line'></i> {guestSize} person</h3>
                        <span>{price_per_person * guestSize}DH</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h3 className='text-xl font-bold'>Service charge</h3>
                        <span>{serviceCharge}DH</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h3 className='text-xl font-bold'>Total</h3>
                        <span>{total}DH</span>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    );
}
