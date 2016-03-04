package com.ssm.model;

public class ResultModel {
	private String success;
	private String msg;
	
	public ResultModel(String success, String msg) {
		super();
		this.success = success;
		this.msg = msg;
	}
	public String getSuccess() {
		return success;
	}
	public void setSuccess(String success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
