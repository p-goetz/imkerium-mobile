# Imkerium Hybrid Mobile App

Ionic hybrid mobile app for a beekeeper to manage their hives and hive logbooks. 

## Technical Setup 

- Ionic as hybrid mobile app framework
- AngularJS as Javascript framework inside Ionic
	- ui-router to provide in-app routing
	- resource to access RESTful web service backend

## Folder Structure

- www/
	- index.html: start point
	- css/: CSS styles
	- img/: app images
	- js/
		- app.js: configure routing and views
		- controllers.js: implement controller logic
		- services.js: implement access to RESTful services
	- templates/: views used by AngularJS
- bower.json: web dependencies configuration
- package.json: node module setup and dependencies

## Run 

### Browser

	ionic serve --lab 

### Emulator
 
	ionic emulate [ios|android]
