var fs = require('fs');

let filePath = "./msg.txt";
let sourceText = fs.readFileSync(filePath, 'utf-8');

let data = sourceText.split('\n');

if(data[0] == '' || data[0] == '\n')
    data.shift();

let maxSize = 15000;

module.exports = {
    loadMessage: function(mes){
        if(!mes.author.bot){
            appendArray(getString(mes));
            fs.writeFileSync(filePath, "");
    
            for(var i = 0; i < data.length; i++){
                if(data[i] == '' || data[i] == '\n'){
                    data.splice(i, 1);
                    continue;
                }
                fs.appendFileSync(filePath, '\n' + data[i]);
            }
    
            //console.log(data);
        }
    },

    loadMessageString: function(str){
        appendArray(str);
            fs.writeFileSync(filePath, "");
    
            // for(var i = 0; i < data.length; i++){
            //     if(data[i] == '' || data[i] == '\n'){
            //         data.splice(i, 1);
            //         continue;
            //     }
            //     fs.appendFileSync(filePath, '\n' + data[i]);
            // }

            fs.appendFileSync(filePath, '\n' + data[data.length - 1]);
    
            //console.log(data);
    }
}

function getString(mes){
    return mes.content;
}

function appendArray(str){

    while(data.length >= maxSize)
        data.shift();
    
    data.push(str);

}