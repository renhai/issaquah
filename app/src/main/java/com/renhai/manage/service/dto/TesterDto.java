package com.renhai.manage.service.dto;

import com.renhai.manage.entity.Tester;

import java.text.SimpleDateFormat;

/**
 * Created by hai on 8/16/17.
 */
public class TesterDto {

	public static SimpleDateFormat DEFAULT_DATE_FORMAT = new SimpleDateFormat("yyyyMMdd");

	private Tester tester;

	public TesterDto(Tester tester) {
		this.tester = tester;
	}
	public String getId() {
		return tester.getId();
	}

	public String getName() {
		return tester.getName();
	}

	public String getAccount() {
		return tester.getAccount();
	}

	public String getGender() {
		return tester.getGender() == null ? "" : tester.getGender().getText();
	}

	public String getIdNo() {
		return tester.getIdNo();
	}

	public String getEducation() {
		return tester.getEducation();
	}

	public String getJobTitle() {
		return tester.getJobTitle();
	}

	public String getOccupation() {
		return tester.getOccupation();
	}

	public String getWorkUnit() {
		return tester.getWorkUnit();
	}

	public String getZipCode() {
		return tester.getZipCode();
	}

	public String getWorkAddress() {
		return tester.getWorkAddress();
	}

	public String getWorkPhone() {
		return tester.getWorkPhone();
	}

	public String getHomePhone() {
		return tester.getHomePhone();
	}

	public String getCellPhone() {
		return tester.getCellPhone();
	}

	public String getTelMobile() {
		return tester.getTelMobile();
	}

	public String getEmail() {
		return tester.getEmail();
	}

	public String getDialect() {
		return tester.getDialect();
	}

	public String getCnTestDate() {
		return tester.getCnTestDate() == null ? "" : DEFAULT_DATE_FORMAT.format(tester.getCnTestDate());
	}

	public Double getCnScore() {
		return tester.getCnScore();
	}

	public String getLevel() {
		return tester.getLevel() == null ? "" : tester.getLevel().getText();
	}

	public String getGrade() {
		return tester.getGrade() == null ? "" : tester.getGrade().getText();
	}

	public String getBankName() {
		return tester.getBankName();
	}

	public String getBankAccount() {
		return tester.getBankAccount();
	}

	public String getDob() {
		return tester.getDob() == null ? "" : DEFAULT_DATE_FORMAT.format(tester.getDob());
	}

	public Integer getTrainingYear() {
		return tester.getTrainingYear();
	}

	public Integer getTestCount() {
		return tester.getTestCount();
	}

	public String getStatus() {
		return tester.getStatus() == null ? "" : tester.getStatus().getText();
	}

	public Integer getScore() {
		return tester.getScore();
	}

	public String getBackboneClass() {
		return tester.getBackboneClass();
	}

	public String getTestCenter() {
		return tester.getTestCenter();
	}

	public Integer getTermNo() {
		return tester.getTermNo();
	}

	public String getNote() {
		return tester.getNote();
	}
}
