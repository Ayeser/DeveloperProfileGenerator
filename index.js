const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your Github Username",
            name: "username"
        },
        {
            type: "rawlist",
            message: "What color scheme would you like for your generated profile?",
            choices: [ "Red", "Blue", "Green"],
            name: "colorChoice"

        }
    ])
    .then(function(response) {
        console.log(response.username);
        console.log(response.colorChoice);
        });

