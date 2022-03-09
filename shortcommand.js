const shell = require('shelljs');

const addParams = process.argv;
let file = '';
if (addParams[2] === 'run' && addParams[3]) {
    file += addParams[3];
}

shell.exec(`npx cypress run --env allure=true,allureResultsPath=allure-results --spec ${file} --headed --browser=firefox`)