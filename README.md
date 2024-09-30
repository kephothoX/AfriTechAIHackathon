# AfiaPlus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development  server

Run `cd ./AfiaPlus_UX && npm run start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.


Configure API Endpoints in  `./AfiaPlus_UX/src/environments/environment.dev.ts && ./AfiaPlus_UX/src/environments/environment.prod.ts && ./AfiaPlus_UX/src/environments/environment.ts`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `cd ./AfiaPlus_UX && ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `cd ./AfiaPlus_UX &&ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `cd ./AfiaPlus_UX && ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `cd ./AfiaPlus_UX && ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




## Start Flask Server

Initalize convex by running `cd ./AfiaPlus_Python && pip install -r requirements.txt ` replace `./AfiaPlus_API/.env` with values from your values.
Follow [Flask development docs](https://flask.palletsprojects.com/) for configuration and further help.

Create `.env` file in `./AfiaPlus_Python`.
Update `.env` variables as follows:

TIDB_DATABASE_URL=

GEMINI_API_KEY=

TIDB_HOST=

TIDB_PORT=4000

TIDB_USER=

TIDB_PASSWORD=

TIDB_DB_NAME=

CA_PATH =


For more on [TiDb Cloud manual documentation](https://docs.pingcap.com/tidbcloud/) Vector search.


## Authorization && Authentication

Update `./AfiaPlus_UX/src/environments` values with your own as they are subject to change.
