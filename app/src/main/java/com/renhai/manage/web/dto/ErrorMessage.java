package com.renhai.manage.web.dto;

import lombok.*;

/**
 * Created by andy on 8/20/17.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorMessage {
    private String message;
    private String code;
}
