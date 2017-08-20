package com.renhai.manage.service;

import com.google.common.base.Function;
import com.google.common.collect.Ordering;
import com.renhai.manage.entity.Tester;
import com.renhai.manage.repository.PSCTesterRepository;
import com.renhai.manage.service.dto.FilterValueDto;
import com.renhai.manage.service.dto.TesterDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.IteratorUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Nullable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

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

	public List<TesterDto> getAllTesters(String sortName, String sortOrder, Map<String, FilterValueDto> filter) {
//		List<Tester> testers = IteratorUtils.toList(pscTesterRepository.findAll(new Sort(Sort.Direction.fromString(sortOrder), sortName)).iterator());
		List<Tester> testers = IteratorUtils.toList(pscTesterRepository.findAll().iterator());
		List<TesterDto> result = testers.stream().map(tester -> new TesterDto(tester)).collect(Collectors.toList());

		if (filter != null && !filter.isEmpty()) {
			List<Predicate<TesterDto>> predicates = new ArrayList<>();
			for (String filterKey : filter.keySet()) {
                String filterValue = filter.get(filterKey).getValue();
                Predicate<TesterDto> predicate = dto -> {
                    try {
                        Object value  = MethodUtils.invokeMethod(dto, "get"+ StringUtils.capitalize(filterKey));
                        return value.toString().contains(filterValue);
                    } catch (Exception e) {
                        log.error(e.getMessage(), e);
                        return false;
                    }
                };
                predicates.add(predicate);
            }
			Predicate<TesterDto> combinePredicate = predicates.stream().reduce(Predicate::and).orElse(x -> true);
			result = result.stream().filter(combinePredicate).collect(Collectors.toList());
		}


		Ordering<TesterDto> ordering = Ordering.natural().nullsFirst().onResultOf(new Function<TesterDto, Comparable>() {
			@Nullable
			@Override
			public Comparable apply(@Nullable TesterDto input) {
				Object value = null;
				try {
					value = MethodUtils.invokeMethod(input, "get"+ StringUtils.capitalize(sortName));
				} catch (Exception e) {
					log.error(e.getMessage(), e);
				}
				return (Comparable) value;
			}
		});
		if ("desc".equals(sortOrder)) {
			ordering = ordering.reverse();
		}
		Collections.sort(result, ordering);
		return result;
	}

//	public Tester getTesterById(Integer id) {
//		return pscTesterRepository.findOne(id);
//	}

	@Transactional
	public TesterDto updateTester(Integer id, String fieldName, String value)
		throws IllegalAccessException, NoSuchMethodException, InvocationTargetException, ParseException {
		Tester tester = pscTesterRepository.findOne(id);
		Field field = FieldUtils.getField(Tester.class, fieldName, true);
		if (StringUtils.isBlank(value)) {
			FieldUtils.writeDeclaredField(tester, fieldName, null, true);
		} else if (field.getType().isEnum()) {
			Object realValue = MethodUtils.invokeStaticMethod(field.getType(), "fromText", value);
			if (realValue == null) {
				throw new IllegalArgumentException("参数错误");
			}
			FieldUtils.writeDeclaredField(tester, fieldName, realValue, true);
		} else if (field.getType().equals(Integer.class)) {
			Integer realValue = Integer.parseInt(value);
			FieldUtils.writeDeclaredField(tester, fieldName, realValue, true);
		} else if (field.getType().equals(Double.class)) {
			Double realValue = Double.parseDouble(value);
			FieldUtils.writeDeclaredField(tester, fieldName, realValue, true);
		} else if (field.getType().equals(Date.class)) {
			Date realValue = TesterDto.DEFAULT_DATE_FORMAT.parse(value);
			FieldUtils.writeDeclaredField(tester, fieldName, realValue, true);
		} else {
			FieldUtils.writeDeclaredField(tester, fieldName, value, true);
		}

		Tester entity = pscTesterRepository.save(tester);
		return new TesterDto(entity);
	}

	@Transactional
	public void deleteTesters(Integer[] ids) {
		for (Integer id : ids) {
			pscTesterRepository.delete(id);
		}
	}

//	public boolean exists(Integer id) {
//		return pscTesterRepository.exists(id);
//	}
}
