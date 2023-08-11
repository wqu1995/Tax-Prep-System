package com.skillstorm.taxprepsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaxPreparationSystemApplication {
	static boolean prodMode = false;


	public static void main(String[] args) {

		SpringApplication app = new SpringApplication(TaxPreparationSystemApplication.class);

		if(prodMode){
			app.setAdditionalProfiles("prod");
		}

		app.run();
	}

}
