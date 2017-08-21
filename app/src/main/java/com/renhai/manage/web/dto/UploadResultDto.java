package com.renhai.manage.web.dto;

import lombok.*;

import java.util.List;

/**
 * Created by andy on 8/20/17.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UploadResultDto {
    private int successfulCount;
    private int failedCount;
    private List<Integer> failedLineNumbers;
}
