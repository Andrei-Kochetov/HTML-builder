const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;

const secretFolderDir = fs.promises.readdir((path.join(__dirname, 'secret-folder')), {withFileTypes: true});

secretFolderDir.then(arr=>{
    arr.forEach( el=>{
        if(el.isFile()){
            fs.stat(path.join(__dirname, 'secret-folder', `${el.name}`), function(err, stats) {
                stdout.write(`${el.name.split('.')[0]} - ${el.name.split('.')[1]} - ${stats.size} \n`)
            });

        }
    })

})
