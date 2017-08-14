package com.renhai.manage.web.dto;

import com.renhai.manage.entity.Tester;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by hai on 8/13/17.
 */
@Getter
@Setter
@AllArgsConstructor
public class TesterResponseDto {
	private List<Tester> testers;
	private String sortName;
	private String sortOrder;
}
