package Ecom.ServiceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Ecom.Enum.UserAccountStatus;
import Ecom.Enum.UserRole;
import Ecom.Exception.UserException;
import Ecom.Model.User;
import Ecom.ModelDTO.AdminDTO;
import Ecom.ModelDTO.CustomerDTO;
import Ecom.ModelDTO.UserDTO;
import Ecom.Repository.UserRepository;
import Ecom.Service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public User getUserByEmailId(String emailId) throws UserException {
		return userRepository.findByEmail(emailId).orElseThrow(() -> new UserException("User not found"));
	}

	@Override
	public User addUser(CustomerDTO customer) throws UserException {
		if (customer == null)
			throw new UserException("Customer cannot be null");

		Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
		if (findByEmail.isPresent()) {
			throw new RuntimeException("Email already registered");
		}

		User newCustomer = new User();
		newCustomer.setEmail(customer.getEmail());
		newCustomer.setPassword(customer.getPassword());
		newCustomer.setFirstName(customer.getFirstName());
		newCustomer.setLastName(customer.getLastName());
		newCustomer.setPhoneNumber(customer.getPhoneNumber());
		newCustomer.setRole(UserRole.ROLE_USER);
		newCustomer.setRegisterTime(LocalDateTime.now());
		newCustomer.setUserAccountStatus(UserAccountStatus.ACTIVE);

		return userRepository.save(newCustomer);
	}

	@Override
	public User addUserAdmin(AdminDTO customer) throws UserException {
		if (customer == null)
			throw new UserException("Admin cannot be null");

		Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
		if (findByEmail.isPresent()) {
			throw new RuntimeException("Email already registered");
		}

		User newAdmin = new User();
		newAdmin.setEmail(customer.getEmail());
		newAdmin.setPassword(customer.getPassword());
		newAdmin.setFirstName(customer.getFirstName());
		newAdmin.setLastName(customer.getLastName());
		newAdmin.setPhoneNumber(customer.getPhoneNumber());
		newAdmin.setRole(UserRole.ROLE_ADMIN);
		newAdmin.setRegisterTime(LocalDateTime.now());
		newAdmin.setUserAccountStatus(UserAccountStatus.ACTIVE);

		return userRepository.save(newAdmin);
	}

	@Override
	public User changePassword(Integer userId, UserDTO customer) throws UserException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		if (customer.getPassword().length() >= 5 && customer.getPassword().length() <= 10) {
			user.updatePassword(customer.getPassword(), passwordEncoder);
			return userRepository.save(user);
		} else {
			throw new UserException("Provide a valid password");
		}
	}

	@Override
	public User updateUserDetails(Integer userId, UserDTO userDTO) throws UserException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		if (userDTO.getFirstName() != null && !userDTO.getFirstName().isEmpty()) {
			user.setFirstName(userDTO.getFirstName());
		}
		if (userDTO.getLastName() != null && !userDTO.getLastName().isEmpty()) {
			user.setLastName(userDTO.getLastName());
		}
		if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty()) {
			Optional<User> existingUserWithEmail = userRepository.findByEmail(userDTO.getEmail());
			if (existingUserWithEmail.isPresent() && !existingUserWithEmail.get().getId().equals(userId)) {
				throw new UserException("This email is already used by another account");
			}
			user.setEmail(userDTO.getEmail());
		}
		if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
			if (userDTO.getPassword().length() < 5 || userDTO.getPassword().length() > 10) {
				throw new UserException("Password must be between 5 and 10 characters");
			}
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		}

		return userRepository.save(user);
	}

	@Override
	public String deactivateUser(Integer userId) throws UserException {
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		existingUser.setUserAccountStatus(UserAccountStatus.DEACTIVETE);
		userRepository.save(existingUser);

		return "Account deactivated successfully";
	}

	@Override
	public User getUserDetails(Integer userId) throws UserException {
		return userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));
	}

	@Override
	public List<User> getAllUserDetails() throws UserException {
		List<User> users = userRepository.findAll();
		if (users.isEmpty()) {
			throw new UserException("User list is empty");
		}
		return users;
	}
}
