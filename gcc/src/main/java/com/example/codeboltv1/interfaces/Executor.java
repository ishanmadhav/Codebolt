package com.example.codeboltv1.interfaces;

import com.example.codeboltv1.models.Submission;

public interface Executor {

    public Submission execute(Submission submission);
    public Submission delete(Submission submission);

}
