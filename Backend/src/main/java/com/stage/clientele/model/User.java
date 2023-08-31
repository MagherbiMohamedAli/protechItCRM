package com.stage.clientele.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class User extends AuditModel {

    @NotBlank
    @Column(nullable = false)
    @NotEmpty
    private String username;

    @Column(unique = true, nullable = false)
    @NotBlank
    @NotEmpty
    private String email;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    @NotBlank
    @Column(nullable = false)
    @NotEmpty
    private String password;


    @ManyToMany
    private Set<Role> roles=new HashSet<Role>();




}
