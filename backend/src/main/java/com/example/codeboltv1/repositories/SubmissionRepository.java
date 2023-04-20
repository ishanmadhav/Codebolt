package com.example.codeboltv1.repositories;

import com.example.codeboltv1.models.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    public Optional<Submission> findById(int Id);
    public List<Submission> findAll();
    public List<Submission> findByLanguage(String language);


}
