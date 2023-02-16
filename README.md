# Estart-Demo

This project was built with React, Typescript following web standards and best practices
[Estart-Demo](https://legendary-yeot-ce6176.netlify.app)

## Features

* User can apply multiple filters to narrow the logs
* Filters are presented via the Query-Params
* Components are fully tested

## Getting Started

#### 1. Install dependencies

`npm install`

#### 2. Run the development server

`npm start`

**Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

### To Run unit-tests

### `npm test`

Launches the test runner in the interactive watch mode.

## Continuous Integration and Deployment

###### This Project uses GitHub Actions to automatically run tests after each (push, pull-request)

## TODO

* Add unit test for select box change value
* Add checks for onSearchLogs and onClear to assure all the fields behaved as expected in the LoggerHeader component
* Add unit test for pagination in the Logger
* Add unit test to test the onSearchLogger applied filter in the Logger
* Add unit test to test the onClearLogger to make sure all filters are removed and the logs array is the original in the Logger
