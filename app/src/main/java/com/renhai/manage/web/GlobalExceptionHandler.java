package com.renhai.manage.web;

import com.renhai.manage.web.dto.ErrorMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Created by andy on 8/20/17.
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleAll(Exception e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessage.builder().code("INTERNAL_SERVER_ERROR").message("出错了，请联系系统管理员").build());
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity handleDataAccessException(DataAccessException e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessage.builder().code("DataAccessException").message("操作数据库异常，请检查输入").build());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity handleDataAccessException(IllegalArgumentException e) {
        log.error(e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorMessage.builder().code("IllegalArgumentException").message(e.getMessage()).build());
    }
}
