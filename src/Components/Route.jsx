import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Error from "./Error";
import SuspenseWrapper from "./SuspenseWrapper";
import AdminLayout from "../Admin/components/Layout/AdminLayout.jsx";
import ProtectedRoute from "../Admin/components/ProtectedRoute.jsx";

const Home = lazy(() => import("../Pages/Home"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const Products = lazy(() => import("../Pages/Products"));
const Operations = lazy(() => import("../Pages/Operations"));
const Certifications = lazy(() => import("../Pages/Certifications"));
const Gallery = lazy(() => import("./Gallery"));
const Buyers = lazy(() => import("../Pages/Buyers"));
const Contact = lazy(() => import("../Pages/Contact"));
const FactoryProfile = lazy(() => import("../Pages/FactoryProfile"));
const JobDetails = lazy(() => import("../Pages/JobDetails"));
const ResumeCorner = lazy(() => import("../Pages/ResumeCorner"));

// Admin pages
const AdminLogin = lazy(() => import("../Admin/pages/Login.jsx"));
const Dashboard = lazy(() => import("../Admin/pages/Dashboard.jsx"));
const AdminProducts = lazy(() => import("../Admin/pages/products/Products.jsx"));
const ProductForm = lazy(() => import("../Admin/pages/products/ProductForm.jsx"));
const AdminCategories = lazy(() => import("../Admin/pages/categories/Categories.jsx"));
const AdminFactoryProfile = lazy(() => import("../Admin/pages/factory-profile/FactoryProfile.jsx"));
const AdminOperations = lazy(() => import("../Admin/pages/operations/Operations.jsx"));
const AdminGallery = lazy(() => import("../Admin/pages/gallery/Gallery.jsx"));
const AdminCertifications = lazy(() => import("../Admin/pages/certifications/Certifications.jsx"));
const AdminBuyers = lazy(() => import("../Admin/pages/buyers/Buyers.jsx"));
const AdminBlogs = lazy(() => import("../Admin/pages/blogs/Blogs.jsx"));
const BlogForm = lazy(() => import("../Admin/pages/blogs/BlogForm.jsx"));
const AdminContacts = lazy(() => import("../Admin/pages/contacts/Contacts.jsx"));
const AdminCareers = lazy(() => import("../Admin/pages/careers/Careers.jsx"));
const AdminNewsletter = lazy(() => import("../Admin/pages/newsletter/Newsletter.jsx"));
const AdminProfile = lazy(() => import("../Admin/pages/profile/Profile.jsx"));
const AdminReports = lazy(() => import("../Admin/pages/reports/Reports.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <SuspenseWrapper><Home /></SuspenseWrapper>,
      },
      {
        path: "/about",
        element: <SuspenseWrapper><AboutUs /></SuspenseWrapper>,
      },
      {
        path: "/products",
        element: <SuspenseWrapper><Products /></SuspenseWrapper>,
      },
      {
        path: "/products/:categorySlug",
        element: <SuspenseWrapper><Products /></SuspenseWrapper>,
      },
      {
        path: "/operations",
        element: <SuspenseWrapper><Operations /></SuspenseWrapper>,
      },
      {
        path: "/certifications",
        element: <SuspenseWrapper><Certifications /></SuspenseWrapper>,
      },
      {
        path: "/gallery",
        element: <SuspenseWrapper><Gallery /></SuspenseWrapper>,
      },
      {
        path: "/buyers",
        element: <SuspenseWrapper><Buyers /></SuspenseWrapper>,
      },
      {
        path: "/contact",
        element: <SuspenseWrapper><Contact /></SuspenseWrapper>,
      },
      {
        path: "/profile",
        element: <SuspenseWrapper><FactoryProfile /></SuspenseWrapper>,
      },
      {
        path: "/careers/:id",
        element: <SuspenseWrapper><JobDetails /></SuspenseWrapper>,
      },
      {
        path: "/careers",
        element: <SuspenseWrapper><ResumeCorner /></SuspenseWrapper>,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <SuspenseWrapper><AdminLogin /></SuspenseWrapper>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    errorElement: <Error />,
    children: [
      { index: true, element: <SuspenseWrapper><Dashboard /></SuspenseWrapper> },
      { path: "products", element: <SuspenseWrapper><AdminProducts /></SuspenseWrapper> },
      { path: "products/new", element: <SuspenseWrapper><ProductForm /></SuspenseWrapper> },
      { path: "products/:id/edit", element: <SuspenseWrapper><ProductForm /></SuspenseWrapper> },
      { path: "categories", element: <SuspenseWrapper><AdminCategories /></SuspenseWrapper> },
      { path: "factory-profile", element: <SuspenseWrapper><AdminFactoryProfile /></SuspenseWrapper> },
      { path: "operations", element: <SuspenseWrapper><AdminOperations /></SuspenseWrapper> },
      { path: "gallery", element: <SuspenseWrapper><AdminGallery /></SuspenseWrapper> },
      { path: "certifications", element: <SuspenseWrapper><AdminCertifications /></SuspenseWrapper> },
      { path: "buyers", element: <SuspenseWrapper><AdminBuyers /></SuspenseWrapper> },
      { path: "blogs", element: <SuspenseWrapper><AdminBlogs /></SuspenseWrapper> },
      { path: "blogs/new", element: <SuspenseWrapper><BlogForm /></SuspenseWrapper> },
      { path: "blogs/:id/edit", element: <SuspenseWrapper><BlogForm /></SuspenseWrapper> },
      { path: "contacts", element: <SuspenseWrapper><AdminContacts /></SuspenseWrapper> },
      { path: "careers", element: <SuspenseWrapper><AdminCareers /></SuspenseWrapper> },
      { path: "newsletter", element: <SuspenseWrapper><AdminNewsletter /></SuspenseWrapper> },
      { path: "reports", element: <SuspenseWrapper><AdminReports /></SuspenseWrapper> },
      { path: "profile", element: <SuspenseWrapper><AdminProfile /></SuspenseWrapper> },
    ],
  },
]);

export default router;
