import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RestaurantList } from "../pages/RestaurantList/RestaurantList";

export const AppRoutes = () =>  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/restaurants" element={<RestaurantList />} />
      </Routes>
    </BrowserRouter>
  )
}
