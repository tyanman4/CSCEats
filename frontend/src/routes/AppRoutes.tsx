import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RestaurantList } from "../pages/RestaurantList/RestaurantList";
import { Login } from "../pages/Login/Login";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/restaurants" element={<RestaurantList />} />
      </Routes>
    </BrowserRouter>
  )
}
