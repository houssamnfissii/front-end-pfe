import React, { useState } from 'react';
import './booking.css';
import { Button, Form, FormGroup } from 'reactstrap';
import axios from 'axios';

export default function BookingResto({ offer, RestaurantDe, tables, avgRating, totalRating, id }) {
    const { cuisine, cuisine_id } = RestaurantDe;

    console.log(offer[0].id)

    const [type, setType] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [reservationStatus, setReservationStatus] = useState("");

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleReservation = async () => {
        try {
            await axios.post("http://localhost:8000/api/reservations/store_table", {
                type: type,
                date: selectedDate,
                restaurant_id: id,
                offer_id: offer[0].id
            });
            // Handle success
            console.log("Reservation successful");
            setReservationStatus("done");
        } catch (error) {
            // Handle error
            console.error("Error adding Reservation:", error);
        }
    };

    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const oneMonthLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    const formattedOneMonthLater = oneMonthLater.toISOString().split('T')[0];

    return (
        <div className='booking'>
            <div className='booking__top d-flex align-items-center justify-align-center justify-between'>
                <h3 className='text-xl font-bold'>
                    {/* {price_per_person}DH <span>/per person</span> */}
                </h3>
                <span className='tour__rating d-flex align-align-items-center gap-1'>
                    <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? 'Not rated' : <span>({offer[0].reviews?.length})</span>}
                </span>
            </div>
            {/* Booking form start */}
            <div>
                <h5 className='text-xl font-bold'>Reservation</h5>
                <Form className='booking__form'>
                    <div className='booking__info-form'>
                        <FormGroup>
                            <label>Choose Table</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                 <option value=''>select type </option>
                                {tables.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                            {!type && (
                                <p className="text-red-500">Please choose a table type.</p>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <label>Select Date</label>
                            <input
                                type='date'
                                value={selectedDate}
                                min={formattedCurrentDate}
                                max={formattedOneMonthLater}
                                onChange={handleDateChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            />
                            {!selectedDate && (
                                <p className="text-red-500">Please select a date.</p>
                            )}
                        </FormGroup>
                    </div>
                    {(selectedDate && type) && (
                        <Button onClick={handleReservation}>
                            {reservationStatus === "done" ? "Done" : "Reserve"}
                        </Button>
                    )}
                </Form>
            </div>
        </div>
    );
}
