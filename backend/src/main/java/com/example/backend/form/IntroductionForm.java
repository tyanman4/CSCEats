package com.example.backend.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IntroductionForm {

    @Size(max = 1024, message = "長すぎｗ")
    private String introduction;
}
