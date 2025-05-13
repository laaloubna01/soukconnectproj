//package Ecom.Controller;
//
//
//
//import Ecom.Model.ChatRequest;
//import Ecom.Model.ChatResponse;
//import Ecom.Service.ChatService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import reactor.core.publisher.Mono;
//
//@RestController
//@RequestMapping("/api/chat")
//@CrossOrigin(origins = "*")
//public class ChatController {
//
//    @Autowired
//    private ChatService chatService;
//
//    @PostMapping
//    public Mono<ChatResponse> chat(@RequestBody ChatRequest chatRequest) {
//        return chatService.chat(chatRequest);
//    }
//}
