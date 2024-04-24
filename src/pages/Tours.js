import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTours } from '../reducers/TourSlice';
import CommonSection from '../shared/CommonSection';
import '../styles/tour.css';
import SearchBar from '../shared/SearchBar';
import NewsLetter from '../shared/Newsletter';
import TourCard from '../shared/TourCard';
import { Container, Row, Col } from 'reactstrap';
import ScrollToTopButton from '../components/scroll/ScrollToTopButton';

export default function Tours() {
    const dispatch = useDispatch();
    const { tours, status, error } = useSelector((state) => state.tours);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const toursPerPage = 8;

    useEffect(() => {
        dispatch(fetchTours());
    }, [dispatch]);

    useEffect(() => {
        const pages = Math.ceil(tours.length / toursPerPage);
        setPageCount(pages);
    }, [tours]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = ({ startDate, endDate, city }) => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        setSelectedCity(city);
        setCurrentPage(0);
    };
    if(status === 'loading'){
      return   <div className="flex items-center justify-center gap-2">
      <h2 className="text-3xl font-bold text-indigo-700">Loading Tours</h2>
      <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
  </div>
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const filteredTours = tours.filter((tour) => {
        if (selectedCity && tour.city !== selectedCity) return false;

        if (selectedStartDate && new Date(tour.start_date) < selectedStartDate) return false;

        if (selectedEndDate && new Date(tour.end_date) > selectedEndDate) return false;

        return true;
    });

    return (
        <>
            <CommonSection title={'all tours'} />
            <section>
                <Container>
                    <Row>
                        <Col className='' lg='12' mx='7' md='12'> <SearchBar onSearch={handleSearch} /></Col>
                    </Row>
                </Container>
            </section>
            <section className='pt-4'>
                <Container>
                        <Row>
                            {filteredTours
                                .slice(currentPage * toursPerPage, currentPage * toursPerPage + toursPerPage)
                                .map((tour) => (
                                    <Col lg='4' mx='7' xl='3' md='6' className="mb-3 mb-lg-3" key={tour.id}>
                                        <TourCard {...tour} />
                                    </Col>
                                ))}
                            <Col lg='12'>
                                <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                                    {[...Array(pageCount).keys()].map((pageNumber) => (
                                        <span
                                            key={pageNumber}
                                            onClick={() => handlePageClick(pageNumber)}
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
