package com.ryanrcampbell.writing.writingpromptgeneratorapi.controller;

import com.ryanrcampbell.writing.writingpromptgeneratorapi.service.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {
    "http://ryanrcampbell.com",
    "https://ryanrcampbell.com",
    "http://localhost:5173",
    "http://localhost:8080",
    "https://writing-prompt-generator-api.fly.dev"
})
public class PromptController {
    private final PromptService promptService;

    @Autowired
    public PromptController(PromptService promptService) {
        this.promptService = promptService;
    }

    @GetMapping("/api/v1/prompts")
    public String prompt(@RequestParam(value = "genre", required = false) String genre, @RequestParam(value = "theme", required = false) String theme) {
        return promptService.fetchPrompt(genre, theme);
    }
}
