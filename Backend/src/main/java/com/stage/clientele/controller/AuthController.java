package com.stage.clientele.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.stage.clientele.dao.RoleDao;

import com.stage.clientele.dao.UserDao;
import com.stage.clientele.dto.TokenDto;
import com.stage.clientele.model.ERole;
import com.stage.clientele.model.Role;
import com.stage.clientele.model.User;
import com.stage.clientele.requests.LoginRequest;
import com.stage.clientele.requests.Message;
import com.stage.clientele.responses.JwtResponse;
import com.stage.clientele.security.jwt.JwtProvider;
import com.stage.clientele.security.jwt.service.UserPrincipal;
import com.stage.clientele.services.implement.IUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/Auth")
public class AuthController {

    @Autowired
    UserDao userDao;
    @Autowired
    IUser userService;
    @Autowired
    RoleDao roleDao;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;



    @PostMapping("/Connexion")
    public ResponseEntity<?> connexion(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateJwtToken(authentication);
            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            User user = userService.getUserById(userDetails.getId());
            JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUsername(), user);
            return ResponseEntity.ok(jwtResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }


    }


    @PostMapping("/signup")
    public ResponseEntity<?> addClient(@RequestBody User user) {
        if (userDao.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(new Message("Email Already exist"), HttpStatus.BAD_REQUEST);
        }
        System.out.println(user.toString());

        Set<Role> roles = new HashSet<>();
        roles.add(roleDao.findRoleByRole(ERole.ROLE_CLIENT));
        user.setRoles(roles);
        user.setPassword(encoder.encode(user.getPassword()));

        User savedUser = userService.addUser(user);


        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @PostMapping("/facbookLogin")
    public ResponseEntity<?> fbLogin(@RequestBody TokenDto tokenDto) {
        Facebook facebook = new FacebookTemplate(tokenDto.getToken());
        String [] data =  {"email",
                "id",
                "first_name",
                "last_name",
                "middle_name",
                "name",
                "picture",
                "short_name",
                "birthday",
                "gender"
        };
        org.springframework.social.facebook.api.User user = facebook.fetchObject("me", org.springframework.social.facebook.api.User.class,data);
        User u;
        if(userDao.existsByEmail(user.getEmail())){
              u = userService.getUserByemail(user.getEmail());
        }else {
            User userToSave =new User();
            Set<Role> x = new HashSet<>();
            x.add(roleDao.findRoleByRole(ERole.ROLE_CLIENT));
            userToSave.setRoles(x);
            userToSave.setEmail(user.getEmail());
            userToSave.setUsername(user.getName());
            userToSave.setPassword(encoder.encode("facebookPwd"));
            u = userService.addUser(userToSave);
        }
        try {
            System.out.println(encoder.encode(u.getPassword()));
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(u.getEmail(),"facebookPwd"));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateJwtToken(authentication);
            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            User user1 = userService.getUserById(userDetails.getId());
            return ResponseEntity.status(HttpStatus.OK).body(new JwtResponse(jwt, userDetails.getUsername(), user1));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        }
    @PostMapping("/LoginWithGoogle")
    public ResponseEntity<?> LoginWithGoogle(@RequestBody TokenDto tokenDto) throws IOException {
        String idSocial = "22912923160-73j5ffvl252j672k4mfltv2qbd7j7mdk.apps.googleusercontent.com";
        NetHttpTransport netHttpTransport = new NetHttpTransport();
        System.out.println(idSocial);
        GoogleIdTokenVerifier.Builder builderVerif = new
                GoogleIdTokenVerifier.Builder(netHttpTransport, new GsonFactory())
                .setAudience(Collections.singleton(idSocial));
        System.out.println(tokenDto.getToken());
        GoogleIdToken googleIdToken = GoogleIdToken.parse(builderVerif.getJsonFactory(), tokenDto.getToken());
        GoogleIdToken.Payload payload = googleIdToken.getPayload();
        System.out.println(payload.get("name"));
        return ResponseEntity.status(HttpStatus.OK).body(payload);
    }


}
