package com.stage.clientele.services;

import com.stage.clientele.dao.RoleDao;
import com.stage.clientele.dao.UserDao;
import com.stage.clientele.model.ERole;
import com.stage.clientele.model.Role;
import com.stage.clientele.model.User;
import com.stage.clientele.requests.LoginRequest;
import com.stage.clientele.services.implement.IUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUser {

    @Autowired
    UserDao userDao;
    @Autowired
    RoleDao roleDao;

    @Override
    public User addUser(User u) {
        return userDao.save(u);

    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public User updateUser(User u) {
        return userDao.save(u);
    }

    @Override
    public User getUserById(Long id) {
        return userDao.findById(id).orElseThrow();
    }

    public String getUserByName(String username) {
        return userDao.findUserByUsername(username).getUsername();
    }



    public List<User> getClients() {
        Role role = roleDao.findRoleByRole(ERole.ROLE_CLIENT);
        return userDao.findUsersByRoles(role);
    }

    public List<User> getAdmins() {
        Role role = roleDao.findRoleByRole(ERole.ROLE_ADMIN);
        return userDao.findUsersByRoles(role);
    }
    public User saveUser(User user) {
        return userDao.save(user);
    }
    public Integer countUserByRoles() {
        Role role = roleDao.findRoleByRole(ERole.ROLE_CLIENT);
        return userDao.countUserByRoles(role);
    }

    public Integer countAdminsByRoles() {
        Role role = roleDao.findRoleByRole(ERole.ROLE_CLIENT);
        return userDao.countUserByRoles(role);
    }


    @Override
    public Boolean deleteUser(Long id) {
        if (userDao.existsById(id)) {
            userDao.deleteById(id);
            return !userDao.existsById(id);
        }
        return false;

    }

    public Boolean existsByEmailAndIdNot(String email, Long id){
        Boolean isEmailTaken = userDao.existsByEmailAndIdNot(email, id);
        return isEmailTaken;
    }




    @Override
    public User getUserByemail(String email) {
        return userDao.findByEmail(email).get();
    }

    public User login(LoginRequest loginRequest) {
        Optional<User> userOptional = userDao.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return user;
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
