package com.stage.clientele.dao;

import com.stage.clientele.model.ERole;
import com.stage.clientele.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface RoleDao extends JpaRepository<Role,Long> {
    Set<Role> findRolesByRole(ERole role);
    Role findRoleByRole(ERole role);

}
