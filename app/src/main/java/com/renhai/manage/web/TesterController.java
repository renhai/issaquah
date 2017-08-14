package com.renhai.manage.web;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.service.PSCTesterService;
import com.renhai.manage.web.dto.TesterResponseDto;
import com.renhai.manage.web.dto.UpdateParamDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by hai on 7/12/17.
 */
@RestController
@Slf4j
public class TesterController {

	@Autowired
	private PSCTesterService pscTesterService;

	@GetMapping("/api/testers")
	public ResponseEntity getAll(
		@RequestParam(defaultValue = "account") String sortName,
		@RequestParam(defaultValue = "asc") String sortOrder) throws Exception{
		List<Tester> testers = pscTesterService.getAllTesters(sortName, sortOrder);
		return ResponseEntity.ok(new TesterResponseDto(testers, sortName, sortOrder));
	}

	@PutMapping("/api/testers/{id}")
	public ResponseEntity update(@PathVariable String id, @Validated @RequestBody UpdateParamDto dto) throws Exception {
		Tester result = pscTesterService.updateTester(id, dto.getFieldName(), dto.getValue());
		return ResponseEntity.ok(result);
	}
}
