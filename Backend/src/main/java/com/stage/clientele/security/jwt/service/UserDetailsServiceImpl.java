package com.stage.clientele.security.jwt.service;

import com.stage.clientele.dao.UserDao;
import com.stage.clientele.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserDao userDao;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user=userDao.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not Found!"));
        return UserPrincipal.build(user);
    }
}
