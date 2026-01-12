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
import { NotFound } from "../pages/NotFound";
import { RequireAuth } from "./guards/RequireAuth";
import { Forbidden } from "../pages/Forbidden";
import { RequireAdmin } from "./guards/RequireAdmin";
import { InternalServiceError } from "../pages/InternalServerError";
import { ServiceUnavailable } from "../pages/ServiceUnavailable";
import { UserDetail } from "../pages/UserDetail/UserDetail";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<RequireAuth><MyPage /></RequireAuth>} />
          <Route path="/user-detail/:id" element={<UserDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/request-restaurants" element={<RequireAdmin><RequestRestaurants /></RequireAdmin>} />
          <Route path="/restaurants-for-update" element={<RequireAdmin><RestaurantsForUpdate /></RequireAdmin>} />
          <Route path="/restaurants-for-update/:id" element={<RequireAdmin><RestaurantsForUpdateDetail /></RequireAdmin>}></Route>
          <Route path="/restaurants/request" element={<RequireAuth><RequestRestaurant /></RequireAuth>} />
          <Route path=" " element={<RequestRestaurant />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/500" element={<InternalServiceError />} />
          <Route path="/503" element={<ServiceUnavailable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
