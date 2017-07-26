package com.renhai.manage.web;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.service.PSCTesterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public ResponseEntity getAll() throws Exception{
		List<Tester> testers = pscTesterService.getAllTesters();
		return ResponseEntity.ok(testers);
	}
}
