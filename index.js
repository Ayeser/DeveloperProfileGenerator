const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };

async function makeProfile() {
    try {
        const generateHTML = await readFileAsync("generateHTML.js", "utf8");
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
                        choices: ["green", "blue", "pink", "red"],
                        name: "colorChoice"
                    },
                ])
                .then(function (response) {
                    axios
                        .get("https://api.github.com/users/" + response.username)
                        .then(function (res) {
                            function generateHTML() {
                                return `<!DOCTYPE html>
                              <html lang="en">
                                 <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                                    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                                    <title>Document</title>
                                    <style>
                                        @page {
                                          margin: 0;
                                        }
                                       *,
                                       *::after,
                                       *::before {
                                       box-sizing: border-box;
                                       }
                                       html, body {
                                       padding: 0;
                                       margin: 0;
                                       }
                                       html, body, .wrapper {
                                       height: 100%;
                                       }
                                       .wrapper {
                                       background-color: ${response.colorChoice};
                                       padding-top: 100px;
                                       }
                                       body {
                                       background-color: white;
                                       -webkit-print-color-adjust: exact !important;
                                       font-family: 'Cabin', sans-serif;
                                       }
                                       main {
                                       background-color: #E9EDEE;
                                       height: auto;
                                       padding-top: 30px;
                                       }
                                       h1, h2, h3, h4, h5, h6 {
                                       font-family: 'BioRhyme', serif;
                                       margin: 0;
                                       }
                                       h1 {
                                       font-size: 3em;
                                       }
                                       h2 {
                                       font-size: 2.5em;
                                       }
                                       h3 {
                                       font-size: 2em;
                                       }
                                       h4 {
                                       font-size: 1.5em;
                                       }
                                       h5 {
                                       font-size: 1.3em;
                                       }
                                       h6 {
                                       font-size: 1.2em;
                                       }
                                       .photo-header {
                                       position: relative;
                                       margin: 0 auto;
                                       margin-bottom: -50px;
                                       display: flex;
                                       justify-content: center;
                                       flex-wrap: wrap;
                                       background-color: ${response.colorChoice};
                                       color: ${response.colorChoice};
                                       padding: 10px;
                                       width: 95%;
                                       border-radius: 6px;
                                       }
                                       .photo-header img {
                                       width: 250px;
                                       height: 250px;
                                       border-radius: 50%;
                                       object-fit: cover;
                                       margin-top: -75px;
                                       border: 6px solid ${response.colorChoice};
                                       box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                                       }
                                       .photo-header h1, .photo-header h2 {
                                       width: 100%;
                                       text-align: center;
                                       }
                                       .photo-header h1 {
                                       margin-top: 10px;
                                       }
                                       .links-nav {
                                       width: 100%;
                                       text-align: center;
                                       padding: 20px 0;
                                       font-size: 1.1em;
                                       }
                                       .nav-link {
                                       display: inline-block;
                                       margin: 5px 10px;
                                       }
                                       .workExp-date {
                                       font-style: italic;
                                       font-size: .7em;
                                       text-align: right;
                                       margin-top: 10px;
                                       }
                                       .container {
                                       padding: 50px;
                                       padding-left: 100px;
                                       padding-right: 100px;
                                       }
                              
                                       .row {
                                         display: flex;
                                         flex-wrap: wrap;
                                         justify-content: space-between;
                                         margin-top: 20px;
                                         margin-bottom: 20px;
                                       }
                              
                                       .card {
                                         padding: 20px;
                                         border-radius: 6px;
                                         background-color: ${response.colorChoice};
                                         color: ${response.colorChoice};
                                         margin: 20px;
                                       }
                                       
                                       .col {
                                       flex: 1;
                                       text-align: center;
                                       }
                              
                                       a, a:hover {
                                       text-decoration: none;
                                       color: inherit;
                                       font-weight: bold;
                                       }
                              
                                       @media print { 
                                        body { 
                                          zoom: .75; 
                                        } 
                                       }
                                    </style>`
                                      }
                            var generatedProfile = generateHTML();
                            generatedProfile = generatedProfile + "<header><img class='photo-header'> src='" + res.data.avatar_url + "' alt='Profile Picture'><p class='photo-header h1'>Hi!</p><p class='photo-header h2'>My name is " + res.data.login + "!</p><p class='nav-link'>Located in " + res.data.location + "</p></header><body><div class='container'><div class='row'><h3>" + res.data.bio + "</h3></div><div class='row'><div class='col'><div class='card'>Public Repositories: " + res.data.public_repos + "</div></div><div class='col'><div class='card'>Followers: " + res.data.followers + "</div></div></div><div class='row'><div class='col'><div class='card'>Github Stars: " + res.public_gists + "</div></div><div class='col'><div class='card'>Following: " + res.data.following + "  </div></div></div></body></html>";

                            fs.writeFile("./generatedProfile/profile.html", generatedProfile, function (error, data) {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log("Success!");
                            })
                        });
                });
    } catch (err) {
        console.log(err);
    }
}

makeProfile();