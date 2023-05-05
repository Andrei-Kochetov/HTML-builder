const fs = require('fs');
const path = require('path');

/* const copy =  */
function copyDir(){
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
    });
    
    fs.promises.readdir((path.join(__dirname, 'files-copy'))).then(arr=>{
        arr.forEach( el=>{
                fs.unlink(path.join(__dirname, 'files-copy', el), err =>{
                    if(err) throw err; 
                })
        })
    })


    fs.promises.readdir((path.join(__dirname, 'files'))).then(arr=>{
            arr.forEach( el=>{
                fs.promises.copyFile(path.join(__dirname, 'files', el),path.join(__dirname, 'files-copy', el))})
        })
}
copyDir();

/* fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
        console.log(files)
      fs.unlink(path.join(__dirname, 'files-copy', file), err => {});
    }
  }); 
 */
/*       fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if(files.length == 0){
                return;
            } else{
                console.log(files)
                fs.unlink(path.join(__dirname, 'files-copy', file), err => {});
            }

        }
      });  */

      /*     fs.promises.readdir((path.join(__dirname, 'files-copy'))).then(arr=>{
        arr.forEach( el=>{
                fs.unlink(path.join(__dirname, 'files-copy', el), err =>{
                    if(err) throw err; 
                })
        })
    }) */
