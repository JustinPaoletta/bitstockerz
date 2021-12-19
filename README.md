# Bitstockerz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Project Structure 

- Build is located in the docs/ directory
- app-server serves the index.html
- news-server serves the crypto-news api
- holdings-server serves the api for the amount of each coin owned
- Servers are running in the background on the EC2 instance with PM2 (This means you can close the terminal instance and the processes will continue running)
- nginx has multiple reverse proxies set up so that the port numbers can be removed from the url to the website and from the http requests to the api

- Public IP of EC2 instance hosting app 18.190.141.163
- The URL to access the hosted site is http://bitstockerz.com
