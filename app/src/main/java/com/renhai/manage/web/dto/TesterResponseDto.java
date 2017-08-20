package com.renhai.manage.web.dto;

import com.renhai.manage.service.dto.TesterDto;
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
	private List<TesterDto> testers;
	private String sortName;
	private String sortOrder;
	private String filterObj;
}
