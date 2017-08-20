package com.renhai.manage.web.dto;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.service.dto.TesterDto;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

/**
 * Created by hai on 8/17/17.
 */
@Getter
@Setter
public class TesterRequestDto {
	private Integer id;
	private String name;
	private String account;
	private String gender;
	private String badgeNo;
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
	private Integer age;
	private Integer trainingYear;
	private Integer testCount;
	private String status;
	private Integer score;
	private String backboneClass;
	private String testCenter;
	private Integer termNo;
	private String note1;
	private String note2;
	private String note3;

	public Tester toTester() throws Exception {
		return Tester.builder()
			.id(id)
			.name(name)
			.account(account)
			.gender(Tester.Gender.fromText(gender))
            .badgeNo(badgeNo)
			.idNo(idNo)
			.education(education)
			.jobTitle(jobTitle)
			.occupation(occupation)
			.workUnit(workUnit)
			.zipCode(zipCode)
			.workAddress(workAddress)
			.workPhone(workPhone)
			.homePhone(homePhone)
			.cellPhone(cellPhone)
			.telMobile(telMobile)
			.email(email)
			.dialect(dialect)
			.cnTestDate(StringUtils.isBlank(cnTestDate) ? null : TesterDto.DEFAULT_DATE_FORMAT.parse(cnTestDate))
			.cnScore(cnScore)
			.level(Tester.Level.fromText(level))
			.grade(Tester.Grade.fromText(grade))
			.bankName(bankName)
			.bankAccount(bankAccount)
			.dob(StringUtils.isBlank(dob) ? null : TesterDto.DEFAULT_DATE_FORMAT.parse(dob))
			.trainingYear(trainingYear)
			.testCount(testCount)
			.status(Tester.Status.fromText(status))
			.score(score)
			.backboneClass(backboneClass)
			.testCenter(testCenter)
			.termNo(termNo)
			.note1(note1)
			.note2(note2)
			.note3(note3)
			.build();
	}
}
