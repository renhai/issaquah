package com.renhai.manage.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hai on 6/25/17.
 */
@Controller
public class IndexController {

	@RequestMapping({"/", "/counter", "/todo"})
	public String index() {
		return "index";
	}
}
