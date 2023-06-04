package com.phrase.assignments.project;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.Arrays.stream;

@Service
@RequiredArgsConstructor
public class ProjectBootstrapService implements InitializingBean {

    private final ProjectRepository projectRepository;
    private static final Random RND = new Random();

    @Override
    public void afterPropertiesSet() {
        prepareProjects();
    }

    private void prepareProjects() {
        String[] langs = {"cs", "en", "de", "fi", "zh", "ru", "hu", "ja", "ko", "la"};
        IntStream.range(0, 10).mapToObj( i -> {
            Project p = new Project();
            p.setName(RandomStringUtils.random(10, true, true));
            p.setDateCreated(Instant.EPOCH);
            p.setDateUpdated(Instant.now());
            if (i % 2 == 0) {
                p.setDateDue(Instant.EPOCH);
            } else {
                p.setDateDue(Instant.now().plus(Duration.ofDays(10)));
            }
            int rand = RND.nextInt(10);
            p.setSourceLanguage(langs[rand]);
            p.setTargetLanguages(stream(langs, 0, (rand / 2)).collect(Collectors.toSet()));
            p.setStatus(ProjectStatus.DELIVERED);

            return p;
        }).forEach(projectRepository::save);
    }

}
