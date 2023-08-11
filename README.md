# Tax Preparation Systems
## A web based tax preparation tool Written in Java and React!

One Calculation at a Time: Your Path to Accurate Tax Insights!

Authors:
- Eric Stein
- Wenjun Qu

# To Start

## Backend
- Open the tax-prep-system folder as a Maven project
- Fill out the necessary database information in the application.yml file
    - It is highly recommend to use the application-prod.yml for production environment
- Set the desired value for {prodMode} in TaxPreparationSystemApplication.java
- Setup security related constants and configuration in security package 
- Compile the project
- Run the project
- For production:
  - build the maven project and run the .jar file with `java -jar`
## FrontEnd
- open client/tax-prep-system
- run `npm install` to install all required packages
- run `npm run dev` to run the app in local environment
- For production:
  - run `npm run build` to build the app and host the static content using your desired tools.

## Features
- JWT based Authentication
- Persist user session
- Intuitive website that allow user to easily navigate and enter data
- Responsive UI and real time render
- Data validation