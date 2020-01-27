"use strict";
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
const conversion = require("phantom-html-to-pdf")();


const readFileAsync = util.promisify(fs.readFile);

async function makeProfile() {
    try {
        // const generateHTML = await readFileAsync("generateHTML.js", "utf8");
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

                            function generateHTML(color) {
                                return `<!DOCTYPE html>
                              <html lang="en">
                                 <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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
                                       height: 80%;
                                       }
                                       .wrapper {
                                       background-color: ${colors[response.colorChoice].wrapperBackground};
                                       padding-top: 75px;
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
                                       background-color: ${colors[response.colorChoice].headerBackground};
                                       color: ${colors[response.colorChoice].headerColor};
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
                                       border: 6px solid ${colors[response.colorChoice].photoBorderColor};
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
                                       width: 75%;
                                       text-align: right;
                                       padding: 0 30px;
                                       font-size: 1.0em;
                                       margin: 60px;
                                       font-family: 'BioRhyme', serif;
                                       }
                                       .nav-link {
                                        width: 75%;
                                        text-align: right;
                                       margin: 60px;
                                       padding: 0 30px;
                                       font-family: 'BioRhyme', serif;
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
                                         background-color: ${colors[response.colorChoice].headerBackground};
                                         color: ${colors[response.colorChoice].headerColor};
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
                            generatedProfile = generatedProfile + "</head><div class='wrapper'><div class='photo-header'><img class='photo-header img' src='" + res.data.avatar_url + "' alt='Profile Picture'></div><h2 class='photo-header h2'>Hi! My name is " + res.data.login + "</h2><div class='row'><div class='nav-link col'>Located in " + res.data.location + "</div><div class='links-nav col'>Blog and Github</div></div></div><body><main class='container'><div class='row'><h3>" + res.data.bio + "</h3></div><div class='row'><div class='col'><div class='card'>Public Repositories: " + res.data.public_repos + "</div></div><div class='col'><div class='card'>Followers: " + res.data.followers + "</div></div></div><div class='row'><div class='col'><div class='card'>Github Stars: " + res.public_gists + "</div></div><div class='col'><div class='card'>Following: " + res.data.following + "  </div></div></main><script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script><script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script></body><footer class='wrapper'></footer></html>";
                            //Below makes the html profile with proper formatting
                            fs.writeFile("./generatedProfile/profile.html", generatedProfile, function (error, data) {
                              if (error) {
                                  return console.log(error);
                              }
                              console.log("Success!");
                            });
                            
                            //below makes a differently formatted pdf
                            generatedProfile = generateHTML();
                            generatedProfile = generatedProfile + "</head><div class='wrapper'><div class='photo-header'><img class='photo-header img' src='" + res.data.avatar_url + "' alt='Profile Picture'></div><h2 class='photo-header h2'>Hi! My name is " + res.data.login + "</h2><div class='row'></div></div><body><main class='container'><div class='row'><br /><div class='nav-link col'>Located in " + res.data.location + "</div><div class='links-nav col'>Blog and Github</div><br /><h3>" + res.data.bio + "</h3></div><div class='row'><div class='col'><div class='card'>Public Repositories: " + res.data.public_repos + "</div></div><div class='col'><div class='card'>Followers: " + res.data.followers + "</div></div></div><div class='row'><div class='col'><div class='card'>Github Stars: " + res.public_gists + "</div></div><div class='col'><div class='card'>Following: " + res.data.following + "  </div></div></main><script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script><script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script></body><footer class='wrapper'></footer></html>";
                            conversion({ html: generatedProfile }, function(err, pdf) {
                              var output = fs.createWriteStream("./generatedProfile/output.pdf")
                              console.log(pdf.logs);
                              console.log(pdf.numberOfPages);
                              pdf.stream.pipe(output);
                            })
                        });
                });
    } catch (err) {
        console.log(err);
    }
}

makeProfile();