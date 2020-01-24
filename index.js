const fs = require("fs");
const inquirer = require("inquirer");

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
        const filename = response.username.toLowerCase().split(' ').join('') + ".pdf";
        console.log(response.username);
        console.log(response.colorChoice);
        fs.writeFile(filename, JSON.stringify(response), err => {
            if(err) {
                console.log(err);
              }
            
              console.log("Success!");
            
            })
        });