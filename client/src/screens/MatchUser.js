import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/matchuser.css";
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
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";

export default function MatchUser() {
  const [userRequest, setUserRequest] = useState("");
  useEffect(() => {
    setUserRequest(request.userRequest);
  }, []);

  const [request, setRequest] = useState([]);

  const params = useParams();
  console.log(params);

  const { _id } = params;

  console.log(_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/event/volunteer-requests/${_id}`
        );
        setRequest(data);
      } catch (error) {
        console.error("Error fetching volunteer history:", error);
      }
    };
    fetchData();
  }, []);


  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       `/api/event/volunteer-request`,
  //       {
  //         thisEvent,
  //         thisUserId,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching volunteer history:", error);
  //   }
  // };

  return (
    <Container className="small-container">
      {/* <Helmet>
        <title>Edit Product ${request._id}</title>
      </Helmet> */}
      <h1 className="mb2">Volunteer Request ID {_id}</h1>
      {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( */}
      <h3>User details</h3>
      <Form
      //   onSubmit={submitHandler}
      >
        <Form.Group className="mb-3 " controlId="name">
          <Form.Label className="makeyellow">Volunteer Name</Form.Label>
          <Form.Control
            value={request.user_name}
            // onChange={(e) => setName(e.target.value)}

            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Request ID</Form.Label>
          <Form.Control
            value={request.request_id}
            // onChange={(e) => setName(e.target.value)}

            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Age</Form.Label>
          <Form.Control
            value={request.user_age}
            // onChange={(e) => setName(e.target.value)}

            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={request.location}
            // onChange={(e) => setSlug(e.target.value)}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb2" controlId="slug">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            value={request.user_skills}
            // onChange={(e) => setSlug(e.target.value)}
            disabled
          />
        </Form.Group>

        <h3 className="makeyellow">Event details</h3>

        <Form.Group className="mb-3" controlId="slug">
          <Form.Label className="makeyellow">Matched Event </Form.Label>
          <Form.Control
            value={request.title}
            // onChange={(e) => setSlug(e.target.value)}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Urgency</Form.Label>
          <Form.Control
            value={request.urgency}
            // onChange={(e) => setSlug(e.target.value)}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb2" controlId="slug">
          <Form.Label>Event Category</Form.Label>
          <Form.Control
            value={request.category}
            // onChange={(e) => setSlug(e.target.value)}
            disabled
          />
        </Form.Group>
        <h3 className="makeyellow">Finalize Match</h3>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>
            {" "}
            Dropdown selector to Match user with a different event based on
            their profiles and event requirements{" "}
          </Form.Label>
          <Form.Select
            aria-label="Category"
            value={userRequest}
            onChange={(e) => setUserRequest(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Blood Donation">Blood Donation</option>
            <option value="animal care">animal care</option>
            <option value="Planting Trees">Planting Trees</option>
            <option value="Beach Cleanup">Beach Cleanup</option>
          </Form.Select>
        </Form.Group>

        <div className="mb-3 ">
          <Button
            style={{ color: "black", backgroundColor: "#FFD700" }}
            //    disabled={loadingUpdate}
            type="submit"
          >
            Finalize Match!
          </Button>
          {/* {loadingUpdate && <LoadingBox></LoadingBox>} */}
        </div>
      </Form>
      {/* )} */}
    </Container>
  );
}
