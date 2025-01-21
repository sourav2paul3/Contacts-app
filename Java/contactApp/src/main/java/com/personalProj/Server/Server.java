package com.personalProj.Server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(value = {"com.personalProj.*"})
@SpringBootApplication(scanBasePackages = {"com.personalProj.*"})	
public class Server {

	public static void main(String[] args) {
		SpringApplication.run(Server.class, args);
	}

}
