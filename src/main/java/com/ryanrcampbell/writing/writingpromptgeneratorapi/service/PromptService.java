package com.ryanrcampbell.writing.writingpromptgeneratorapi.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class PromptService {
  @Async
    public CompletableFuture<String> fetchContext() {
        // Simulate an API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "pigs can fly";
        });
    }

    @Async
    public CompletableFuture<String> fetchCharacter() {
        // Simulate another API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(800); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "a hubristic chancellor";
        });
    }

    @Async
    public CompletableFuture<String> fetchAction() {
        // Simulate another API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(800); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "eat all of the danishes in the university cafeteria";
        });
    }

    @Async
    public CompletableFuture<String> fetchDeadline() {
        // Simulate another API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(800); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "noon";
        });
    }

    @Async
    public CompletableFuture<String> fetchConsequence() {
        // Simulate another API call
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(800); // Simulate delay
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "the state will withhold all funding for scientific research";
        });
    }
}
