package com.fullstackwebapp.backend.repository;

import com.fullstackwebapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
