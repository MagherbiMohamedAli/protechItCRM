package com.stage.clientele.dao;

import com.stage.clientele.model.ERole;
import com.stage.clientele.model.Role;
import com.stage.clientele.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(String email);
    User findByBirthday(Date birthday);
    List<User> findUsersByRoles(Role role);
    Integer countUserByRoles(Role role);
    Boolean existsByEmailAndIdNot(String email, Long id);

    Boolean existsByEmail(String email);
    User findUserByUsername(String username);


}
