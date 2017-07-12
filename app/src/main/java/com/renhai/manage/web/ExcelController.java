package com.renhai.manage.web;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.service.PSCTesterService;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;

/**
 * Created by hai on 7/11/17.
 */
@RestController
@Slf4j
public class ExcelController {

	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyyMMdd");

	@Autowired
	private PSCTesterService pscTesterService;

	@PostMapping("/api/upload")
	public ResponseEntity uploadFile(@RequestParam("file") MultipartFile excelFile) throws Exception {
		Workbook workbook = new XSSFWorkbook(excelFile.getInputStream());
		Sheet sheet = workbook.getSheetAt(0);

		Row header = sheet.getRow(0);
		StringBuilder sb = new StringBuilder();
		for (Cell cell : header) {
			sb.append(cell.toString()).append("\t");
		}
		log.info(sb.toString());

		for (int i = 1; i < sheet.getLastRowNum(); i ++) {
			Row row = sheet.getRow(i);

			Tester tester = Tester.builder()
				.name(row.getCell(0).getStringCellValue())
				.account(row.getCell(1).getStringCellValue())
				.gender(Tester.Gender.fromText(StringUtils.trimWhitespace(row.getCell(2).getStringCellValue())))
				.id(row.getCell(3).getStringCellValue())
				.idNo(row.getCell(4).getStringCellValue())
				.education(row.getCell(5).getStringCellValue())
				.jobTitle(row.getCell(6).getStringCellValue())
				.occupation(row.getCell(7).getStringCellValue())
				.workUnit(row.getCell(8).getStringCellValue())
				.zipCode(row.getCell(9).getStringCellValue())
				.workAddress(row.getCell(10).getStringCellValue())
				.workPhone(row.getCell(11).getStringCellValue())
				.homePhone(row.getCell(12).getStringCellValue())
				.cellPhone(row.getCell(13).getStringCellValue())
				.telMobile(row.getCell(14).getStringCellValue())
				.email(row.getCell(15).getStringCellValue())
				.dialect(row.getCell(16).getStringCellValue())
				.cnTestDate(StringUtils.isEmpty(row.getCell(17).getStringCellValue()) ? null : DATE_FORMAT.parse(row.getCell(17).getStringCellValue()))
				.cnScore(StringUtils.isEmpty(row.getCell(18).getStringCellValue()) ? null : Double.parseDouble(StringUtils.trimWhitespace(row.getCell(18).getStringCellValue())))
				.level(Tester.Level.fromText(StringUtils.trimWhitespace(row.getCell(19).getStringCellValue())))
				.grade(Tester.Grade.fromText(StringUtils.trimWhitespace(row.getCell(20).getStringCellValue())))
				.bankName(row.getCell(21).getStringCellValue())
				.bankAccount(row.getCell(22).getStringCellValue())
				.build();

			log.info(tester.toString());
			pscTesterService.saveTester(tester);
		}
		return ResponseEntity.ok().body("success");
	}

}
