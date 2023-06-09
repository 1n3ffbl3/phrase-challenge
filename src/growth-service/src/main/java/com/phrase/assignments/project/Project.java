package com.phrase.assignments.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Set;

@Entity
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String sourceLanguage;

    private ProjectStatus status;

    @ElementCollection(targetClass = String.class)
    private Set<String> targetLanguages;

    private Instant dateCreated;

    private Instant dateUpdated;

    private Instant dateDue;

}
