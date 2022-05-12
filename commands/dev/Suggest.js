const { channel } = require('diagnostics_channel');
const commando = require('discord.js-commando');
const fs = require('fs');
const https = require('https');
const { title } = require('process');
const GetLists = require('./GetLists');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.trello_key;
const token = auth.trello_token;
const URL1 = "api.trello.com";
const path = "/1/cards";
const post_request_args = "?key=" + key + "&token=" + token;

class Suggest extends commando.Command {
    constructor(client){
        super(client, {
            name: 'suggest',
            group: 'dev',
            memberName: 'suggest',
            description: 'Sends cards from Trello'
        });
    }

    async run(message, args){
        if(args) {
            args = args.split('-').filter(Boolean);
            const argsList = args;
            let list = "Suggestions";
            let title = "";
            let desc = "";
            for (let i = 0; i < argsList.length; i++) {
                var flag = argsList[i].split(' ')[0].toLowerCase()
                var flagContents = argsList[i].substring(argsList[i].indexOf(flag) + flag.length + 1);
                switch('-' + flag) {
                    case ('-list'):
                        list = flagContents;
                        break
                    case ('-title'):
                        title = flagContents
                        break
                    case ('-desc'):
                        desc = flagContents
                        break
                    case ('-help') :{

                    }
                    default: 
                        console.log("defaulting");
                        message.channel.send(`Error: unrecognised flag: " - ${argsList[i].split(' ')[0]}"`);
                        return;
                }
            }
            const response = await GetLists.prototype.getListsRequest(message, args);
            var listNames = [];
            let bestMatch = null;
            let bestDistance = 9999;
            for(let i = 0; i < response.length; i++) {
                listNames.push(response[i].name);
                const distance = this.levenshteinDistance(list.toLowerCase().trim(), response[i].name.toLowerCase().trim());
                if (distance < bestDistance) {
                    bestDistance = distance;
                    console.log(bestDistance);
                    bestMatch = response[i].name;
                }
            }
            if(bestDistance < 3) {
                console.log(list);
                console.log(bestMatch);
                if(title.length) {
                    message.channel.send({embed: {
                        color: 0x850000, // red
                        //Configure this to just use suggest || decide whether a seperate dev command is needed
                        description: `So you'd like to suggest the following card: \nTitle: ${title}\nDescription: ${desc ? desc : ""}\nOn list: ${bestMatch}`
                    }});
                } else {
                    message.channel.send("Title required. Please enter title after the <-title> flag.");
                }
            } else {
                message.channel.send("Listname not recognised, please check for typos.");
            }

        } else {
            
        }
    }

    postSuggestion(title, desc, listId) {
        return new Promise ((resolve, reject) => {
            const options = {
                hostname: baseUrl,
                method: 'GET',
                path: `/1/cards/${boardId}/lists/${authParams}`,
            }

            const data = JSON.stringify({
                name: title,
                desc: desc,
                pos: "top",
                idList: "627859bfb5b5161121f4250b"
            });

            console.log(options);
            const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
                
                res.on('data', d => {
                    process.stdout.write(d);
                    resolve(d);
                  });
            });
    
            req.on('error', error => {
                console.error(error);
            });
    
            req.write(data);
            req.end();
        });
    }

    levenshteinDistance(a="", b="") {
        const al=a.length;
        const bl=b.length;
        if(!al) return bl; 	
        if(!bl) return al;
        const aa=[...a],
            ba=[...b];
        let i,j,matrix=[];
        for(i=0; i<=bl; ++i) matrix[i]=[i];
        const m0=matrix[0];
        for(j=0; j<=al; ++j) m0[j]=j;
        const alm1=al-1,blm1=bl-1;
        for(i=0; i<=blm1; ++i){
            for(j=0; j<=alm1; ++j){
                const mi=matrix[i],mi1=matrix[i+1];
                mi1[j+1]=aa[j]==ba[i]?
                    mi[j]:
                    Math.min(
                        mi[j]+1, // substitution
                        mi1[j]+1, // insertion
                        mi[j+1]+1 // deletion
                    );
            }
        }
        return matrix[bl][al];
    }

}

module.exports = Suggest;
