package com.example.codeboltv1.services;

import com.example.codeboltv1.models.Submission;
import com.example.codeboltv1.repositories.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.Optional;

@Component
@Transactional
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;
    @Autowired
    private CppExecutorService cppExecutorService;
    @Autowired
    private CExecutorService cExecutorService;


    public Submission createSubmission(String sourceCode, String stdin, String language)
    {
        Submission newSubmission=new Submission(sourceCode, stdin, language);
        submissionRepository.save(newSubmission);
        return newSubmission;
    }

    public Submission executeSubmission(Submission submission)
    {
        return cppExecutorService.execute(submission);
    }
}
