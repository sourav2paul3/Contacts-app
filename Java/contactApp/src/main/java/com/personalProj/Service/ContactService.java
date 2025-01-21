package com.personalProj.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.personalProj.Constants.Constants;
import com.personalProj.Entity.Contact;
import com.personalProj.Repository.ContactRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
public class ContactService {
	@Autowired
	private ContactRepository contactRepository;

	public Page<Contact> getAllContact(int page, int size) {

		return contactRepository.findAll(PageRequest.of(page, size, Sort.by("name")));

	}

	public Contact getContact(String id) {
		return contactRepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found"));
	}

	public Contact createContact(Contact contact) {
		return contactRepository.save(contact);
	}

	public void deleteContact(Contact contact) {
		contactRepository.delete(contact);
	}

	public String uploadPhoto(String id, MultipartFile file) {
		Contact contact = getContact(id);
		String photoUrl = photoFunction.apply(id, file);
		contact.setPhotoUrl(photoUrl);
		contactRepository.save(contact);
		return photoUrl;
	}

	private final Function<String, String> fileExtension = fileName -> Optional.of(fileName)
			.filter(name -> name.contains(".")).map(name -> "." + name.substring(fileName.lastIndexOf(".") + 1))
			.orElse(".png");

	private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
		String fileName=id + fileExtension.apply(image.getOriginalFilename());
		try {
			Path fileLocation = Paths.get(Constants.photoDirectory).toAbsolutePath().normalize();

			if (!Files.exists(fileLocation)) {
				Files.createDirectories(fileLocation);
			}
			Files.copy(image.getInputStream(),
					fileLocation.resolve(id + fileExtension.apply(image.getOriginalFilename())),StandardCopyOption.REPLACE_EXISTING);
			return ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/contacts/image/" + fileName).toUriString();
		} catch (Exception e) {
			throw new RuntimeException("Unable to save image!");
		}

	};
}
