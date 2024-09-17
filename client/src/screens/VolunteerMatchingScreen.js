import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import LoadingBox from "../components/LoadingBox";
import logo from "../images/volt2.png";
import { Link } from "react-router-dom";

export default function VolunteerMatchingScreen() {
  const volunteerRequests = [
    {
      _id: 234,
      name: "Chiemela Umeh",
      location: "Scottsdale, AZ",
      Skills: ["Communication, Punctuality"],
      userRequest: "Blood Donation",
    },
    {
      _id: 234,
      name: "Chiemela Umeh",
      location: "Scottsdale, AZ",
      Skills: ["Communication, Punctuality"],
      userRequest: "animal care",
    },
    {
      _id: 234,
      name: "Chiemela Umeh",
      location: "Scottsdale, AZ",
      Skills: ["Communication, Punctuality"],
      userRequest: "Planting Trees",
    },
    {
      _id: 234,
      name: "Chiemela Umeh",
      location: "Scottsdale, AZ",
      Skills: ["Communication, Punctuality"],
      userRequest: "Beach Cleanup",
    },
    {
      _id: 234,
      name: "Chiemela Umeh",
      location: "Scottsdale, AZ",
      Skills: ["Communication, Punctuality"],
      userRequest: "Beach Cleanup",
    },
  ];

  const reversedData = volunteerRequests
    ? volunteerRequests.slice().reverse()
    : [];

  return (
    <div>
      <header className="volunteerheader">
        <img src={logo} alt="Logo" className="header-logo" />
        Volunteer Matching
      </header>
      <Row>
        <Col className="col text-end">
          <div></div>
        </Col>
      </Row>

    
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>LOCATION</th>
              <th>SKILLS</th>
              <th>VOLUNTEER REQUEST</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reversedData.map((volunteerRequest) => (
              <tr key={volunteerRequest._id}>
                <td>{volunteerRequest._id}</td>
                <td>{volunteerRequest.name}</td>
                <td>{volunteerRequest.location}</td>
                <td>{volunteerRequest.Skills}</td>
                <td>{volunteerRequest.userRequest}</td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    // onClick={() => navigate(`/admin/product/${product._id}`)}
                  >
                    Deny
                  </Button>
                  &nbsp;
                  <Link to={`/admin/${volunteerRequests._id}`}>
                    <Button
                      style={{ backgroundColor: "black", color: "#FFD700" }}
                      type="button"
                      variant="light"
                      // onClick={() => deleteHandler(product)}
                    >
                      Begin Matching...
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      {/* )} */}
    </div>
  );
}
