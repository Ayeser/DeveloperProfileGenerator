const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function developerProfile(username, color) {
    this.username = username;
    this.color= color;
}

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
        },
    ])
    .then(function(response) {
        axios
            .get("https://api.github.com/users/" + response.username)
            .then(function(res) {
                console.log(res.data.login);
                console.log(res.data.avatar_url);
                console.log(res.data.bio);
                console.log(res.data.location);
                console.log(res.data.public_repos);
                console.log(res.data.followers);
                console.log(res.data.following);
                console.log(res.public_gists);
                console.log(res.data.public_repos);
                console.log(res.data.blog);


                // const newProfile = new developerProfile(response.username, response.colorChoice);
                // console.log(newProfile);
            });
        });

 