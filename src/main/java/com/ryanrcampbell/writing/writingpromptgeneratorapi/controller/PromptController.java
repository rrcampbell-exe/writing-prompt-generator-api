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
        CompletableFuture<String> contextFuture = promptService.fetchContext();
        CompletableFuture<String> characterFuture = promptService.fetchCharacter();
        CompletableFuture<String> actionFuture = promptService.fetchAction();
        CompletableFuture<String> deadlineFuture = promptService.fetchDeadline();
        CompletableFuture<String> consequenceFuture = promptService.fetchConsequence();

        // Combine results when all futures are complete
        return CompletableFuture.allOf(contextFuture, characterFuture, actionFuture, deadlineFuture, consequenceFuture)
            .thenApply(v -> {
                try {
                    String context = contextFuture.get();
                    String character = characterFuture.get();
                    String action = actionFuture.get();
                    String deadline = deadlineFuture.get();
                    String consequence = consequenceFuture.get();
                    return String.format("In a world where %s, %s must %s before %s or %s.", context, character, action, deadline, consequence);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
    }
}
