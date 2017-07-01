package com.renhai.manage.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by hai on 6/26/17.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tester")
public class Tester {

	/** 工作证编号 */
	@Id
	private String id;
	/** 姓名 */
	@NotNull
	private String name;
	/** 账号 */
	@NotNull
	private String account;
	/** 性别 */
	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(length = 1)
	private Gender gender;
	/** 身份证号 */
	@Column(length = 18)
	private String idNo;
	/** 学历 */
	private String education;
	/** 职称 */
	private String jobTitle;
	/** 职务 */
	private String occupation;
	/** 工作单位 */
	private String workUnit;
	/** 邮编 */
	private String zipCode;
	/** 工作地址 */
	private String workAddress;
	private String workPhone;
	private String homePhone;
	private String cellPhone;
	private String telMobile;
	private String email;
	private String dialect;
	@Temporal(TemporalType.TIMESTAMP)
	private Date cnTestDate;
	private Integer cnScore;
	@Enumerated(EnumType.STRING)
	private Level level;
	@Enumerated(EnumType.STRING)
	private Grade grade;
	private String bankName;
	private String bankAccount;
	/** 生日 */
	@Temporal(TemporalType.TIMESTAMP)
	private Date dob;
	/** 培I: 15年, 培II: 16年, 培III: 17年 */
	private Integer trainingYear;
	/** 测试量 */
	private Integer testCount;
	/** 状态 */
	@Enumerated(EnumType.STRING)
	private Status status;
	/** 成绩 */
	private Integer score;
	/** 骨干班次 */
	private String backboneClass;
	/** 测试分中心 */
	private String testCenter;
	/** 期数 */
	private Integer termNo;
	/** 备注 */
	private String note;

	public enum Gender {
		M, F
	}

	public enum Level {
		PROVINCE, NATIONAL
	}

	public enum Grade {
		A, B, C, D, EXPERT
	}

	public enum Status {
		IDLE, BUSY
	}
}


