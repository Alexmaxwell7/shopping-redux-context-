import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Home from './components/home';
import ItemDetails from './components/itemdetails';
import Cart from './components/cart';
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
function App() {
  let routes = useRoutes([
    { path:"/", element: <Home /> },
    { path:"/cart", element: <Cart /> },
    { path:"/selecteditem/:id", element: <ItemDetails /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
  

export default AppWrapper;
