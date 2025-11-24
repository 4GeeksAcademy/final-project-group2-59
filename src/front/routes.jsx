// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Donations } from "./pages/Donations"
import { Register } from "./pages/Register";
import Success from "./pages/Success";
import { PetRegister } from "./pages/PetRegister";
import { Login } from "./pages/Login";
import { AboutUs } from "./pages/AboutUs";
import { Pets } from "./pages/Pets";
import { Pet } from "./pages/Pet";
import { HomeAndAbout } from "./pages/Home";
import { Footer } from "./pages/Footer";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<HomeAndAbout />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="/petregister" element={<PetRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pet/:petId" element={<Pet />} />
      <Route path="/" element={<Footer />} />  {/* footer en todas las páginas */}
    </Route>

  )
);