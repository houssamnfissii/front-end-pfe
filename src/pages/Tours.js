import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchTours, selectAllTours, selectTourStatus, selectTourError } from '../reducers/TourSlice';

import CommonSection from '../shared/CommonSection'
import '../styles/tour.css';
import SearchBar from '../shared/SearchBar';
import NewsLetter from '../shared/Newsletter';
import tourData from '../assets/data/tours'
import TourCard from '../shared/TourCard';
import {Container ,Row , Col} from 'reactstrap'


export default function Tours() {
  const dispatch = useDispatch();
  const tours = useSelector(selectAllTours);
  const status = useSelector(selectTourStatus);
  const error = useSelector(selectTourError);

  useEffect(() => {
    // Dispatch fetchTours action when component mounts
    dispatch(fetchTours());
  }, [dispatch]);

  useEffect(() => {
    // Log tours data when it changes
    console.log(tours);
  }, [tours]);
  

  const [pageCount,setPageCount]=useState(0)
  const [page,setPage]=useState(0)

  const data=useSelector((e)=>e.tours)
  console.log(data)

  useEffect(()=>{

    const pages=Math.ceil(tourData.length/3) //backend data..
    setPageCount(pages)
  },[page])
  return (
    <>
    <CommonSection title={'all tours'}/>
    <section>
        <Container>
            <Row>
                    <SearchBar/>
            </Row>
        </Container>
    </section>
    <section className='pt-4'>
        <Container>
            <Row>
                    {
                tours.map(tour=>(
                  <Col lg='3'  key={tour.id}>
                    <TourCard tour={tourData}/>
                  </Col>
                ))
              }
              <Col lg='12'>
                   <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                      {
                        // pageCount>0?
                        // <div className='d-flex align-items-center justify-content-center'>
                        //   <button onClick={()=>setPage(page-1)} className='btn btn-outline-primary'>Prev</button>
                        //   <span className='mx-2'>Page {page+1} of {pageCount}</span>
                        //   <button onClick={()=>setPage(page+1)} className='btn btn-outline-primary'>Next</button>
                        // </div>
                        // :
                        // <div className='d-flex align-items-center justify-content-center'>
                        //   <span className='mx-2'>Page {page+1} of {pageCount}</span>
                        // </div>

                        [...Array(pageCount).keys()].map(number=>(
                            <span key={number} onClick={()=>setPage(number)} className={page===number ? 'active__page' : ''}>{number + 1}</span>
                        ))}
                   </div>
              </Col>
            </Row>
        </Container>
    </section>
    <NewsLetter/>
    </>
  )
}
