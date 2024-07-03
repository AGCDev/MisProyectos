package com.reservapistapaddel.pistapaddelreserva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
public class PistapaddelreservaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PistapaddelreservaApplication.class, args);
	}



}
