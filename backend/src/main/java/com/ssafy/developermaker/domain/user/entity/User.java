package com.ssafy.developermaker.domain.user.entity;

import com.ssafy.developermaker.domain.memory.entity.Memory;
import com.ssafy.developermaker.domain.progress.entity.Progress;
import com.ssafy.developermaker.domain.user.dto.SignupDto;
import com.ssafy.developermaker.domain.user.dto.UserDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@DynamicUpdate
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, length = 50)
    @ApiModelProperty(value="유저 이메일", example = "test@naver.com-NAVER", required = true)
    private String email;

    @Column(nullable = false)
    @ApiModelProperty(value="유저 소셜id", required = true)
    private String socialId;

    @Column(nullable = false, unique = true, length = 30)
    @ApiModelProperty(value="유저 닉네임", example = "닉네임", required = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @ApiModelProperty(value="유저 성별", example = "MAN / WOMAN", required = true)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @ApiModelProperty(value="선택언어", example = "JAVA", required = true)
    private Language language;

    @Enumerated(EnumType.STRING)
    @ApiModelProperty(value="로그인 타입", example = "KAKAO", required = true)
    @Column(nullable = false, length = 20)
    private LoginType loginType;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Memory> memories = new ArrayList<>();

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "progressId")
    private Progress progress;


    public User updateNickname (String nickname) {
        this.nickname = nickname;
        return this;
    }

    public User signupFirst (SignupDto signupDto) {
        this.nickname = signupDto.getNickname();
        this.language = signupDto.getLanguage();
        return this;
    }

    public UserDto toDto() {
        return UserDto.builder()
                .email(this.email)
                .nickname(this.nickname)
                .socialId(this.socialId)
                .loginType(this.loginType)
                .gender(this.gender)
                .language(this.language)
                .progressDto(this.progress.toDto())
                .build();
    }

}