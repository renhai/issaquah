package com.renhai.manage.web;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import com.renhai.manage.service.PSCTesterService;
import com.renhai.manage.service.dto.FilterValueDto;
import com.renhai.manage.service.dto.TesterDto;
import com.renhai.manage.web.dto.QueryConditionDto;
import com.renhai.manage.web.dto.TesterRequestDto;
import com.renhai.manage.web.dto.TesterResponseDto;
import com.renhai.manage.web.dto.UpdateParamDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * Created by hai on 7/12/17.
 */
@RestController
@Slf4j
public class TesterController {

    @Autowired
    private PSCTesterService pscTesterService;

    @GetMapping("/api/testers")
    @Deprecated
    public ResponseEntity getAll(
            @RequestParam(defaultValue = "id") String sortName,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(required = false) String filterObj) throws Exception {
        HashMap<String, FilterValueDto> filter = null;
        if (StringUtils.isNotBlank(filterObj)) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            TypeReference<HashMap<String, FilterValueDto>> typeRef
                    = new TypeReference<HashMap<String, FilterValueDto>>() {
            };

            filter = mapper.readValue(filterObj, typeRef);
        }
        List<TesterDto> testers = pscTesterService.getAllTesters(sortName, sortOrder, filter);
        return ResponseEntity.ok(new TesterResponseDto(testers, sortName, sortOrder, filter));
    }

    @PostMapping("/api/testers/all")
    public ResponseEntity getAll(@RequestBody QueryConditionDto condition) {
        Preconditions.checkArgument(condition != null);
        Preconditions.checkArgument(StringUtils.isNoneBlank(condition.getSortName()), "SortName is empty");
        Preconditions.checkArgument(StringUtils.isNoneBlank(condition.getSortOrder()), "SortOrder is empty");
        Preconditions.checkArgument(condition.getFilterObj() != null, "FilterObj is null");

        List<TesterDto> testers = pscTesterService.getAllTesters(condition.getSortName(), condition.getSortOrder(), condition.getFilterObj());
        return ResponseEntity.ok(new TesterResponseDto(testers, condition.getSortName(), condition.getSortOrder(), condition.getFilterObj()));
    }

    @PutMapping("/api/testers/{id}")
    public ResponseEntity update(@PathVariable String id, @Validated @RequestBody UpdateParamDto dto) throws Exception {
        TesterDto result = pscTesterService.updateTester(id, dto.getFieldName(), dto.getValue());
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/api/testers/{ids}")
    public ResponseEntity delete(@PathVariable String[] ids) throws Exception {
        pscTesterService.deleteTesters(ids);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/testers")
    public ResponseEntity create(@Validated @RequestBody TesterRequestDto dto) throws Exception {
        checkArgument(StringUtils.isNotBlank(dto.getId()), "Id should not be empty!");
        checkArgument(!pscTesterService.exists(dto.getId()), "Data already exists");

        pscTesterService.saveTester(dto.toTester());
        return ResponseEntity.ok("SUCCESS");
    }
}
