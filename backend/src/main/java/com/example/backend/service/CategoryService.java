package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.mapper.CategoryMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;

    /**
     * カテゴリーをなければ追加してIDを返す
     * 
     */
    public Long getOrCreateCategoryId(String categoryName) {
        Long categoryId = categoryMapper.findIdByName(categoryName);
        if (categoryId != null) {
            return categoryId;
        }

        Category category = new Category();
        category.setName(categoryName);
        categoryMapper.insert(category);

        return categoryMapper.findIdByName(categoryName);
    }
}
