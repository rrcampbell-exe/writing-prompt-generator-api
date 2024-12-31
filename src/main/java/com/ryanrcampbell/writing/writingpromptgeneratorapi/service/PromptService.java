package com.ryanrcampbell.writing.writingpromptgeneratorapi.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class PromptService {
  @Async
    public CompletableFuture<String> fetchPromptTitle() {
        // Simulate an API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "The Mysterious Forest";
        });
    }

    @Async
    public CompletableFuture<String> fetchPromptDescription() {
        // Simulate another API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(800); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "You find yourself in an enchanted forest with no memory of how you got there.";
        });
    }
}
