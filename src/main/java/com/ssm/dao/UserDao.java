package com.ssm.dao;

import java.util.List;
import java.util.Map;

import com.ssm.model.User;


public interface UserDao{

	List<User> getAllUser(Map<String, Object> condition);	
	Integer getCount();
	void delete(long id);
	void add(User user);
	void update(User user);
	List<User> validateIdentity(String identity);
}
