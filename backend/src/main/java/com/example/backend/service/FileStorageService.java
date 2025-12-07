package com.example.backend.service;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
@Slf4j
public class FileStorageService {

    @Value("${app.upload-dir:uploads}")
    private String uploadDir;

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("ファイルが空です");
        }

        try {
            // 保存先ディレクトリ作成
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            // ファイル名を安全に整形 + UUID追加
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String newFileName = UUID.randomUUID() + "_" + originalFilename;

            Path targetLocation = uploadPath.resolve(newFileName);

            // 実際に保存
            file.transferTo(targetLocation.toFile());

            String relativePath = "/uploads/" + newFileName;

            log.info("Saved file to {}", targetLocation);

            return relativePath;

        } catch (IOException e) {
            log.error("ファイル保存に失敗しました", e);
            throw new RuntimeException("ファイル保存に失敗しました", e);
        }
    }
}
