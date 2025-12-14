import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RestaurantList } from "../pages/RestaurantList/RestaurantList";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AuthProvider } from "../contexts/AuthContext";
import { MyPage } from "../pages/MyPage/MyPage";
import { RequestRestaurants } from "../pages/RequestRestaurants/RequestRestaurants";
import { RequestRestaurant } from "../pages/RequestRestaurant/RequestRestaurant";
import { RestaurantDetail } from "../pages/RestaurantDetail/RestaurantDetail";
import { RestaurantsForUpdate } from "../pages/RestaurantsForUpdate/RestaurantsForUpdate";
import { RestaurantsForUpdateDetail } from "../pages/RestaurantsForUpdateDetail/RestaurantsForUpdateDetail";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/request-restaurants" element={<RequestRestaurants />} />
          <Route path="/restaurants-for-update" element={<RestaurantsForUpdate />} />
          <Route path="/restaurants-for-update/:id" element={<RestaurantsForUpdateDetail />}></Route>
          <Route path="/restaurants/request" element={<RequestRestaurant />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
