const commando = require('discord.js-commando');
const fs = require('fs');
const https = require('https');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.trello_key;
const token = auth.trello_token;
const URL1 = "api.trello.com";
const path = "/1/lists/62756dca519e8076d04c3105/cards";
const get_request_args = "?key=" + key + "&token=" + token;

class getJobs extends commando.Command {
    constructor(client){
        super(client, {
            name: 'getjobs',
            group: 'dev',
            memberName: 'getjobs',
            description: 'Gets cards from Trello'
        });
    }

    async run(message, args){
        console.log("getting jobs");

        const options = {
            hostname: URL1,
            method: 'GET',
            path: path + get_request_args,
            headers: {
                key: key,
                token: token
            }
        };
        console.log(options);
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        
            let data = '';
        
            res.on('data', (chunk) => {
                data += chunk;
            });
        
            res.on('close', () => {
                console.log('Retrieved all data');
                var response = JSON.parse(data);

                var cardNames = [];
                for(let i = 0; i < response.length; i++) {
                    cardNames.push(response[i].name);
                }

                message.channel.send({embed: {
                    color: 0x850000, // red
                    description: cardNames.join(" \n")
                }});

                console.log(cardNames);

            });
        });

        req.on('error', error => {
            console.error(error);
        }),

        req.end();
    }
}

module.exports = getJobs;
