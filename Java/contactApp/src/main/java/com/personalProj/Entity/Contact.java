package com.personalProj.Entity;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)

@Entity
@Table(name = "CONTACTS")
public class Contact {
	@Id
	@UuidGenerator
	@Column(name="ID",unique=true, updatable=false)
	private String id;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="EMAIL")
	private String email;
	
	@Column(name="TITLE")
	private String title;
	
	@Column(name="PHONE")
	private String phone;
	
	@Column(name="ADDRESS")
	private String addreess;
	
	@Column(name="STATUS")
	private String status;
	
	@Column(name="PHOTO_URL")
	private String photoUrl;

}
