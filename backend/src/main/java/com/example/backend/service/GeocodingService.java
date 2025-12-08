package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
//import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import reactor.core.publisher.Mono;

@Service
public class GeocodingService {

    private final WebClient webClient;

    public GeocodingService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .defaultHeader("User-Agent", "MyApp/1.0")
                // 国土地理院のAPIベースURL
                .baseUrl("https://msearch.gsi.go.jp")
                .build();
    }

    public Mono<GsiResponse[]> getCoordinates(String address) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/address-search/AddressSearch") // 国土地理院のパス
                        .queryParam("q", address)
                        .build())
                .retrieve()
                .bodyToMono(GsiResponse[].class)
                .doOnError(e -> System.out.println("Geocoding Error: " + e.getMessage()))
                .onErrorResume(e -> Mono.empty());
    }

    public double[] getLatLon(String address) {
        GsiResponse[] res = getCoordinates(address).block();

        if (res == null || res.length == 0 || res[0].getGeometry() == null
                || res[0].getGeometry().getCoordinates() == null) {
            System.out.println("住所が見つかりませんでした: " + address);
            return null;
        }

        // 国土地理院APIのcoordinatesは [経度(lon), 緯度(lat)] の順に入っています
        Double lon = res[0].getGeometry().getCoordinates()[0];
        Double lat = res[0].getGeometry().getCoordinates()[1];

        return new double[] { lat, lon };
    }

    // 国土地理院API用のレスポンスクラス
    @Data
    public static class GsiResponse {
        private Geometry geometry;

        @Data
        public static class Geometry {
            private String type;
            private Double[] coordinates; // [経度, 緯度] の配列
        }
    }
}