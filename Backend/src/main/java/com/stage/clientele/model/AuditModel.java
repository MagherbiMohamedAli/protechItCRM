package com.stage.clientele.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass

public abstract class AuditModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @NotNull
    @CreatedBy
    @Column(name = "creator", updatable = false)
    private String creator;
    @NotNull
    @CreatedDate
    @Column(name = "CREATED", updatable = false)
    private LocalDateTime created;
    @NotNull
    @LastModifiedBy
    @Column(name = "MODIFIER")
    private String modifier;
    @NotNull
    @LastModifiedDate
    @Column(name = "MODIFIED")
    private LocalDateTime modified;


}
