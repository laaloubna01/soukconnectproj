package Ecom.Controller;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import Ecom.Model.User;
import Ecom.ModelDTO.CustomerDTO;
import Ecom.ModelDTO.UserDTO;
import Ecom.Service.UserService;
import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ecom/customers")
public class CustomerController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    // ✅ Ajouter un client
    @PostMapping
    public ResponseEntity<User> addUser(@Valid @RequestBody CustomerDTO customerDTO) {
        customerDTO.setPassword(passwordEncoder.encode(customerDTO.getPassword())); // Hachage du mot de passe
        User addedUser = userService.addUser(customerDTO); // Ajout de l'utilisateur
        return ResponseEntity.ok(addedUser); // Retour de l'utilisateur ajouté
    }

    // ✅ Modifier mot de passe d’un client
    @PutMapping("/update-password/{customerId}")
    public ResponseEntity<User> updateUserPassword(
            @PathVariable("customerId") Integer customerId,
            @Valid @RequestBody UserDTO userDTO) {
        User updatedUser = userService.changePassword(customerId, userDTO); // Mise à jour du mot de passe
        return ResponseEntity.ok(updatedUser); // Retour de l'utilisateur mis à jour
    }

    // ✅ Désactiver un client
    @DeleteMapping("/deactivate/{customerId}")
    public ResponseEntity<String> deactivateUser(@PathVariable("customerId") Integer customerId) {
        String message = userService.deactivateUser(customerId); // Désactivation de l'utilisateur
        return ResponseEntity.ok(message); // Retour de la réponse
    }

    // ✅ Récupérer un seul client
    @GetMapping("/{customerId}")
    public ResponseEntity<User> getUserDetails(@PathVariable("customerId") Integer customerId) {
        User user = userService.getUserDetails(customerId); // Récupération de l'utilisateur par ID
        return ResponseEntity.ok(user); // Retour de l'utilisateur trouvé
    }

    // ✅ Lister tous les clients
    @GetMapping("/get-all-customer")
    public ResponseEntity<List<User>> getAllUserDetails() {
        List<User> users = userService.getAllUserDetails(); // Liste de tous les utilisateurs
        return ResponseEntity.ok(users); // Retour des utilisateurs
    }
}
