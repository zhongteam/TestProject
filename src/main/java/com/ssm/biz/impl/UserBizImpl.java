package com.ssm.biz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssm.biz.UserBiz;
import com.ssm.dao.UserDao;
import com.ssm.model.PageModel;
import com.ssm.model.User;

@Service
public class UserBizImpl implements UserBiz{
	@Autowired
	private UserDao userDao;
	
	@Override
	public PageModel getAllUser(int page, int rows){
		PageModel pageData = new PageModel();
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("limit", rows);
		condition.put("offset", (page - 1)*rows);
		pageData.setRows(userDao.getAllUser(condition));
		pageData.setTotal(userDao.getCount());
		return pageData;
	}

	@Override
	public void delete(long id) {
		userDao.delete(id);
	}

	@Override
	public void add(User user) {
		userDao.add(user);
	}

	@Override
	public void update(User user) {
		userDao.update(user);
	}
	
	@Override
	public boolean validateIdentity(String identity) {
		List<User> users = userDao.validateIdentity(identity);
		if(users!=null && users.size() > 0){
			return true;
		}else{
			return false;
		}
		
	}
}
