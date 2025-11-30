package com.example.backend.service;

import com.example.backend.entity.NominatimResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class GeocodingService {

    private final WebClient webClient;

    public GeocodingService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://nominatim.openstreetmap.org")
                .defaultHeader("User-Agent", "MySpringApp/1.0 (your_email@gmail.com)")
                .build();
    }

    public Mono<NominatimResponse> getCoordinates(String address) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("format", "json")
                        .queryParam("limit", "1")
                        .queryParam("accept-language", "ja")
                        .queryParam("addressdetails", "1")
                        .queryParam("countrycodes", "jp")
                        .build())
                .exchangeToMono(response -> {
                    if (response.statusCode().is2xxSuccessful()) {
                        return response.bodyToMono(NominatimResponse[].class)
                                .map(res -> res.length > 0 ? res[0] : null);
                    } else {
                        // 4xx / 5xx / 429（レート制限）など → null を返す
                        return Mono.just(null);
                    }
                })
                .onErrorResume(e -> Mono.empty()); // 通信断など
    }

    /**
     * ブロッキングで緯度経度を返すメソッド（RestController・Serviceなどで使いやすい）
     */
    public double[] getLatLon(String address) {

        NominatimResponse response = getCoordinates(address).block();

        if (response == null || response.getLat() == null || response.getLon() == null) {
            return null; // 見つからない場合
        }

        try {
            double lat = Double.parseDouble(response.getLat());
            double lon = Double.parseDouble(response.getLon());
            return new double[] { lat, lon };
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
