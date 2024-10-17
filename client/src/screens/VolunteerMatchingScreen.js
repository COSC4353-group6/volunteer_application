import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from "react";


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
 
  
  const [theRequests, setTheRequests] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/event/volunteer-requests`);
        setTheRequests(data);
      } catch (error) {
        console.error("Error fetching volunteer history:", error);
      }
    };
    fetchData();
  }, []);


  const reversedData = theRequests
    ? theRequests.slice().reverse()
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
              <th>REQUEST ID</th>
              <th>NAME</th>
              <th>LOCATION</th>
              <th>SKILLS</th>
              <th>EVENT REQUEST</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reversedData.map((volunteerRequest) => (
              <tr key={volunteerRequest.request_id}>
                <td>{volunteerRequest.request_id}</td>
                <td>{volunteerRequest.user_name}</td>
                <td>{volunteerRequest.location}</td>
                <td>{volunteerRequest.user_skills}</td>
                <td>{volunteerRequest.title}</td>
                <td>
                  
                  &nbsp;
                  <Link to={`/admin/${volunteerRequest.request_id}`}>
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
