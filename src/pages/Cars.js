import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import SearchCar from '../shared/SearchCar';
import CarCard from '../shared/CarCard';
import CommonSection from '../shared/CommonSection';
import NewsLetter from '../shared/Newsletter';
import ScrollToTopButton from '../components/scroll/ScrollToTopButton';
import CarSection from '../shared/CarSection';

export default function Cars() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]); // Define filteredCars state
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cars/car_offers');
                setCars(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = ({ city, brand, model }) => {
        setSelectedCity(city);
        setSelectedBrand(brand);
        setSelectedModel(model);
        setCurrentPage(0);
        filterCars(city, brand, model); // Call filterCars function when searching
    };

    const filterCars = (city, brand, model) => {
        const filtered = cars.filter(({ car }) => {
            const cityMatch = !city || car.city_name === city;
            const brandMatch = !brand || car.brand_name === brand;
            const modelMatch = !model || car.model_name === model;
            return cityMatch && brandMatch && modelMatch;
        });
        setFilteredCars(filtered);
        const pages = Math.ceil(filtered.length / 8);
        setPageCount(pages);
    };

    useEffect(() => {
        const pages = Math.ceil(cars.length / 8);
        setPageCount(pages);
        filterCars(selectedCity, selectedBrand, selectedModel); // Call filterCars on initial load
    }, [cars, selectedCity, selectedBrand, selectedModel]);

    if (loading) {
        return <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-bold text-indigo-700">Loading cars</h2>
            <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        </div>;
    }

    if (!cars) {
        return <div>No data found</div>;
    }

    return (
        <>
            <CarSection title={'All Cars'} />
            <section>
                <Container>
                    <Row>
                        <Col lg='12' mx='7' md='12'>
                            <SearchCar onSearch={handleSearch} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='pt-4'>
                <Container>
                    <Row>
                        {filteredCars
                            .slice(currentPage * 8, currentPage * 8 + 8)
                            .map((ccar,index) => (
                                <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={index}>
                                    <CarCard offer={ccar.offer} car={ccar.car} />
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
