package com.renhai.manage.service;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.repository.PSCTesterRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.IteratorUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by hai on 6/26/17.
 */
@Service
@Slf4j
public class PSCTesterService {
	@Autowired
	private PSCTesterRepository pscTesterRepository;

	@Transactional
	public void saveTester(Tester tester) {
		pscTesterRepository.save(tester);
	}

	public List<Tester> getAllTesters(String sortName, String sortOrder) {
		List<Tester> result = IteratorUtils.toList(pscTesterRepository.findAll(new Sort(Sort.Direction.fromString(sortOrder), sortName)).iterator());
		return result;
	}

	public Tester getTesterById(String id) {
		return pscTesterRepository.findOne(id);
	}

	@Transactional
	public Tester updateTester(String id, String fieldName, String value) throws IllegalAccessException {
		Tester tester = pscTesterRepository.findOne(id);
		FieldUtils.writeDeclaredField(tester, fieldName, value, true);
		return pscTesterRepository.save(tester);
	}
}
