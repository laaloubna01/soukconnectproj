package Ecom.Service;

import Ecom.Model.Product;
import Ecom.Model.Review;

import Ecom.Repository.ProductRepository;
import Ecom.Repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ChatBotService {

    private static final Logger logger = LoggerFactory.getLogger(ChatBotService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Value("${openrouter.api.key}")
    private String openRouterApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

    // Simple method to provide product information without AI
    public String getProductInfo(String productName) {
        try {
            List<Product> matchingProducts = productRepository.findByNameContainingIgnoreCase(productName);

            if (matchingProducts.isEmpty()) {
                return "Désolé, je ne trouve pas de produit portant ce nom. Pouvez-vous reformuler?";
            }

            StringBuilder response = new StringBuilder();
            for (Product product : matchingProducts) {
                response.append("Produit: ").append(product.getName()).append("\n");
                response.append("Description: ").append(product.getDescription()).append("\n");
                response.append("Prix: ").append(product.getPrice()).append(" MAD\n");
                response.append("Catégorie: ").append(product.getCategory()).append("\n");
                response.append("Disponible: ").append(product.isAvailable() ? "Oui" : "Non").append("\n\n");
            }

            return response.toString();
        } catch (Exception e) {
            logger.error("Error retrieving product information", e);
            return "Je ne peux pas accéder aux informations produit pour le moment.";
        }
    }

    public String processQuery(String userMessage) {
        try {
            logger.info("Processing query: {}", userMessage);

            // First, try to handle it with direct product lookup if it's a simple query
            if (userMessage.toLowerCase().contains("combien coûte") ||
                    userMessage.toLowerCase().contains("prix") ||
                    userMessage.toLowerCase().contains("qu'est-ce que") ||
                    userMessage.toLowerCase().contains("c'est quoi")) {

                // Extract potential product names from the query
                String query = userMessage.toLowerCase();
                List<Product> allProducts = productRepository.findAll();

                for (Product product : allProducts) {
                    if (query.contains(product.getName().toLowerCase())) {
                        return getProductInfo(product.getName());
                    }
                }
            }

            // If no direct match or it's a more complex question, use AI
            return processWithAI(userMessage);

        } catch (Exception e) {
            logger.error("Error in processing query", e);
            return "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard. (Erreur: " + e.getMessage() + ")";
        }
    }

    private String processWithAI(String userMessage) {
        try {
            // Gather product information from database
            List<Product> products = productRepository.findAll();

            if (products.isEmpty()) {
                logger.warn("No products found in database");
                return "Je n'ai pas d'information sur nos produits actuellement. Veuillez réessayer plus tard.";
            }

            logger.info("Found {} products in database", products.size());

            // Create product context for the AI
            StringBuilder productContext = new StringBuilder();

            // Add detailed product information including reviews
            for (Product product : products) {
                productContext.append("ID: ").append(product.getProductId()).append("\n");
                productContext.append("Name: ").append(product.getName()).append("\n");
                productContext.append("Description: ").append(product.getDescription()).append("\n");
                productContext.append("Price: ").append(product.getPrice()).append(" MAD\n");
                productContext.append("Category: ").append(product.getCategory()).append("\n");
                productContext.append("Available: ").append(product.isAvailable() ? "Yes" : "No").append("\n");

                List<Review> reviews = reviewRepository.findByProduct(product);
                double avgRating = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);

                productContext.append("Average Rating: ").append(String.format("%.1f", avgRating)).append("/5\n");
                productContext.append("Review Count: ").append(reviews.size()).append("\n");

                if (!reviews.isEmpty()) {
                    productContext.append("Sample Reviews:\n");
                    // Add up to 3 sample reviews
                    for (int i = 0; i < Math.min(3, reviews.size()); i++) {
                        Review review = reviews.get(i);
                        productContext.append("  - ").append(review.getComment())
                                .append(" (").append(review.getRating()).append("/5)\n");
                    }
                }
                productContext.append("\n");
            }

            // Log API key (first 5 chars only for security)
            String keyPrefix = openRouterApiKey.substring(0, Math.min(5, openRouterApiKey.length()));
            logger.info("Using OpenRouter API key starting with: {}...", keyPrefix);

            logger.info("OpenRouter API Key: {}", openRouterApiKey);

            // Prepare AI request with context and improved prompt
            String systemPrompt = """
        You are SoukBot, the helpful virtual assistant for SoukConnect, a Moroccan e-commerce platform. Your role is to provide excellent customer service by answering questions about our products and making personalized recommendations.

        CORE FUNCTIONALITY:
        1. ANSWER PRODUCT QUESTIONS - Provide accurate information about prices, features, availability, etc.
        2. MAKE RECOMMENDATIONS - When users ask what products we have or ask for recommendations, suggest 2-3 top-rated products.
        3. RESPOND IN THE USER'S LANGUAGE - Always detect and respond in the same language the user is using (Arabic, French, English, etc.)

        PRODUCT CATALOG INFORMATION:
        """ + productContext.toString() + """

        RECOMMENDATION GUIDELINES:
        - When a user asks "what products do you have" or similar, DO NOT respond with a generic message asking them to specify a category.
        - Instead, immediately recommend 2-3 of our highest-rated products across different categories.
        - Always prioritize products with higher average ratings and more reviews.
        - When recommending products, include their name, brief description, price, and average rating.
        - If the user specifies a category, recommend the best products from that category.

        LANGUAGE HANDLING:
        - ALWAYS detect and respond in the same language the user used (Arabic, French, English, Darija, etc.)
        - If the user writes in Arabic, respond in Arabic
        - If the user writes in French, respond in French
        - If the user writes in English, respond in English
        
        STYLE GUIDELINES:
        - Be friendly, warm and conversational
        - Keep responses concise (2-3 paragraphs maximum)
        - Use natural language that feels like talking to a helpful store assistant
        - Add occasional local Moroccan expressions when appropriate

        Remember that your primary goal is to be HELPFUL and make it EASY for customers to find products they'll love.
        """;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openRouterApiKey);
            headers.set("HTTP-Referer", "http://localhost:8080");
            headers.set("X-Title", "SoukConnect");

            Map<String, Object> messageSystem = new HashMap<>();
            messageSystem.put("role", "system");
            messageSystem.put("content", systemPrompt);

            Map<String, Object> messageUser = new HashMap<>();
            messageUser.put("role", "user");
            messageUser.put("content", userMessage);

            List<Map<String, Object>> messages = new ArrayList<>();
            messages.add(messageSystem);
            messages.add(messageUser);

            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put("model", "nvidia/llama/llama-3.3-nemotron-super-49b-v1:free");

            //requestBody.put("model", "meta-llama/llama-3.2-3b-instruct:free");
            requestBody.put("messages", messages);

            logger.info("Sending request to OpenRouter API");
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            Map<String, Object> response = restTemplate.postForObject(OPENROUTER_URL, entity, Map.class);
            logger.info("Received response from OpenRouter API");

            // Extract AI response
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> firstChoice = choices.get(0);
            Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
            String content = (String) message.get("content");

            return content;
        } catch (Exception e) {
            logger.error("Error calling OpenRouter API", e);
            return "Désolé, je ne peux pas accéder au service d'intelligence artificielle pour le moment. Veuillez réessayer plus tard.";
        }
    }
}