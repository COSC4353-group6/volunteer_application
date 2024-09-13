import { useContext, useEffect, useState, useReducer } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import SearchScreen from "./screens/SearchScreen";
import ErrorScreen from "./screens/ErrorScreen";
import SignupScreen from "./screens/SignupScreen";
import UserProfile from "./screens/UserProfile";
import SigninScreen from "./screens/SigninScreen";
import VolunteerHistory from "./screens/VolunteerHistory";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";


function App() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { fullBox, cart, userInfo } = state;

  // axios.defaults.baseURL = "http://localhost:4000/";
  axios.defaults.baseURL = 'https://volunteer-application-5io5.onrender.com/';

  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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
      <ToastContainer position="bottom-center" limit={1} />
      {/* <header>
          <Navbar className='navstyle' expand='lg'>
            <Container>
             
              <LinkContainer style={{ color: 'white' }} to='/'>
                <Navbar.Brand> VoltMatchPro </Navbar.Brand>
              </LinkContainer>
              <LinkContainer style={{ color: 'white' }} to='/'>
                <Navbar.Brand>
            
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <SearchBox /> 
                <Nav className='me-auto  w-100   justify-content-end'>
              
                  <Link
                    style={{ color: 'white' }}
                    to='/cart'
                    className='nav-link'
                  >
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )} 
                  </Link>
                 
               {userInfo ? (
                    <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/orderhistory'>
                        <NavDropdown.Item>My Orders</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/signin'>
                      Sign In
                    </Link>
                  )} 
                 {userInfo && userInfo.isAdmin === 'true' && (
                    <NavDropdown title='Admin' id='admin-nav-dropdown'>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item>Reports</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/events'>
                        <NavDropdown.Item>events</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/refunds'>
                        <NavDropdown.Item>Refund Requests</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )} 
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header> */}

      {/* <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column "
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      > */}
        {/* <Nav className=" flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong style={{ color: "black" }}>Categories</strong>
          </Nav.Item>
          <div
            style={{
              border: "2px solid rgb(185, 56, 14)",
              borderRadius: "10px",
              marginBottom: "1rem",
            }}
          >
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <Nav className="flex-column">
                {categories.map((category) => (
                  <Nav.Item key={category}>
                    <LinkContainer
                      to={{
                        pathname: "/search",
                        search: `category=${category}`,
                      }}
                    >
                      <Nav.Link className="namestyle ">{category}</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </div>

          <Nav.Item>
            <strong style={{ color: "black" }}>Brands</strong>
          </Nav.Item>
          <div
            style={{
              border: "2px solid rgb(185, 56, 14)",
              borderRadius: "10px",
              marginBottom: "1rem",
            }}
          >
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Nav className="flex-column">
                {brands.map((brand) => (
                  <Nav.Item key={brand} style={{ width: "100%" }}>
                    <LinkContainer
                      to={{ pathname: "/bsearch", search: `brand=${brand}` }}
                    >
                      <Nav.Link className="namestyle">{brand}</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </div>
        </Nav> */}

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/event/:slug" element={<EventScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/volunteerhistory" element={<VolunteerHistory />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="*" element={<ErrorScreen />} />

              {/* 
              <Route
                path='/forget-password'
                element={<ForgetPasswordScreen />}
              />
              <Route
                path='/reset-password/:token'
                element={<ResetPasswordScreen />}
              />

              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/map'
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route
                path='/order/:id'
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
               <Route
                path='/refund/:id'
                element={
                  <ProtectedRoute>
                    <RefundScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/orderhistory'
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/shipping'
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path='/payment' element={<PaymentMethodScreen />}></Route>
 */}

              {/* Admin Routes  */}

              {/* <Route
                path='/admin/dashboard'
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/orders'
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/users'
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/events'
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
               <Route
                path='/admin/refunds'
                element={
                  <AdminRoute>
                    <RefundListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/product/:id'
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
            <Route
                path='/admin/restock'
                element={
                  <AdminRoute>
                    <Restock />
                  </AdminRoute>
                }
              ></Route> 
              <Route
                path='/admin/product/newproduct'
                element={
                  <AdminRoute>
                    <ProductCreateScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/user/:id'
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route> */}
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      {/* </div> */}
    </BrowserRouter>
  );
}
export default App;
