package com.renhai.manage.service;

import com.renhai.manage.entity.PSCTester;
import com.renhai.manage.repository.PSCTesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Created by hai on 6/26/17.
 */
@Service
public class PSCTesterService {
	@Autowired
	private PSCTesterRepository pscTesterRepository;

	@PostConstruct
	private void init() {
		pscTesterRepository.save(
			PSCTester.builder()
				.name("任海")
				.account("myrenhai")
				.gender(PSCTester.Gender.M)
				.permitNo("00012")
				.idNo("299492934992394")
				.build()
		);
	}
}