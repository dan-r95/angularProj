# AdressBook

 <img src="web/src/assets/localhost_4200_adressDetail_26.png" alt="Interface" style="width: 600px;"/>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<!-- ## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. -->

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

<!-- ## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->


## Architecture

Jersey wrapper installation via maven:

`` mvn archetype:generate-DarchetypeGroupId=org.glassfish.jersey.archetypes \
    -DarchetypeArtifactId=jersey-quickstart-grizzly2 -DarchetypeVersion=2.26``

Communication in dev mode is configured via a proxy in
```
adressBook
│   web
|   ├── web\proxy.conf.json
|   ├── web\package.json
```
and package.json is modified. Use ```npm start``` to start the node server


## Dependecies
Angular Version 4.4, hence only typescript 2.3.4 is supported. See all package versions in:
```
adressBook
│   README.md
│   package.json  
```
The project uses npm as the packet manager. Run `npm install` in the current working directory to install all required dependecies.
