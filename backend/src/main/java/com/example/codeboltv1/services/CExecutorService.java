package com.example.codeboltv1.services;

import com.example.codeboltv1.models.Submission;
import com.example.codeboltv1.repositories.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Optional;

@Component
public class CExecutorService {
    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission execute(Submission submission)
    {
        String fileName="tmp/"+submission.id+".cpp";
        String fileContent=submission.sourceCode;

        File file=new File(fileName);
        try{
            if (!file.exists())
            {
                file.createNewFile();
            }

            FileWriter writer=new FileWriter(file);
            writer.write(fileContent);
            writer.close();
            System.out.println("File written successfully");
            System.out.println("Does this even start?");
            String [] compileCommand={"g++", fileName, "-o", "tmp/"+submission.id+".out"};
            Process compileProcess=Runtime.getRuntime().exec(compileCommand);
            int compileResult=compileProcess.waitFor();

            if (compileResult==0)
            {
                System.out.println("Compilation successfull");
                String[] runCommand = {"tmp/"+submission.id+".out"};
                Process runProcess=Runtime.getRuntime().exec(runCommand);
                BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
                String line;
                StringBuilder output= new StringBuilder();
                System.out.println("Output of C program:");
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                    output.append(line);
                    output.append(System.lineSeparator());
                }

                int runResult=runProcess.waitFor();

                if (runResult==0)
                {
                    System.out.println("Execution Was successfulll");
                    String outputString=output.toString();
                    Optional<Submission> optionalSubmission=submissionRepository.findById(submission.id);
                    file.delete();
                    File fileToBeDeleted=new File("tmp/"+submission.id+".out");
                    fileToBeDeleted.delete();
                    if (optionalSubmission.isPresent())
                    {
                        Submission tempSubmission=optionalSubmission.get();
                        tempSubmission.setStdout(outputString);
                        submissionRepository.save(tempSubmission);
                        return tempSubmission;
                    }
                    else
                    {
                        return submission;
                    }

                }
                else
                {
                    System.out.println("Execution wasn't successfull");
                }

            }

        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        catch(InterruptedException e)
        {
            e.printStackTrace();
        }
        return submission;
    }

    public Submission delete(Submission submission)
    {
        return submission;
    }
}
