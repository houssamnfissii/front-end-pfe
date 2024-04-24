import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/tour-details.css";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import TimeAgo from "../components/format-date/TimeAgo";
import Booking from "../components/Booking/Booking";
import { MdDescription } from "react-icons/md";
import BookingHotel from "../components/Booking/BookingHotel";

export default function HotelDetails() {
  const { id } = useParams();
  const [CarDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewMsgRef = useRef("");
  const [carRating, setCarRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0); 
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/hotels/${id}`
        );
        setCarDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);
  console.log(CarDetails);

  const addReview = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: 1, //auth id
          offer_id: CarDetails.offer[0].id,
          rating: carRating,
          body: reviewMsgRef.current.value,
        }),
      })
        .then((resp) => resp.json())
        .then((newQuestion) => console.log(newQuestion));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    if (CarDetails && carRating && reviewMsgRef) {
      addReview();
    }
  }, [CarDetails, carRating, reviewMsgRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
    reviewMsgRef.current.value = "";
    setCarRating();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-3xl font-bold text-indigo-700">Loading Hotel</h2>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-700"></div>
      </div>
    );
  }

  if (!CarDetails) {
    return <div>No data found</div>;
  }

  const {
    hotel,
    offer,
    city,

    
  } = CarDetails;




  const { totalRating, avgRating } = calculateAvgRating(offer[0].reviews);
  const carImage =
    offer[0].images.length > 0 && offer[0].images[0].url ? offer[0].images[0].url : "";

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(offer[0].reviews.length / reviewsPerPage);
  const reviewsToShow = offer[0].reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );


  const prixParnight=hotel.rooms.length > 0 && hotel.rooms[0].price_per_night? hotel.rooms[0].price_per_night : ''

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img
                src={carImage}
                className="w-full h-auto md:w-1000 md:h-600"
                alt=""
              />
              <div className="tour__info">
                <h2 className="text-3xl font-bold mb-4">{hotel.name}  - {hotel.address}</h2>
                <div className="flex flex-wrap items-center gap-5">
                  <span className="tour__rating flex items-center gap-1">
                    <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>{" "}
                    {calculateAvgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({offer[0].reviews?.length})</span>
                    )}
                  </span>
                  <span>
                    <i className="ri-map-pin-fill"></i>{city.name}
               
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span className="text-xs sm:text-sm lg:text-base">
                    <i className="ri-wallet-3-line"></i> Starting from {prixParnight}DH 
                    /per night
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                  <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>{" "} {hotel.nbr_stars} starts
                  </span>
                </div>
                <h5 className="text-xl font-bold mb-4">Description</h5>
                <p>{hotel.description}</p>
              </div>
              <div className="tour__info">
                <h5 className="text-xl font-bold mb-4">Host Informations</h5>
                <div className="tour__activities">
                <span className="text-xs sm:text-sm lg:text-base">
                <i class="ri-user-line"></i> {offer[0].host.first_name} {offer[0].host.last_name}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base">
                  <i class="ri-phone-line"></i>
                    {offer[0].host.telephone}
                  </span>
                </div>
              </div>

              <div className="tour__reviews mt-4">
                <h4 className="text-xl font-bold mb-4">
                  ({offer[0].reviews?.length} reviews)
                </h4>
                {/* Hide this form when user submits a review */}
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex align-align-items-center gap-3 mb-4 rating__group ">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        onMouseEnter={() => setHoveredRating(value)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setCarRating(value)}
                        style={{ 'fontSize':35 }}
                      >
                        
                        <i
                         
                          className={
                            value <= (hoveredRating || carRating)
                              ? "ri-star-s-fill"
                              : "ri-star-s-line"
                          }
                          style={{ color: value <= hoveredRating ? "yellow" : "" }}
                        ></i>
                      </span>
                    ))}
                  </div>
                  <div className="review__input">
                    <input
                      type="text"
                      placeholder="share your thoughts"
                      ref={reviewMsgRef}
                      required
                    />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user__reviews">
                  {reviewsToShow?.map((review) => (
                    <div className="review__item">
                      {/* <img src={avatar} alt="" /> */}

                      <div className="w-100">
                        <div className="d-flex align-align-items-center justify-content-between">
                          <div>
                            <h5 className="text-sm font-bold ">
                              {review.client.first_name}
                            </h5>
                            {
                              <span className="text-sm">
                                {" "}
                                <TimeAgo timestamp={review.created_at} />
                              </span>
                            }
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating}
                            <i class="ri-star-fill"></i>
                          </span>
                        </div>
                        <h6> {review.body}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
                <div className="pagination">
                  {[...Array(totalPages).keys()].map((pageNumber) => (
                    <span
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={
                        currentPage === pageNumber ? "active__page" : ""
                      }
                    >
                      {pageNumber + 1}
                    </span>
                  ))}
                </div>
              </div>
              {/* Tour reviews section end */}
            </div>
          </Col>
          <Col lg="4">
            <BookingHotel offer={offer} rooms={hotel.rooms}  totalRating={totalRating} id={id} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>

 
  );
}
