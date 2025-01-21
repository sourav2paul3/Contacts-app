package com.personalProj.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.personalProj.Entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact,String>{

	public Optional<Contact> findById(@Param("id") String id);
}
