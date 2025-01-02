package com.ryanrcampbell.writing.writingpromptgeneratorapi.service;

import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class PromptService {
    public String fetchPrompt(String genre) {
        String apiKey = System.getenv("OPEN_AI_API_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalStateException("API_KEY environment variable is not set");
        }
        String urlString = "https://api.openai.com/v1/chat/completions";
        String basePrompt = "writing prompt that introduces some context and features a character who must perform some task before a deadline or face consequences. the prompt should be a single sentence of no more than 50 words and follow a structure similar to 'in a world where (blank), (character) must (act) before (deadline) or (consequence)'";
        String prompt = genre != null && !genre.isEmpty() ? "generate a " + genre + " " + basePrompt : "generate a " + basePrompt;
        
        String jsonInputString = String.format("{ \"model\": \"gpt-4o-mini\", \"store\": true, \"messages\": [{\"role\": \"user\", \"content\": \"%s\"}] }", prompt);

        try {
            URI url = new URI(urlString);
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(url)
                    .header("Content-Type", "application/json; utf-8")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonInputString))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
