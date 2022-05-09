const commando = require('discord.js-commando');
const fs = require('fs');
const https = require('https');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.trello_key;
const token = auth.trello_token;
const URL1 = "api.trello.com";
const path = "/1/cards";
const post_request_args = "?key=" + key + "&token=" + token;

class suggestFeature extends commando.Command {
    constructor(client){
        super(client, {
            name: 'suggestfeature',
            group: 'dev',
            memberName: 'suggestfeature',
            description: 'Sends cards from Trello'
        });
    }

    async run(message, args){
        console.log("sending job");

        const data = JSON.stringify({
            name: "this is a job",
            desc: "I am describing the job",
            pos: "top",
            idList: "627859bfb5b5161121f4250b"
        });

        const options = {
            hostname: URL1,
            method: 'POST',
            path: path + post_request_args,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
                key: key,
                token: token
            }
        };
        console.log(options);
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                process.stdout.write(d);
              });
        });

        req.on('error', error => {
            console.error(error);
        });

        req.write(data);
        req.end();
    }
}

module.exports = suggestFeature;
