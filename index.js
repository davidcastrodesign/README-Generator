const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);

// creating a fuction to call to prompt the user
let promptUser = () => {
    // whenever we want to get back data from a function, we need to return it.
   return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "location",
            message: "where do you live?"
        },
        {
            type: "input",
            name: "bio",
            message: "Tell me about yourself?"
        },
        {
            type: "input",
            name: "linkedin",
            message: "Give me your linkedin"
        },
        {
            type: "input",
            name: "github",
            message: "What is your github?"
        },
    ]);
};

const generateHtml = (answers) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <p>${answers.name}</p>
        <p>${answers.location}</p>
        <p>${answers.bio}</p>
        <p>${answers.linkedin}</p>
        <p>${answers.github}</p>
    </body>
    </html>`;
}
// promptUser();

async function init() {
    try {
        const answers = await promptUser();
        const html = generateHtml(answers);
        await writeFileAsync("bio.html", html);
        console.log("Success");

    } catch (err) {
        console.log(err);
    }
}

init();