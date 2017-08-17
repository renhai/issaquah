package com.renhai.manage.web;

import com.renhai.manage.entity.Tester;
import com.renhai.manage.service.PSCTesterService;
import com.renhai.manage.service.dto.TesterDto;
import com.renhai.manage.web.dto.ColumnEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

	@GetMapping("/api/download")
	public void download(@RequestParam(value = "fields") String[] fields, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Workbook excel = createExcel(fields);
		String fileName = String.format("%s.xlsx", RandomStringUtils.randomAlphabetic(8));
		response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		response.setContentType("application/octet-stream") ;
		OutputStream out = response.getOutputStream() ;
		excel.write(out) ;
		out.flush();
		out.close();
	}

	private Workbook createExcel(String[] fields) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("Sheet1");
//		String[] fields = {"name", "account", "gender", "id", "cnTestDate"};
		Row header = sheet.createRow(0);
		for (int i = 0; i < fields.length; i ++) {
			Cell cell = header.createCell(i);
			ColumnEnum columnEnum = ColumnEnum.fromName(fields[i]);
			cell.setCellValue(columnEnum.getDisplayName());
		}

		List<TesterDto> testers = pscTesterService.getAllTesters("account", "asc");

//		CellStyle cellStyle = workbook.createCellStyle();
//		CreationHelper createHelper = workbook.getCreationHelper();
//		cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyymmdd"));

		int rowNum = 1;
		for (TesterDto tester : testers) {
			Row row = sheet.createRow(rowNum ++);
			int colNum = 0;
			for (String fieldName : fields) {
//				Object value = FieldUtils.readDeclaredField(tester, fieldName, true);
				Object value = MethodUtils.invokeMethod(tester, "get"+ org.apache.commons.lang3.StringUtils.capitalize(fieldName));
				if (value == null) {
					row.createCell(colNum ++).setCellValue("");
				}
//				else if (value instanceof Tester.Gender) {
//					row.createCell(colNum ++).setCellValue(((Tester.Gender) value).getText());
//				} else if (value instanceof Tester.Level) {
//					row.createCell(colNum ++).setCellValue(((Tester.Level) value).getText());
//				} else if (value instanceof Tester.Grade) {
//					row.createCell(colNum ++).setCellValue(((Tester.Grade) value).getText());
//				} else if (value instanceof String) {
//					row.createCell(colNum ++).setCellValue((String) value);
//				} else if (value instanceof Date) {
//					Cell cell = row.createCell(colNum ++);
//					cell.setCellValue((Date) value);
//					cell.setCellStyle(cellStyle);
//				}
				else {
					row.createCell(colNum ++).setCellValue(value.toString());
				}
			}
		}

		return workbook;
	}

}
