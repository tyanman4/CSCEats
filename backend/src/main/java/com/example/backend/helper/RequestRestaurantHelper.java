package com.example.backend.helper;

import org.springframework.stereotype.Component;

import com.example.backend.entity.RequestRestaurants;
import com.example.backend.form.RequestRestaurantForm;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class RequestRestaurantHelper {

    public RequestRestaurants convertRequestRestaurant(RequestRestaurantForm form) {
        RequestRestaurants requestRestaurant = new RequestRestaurants();
        requestRestaurant.setName(form.getName());
        requestRestaurant.setAddress(form.getAddress());
        requestRestaurant.setStatus("pending");
        return requestRestaurant;
    }

}
