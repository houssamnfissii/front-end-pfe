import React, { useState } from 'react';
import './booking.css';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingHotel({ offer, avgRating, rooms, totalRating, id }) {
    const [room, setSelectedRoom] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reservationStatus, setReservationStatus] = useState("");
    const [total, setTotal] = useState(0);
    console.log(offer[0].id)
    console.log(room)
    console.log(startDate)
    // Mon Apr 22 2024 11:42:10 GMT+0100 (UTC+01:00)
    // the data seleted form not valid the form valid is 2024-04-21
    console.log(endDate.toISOString().split('T')[0] + ' ' + endDate.toLocaleTimeString())

    const handleReservation = async () => {
        try {
            await axios.post("http://localhost:8000/api/reservations/store_hotel", {
                start_date: startDate.toISOString().split('T')[0] + ' ' + endDate.toLocaleTimeString(),
                end_date: endDate.toISOString().split('T')[0] + ' ' + endDate.toLocaleTimeString(),
                roomtype_id: room,
                hotel_id: id,
                offer_id: offer[0].id
            });
            console.log("Reservation successful");
            setReservationStatus("done");
        } catch (error) {
            console.error("Error adding Reservation:", error);
            // Provide user feedback in case of error
            setReservationStatus("error");
        }
    };

    const calculateTotal = () => {
        if (room && startDate && endDate) {
            const selectedRoomData = rooms.find(r => r.roomtype_id === room);
            const pricePerNight = selectedRoomData ? selectedRoomData.price_per_night : 0;
            const totalDays = calculateTotalDays(startDate, endDate);
            const serviceCharge = calculateServiceCharge();
            const total = pricePerNight * totalDays + serviceCharge;
            setTotal(total);
        }
    };

    const calculateTotalDays = (start, end) => {
        const timeDifference = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return totalDays;
    };

    const calculateServiceCharge = () => {
        // Your logic to calculate service charge
        // For now, let's assume a fixed value
        return 20; // Example service charge
    };

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
        calculateTotal();
    };

    return (
        <div className='booking'>
            <div className='booking__top d-flex align-items-center justify-align-center justify-between'>
                <h3 className='text-xl font-bold'>
                Reservation
                </h3>
                <span className='tour__rating d-flex align-align-items-center gap-1'>
                    <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? 'Not rated' : <span>({offer[0].reviews?.length})</span>}
                </span>
            </div>
            <div>
                
                <Form className='booking__form'>
                    <div className='booking__info-form'>
                        <FormGroup>
                            <label>Choose Room</label>
                            <select
                                value={room}
                                onChange={handleRoomChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value=''>Select Room</option>
                                {rooms.map((room, index) => (
                                    <option key={index} value={room.roomtype.id}>{room.roomtype.name} - Prix per night: {room.price_per_night}</option>
                                ))}
                            </select>
                            {!room && (
                                <p className="text-red-500">Please choose a room.</p>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <label>Start Date : </label>
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Start Date"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2"
                            />
                            <br/>
                             <label>End Date  : </label>
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="End Date"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2"
                            />
                        </FormGroup>
                    </div>
                    <div className="booking__bottom">
                        <ListGroup>
                            <ListGroupItem className='border-0 px-0'>
                                <h3 className='text-xl font-bold d-flex align-items-center gap-1'><i className='ri-close-line'></i></h3>
                                <span>{room.price_per_night} DH</span>
                            </ListGroupItem>
                            <ListGroupItem className='border-0 px-0'>
                                <h3 className='text-xl font-bold'>Service charge</h3>
                                <span>{calculateServiceCharge()}DH</span>
                            </ListGroupItem>
                            <ListGroupItem className='border-0 px-0'>
                                <h3 className='text-xl font-bold'>Total</h3>
                                <span>{total}DH</span>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    {room && startDate && endDate && (
                        <Button onClick={handleReservation}>
                            {reservationStatus === "done" ? "Done" : "Reserve"}
                        </Button>
                    )}
                </Form>
            </div>
        </div>
    );
}
