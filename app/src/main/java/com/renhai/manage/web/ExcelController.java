package com.renhai.manage.web;

import com.google.common.base.Preconditions;
import com.renhai.manage.entity.Tester;
import com.renhai.manage.service.PSCTesterService;
import com.renhai.manage.service.dto.TesterDto;
import com.renhai.manage.web.dto.ColumnEnum;
import com.renhai.manage.web.dto.TesterRequestDto;
import com.renhai.manage.web.dto.UploadResultDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by hai on 7/11/17.
 */
@RestController
@Slf4j
public class ExcelController {

	@Autowired
	private PSCTesterService pscTesterService;

	@PostMapping("/api/excel/upload")
	public ResponseEntity uploadFile(@RequestParam("file") MultipartFile excelFile) throws Exception {
		Workbook workbook = new XSSFWorkbook(excelFile.getInputStream());
		Sheet sheet = workbook.getSheetAt(0);

		Row header = sheet.getRow(0);
		StringBuilder sb = new StringBuilder();
		for (Cell cell : header) {
			sb.append(cell.toString()).append("\t");
		}
		log.info(sb.toString());

		int successfulCount = 0;
		int failedCount = 0;
		List<Integer> failedLineNumbers = new ArrayList<>();

		for (int i = 1; i <= sheet.getLastRowNum(); i ++) {
			Row row = sheet.getRow(i);
			try {
				Tester tester = Tester.builder()
                    .name(row.getCell(0).getStringCellValue())
                    .account(org.apache.commons.lang3.StringUtils.trimToNull(row.getCell(1).getStringCellValue()))
                    .gender(Tester.Gender.fromText(StringUtils.trimWhitespace(row.getCell(2).getStringCellValue())))
                    .badgeNo(org.apache.commons.lang3.StringUtils.trimToNull(row.getCell(3).getStringCellValue()))
                    .idNo(org.apache.commons.lang3.StringUtils.trimToNull(row.getCell(4).getStringCellValue()))
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
                    .email(org.apache.commons.lang3.StringUtils.trimToNull(row.getCell(15).getStringCellValue()))
                    .dialect(row.getCell(16).getStringCellValue())
                    .cnTestDate(StringUtils.isEmpty(row.getCell(17).getStringCellValue()) ? null : TesterDto.DEFAULT_DATE_FORMAT.parse(row.getCell(17).getStringCellValue()))
                    .cnScore(StringUtils.isEmpty(row.getCell(18).getStringCellValue()) ? null : Double.parseDouble(StringUtils.trimWhitespace(row.getCell(18).getStringCellValue())))
                    .level(Tester.Level.fromText(StringUtils.trimWhitespace(row.getCell(19).getStringCellValue())))
                    .grade(Tester.Grade.fromText(StringUtils.trimWhitespace(row.getCell(20).getStringCellValue())))
                    .bankName(row.getCell(21).getStringCellValue())
                    .bankAccount(row.getCell(22).getStringCellValue())
                    .build();
				pscTesterService.saveTester(tester);
				successfulCount ++;
			} catch (Exception e) {
				log.error(e.getMessage(), e);
				failedCount ++;
				failedLineNumbers.add(i);
			}
		}
		return ResponseEntity.ok().body(new UploadResultDto(successfulCount, failedCount, failedLineNumbers));
	}

	@PostMapping("/api/excel")
	public ResponseEntity download(@RequestParam(value = "fields") String[] fields, @RequestBody List<TesterRequestDto> data) throws Exception {
		Preconditions.checkArgument(fields != null && fields.length > 0, "No Fields Selected");
		Preconditions.checkArgument(CollectionUtils.isNotEmpty(data), "No Data");

		Workbook excel = createExcel(fields, data);
		File tempFile = File.createTempFile(RandomStringUtils.randomAlphabetic(8), "xlsx");
		tempFile.deleteOnExit();
		FileOutputStream fileOutputStream = new FileOutputStream(tempFile);
		excel.write(fileOutputStream);
		fileOutputStream.flush();
		fileOutputStream.close();
		return ResponseEntity.ok(tempFile.getAbsoluteFile());

	}

	@GetMapping("/api/excel/download")
	public void download(@RequestParam(value = "path") String path, HttpServletRequest request, HttpServletResponse response) throws Exception {
		File file = new File(path);
		if(!file.exists()){
			String errorMessage = "Sorry. The file you are looking for does not exist";
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
			outputStream.close();
			return;
		}
		String fileName = String.format("%s.xlsx", RandomStringUtils.randomAlphabetic(8));
		response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		response.setContentType("application/octet-stream") ;
		InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
		FileCopyUtils.copy(inputStream, response.getOutputStream());
	}

	private Workbook createExcel(String[] fields) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("Sheet1");
		Row header = sheet.createRow(0);
		for (int i = 0; i < fields.length; i ++) {
			Cell cell = header.createCell(i);
			ColumnEnum columnEnum = ColumnEnum.fromName(fields[i]);
			cell.setCellValue(columnEnum.getDisplayName());
		}

		List<TesterDto> testers = pscTesterService.getAllTesters("account", "asc", null);

		int rowNum = 1;
		for (TesterDto tester : testers) {
			Row row = sheet.createRow(rowNum ++);
			int colNum = 0;
			for (String fieldName : fields) {
				Object value = MethodUtils.invokeMethod(tester, "get"+ org.apache.commons.lang3.StringUtils.capitalize(fieldName));
				if (value == null) {
					row.createCell(colNum ++).setCellValue(org.apache.commons.lang3.StringUtils.EMPTY);
				} else {
					row.createCell(colNum ++).setCellValue(value.toString());
				}
			}
		}

		return workbook;
	}

	private Workbook createExcel(String[] fields, List<TesterRequestDto> data) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("Sheet1");
		Row header = sheet.createRow(0);
		for (int i = 0; i < fields.length; i ++) {
			Cell cell = header.createCell(i);
			ColumnEnum columnEnum = ColumnEnum.fromName(fields[i]);
			cell.setCellValue(columnEnum.getDisplayName());
		}
		int rowNum = 1;
		for (TesterRequestDto tester : data) {
			Row row = sheet.createRow(rowNum ++);
			int colNum = 0;
			for (String fieldName : fields) {
				Object value = MethodUtils.invokeMethod(tester, "get"+ org.apache.commons.lang3.StringUtils.capitalize(fieldName));
				if (value == null) {
					row.createCell(colNum ++).setCellValue("");
				} else {
					row.createCell(colNum ++).setCellValue(value.toString());
				}
			}
		}
		return workbook;
	}

}
