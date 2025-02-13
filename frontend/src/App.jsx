import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import AllBook from './pages/AllBook';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';
import AllOrder from './pages/AllOrder';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) 
    dispatch(authActions.login()),
    dispatch(authActions.changeRole(localStorage.getItem("role")));
  }, [])
  return (
      <>
        <Navbar />
        <div>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-book" element={<AllBook />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile/>} >
            {role === "user" ? <Route path='/profile' element={<Favourites />} /> : <Route path='/profile' element={<AllOrder />} />}
            {role === "admin" ? <Route path='/profile/add-book' element={<AddBook />} /> : null }
            <Route path='/profile/ordersHistory' element={<UserOrderHistory />} />
            <Route path='/profile/settings' element={<Settings />} />
          </Route>
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
        </div>
        <Footer />
      </>
  );
};

export default App;