package com.renhai.manage.web.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Created by hai on 8/17/17.
 */
@Getter
@Setter
public class CreateTesterDto {
	@NotNull
	private String id;
	private String name;
	private String account;
	private String gender;
	private String idNo;
	private String education;
	private String jobTitle;
	private String occupation;
	private String workUnit;
	private String zipCode;
	private String workAddress;
	private String workPhone;
	private String homePhone;
	private String cellPhone;
	private String telMobile;
	private String email;
	private String dialect;
	private String cnTestDate;
	private Double cnScore;
	private String level;
	private String grade;
	private String bankName;
	private String bankAccount;

	private String dob;
	private Integer trainingYear;
	private Integer testCount;
	private String status;
	private Integer score;
	private String backboneClass;
	private String testCenter;
	private Integer termNo;
	private String note;
}
