import { useContext, useEffect, useState, useReducer } from "react";
// import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import SearchScreen from "./screens/SearchScreen";
import ErrorScreen from "./screens/ErrorScreen";
import LiveEventScreen from "./screens/LiveEventScreen.js";
import PastEventScreen from "./screens/PastEventScreen.js";
import SignupScreen from "./screens/SignupScreen";
import UserProfile from "./screens/UserProfile";
import UserListScreen from "./screens/UserListScreen.js";
import SigninScreen from "./screens/SigninScreen";
import VolunteerHistory from "./screens/VolunteerHistory";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import AdminRoute from "./hooks/AdminRoute.js";
import FindEventScreen from "./screens/FindEventScreen.js";
import ProtectedRoute from "./hooks/ProtectedRoute.js";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";

const categories = ["a", "b", "c"];
const brands = ["a", "b", "c"];

const cart = [
  {
    cartItems: ["a", "b", "c"],
  },
];

const userInfo = {
  name: "Username",
  isAdmin: "true",
};

const fullBox = "a";

console.log(userInfo);

function App() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { fullBox, cart, userInfo } = state;

  // axios.defaults.baseURL = "http://localhost:4000/";
  axios.defaults.baseURL = "https://volunteer-application-5io5.onrender.com/";

  const signoutHandler = () => {
    // ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("cartItems");
    window.location.href = "/signin";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [rating, setRating] = useState([]);

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

  // const [{ loading, error, events }, dispatch] = useReducer(reducer, {
  //   events: [],
  //   loading: true,
  //   error: '',
  // });

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/db/events/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/db/events/brands`);
  //       setBrands(data);

  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  //  const starRatings = ["0 - 499","500 - 1499","1500 - 4999","5000 - 9999","10000 - 14999"]
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const result = await axios.get('/db/events');
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: err.message });
  //     }

  //     // setevents(result.data);
  //   };
  //   fetchData();
  // }, []);

  // let countLessThan10 = 0;

  // events.forEach((product) => {
  //   if (product.countInStock < 10) {
  //     countLessThan10++;
  //   }
  // });

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? "site-container active-cont d-flex flex-column"
              : "site-container active-cont d-flex flex-column"
            : fullBox
            ? "site-container  d-flex flex-column full-box"
            : "site-container  d-flex flex-column"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="navstyle" expand="lg">
            <Container>
              <LinkContainer style={{ color: "#FFD700" }} to="/">
                <Navbar.Brand> VoltMatchPro </Navbar.Brand>
              </LinkContainer>
              <div className="marginright"></div>
              <LinkContainer style={{ color: "#FFD700" }} to="/search">
                <Navbar.Brand>
                  {" "}
                  Search <IoSearchSharp />{" "}
                </Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ borderColor: "#FFD700" }}
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100   justify-content-end">
                  {userInfo ? (
                    <NavDropdown
                      title={
                        <span style={{ color: "#FFD700" }}>
                          {userInfo.name}
                        </span>
                      }
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/userprofile">
                        <NavDropdown.Item style={{ color: "#FFD700" }}>
                          User Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/findevent">
                        <NavDropdown.Item style={{ color: "#FFD700" }}>
                          Find Event
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/volunteerhistory">
                        <NavDropdown.Item>Volunteer History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin === "true" && (
                    <NavDropdown
                      title={
                        <span style={{ color: "#FFD700" }}>Organizer</span>
                      }
                      id="admin-nav-dropdown"
                    >
                      <LinkContainer to="/admin/liveevents">
                        <NavDropdown.Item>Live Events</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/pastevents">
                        <NavDropdown.Item>Completed Events</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/event/:slug" element={<EventScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/liveevents" element={<LiveEventScreen />} />
              <Route path="/volunteerhistory" element={<VolunteerHistory />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="*" element={<ErrorScreen />} />

              <Route
                path="/userprofile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/findevent"
                element={
                  <ProtectedRoute>
                    <FindEventScreen />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/liveevents"
                element={
                  <AdminRoute>
                    <LiveEventScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/pastevents"
                element={
                  <AdminRoute>
                    <PastEventScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
