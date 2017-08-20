package com.renhai.manage.web.dto;

import com.renhai.manage.service.dto.FilterValueDto;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by andy on 8/20/17.
 */
@Getter
@Setter
public class QueryConditionDto {
    private String sortName = "id";
    private String sortOrder = "asc";
    private Map<String, FilterValueDto> filterObj = new HashMap<>();
}
