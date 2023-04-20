package com.example.codeboltv1.controllers;

import com.example.codeboltv1.dto.CodeDTO;
import com.example.codeboltv1.models.Submission;
import com.example.codeboltv1.services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CodeController {

    @Autowired
    private SubmissionService submissionService;

    @GetMapping("/")
    public String getHello()
    {
        return "Hello";
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/execute")
    public ResponseEntity<Submission> executeSubmission(@RequestBody CodeDTO submission)
    {
        System.out.println("The code controller was hit");
        //System.out.print(submission);
        Submission newSubmission=submissionService.createSubmission(submission.sourceCode, submission.stdin, submission.language);
        Submission executedSubmission=submissionService.executeSubmission(newSubmission);
        return new ResponseEntity<>(executedSubmission, HttpStatus.CREATED);
    }



}
