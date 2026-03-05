import { createBrowserRouter, } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Error from "./Error";
import Operations from "../Pages/Operations";
import Gallery from "./Gallary";
import Buyers from "../Pages/Buyers";
import Contact from "../Pages/Contact";

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
                element: <h1 className="text-3xl font-bold text-center my-8">Certifications Page Coming Soon...</h1>
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