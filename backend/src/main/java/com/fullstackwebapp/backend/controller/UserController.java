package com.fullstackwebapp.backend.controller;

import com.fullstackwebapp.backend.exception.UserNotFoundException;
import com.fullstackwebapp.backend.model.User;
import com.fullstackwebapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")   //connect backend with frontend
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user") //for post data
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

//    @GetMapping("/users")   //get data
//    List<User> getAllUsers() {
//        return userRepository.findAll();
//    }

    @GetMapping("/users")   // Mapping the GET request to the method
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //custom exception handling
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    //Edit user details
    @PutMapping("/users/{id}")
    User updateUser(@RequestBody User newUser,@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    //Delete user
    @DeleteMapping("/users/{id}")
    String deleteUser(@PathVariable Long id) {
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }
}

