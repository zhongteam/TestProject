package com.ssm.model;

import java.util.List;

public class PageModel {
	private List<User> rows;
	private int total;
	public List<User> getRows() {
		return rows;
	}
	public void setRows(List<User> rows) {
		this.rows = rows;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
}
