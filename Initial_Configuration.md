# Initial configuration for Cypress
## Installation
* Open terminal in the root folder
* Give following commands
```
npm init -y
```
```
npm install cypress@5.5.0
```
```
npx cypress open
```
* In the **Cypress.json** file, paste the following snippet
```
{
    "chromeWebSecurity": false,
    "pageLoadTimeout": 70000,
    "modifyObstructiveCode": true,
    "experimentalSourceRewriting": true,
    "defaultCommandTimeout": 6000
}
```
* Create test cases under ```cypress > integration``` folder

## Run from Debug tool
* Give following command
```
npx cypress open
```
* Select the browser and test cases you want to run

## Run from command prompt
* Open terminal in the root folder
* Give following command
```
npx cypress run --spec ./cypress/integration/* --headless --browser=firefox
```
## Run the cycle for multiple iteration
* Firstly, install cypress-repeat
```
npm i cypress-repeat
```
* Give following command to run the cycle for multiple times
```
npx cypress-repeat run -n 2 --spec ./cypress/integration/* --headless --browser=firefox
```
## Allure configuration
* Open terminal in the root folder
* Give following command
```
npm i @shelex/cypress-allure-plugin allure-commandline
```
* Go to ```cypress > support > index.js``` folder and paste the following snippet
```
import '@shelex/cypress-allure-plugin'
```
* Go to ``` cypress > plugins > index.js``` folder and add following snippet
```
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
/// <reference types="@shelex/cypress-allure-plugin" />
module.exports = (on, config) => {
  allureWriter(on, config);
  return config;
}
```
* Give following commands
```
npx cypress run --env allure=true,allureResultsPath=allure-results --spec .\cypress\integration\* --headed --browser=chrome
```
```
npx allure serve allure-results
```

**That will generate the Allure report on your default browser**
