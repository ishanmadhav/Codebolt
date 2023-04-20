package com.example.codeboltv1.controllers;

import com.example.codeboltv1.dto.CodeDTO;
import com.example.codeboltv1.models.Submission;
import com.example.codeboltv1.services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
public class CodeController {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private RestTemplate restTemplate;
    private String gccUrl="http://GCC-SERVICE/execute";
    //private  String gccUrl="http://localhost:8081/execute";
    private String cUrl="http://GCC-SERVICE/execute";
    private String pyUrl="http://PY-SERVICE/execute";
    private String javaUrl="http://JAVA-SERVICE/execute";

    @GetMapping("/")
    public String getHello()
    {
        return "Hello";
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping("/submit")
    public ResponseEntity<Submission> createSubmission(@RequestBody CodeDTO submission)
    {
        Submission executedSubmission = null;
        switch(submission.language)
        {
            case "cpp":
                executedSubmission=restTemplate.postForObject(gccUrl, submission, Submission.class);
                System.out.print(executedSubmission.toString());
                break;
            case "c":
                executedSubmission=restTemplate.postForObject(cUrl, submission, Submission.class);
                break;
            case "py":
                executedSubmission=restTemplate.postForObject(pyUrl, submission, Submission.class);
                break;
            case "java":
                executedSubmission=restTemplate.postForObject(javaUrl, submission, Submission.class);
                break;
        }
        return new ResponseEntity<>(executedSubmission, HttpStatus.CREATED);
    }

}
