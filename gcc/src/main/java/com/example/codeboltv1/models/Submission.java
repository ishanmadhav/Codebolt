package com.example.codeboltv1.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;


import java.util.Date;

@Getter @Setter @NoArgsConstructor
public class Submission {
    @Id
    public String id;
    public String sourceCode;
    public String stdin;
    public String stdout;
    public String language;
    enum Status {
        NEW,
        ACTIVE,
        EXECUTED,
        FAILED
    };
    public Status status;
    public Date createdAt;
    public Date finishedAt;
    public String expectedOutput;

    public Submission(String sourceCode, String stdin, String language)
    {
        this.sourceCode=sourceCode;
        this.stdin=stdin;
        this.stdout="";
        this.language=language;
        this.status=Status.NEW;
        this.createdAt=new Date();
    }
}
