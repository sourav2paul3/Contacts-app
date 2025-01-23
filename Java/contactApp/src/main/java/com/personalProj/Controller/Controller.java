package com.personalProj.Controller;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.personalProj.Constants.Constants;
import com.personalProj.Entity.Contact;
import com.personalProj.Service.ContactService;

@RestController
@RequestMapping("/contacts")
public class Controller {

	@Autowired
	private ContactService contactService;

	@PostMapping(value = "/create", produces = "application/json")
	public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
		Contact createdContact = contactService.createContact(contact);
		URI location = URI.create("/contacts/userId");
		return ResponseEntity.created(location).body(createdContact);
	}
	
	@PostMapping(value = "/update", produces = "application/json")
	public ResponseEntity<Contact> updateContact(@RequestBody Contact contact) {
		Contact createdContact = contactService.udateContact(contact);
		URI location = URI.create("/contacts/userId");
		return ResponseEntity.created(location).body(createdContact);
	}

	@GetMapping(value = "/getContacts", produces = "application/json")
	public ResponseEntity<Page<Contact>> getContacts(@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		return ResponseEntity.ok().body(contactService.getAllContact(page, size));
	}
	
	@GetMapping(value = "/getContact", produces = "application/json")
	public ResponseEntity<Contact> getContact(@RequestParam("id") String id) {
		return ResponseEntity.ok().body(contactService.getContact(id));
	}
	
	@PutMapping(value = "/updatePhoto", produces = "application/json")
	public ResponseEntity<Map<String,String>> updatePhoto(@RequestParam("id") String id,@RequestParam("file") MultipartFile file) {
		return ResponseEntity.ok().body(contactService.uploadPhoto(id, file));
	}

	@GetMapping(value = "/image/{fileName}", produces = "image/png")
	public byte[] getPhoto(@PathVariable("fileName") String fileName) throws IOException {
		return Files.readAllBytes(Paths.get(Constants.PHOTO_DIRECTORY+"\\"+fileName));
	}
	
	@GetMapping(value = "/removePhoto", produces = "application/json")
	public ResponseEntity<Contact> removePhoto(@RequestParam("id") String id)
			{
		return ResponseEntity.ok().body(contactService.removePhoto(id));
	}

}
