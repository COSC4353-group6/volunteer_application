import { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/event.css"
import { Link } from "react-router-dom";
import axios from "axios";

import { IoIosFlame } from "react-icons/io";



// import { Store } from "../Store";

function Event(props) {

   
  const { event } = props;
  
//   const [lowCount, setLowCount] = useState(false);
//   const [added, setAdded] = useState(false);
  console.log(event)

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     cart: { cartItems },
//   } = state;

//   const postToCart = async () => {
//     try {
//       const { cartThings } = await axios.post(
//         "/db/addtocart",
//         {
//           userId: state.cart.userInfo._id,
//           cartItems: state.cart.shippingAddress,
//         },
//         {
//           headers: {
//             authorization: `Bearer ${state.userInfo.token}`,
//           },
//         }
//       );
//     } catch (err) {}
//   };

//   const addToCartHandler = async (item) => {
//     postToCart();
//     const existItem = cartItems.find((x) => x._id === eevent._id);
//     const quantity = existItem ? existItem.quantity + 1 : 1;

//     // setLowCount(quantity)

//     const { data } = await axios.get(`/db/eevents/id/${item._id}`);

//     if (data.countInStock < quantity) {
//       window.alert("Sorry. eevent is out of stock");
//       return;
//     }
//     if (data.countInStock <= 10) {
//       setLowCount(true);
//     }
//     ctxDispatch({
//       type: "CART_ADD_ITEM",
//       payload: { ...item, quantity },
//     });
//   };

  const removeItemHandler = (item) => {
    // ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
    // setLowCount(false);
  };

//   const theCartItems = state.cart.cartItems;

//   const iseeventInCart = theCartItems.some((item) => item._id === eevent._id);

  return (
    <Card className="hover namestyle">
      <Link to={`/event/${event.slug}`}>
        <img src={event.image} className="card-img-top" alt={event.name} />
      </Link>
      <Card.Body>
        <Link className="namestyle" to={`/event/${event.slug}`}>
          <Card.Title className="light">{event.name}</Card.Title>
        </Link>
        {/* <Rating rating={eevent.rating} numReviews={eevent.numReviews} /> */}
        <Card.Title> </Card.Title>

        <Row>
          <Col>
            {" "}
            {/* <div className='noline'> */}
            <p className="big">{event.location}</p>
            {event.price < 1000 && <sup className="small">.99</sup>}
            {/* </div> */}
          </Col>
        </Row>

        <div className="flat">
          {/* {eevent.countInStock === 0 ? (
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
          ) : iseeventInCart ? (
            <Button
              style={{
                backgroundColor: "rgb(185, 56, 14)",
                color: "white",
                marginTop: "5%",
              }}
              onClick={() => removeItemHandler(eevent)}
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
              onClick={() => addToCartHandler(eevent)}
            >
              Add to cart
            </Button>
          )} */}
          {/* {eevent.countInStock === 0 && 
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
          } */}
          {/* <Card.Title className='light'>{eevent.name}</Card.Title> */}

            <Col className="low" style={{ color: "rgb(185, 56, 14)" }}>
              {" "}
              <strong>{event.urgency}  </strong>
            </Col>
        
        </div>
      </Card.Body>
    </Card>
  );
}
export default Event;
