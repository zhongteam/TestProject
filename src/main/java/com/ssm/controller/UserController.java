package com.ssm.controller;

import net.sf.json.JSON;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.biz.UserBiz;
import com.ssm.model.PageModel;
import com.ssm.model.ResultModel;
import com.ssm.model.User;

@Controller
@RequestMapping(value="api")
public class UserController {
	
	@Autowired
	private UserBiz userBiz;
	
	@RequestMapping(value="/list")
	@ResponseBody
	public String list(Integer page, Integer rows){
		if(page == null){
			page = 1;
		}
		if(rows == null){
			rows = 10;
		}
		PageModel pageData = userBiz.getAllUser(page, rows);
		JSON json = JSONObject.fromObject(pageData);
		return json.toString();
	}
	@RequestMapping(value="/delete")
	@ResponseBody
	public String delete(Long id){
		ResultModel result = new ResultModel("true","删除成功");
		userBiz.delete(id);
		JSON json = JSONObject.fromObject(result);
		return json.toString();
	}
	
	@RequestMapping(value="/add")
	@ResponseBody
	public String add(User user){
		ResultModel result = new ResultModel("true","添加成功");
		userBiz.add(user);
		JSON json = JSONObject.fromObject(result);
		return json.toString();
	}
	
	@RequestMapping(value="/edit")
	@ResponseBody
	public String edit(User user){
		ResultModel result = new ResultModel("true","修改成功");
		userBiz.update(user);
		JSON json = JSONObject.fromObject(result);
		return json.toString();
	}
	
	@RequestMapping(value="/validateIdentity")
	@ResponseBody
	public String validateIdentity(String identity){
		if(!userBiz.validateIdentity(identity)){
			return "true";
		}
		return "false";
	}
	
	
}
