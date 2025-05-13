package Ecom.Controller;



import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatBotController {

    @PostMapping
    public String ask(@RequestBody Map<String, String> request) {
        // Récupérer le message de l'utilisateur
        String userMessage = request.get("message");

        // Vous pouvez appeler un service d'IA ici (par exemple OpenAI) pour obtenir une réponse
        String botResponse = "Réponse par défaut du bot pour : " + userMessage;

        // Retourner la réponse générée
        return botResponse;
    }
}
