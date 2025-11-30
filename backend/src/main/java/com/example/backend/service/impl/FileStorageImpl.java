package com.example.backend.service.impl;

import com.example.backend.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageImpl implements FileStorageService {

    // application.yml / properties に設定してもいいし、デフォルト値 "uploads" でもOK
    @Value("${app.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("ファイルが空です");
        }

        try {
            // 保存先ディレクトリ
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            // 元ファイル名をクリーンにして、UUID で被らないようにする
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String newFileName = UUID.randomUUID() + "_" + originalFilename;

            Path targetLocation = uploadPath.resolve(newFileName);

            // 実際に保存
            file.transferTo(targetLocation.toFile());

            // DB に保存するパス（どうするかは運用次第）
            // 例: /uploads/xxxxx.jpg みたいにしておく
            String relativePath = "/uploads/" + newFileName;

            log.info("Saved file to {}", targetLocation);

            return relativePath;

        } catch (IOException e) {
            log.error("ファイル保存に失敗しました", e);
            throw new RuntimeException("ファイル保存に失敗しました", e);
        }
    }
}
