import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import SearchHotel from '../shared/SearchHotel';
import HotelCard from '../shared/HotelCard';
import CommonSection from '../shared/CommonSection';
import NewsLetter from '../shared/Newsletter';
import ScrollToTopButton from '../components/scroll/ScrollToTopButton';
import HotelSection from '../shared/HotelSection';

export default function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedNbrStar, setSelectedNbrStar] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/hotels/hotel_offers');
                setHotels(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = ({ city, nbr_stars, roomType }) => {
        setSelectedCity(city);
        setSelectedNbrStar(nbr_stars);
        setSelectedRoomType(roomType);
    };

    useEffect(() => {
        const filterHotels = () => {
            let filtered = hotels.filter(({ hotel }) => {
                const cityMatch = !selectedCity || hotel.hotel.city_name === selectedCity;
                const starsMatch = !selectedNbrStar || hotel.hotel.nbr_stars === selectedNbrStar;
                const roomTypes = hotel.rooms.map(room => room.roomtype.name);
                const roomTypeMatch = !selectedRoomType || roomTypes.includes(selectedRoomType);
                return cityMatch && starsMatch && roomTypeMatch;
            });
            setFilteredHotels(filtered);
        };

        filterHotels();
    }, [hotels, selectedCity, selectedNbrStar, selectedRoomType]);

    const pageCount = Math.ceil(filteredHotels.length / 8);

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-bold text-indigo-700">Loading hotels</h2>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
            </div>
        );
    }

    if (!hotels || !hotels.length) {
        return <div>No data found</div>;
    }

    return (
        <>
            <HotelSection title={'All hotels'} />
            <section>
                <Container>
                    <Row>
                        <Col lg='12' mx='7' md='12'>
                            <SearchHotel onSearch={handleSearch} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='pt-4'>
                <Container>
                    <Row>
                        {filteredHotels
                            .slice(currentPage * 8, currentPage * 8 + 8)
                            .map((hotel, index) => (
                                <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={index}>
                                    <HotelCard hotel={hotel.hotel} offer={hotel.offer} />
                                </Col>
                            ))}
                        <Col lg='12'>
                            <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                                {[...Array(pageCount).keys()].map((pageNumber) => (
                                    <span
                                        key={pageNumber}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={currentPage === pageNumber ? 'active__page' : ''}
                                    >
                                        {pageNumber + 1}
                                    </span>
                                ))}

                                
                            </div>
                        </Col>
                        <ScrollToTopButton />
                    </Row>
                </Container>
            </section>
            <NewsLetter />
        </>
    );
}
