import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


import axios from "axios";
import { useContext, useState, useEffect } from "react";


function event(props) {
  const { event } = props;
  const [lowCount, setLowCount] = useState(false);
  const [added, setAdded] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const postToCart = async () => {
    try {
      const { cartThings } = await axios.post(
        "/db/addtocart",
        {
          userId: state.cart.userInfo._id,
          cartItems: state.cart.shippingAddress,
        },
        {
          headers: {
            authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      );
    } catch (err) {}
  };

  const addToCartHandler = async (item) => {
    postToCart();
    const existItem = cartItems.find((x) => x._id === event._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // setLowCount(quantity)

    const { data } = await axios.get(`/db/events/id/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. event is out of stock");
      return;
    }
    if (data.countInStock <= 10) {
      setLowCount(true);
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });

  };

  const theCartItems = state.cart.cartItems;

  const iseventInCart = theCartItems.some((item) => item._id === event._id);

  return (
    <Card className="hover">
      <Link to={`/event/${event.slug}`}>
        <img src={event.image} className="card-img-top" alt={event.name} />
      </Link>
      <Card.Body>
        <Link className="namestyle" to={`/event/${event.slug}`}>
          <Card.Title className="light">{event.name}</Card.Title>
        </Link>
        <Rating rating={event.rating} numReviews={event.numReviews} />
        <Card.Title> </Card.Title>

        <Row>
          <Col>
            {" "}
            {/* <div className='noline'> */}
            <p className="big">${event.price}</p>
            {event.price < 1000 && <sup className="small">.99</sup>}
     
          </Col>
        </Row>

        <div className="flat">
          {event.countInStock === 0 ? (
            <Button
              style={{
                backgroundColor: "rgb(185, 56, 14)",
                color: "white",
                marginTop: "5%",
              }}
              disabled
            >
              Out of stock
            </Button>
          ) : iseventInCart ? (
            <Button
              style={{
                backgroundColor: "rgb(185, 56, 14)",
                color: "white",
                marginTop: "5%",
              }}
              onClick={() => removeItemHandler(event)}
            >
              Remove
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "rgb(185, 56, 14)",
                color: "white",
                marginTop: "5%",
              }}
              onClick={() => addToCartHandler(event)}
            >
              Add to cart
            </Button>
          )}
          
          {event.countInStock <= 9 && event.countInStock != 0 ? (
            <Col className="low" style={{ color: "rgb(185, 56, 14)" }}>
              {" "}
              <strong>{event.countInStock} left </strong> <IoIosFlame />
            </Col>
          ) : (
            <Col></Col>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default event;