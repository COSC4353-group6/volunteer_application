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
import { Store } from "../Context";
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
  const [theEvent, setTheEvent] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const thisEvent = theEvent._id;

  const thisUserId = 4;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/event/volunteer-request`,
        {
          thisEvent,
          thisUserId,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
    } catch (error) {
      console.error("Error fetching volunteer history:", error);
    }
  };
  // const event = {
  //   _id: 20,
  //   name: "Beach Cleanup",
  //   slug: "gBeach-Cleanup",
  //   image:
  //     "https://i0.wp.com/smdp.com/wp-content/uploads/2022/07/Surfrider5-1024px.jpg?fit=1024%2C683&ssl=1",
  //   description:
  //     "Join us for a beach cleanup volunteering event! Help protect marine life and preserve our beautiful coastline by collecting litter and debris along the shore. This hands-on event is open to all ages, and supplies like gloves and trash bags will be provided. Volunteers will work together to remove plastic waste, bottles, and other pollutants that threaten the environment. It’s a great opportunity to make a positive impact, meet like-minded people, and enjoy the outdoors. Let’s come together to keep our beaches clean and safe for everyone! Refreshments and community spirit guaranteed.",
  //   location: "Miami Beach",
  //   date: "May 2024",
  //   urgency: "Relaxed",
  //   category: "Clean up",
  //   organizer: "Taylor Paige",
  //   numberNeeded: "50",
  //   numberOfVol: "17",
  //   startTime: "9:00 AM",

  //   endTime: "1:00 PM",
  //   contactEmail: "organizer@beachcleanup.com",
  //   weatherForecast: "Sunny, 75°F",
  //   eventStatus: "Open",
  //   ageRestriction: "12+",
  //   accessibility: "Wheelchair accessible",
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/event/slug/${slug}`);
        setTheEvent(data);
      } catch (error) {
        console.error("Error fetching volunteer history:", error);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={selectedImage || theEvent.image}
            alt={theEvent.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{theEvent.name}</title>
              </Helmet>
            </ListGroup.Item>

            <ListGroup.Item>
              {" "}
              <span className="bold-text">Category -</span> {theEvent.category}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Date </span> - {theEvent.createdAt}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Time </span> -{" "}
              <span className="bold-text"> {theEvent.startTime}</span> until{" "}
              <span className="bold-text"> {theEvent.endTime}</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Urgency </span> - {theEvent.urgency}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Age Restriction </span> -{" "}
              {theEvent.ageRestriction}+
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Weather Forecast </span> -{" "}
              {theEvent.weather}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> accessibility </span> - Wheelchair
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Status </span> -{" "}
              <span className="bold-text"> {theEvent.numberOfVol} </span>out of{" "}
              <span className="bold-text"> {theEvent.numberNeeded} </span>{" "}
              Volunteers needed{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className="bold-text"> Contact Email </span> -{" "}
              {theEvent.contactEmail}
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
                    <Col>{theEvent.organizer}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Location:</Col>
                    <Col>
                      <Badge bg="danger">{theEvent.location}</Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        <div className="my-3">
          {userInfo ? (
            <form>
              <h2 className="mb2 makeyellow">{theEvent.name}</h2>

              <h6 className="makewhite">Description:</h6>
              <p className="mb2 makewhite">{theEvent.description}</p>

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
                onClick={submitHandler}
                  style={{ backgroundColor: "black", color: "#FFD700" }}
                  type="submit"
                >
                  Volunteer Now!
                </Button>
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{" "}
              <Link to={`/signin?redirect=/event/${theEvent.slug}`}>
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
