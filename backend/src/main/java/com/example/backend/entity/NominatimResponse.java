package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class NominatimResponse {

    @JsonProperty("lat")
    private String lat;

    @JsonProperty("lon")
    private String lon;

}