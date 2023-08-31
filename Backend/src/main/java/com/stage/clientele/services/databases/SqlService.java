package com.stage.clientele.services.databases;

import com.stage.clientele.dao.UserDao;
import com.stage.clientele.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SqlService{
    @Autowired
    private UserDao userDao;
    public User addUser(User user){
        return userDao.save(user);
    }
}