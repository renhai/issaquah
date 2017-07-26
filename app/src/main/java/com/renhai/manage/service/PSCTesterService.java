package com.renhai.manage.service;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.repository.PSCTesterRepository;
import org.apache.commons.collections4.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Created by hai on 6/26/17.
 */
@Service
public class PSCTesterService {
	@Autowired
	private PSCTesterRepository pscTesterRepository;

	@PostConstruct
	private void init() {
	}

	public void saveTester(Tester tester) {
		pscTesterRepository.save(tester);
	}

	public List<Tester> getAllTesters() {
		return IteratorUtils.toList(pscTesterRepository.findAll().iterator());
	}

	public Tester getTesterById(String id) {
		return pscTesterRepository.findOne(id);
	}
}
