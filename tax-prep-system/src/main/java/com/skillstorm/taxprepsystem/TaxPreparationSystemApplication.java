package com.skillstorm.taxprepsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaxPreparationSystemApplication {
	static boolean devMode = true;


	public static void main(String[] args) {

		SpringApplication app = new SpringApplication(TaxPreparationSystemApplication.class);

		if(devMode){
			app.setAdditionalProfiles("dev");
		}

		app.run();
	}

}
