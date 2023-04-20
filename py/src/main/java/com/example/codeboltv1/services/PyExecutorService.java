package com.example.codeboltv1.services;

import com.example.codeboltv1.interfaces.Executor;
import com.example.codeboltv1.models.Submission;
import com.example.codeboltv1.repositories.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Optional;

@Component
public class PyExecutorService implements Executor {

    @Autowired
    private SubmissionRepository submissionRepository;
    public Submission execute(Submission submission)
    {
        String fileName="tmp/"+submission.id+".py";
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
            String[] runCommand = {"python3", fileName};
            Process runProcess=Runtime.getRuntime().exec(runCommand);
            BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            String line;
            StringBuilder output= new StringBuilder();
            System.out.println("Output of Python program:");
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
                if (optionalSubmission.isPresent())
                {
                    Submission tempSubmission=optionalSubmission.get();
                    tempSubmission.setStdout(outputString);
                    submissionRepository.save(tempSubmission);

                    return tempSubmission;
                }
                else
                {
                    file.delete();
                    return submission;
                }

            }
            else
            {
                System.out.println("Execution wasn't successfull");
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
