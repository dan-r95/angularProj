# AdressBook

 <img src="web/src/assets/localhost_4200_adressDetail_26.png" alt="Interface" style="width: 600px;"/>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

This project represents a digital adressbook which shows presents contacts set by the user. The user can add contacts and delete or edit existing ones. A useful search interface makes it easy to find an entry the user is looking for.


# Development server

### Frontend
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Backend
Run `mvn clean compile exec:java` to debug the program.
On default the backend runs on `http://localhost:8080/`


# Build

### Frontend
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Backend
Run `mvn clean compile package` to build the project. The produced jar file should be located in the /target folder.
Execute the jar to start the backend. (`java -jar JARNAME.jar`)

<!-- ## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). -->

## Configuration / Useful
you can edit the path of the database in the databasemanager (DB_URL).
port and URL of the servlet can be configured in Servlet (BASE_URI)

Communication in dev mode is configured via a proxy in
```
adressBook
│   web
|   ├── web\proxy.conf.json
|   ├── web\package.json
```
and package.json is modified.

## Architecture
dependencies are being managed via maven in `pom.xml` under <dependencies>


angular frontend application and java servlet communicate with the help of a restful webservice.

```
adressBook
│   web
|   src
```

## Backend
All files can be found inside the src folder.

### data resource
the resource only serves as a communication interface and has no business logic

### contactmanager
the contact manager is responsible for the hashmap including all contacts and updating it when needed


### datamanager
the `data manager` manages the contacts inside a cache (hashmap) or gets updated data from the `databasemanager`
the databasemanager  connects to a mysql database which is required for this programm to run


### Contact
this class has a number of variables which model the typical properties of a adress contact
these variables are accessible by getter and setter methods.

## Angular
the Angular app consists of multiple components and a service which deals with connecting to the database and performs requests.
All files can be found in the web folder.



## Dependencies
A MySQL database is required on the specified path: `jdbc:mysql://localhost/contacts`
A sample database can be found in `db/contacts.sql`
Use xampp with phpmyadmin for example for an easy db setup.

maven is required to run the grizzly web framework and other dependencies

Run `mvn -v` to ensure that maven is correctly installed and added to the `PATH` variable.

Angular Version 4.4, hence only typescript 2.3.4 is supported. See all package versions in:
```
adressBook
│   README.md
│   package.json  
```
The project uses npm as the packet manager.
 Run `npm -v` to verify the installation.
 Run `npm install` in the current working directory to install all required dependecies.
