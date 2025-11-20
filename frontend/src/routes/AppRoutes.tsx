import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RestaurantList } from "../pages/RestaurantList/RestaurantList";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AuthProvider } from "../contexts/AuthContext";
import { RequestRestaurant } from "../pages/RequestRestaurant/RequestRestaurant";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/request" element={<RequestRestaurant />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
