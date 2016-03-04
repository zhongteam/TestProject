package com.ssm.biz;

import com.ssm.model.PageModel;
import com.ssm.model.User;

public interface UserBiz {
	public PageModel getAllUser(int page, int rows);
	public void delete(long id);
	public void add(User user);
	public void update(User user);
	public boolean validateIdentity(String identity);
}
