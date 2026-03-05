import { createBrowserRouter, } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Error from "./Error";
import Operations from "../Pages/Operations";
import Gallery from "./Gallery";
import Buyers from "../Pages/Buyers";
import Contact from "../Pages/Contact";
import Certifications from "../Pages/Certifications";

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout />,
        errorElement:<Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },

            {
                path: "/products",
                element: <Products></Products>
            },
            {
                path: "/operations",
                element: <Operations></Operations>
            },
            {
                path: "/certifications",
                element: <Certifications></Certifications>
            },
            {
                path: "/gallery",
                element: <Gallery></Gallery>
            },
            {
                path: "/buyers",
                element: <Buyers></Buyers>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            }


        ]


    
     } ])



    export default router;