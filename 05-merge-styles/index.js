const fs = require('fs');
const path = require('path');
const stylesDir = fs.promises.readdir((path.join(__dirname, 'styles')), {withFileTypes: true});
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

stylesDir.then(arr=>{
    arr.forEach( (el)=>{
        //console.log(arr)
        if(el.isFile() && el.name.split('.')[1] === 'css'){
            //console.log(el)
            const input = fs.createReadStream(path.join(__dirname, 'styles', el.name)/* , {highWaterMark: 1024} */);
            input.on('data', chunk => output.write(chunk/* .toString() */ /* + '\n' */));
            //input.pipe(output);
        }
    })
})

/*             const input = fs.createReadStream(path.join(__dirname, 'styles', el.name), {highWaterMark: 1024});
            const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
            input.on('data', chunk => output.write(chunk)); */