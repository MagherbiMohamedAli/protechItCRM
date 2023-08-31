package com.stage.clientele.services.implement;

import com.stage.clientele.model.ERole;
import com.stage.clientele.model.User;
import com.stage.clientele.requests.LoginRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IUser {
    User addUser(User u);
    List<User> getAllUsers();
    User updateUser(User u);
    User getUserById(Long id);
    String getUserByName(String nomEtPrenom);
    Boolean deleteUser(Long id);
    Boolean existsByEmailAndIdNot(String email, Long id);
    User getUserByemail(String email);
    User saveUser(User user);
    List<User> getClients();
    List<User> getAdmins();
    Integer countUserByRoles();
    Integer countAdminsByRoles();
    User login(LoginRequest loginRequest);
}
