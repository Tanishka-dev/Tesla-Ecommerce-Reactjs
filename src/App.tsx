import React, { useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDisplay from "./pages/CarDisplay";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "./features/User/userSlice";

function App() {
   const dispatch = useDispatch();
   useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
         if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            dispatch(setLogin(user));
            // ...
         } else {
            // User is signed out
            // ...
            dispatch(setLogout());
         }
      });
   }, []);
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/cars/:id" element={<CarDisplay />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/orderpage" element={<OrderPage />} />
         <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
   );
}

export default App;
