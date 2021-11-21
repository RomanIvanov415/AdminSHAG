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

import Categories from "views/Categories.js"
import Brands from "views/Brands.js"
import Clients from "views/Clients.js"
import Orders from "views/Orders.js"
import Products from "views/Products.js"
import Statistic from "views/Statistic.js"
import Users from "views/Users"
import Reviews from "views/Reviews"
import Authorization from "views/Authorization"


var routes = [
  
  {
    path: "/categories",
    name: "Categories",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/brands",
    name: "Brands",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bold",
    component: Brands,
    layout: '/admin'
  },
  {
    path: "/clients",
    name: "Clients",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: Clients,
    layout: '/admin'
  },
  {
    path: "/orders",
    name: "Orders",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-copy-04",
    component: Orders,
    layout: '/admin'
  },
  {
    path: "/products",
    name: "Product",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-tablet-2",
    component: Products,
    layout: '/admin'
  },
  {
    path: "/stats",
    name: "Staistic",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-bar-32",
    component: Statistic,
    layout: '/admin'
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-badge",
    component: Users,
    layout: '/admin'
  },
  {
    path: "/reviews",
    name: "Reviews",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-shape-star",
    component: Reviews,
    layout: "/admin"
  },
  
  
];

var authRoutes = [
  {
    path: "/authorization",
    name: "Authorization",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: Authorization,
    layout: "/admin"
  },
];
export {routes, authRoutes}

