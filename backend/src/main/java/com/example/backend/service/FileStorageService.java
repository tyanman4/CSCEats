package com.example.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    /**
     * ファイルを保存して、保存先のパス（またはURL）を返す
     */
    String store(MultipartFile file);
}
