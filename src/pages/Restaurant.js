import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import RestoCard from '../shared/RestoCard';
import CommonSection from '../shared/CommonSection';
import NewsLetter from '../shared/Newsletter';
import ScrollToTopButton from '../components/scroll/ScrollToTopButton';
import RestoSection from '../shared/RestoSection';

export default function Restaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [cities, setCities] = useState([]); 
    const [cuisines, setCuisines] = useState([]);
    const [selectedCity, setSelectedCity] = useState(''); 
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filtersApplied, setFiltersApplied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/restaurants/restaurant_offers');
                setRestaurants(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cities');
                setCities(response.data.cities); 
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        const fetchCuisines = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cuisines/cuisines/cuisines');
                console.log(response.data.cuisine)
                setCuisines(response.data.cuisine); 
            } catch (error) {
                console.error('Error fetching cuisines:', error);
            }
        };

        fetchData();
        fetchCities();
        fetchCuisines();
    }, []);

    useEffect(() => {
        const filterRestaurants = () => {
            const filtered = restaurants.filter(({ restaurant }) => {
                const cityMatch = !selectedCity || restaurant.city_name === selectedCity;
                const cuisineMatch = !selectedCuisine || restaurant.cuisine_name === selectedCuisine;
                return cityMatch && cuisineMatch;
            });
            setFilteredRestaurants(filtered);
        };

        filterRestaurants();
        setFiltersApplied(selectedCity || selectedCuisine ? true : false);
    }, [restaurants, selectedCity, selectedCuisine]);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setCurrentPage(0); // Reset current page when city changes
    };

    const handleCuisineChange = (e) => {
        setSelectedCuisine(e.target.value);
        setCurrentPage(0); // Reset current page when cuisine changes
    };

    const handleCancelFilter = () => {
        setSelectedCity('');
        setSelectedCuisine('');
    };

    const pageCount = Math.ceil(filteredRestaurants.length / 8);

    return (
        <>
            <RestoSection title={'All Restaurants'} />
            <section>
                <Container>
                <Row className="bg-white p-4 rounded-lg shadow-lg">
            <Col lg='4' md='6'>
                <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="">Select a city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </Col>
            <Col lg='4' md='6'>
                <select
                    value={selectedCuisine}
                    onChange={handleCuisineChange}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
                    style={{ fontSize: '16px' }}
                >
                    <option value="">Select a cuisine</option>
                    {cuisines.map((cuisine, index) => (
                        <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                </select>
            </Col>
            {filtersApplied && (
                <Col lg='4' md='6'>
                    <Button color="danger" onClick={handleCancelFilter} className="w-full py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
                        Cancel Filters
                    </Button>
                </Col>
            )}
        </Row>
                 
                </Container>
            </section>
            <section className='pt-4'>
                <Container>
                    <Row>
                        {filteredRestaurants
                            .slice(currentPage * 8, currentPage * 8 + 8)
                            .map((res, index) => (
                                <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={index}>
                                    <RestoCard restaurant={res.restaurant} offer={res.offer} />
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
