package com.ssafy.developermaker.domain.study.dto;

import com.ssafy.developermaker.domain.study.entity.Category;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudyResponseDto {

    private Category category;
    private List<String> subjects;
    private int count;

}
