import { useEffect, useReducer, useState, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Event from '../components/Event';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";



// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, events: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

function HomeScreen() {

    const [allEvents, setAllEvents] = useState([]);

  // Fetch the volunteer history data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/api/event/allevents');
       
        setAllEvents(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching volunteer history:', error);
      }
    };
    fetchEvents();
  }, []);

 
  
  const reversedData = allEvents ? allEvents.slice().reverse():[];
  console.log(reversedData)
  return (
    <div className='floater-head'>
      <Helmet>
        <title>VoltMatchPro</title>
      </Helmet>
      <h1>New Events</h1>
    
      <div className='events'>
        {/* {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : ( */}
          <Row>
            {reversedData.map((event) => (
              <Col key={event.slug} sm={6} md={4} lg={3} className='mb-3'>
                <Event event={event}></Event>
              </Col>
            ))}
          </Row>
        {/* )} */}
      </div>
    </div>
  );
}
export default HomeScreen;