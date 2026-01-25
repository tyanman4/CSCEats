package com.example.backend.helper;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;

import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;

@Component
public class FirebaseStorageHelper {

    public String moveImage(String imageUrl, String status, Long restaurantId) {

        String fromPath = java.net.URLDecoder.decode(
                imageUrl.split("/o/")[1].split("\\?")[0],
                java.nio.charset.StandardCharsets.UTF_8);

        Bucket bucket = StorageClient.getInstance().bucket();

        Blob sourceBlob = bucket.get(fromPath);
        if (sourceBlob == null) {
            throw new IllegalStateException("Source image not found: " + fromPath);
        }

        String fileName = fromPath.substring(fromPath.lastIndexOf("/") + 1);

        String toPath = "restaurants/" + status + "/a_" + restaurantId + "/" + fileName;

        // copy
        Blob newBlob = bucket.create(
                toPath,
                sourceBlob.getContent(),
                sourceBlob.getContentType());

        // delete old
        sourceBlob.delete();

        return newBlob.signUrl(365, TimeUnit.DAYS).toString();
    }
}
