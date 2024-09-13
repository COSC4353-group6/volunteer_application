import { useEffect, useReducer, useState, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
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


  // const [{ loading, error, events }, dispatch] = useReducer(reducer, {
  //   events: [],
  //   loading: true,
  //   error: '',
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const result = await axios.get('/db/events');
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: err.message });
  //     }

  //     // setEvents(result.data);
  //   };
  //   fetchData();
  // }, []);
  
  // let countLessThan10 = 0;

  // events.forEach((event) => {
  //   if (event.countInStock < 10) {
  //     countLessThan10++;
  //   }
  // });
  
  // const reversedData = events ? events.slice().reverse():[];
  return (
    <div className='floater-head'>
   
      <h1>HomePage</h1>
    
      {/* <div className='events'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {reversedData.map((event) => (
              <Col key={event.slug} sm={6} md={4} lg={3} className='mb-3'>
                <event event={event}></event>
              </Col>
            ))}
          </Row>
        )}
      </div> */}
    </div>
  );
}
export default HomeScreen;