package com.ssafy.developermaker.domain.quiz.entity;


import com.ssafy.developermaker.domain.album.entity.UserAlbum;
import com.ssafy.developermaker.domain.study.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Category category;

    @Column(nullable = false, length = 30)
    private String subject;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false, length = 500)
    private String problem;

    @Column(nullable = false, length = 500)
    private String example;

    @Column(nullable = false, length = 200)
    private String answer;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.REMOVE)
    private List<UserQuiz> userQuizs = new ArrayList<>();
}
