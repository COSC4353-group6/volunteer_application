import "../styles/eventscreen.css";
import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import LoadingBox from "../components/LoadingBox";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function EventScreen() {
  const userInfo = {
    name: "Username",
    isAdmin: "true",
  };
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const eevent = {
    _id: 20,
    name: "Beach Cleanup",
    slug: "gBeach-Cleanup",
    image:
      "https://i0.wp.com/smdp.com/wp-content/uploads/2022/07/Surfrider5-1024px.jpg?fit=1024%2C683&ssl=1",
    description:
      "Join us for a beach cleanup volunteering event! Help protect marine life and preserve our beautiful coastline by collecting litter and debris along the shore. This hands-on event is open to all ages, and supplies like gloves and trash bags will be provided. Volunteers will work together to remove plastic waste, bottles, and other pollutants that threaten the environment. It’s a great opportunity to make a positive impact, meet like-minded people, and enjoy the outdoors. Let’s come together to keep our beaches clean and safe for everyone! Refreshments and community spirit guaranteed.",
    location: "Miami Beach",
    date: "May 2024",
    urgency: "Relaxed",
    category: "Clean up",
    organizer: "Taylor Paige",
    numberNeeded: "50",
    numberOfVol: "17",
    startTime: "9:00 AM",

    endTime: "1:00 PM",
    contactEmail: "organizer@beachcleanup.com",
    weatherForecast: "Sunny, 75°F",
    eventStatus: "Open",
    ageRestriction: "12+",
    accessibility: "Wheelchair accessible",
  };

  // const [{ loading, error, product, loadingCreateReview }, dispatch] =
  //   useReducer(reducer, {
  //     product: [],
  //     loading: true,
  //     error: "",
  //   });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_REQUEST" });
  //     try {
  //       const result = await axios.get(`/db/products/slug/${slug}`);
  //       dispatch({ type: "FETCH_SUCCESS", payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: "FETCH_FAIL", payload: getError(err) });
  //     }
  //   };
  //   fetchData();
  // }, [slug]);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = state;

  // const theCartItems = state.cart.cartItems;

  // const isProductInCart = theCartItems.some((item) => item._id === product._id);

  // const postToCart = async () => {
  //   try {

  //     const { cartThings } = await axios.post(
  //       "/db/addtocart",
  //       {
  //         userId: state.cart.userInfo._id,
  //         cartItems: state.cart.shippingAddress,
  //       },
  //       {
  //         headers: {
  //           authorization: `Bearer ${state.userInfo.token}`,
  //         },
  //       }
  //     );
  //   } catch (err) {}
  // };

  // const removeItemHandler = (item) => {
  //   ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  //   // setLowCount(false);
  // };

  // const addToCartHandler = async () => {
  //   postToCart();
  //   const existItem = cart.cartItems.find((x) => x._id === product._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/db/products/id/${product._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert("Sorry. Product is out of stock");
  //     return;
  //   }
  //   ctxDispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: { ...product, quantity },
  //   });
  //   // navigate("/cart");
  // };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   if (!comment || !rating) {
  //     toast.error("Please enter comment and rating");
  //     return;
  //   }
  //   try {
  //     const { data } = await axios.post(
  //       `/db/products/${product._id}/reviews`,
  //       { rating, comment, name: userInfo.name },
  //       {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       }
  //     );

  //     dispatch({
  //       type: "CREATE_SUCCESS",
  //     });
  //     toast.success("Review submitted successfully");
  //     product.reviews.unshift(data.review);
  //     product.numReviews = data.numReviews;
  //     product.rating = data.rating;
  //     dispatch({ type: "REFRESH_PRODUCT", payload: product });
  //     window.scrollTo({
  //       behavior: "smooth",
  //       top: reviewsRef.current.offsetTop,
  //     });
  //   } catch (error) {
  //     toast.error(getError(error));
  //     dispatch({ type: "CREATE_FAIL" });
  //   }
  // };

  // return
  // loading ? (
  //   <LoadingBox />
  // ) : error ? (
  //   <MessageBox variant="danger">{error}</MessageBox>
  // ) : (

  return (
    <div>
      <Row >
        <Col md={6}>
          <img
            className="img-large"
            src={selectedImage || eevent.image}
            alt={eevent.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{eevent.name}</title>
              </Helmet>
            </ListGroup.Item>

            <ListGroup.Item>
              {" "}
              <span className="bold-text">Category -</span> {eevent.category}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Date </span> - {eevent.date}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Time </span> -{" "}
              <span className="bold-text"> {eevent.startTime}</span> until{" "}
              <span className="bold-text"> {eevent.endTime}</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Urgency </span> - {eevent.urgency}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Age Restriction </span> -{" "}
              {eevent.ageRestriction}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Weather Forecast </span> -{" "}
              {eevent.weatherForecast}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> accessibility </span> -{" "}
              {eevent.accessibility}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Status </span> -{" "}
              <span className="bold-text"> {eevent.numberOfVol} </span>out of{" "}
              <span className="bold-text"> {eevent.numberNeeded} </span>{" "}
              Volunteers needed{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Contact Email </span> -{" "}
              {eevent.contactEmail}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Organizer</Col>
                    <Col>{eevent.organizer}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Location:</Col>
                    <Col>
                      <Badge bg="danger">{eevent.location}</Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* {eevent.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      {iseeventInCart ? (
                        <Button onClick={()=>removeItemHandler(eevent)} variant="primary">
                   
                          Remove from Cart
                        </Button>
                      ) : (
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                )} */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        {/* <h2 ref={reviewsRef}>Reviews</h2> */}
        {/* <div className="mb-3">
          {eevent.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div> */}
        {/* <ListGroup>
          {eevent.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup> */}
        <div className="my-3">
          {userInfo ? (
            <form
            // onSubmit={submitHandler}
            >
              <h2 className="mb2">{eevent.name}</h2>

              {/* <ListGroup.Item>Category - {eevent.category}</ListGroup.Item> */}

              <h6>Description:</h6>
              <p className="mb2">{eevent.description}</p>

              <FloatingLabel
                controlId="floatingTextarea"
                label="Please share how you can contribute to this event"
                className="mb-3 "
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="height6rem"
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button
                  // disabled={loadingCreateReview}
                  style={{ backgroundColor: 'black', color:'#FFD700' }} 
                  type="submit"
                >
                  Volunteer Now!
                </Button>
                {/* {loadingCreateReview && <LoadingBox></LoadingBox>} */}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{" "}
              <Link to={`/signin?redirect=/eevent/${eevent.slug}`}>
                Sign In
              </Link>{" "}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}
export default EventScreen;
