package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.Data;
import reactor.core.publisher.Mono;

@Service
public class GeocodingService {

    private final WebClient webClient;

    public GeocodingService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .defaultHeader("User-Agent", "MyApp/1.0")
                .baseUrl("https://api.community-geocoder.geolonia.com")
                .build();
    }

    public Mono<CommunityGeocoderResponse[]> getCoordinates(String address) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/coordinates")
                        .queryParam("address", address)
                        .build())
                .retrieve()
                .bodyToMono(CommunityGeocoderResponse[].class)
                .onErrorResume(e -> Mono.empty());
    }

    public double[] getLatLon(String address) {
        CommunityGeocoderResponse[] res = getCoordinates(address).block();

        if (res == null || res.length == 0 || res[0].getLat() == null || res[0].getLng() == null) {
            return null;
        }

        return new double[] { res[0].getLat(), res[0].getLng() };
    }

    @Data
    public static class CommunityGeocoderResponse {
        private Double lat;
        private Double lng;
        private String matchedAddress;
    }
}
