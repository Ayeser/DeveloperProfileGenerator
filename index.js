const fs = require("fs");
const inquirer = require("inquirer");
const https = require('https');

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

        // https.get('https://api.github.com/users/' + response.username + "/repos", (resp) => {
        //     let data = '';
        //     resp.on('data', (chunk) => {
        //         data += chunk;
        //     });
        //     resp.on('end', () => {
        //         console.log(JSON.parse(data));
        //     });
        // }).on('error', (err) => {
        //     console.log("Error: " + err.message);
        // });

        // fs.writeFile(filename, JSON.stringify(response), err => {
        //     if(err) {
        //         console.log(err);
        //       }
            
        //       console.log("Success!");
            
        //     })
        });