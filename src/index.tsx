import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   apiKey: "AIzaSyCPnutUd4VgEUpRlFIStMGomY_EzE_v2Zk",
   authDomain: "tesla-ecommerce-5d52f.firebaseapp.com",
   projectId: "tesla-ecommerce-5d52f",
   storageBucket: "tesla-ecommerce-5d52f.appspot.com",
   messagingSenderId: "450981370489",
   appId: "1:450981370489:web:299094a3213eed042b92a8",
};

export const provider = new GoogleAuthProvider();

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);
