package com.renhai.manage.web.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Created by hai on 8/12/17.
 */
@Getter
@Setter
public class UpdateParamDto {
	@NotNull
	private String fieldName;
	@NotNull
	private String value;
}
