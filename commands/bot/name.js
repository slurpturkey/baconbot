const request = require('request');
const fs = require('fs');

const discordPath = "discordauth.json";
const discordAuth = JSON.parse(fs.readFileSync(discordPath, 'utf8'));

const vendorPath = "vendorauth.json";
const vendorAuth = JSON.parse(fs.readFileSync(vendorPath, 'utf8'));
const key = vendorAuth.username_key;
const URL = "https://username-generator-api.com/api/?api_key=" + key;

module.exports = {
    changeName: function(bot){
        let numOfForms = 7; // should always be the number of options (not one less)
        let form = Math.floor(Math.random() * numOfForms);

        switch(form){
            case 0:
                getName2c("adjectives", "creatures", bot);
                break;
            case 1:
                getName2c("old-english-words", "made-up-words", bot);
                break;
            case 2:
                getName2c("tastes", "food", bot);
                break;
            case 3:
                getName2c("world-places", "jobs", bot);
                break;
            case 4:
                getName1c("sillywords", bot);
                break;
            case 5:
                getName2c("emotions", "noisywords", bot);
                break;
            case 6:
                getName2c("countries", "insults", bot);
                break;
            default:
                getName2c("adjectives", "creatures", bot);
                console.log("Warning: Case not defined in switch statement, defaulting to Adjectives + Creatures");
                break;
        }
    }
}

function getName1c(cat1, bot){
    request.get(URL + "&mode=one&category1=" + cat1, {}, function(err, res, body){
            let json = JSON.parse(body);
            //console.log(format(json.output[0].value));
            //result = format(json.output[0].value);
            bot.guilds.get(discordAuth.guild_id).me.setNickname(format(json.output[0].value));
        });
}

function getName2c(cat1, cat2, bot){
    request.get(URL + "&mode=two&category1=" + cat1 + "&category2=" + cat2, {}, function(err, res, body){
            let json = JSON.parse(body);
            //console.log(format(json.output[0].value));
            //result = format(json.output[0].value);
            bot.guilds.get(discordAuth.guild_id).me.setNickname(format(json.output[0].value));
        });
}

function format(input){
    let result = input;
    let firstLetter = result[0]; // first letter of first word
    let secondIndex = result.indexOf(".") + 1;
    let secondLetter = result[secondIndex]; // first letter of second word
    firstLetter = firstLetter.toUpperCase();
    secondLetter = secondLetter.toUpperCase();
    
    result = replaceAt(result, 0, firstLetter);
    result = replaceAt(result, secondIndex, secondLetter);
    result = result.replace(/\./g, " ");
    
    return result;
}

function replaceAt(string, index, replacement){
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}