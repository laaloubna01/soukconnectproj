package Ecom.ModelDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {

    @NotBlank(message = "Prénom ne peut pas être vide.")
    private String firstName;

    @NotBlank(message = "Nom ne peut pas être vide.")
    private String lastName;

    @NotBlank(message = "Email ne peut pas être vide.")
    private String email;

    @Size(min = 5, max = 10)
    private String password;

}
