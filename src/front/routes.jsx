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
import { Login } from "./pages/Login"
import { Pets } from "./pages/Pets";
import { Pet } from "./pages/Pet";
import { Profile } from "./pages/Profile";
import { Favorites } from "./pages/Favorites";
import { HomeAndAbout } from "./pages/Home";
import { Protectedadmin } from "./components/Protectedadmin";
import { Dashboard } from "./pages/Dashboard";
import { PetManagent } from "./pages/PetManagent";
import { PetEdit } from "./pages/PetEdit";
import { InfoDevelopers } from "./pages/InfoDevelopers";

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
      <Route path="/login" element={<Login />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pet/:petId" element={<Pet />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/info-developers" element={<InfoDevelopers />} />
      <Route path="/dashboard" element={
        <Protectedadmin>
          <Dashboard />
        </Protectedadmin>
      } />
      <Route path="/dashboard/petregister" element={
        <Protectedadmin>
          <PetRegister />
        </Protectedadmin>
      } />
      <Route path="/dashboard/petmanagement" element={
        <Protectedadmin>
          <PetManagent />
        </Protectedadmin>
      } />
      <Route path="/dashboard/petedit/:petId" element={
        <Protectedadmin>
          <PetEdit />
        </Protectedadmin>
      } />
    </Route>
    

  )
);