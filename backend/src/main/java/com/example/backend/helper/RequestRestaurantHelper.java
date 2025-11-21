package com.example.backend.helper;

import org.springframework.stereotype.Component;

import com.example.backend.entity.RequestRestaurant;
import com.example.backend.form.RequestRestaurantForm;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class RequestRestaurantHelper {

    public RequestRestaurant convertRequestRestaurant(RequestRestaurantForm form) {
        RequestRestaurant requestRestaurant = new RequestRestaurant();
        requestRestaurant.setName(form.getName());
        requestRestaurant.setAddress(form.getAddress());
        requestRestaurant.setStatus("pending");
        return requestRestaurant;
    }

}
