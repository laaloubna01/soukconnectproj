package Ecom.Controller;

import Ecom.Service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*") // Enable CORS for local development
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @GetMapping("/test")
    public String test() {
        return "Chatbot API is working!";
    }

    @PostMapping
    public String ask(@RequestBody Map<String, String> request) {
        // Get the user message from the request
        String userMessage = request.get("message");

        try {
            // Process the message using our service
            return chatBotService.processQuery(userMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return "Une erreur s'est produite: " + e.getMessage();
        }
    }
}