package com.renhai.manage.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by hai on 6/26/17.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "psc_tester")
public class PSCTester {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@NotNull
	private String name;
	@NotNull
	private String account;
	@NotNull
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@NotNull
	private String permitNo;
	private String idNo;

	public enum Gender {
		M, F
	}


}


