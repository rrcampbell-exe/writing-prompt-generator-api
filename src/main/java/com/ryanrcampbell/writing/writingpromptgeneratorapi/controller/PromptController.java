package com.ryanrcampbell.writing.writingpromptgeneratorapi.controller;

import com.ryanrcampbell.writing.writingpromptgeneratorapi.service.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
public class PromptController {
    private final PromptService promptService;

    @Autowired
    public PromptController(PromptService promptService) {
        this.promptService = promptService;
    }

    @GetMapping("/prompts")
    public CompletableFuture<String> prompt() {
        // Trigger both async calls in parallel
        CompletableFuture<String> titleFuture = promptService.fetchPromptTitle();
        CompletableFuture<String> descriptionFuture = promptService.fetchPromptDescription();

        // Combine results when both futures are complete
        return titleFuture.thenCombine(descriptionFuture, (title, description) -> {
            return String.format("Title: %s\nDescription: %s", title, description);
        });
    }
}
