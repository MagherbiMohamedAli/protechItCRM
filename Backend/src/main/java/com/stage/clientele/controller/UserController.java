package com.stage.clientele.controller;

import com.stage.clientele.dao.RoleDao;
import com.stage.clientele.dao.UserDao;
import com.stage.clientele.model.ERole;
import com.stage.clientele.model.Role;
import com.stage.clientele.model.User;
import com.stage.clientele.requests.Message;
import com.stage.clientele.services.implement.IUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserDao userDao;
    @Autowired

    IUser userService;
    @Autowired
    RoleDao roleDao;

    @GetMapping("/getallusers")
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id){
        Optional<User> user = userDao.findById(id);
        if (user.isPresent())
            return new ResponseEntity<>(user.get(),HttpStatus.OK);
        else
            return new ResponseEntity<>(new Message("Utilisateur Introuvable"), HttpStatus.FORBIDDEN);
    }


    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id ){
        if (userService.deleteUser(id)){
            return new ResponseEntity<>(new Message("User deleted"),HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new Message("Error, user cannot be deleted"),HttpStatus.NOT_FOUND);

        }
    }
    @GetMapping("/getClients")
    public ResponseEntity<?> getClients(){
        return new ResponseEntity<>(userService.getClients(), HttpStatus.OK);
    }

    @GetMapping("/getAdmins")
    public ResponseEntity<?> getAdmins(){
        return new ResponseEntity<>(userService.getAdmins(), HttpStatus.OK);
    }


    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody User u){
        if (userDao.existsByEmail(u.getEmail())&&userService.existsByEmailAndIdNot(u.getEmail(), u.getId())) {
            return new ResponseEntity<>(new Message("Email Already exists"), HttpStatus.BAD_REQUEST);
        }

        Set<Role> r = new HashSet<>();
        r.add( roleDao.findRoleByRole(ERole.ROLE_CLIENT));

        u.setRoles(r);
        return new ResponseEntity<>(userService.updateUser(u),HttpStatus.OK);

    }
    @GetMapping("/countClients")
    public ResponseEntity<?> countUserByRoles(){
        return new ResponseEntity<>(userService.countUserByRoles(), HttpStatus.OK);
    }
    @GetMapping("/countAdmins")
    public ResponseEntity<?> countAdminsByRoles(){
        return new ResponseEntity<>(userService.countAdminsByRoles(), HttpStatus.OK);
    }



}
