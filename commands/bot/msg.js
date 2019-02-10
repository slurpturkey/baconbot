const fs = require('fs');

let filePath = "./msg.txt";
let sourceText = fs.readFileSync(filePath, 'utf8');
let fileStats = fs.statSync(filePath);

let data = sourceText.split('\n');

if(data[0] == '' || data[0] == '\n') data.shift();

let maxSize = 15000;

module.exports = {
    loadMessage: function(mes){
        if(!mes.author.bot){
            appendArray(mes.content);
            fs.writeFileSync(filePath, "");

            for(var i = 0; i < data.length; i++){
                if(data[i] == '' || data[i] == '\n'){
                    data.splice(i, 1);
                    continue;
                }
                fs.appendFileSync(filePath, '\n' + data[i]);
            }
        }
    },

    loadMessageString: function(str){
        appendArray(str);
        fs.writeFileSync(filePath, "");
        fs.appendFileSync(filePath, '\n' + data[data.length - 1]);
    },

    appendMessage: function(mes){
        if(!mes.author.bot){
            if(fileStats.size < 5000000000){ // 5GB file limit
                fs.appendFileSync(filePath, '\n' + mes.content);
            }
        }
    }
}

function appendArray(str){
    while(data.length >= maxSize) data.shift();
    data.push(str);
}