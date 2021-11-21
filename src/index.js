/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {createContext} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";



import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import userStore from "store/userStore";
import categoryStore from "store/categoryStore";
import brandStore from "store/brandStore";
import clientStore from "store/clientStore";
import orderStore from "store/orderStore";
import productStore from "store/productStore";
import userListStore from "store/userListStore";
import reviewStore from "store/reviewStore";

import Authorized from "routers/Authorized";


export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new userStore(),
    category: new categoryStore(),
    brand: new brandStore(),
    client: new clientStore(),
    order: new orderStore(),
    product: new productStore(),
    userList: new userListStore(),
    review: new reviewStore()
  }}>
    <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Authorized/>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
  </Context.Provider>
  ,
  document.getElementById("root")
);
