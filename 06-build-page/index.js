const fs = require('fs');
const path = require('path');
const { writeFile, readFile,  readdir} = require('fs/promises');

const stylesDir = fs.promises.readdir((path.join(__dirname, 'styles')), {withFileTypes: true});
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

function createProjectDist(){
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
    });
} 
createProjectDist();

stylesDir.then(arr=>{
    arr.forEach( (el)=>{
        if(el.isFile() && el.name.split('.')[1] === 'css'){
            const input = fs.createReadStream(path.join(__dirname, 'styles', el.name));
            input.on('data', chunk => output.write(chunk));

        }
    })
})

const projectDistPath = path.resolve(__dirname, 'project-dist');
const mainHtmlFilePath = path.resolve(__dirname, 'template.html');
const componentsDirPath = path.resolve(__dirname, 'components');
const htmlBundlePath = path.resolve(projectDistPath, 'index.html');

(async function buildHtml(mainHtmlFilePath, componentsDirPath, htmlBundlePath) {
      let copyHtmlData = await readFile(mainHtmlFilePath, 'utf-8');
  
      for (const item of await readdir(componentsDirPath, { withFileTypes: true })) {
        const itemPath = path.resolve(componentsDirPath, item.name)
  
        if (item.isFile() && path.extname(itemPath) === '.html') {
          const fileName = path.parse(itemPath).name;
          copyHtmlData = copyHtmlData.replace(
            new RegExp(`{{${fileName}}}`, 'g'),
            await readFile(itemPath, 'utf-8'),
          );
        }
      }
      await writeFile(htmlBundlePath, copyHtmlData);
  
  })(
    mainHtmlFilePath,
    componentsDirPath,
    htmlBundlePath
  );

function copyDir(){
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
    if (err) throw err;
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), { recursive: true }, err => {
        if (err) throw err;
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), { recursive: true }, err => {
        if (err) throw err;
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), { recursive: true }, err => {
        if (err) throw err;
    });
    
    fs.promises.readdir((path.join(__dirname, 'assets')),{withFileTypes: true}).then(arr=>{
            arr.forEach( el=>{

                if (el.isDirectory()){
                    fs.promises.readdir((path.join(__dirname, 'assets', el.name)),{withFileTypes: true}).then(arr=>{
                        arr.forEach( ell=>{
                            fs.promises.copyFile(path.join(__dirname, 'assets', el.name, ell.name),path.join(__dirname,'project-dist', 'assets', el.name, ell.name))})
                            
                    })
                } else{
                    fs.promises.copyFile(path.join(__dirname, 'assets', el.name),path.join(__dirname,'project-dist', 'assets', el.name))
                }
            })

        })
}
copyDir();


/* function generateHtml(){
    createProjectDist()
    let header = '';
    let footer = '';
    let articles = '';

    fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf-8').on('data', chunk => header += chunk);

    fs.createReadStream(path.join(__dirname, 'components', 'footer.html'), 'utf-8').on('data', chunk => footer += chunk);

    fs.createReadStream(path.join(__dirname, 'components', 'articles.html'), 'utf-8').on('data', chunk => articles += chunk);

    let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    template.on('data', chunk => {
        html += chunk;
        html = html.replace('{{header}}', header)
        .replace('{{footer}}', footer)
        .replace('{{articles}}', articles)
    });
    template.on('end', () => { 
        fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(html)
    } );
}
generateHtml() */

/* function distHtml(){
    createProjectDist()
    console.log(html)
    fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(html);
     
}*/


/*     async function final(){
        await generateHtml();
        await createProjectDist();
        await distHtml();
    } */
//console.log(html) 
/* setTimeout(()=>{
   console.log(html) 
}, 1000)  */

/* 
function generateHtml(){
    let header = '';
    let footer = '';
    let articles = '';

    fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf-8').on('data', chunk => header += chunk);

    fs.createReadStream(path.join(__dirname, 'components', 'footer.html'), 'utf-8').on('data', chunk => footer += chunk);

    fs.createReadStream(path.join(__dirname, 'components', 'articles.html'), 'utf-8').on('data', chunk => articles += chunk);

    let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    template.on('data', chunk => html += chunk);
    template.on('end', () => { 
        html = html.replace('{{header}}', header)
        .replace('{{footer}}', footer)
        .replace('{{articles}}', articles)
    } );
} */

/* let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
template.on('data', chunk => html += chunk);
template.on('end', () => {
} );

let componentsHeader = fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf-8');
componentsHeader.on('data', chunk => header += chunk);

let componentsFooter = fs.createReadStream(path.join(__dirname, 'components', 'footer.html'), 'utf-8');
componentsFooter.on('data', chunk => footer += chunk);

let componentsArticles = fs.createReadStream(path.join(__dirname, 'components', 'articles.html'), 'utf-8');
componentsArticles.on('data', chunk => articles += chunk); */

/* async function foo(){
    let html = '';
    let template = await fs.promises.readFile(path.join(__dirname, 'template.html')).then(data=>{
        return data.toString();
    })
    html = template;
    //console.log(html);
    return html
}

html = foo();
console.log(html) */
/* function final (){
    foo()
}
final()

console.log(html) */

/* const template = fs.createReadStream(path.join(__dirname, 'template.html'))
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
 */


/* async function foo () { return fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {

    return data.toString()
    //console.log(data.toString() .replace(/{{header}}/,  ) );
}); }
async function log(){ await foo() }
log() */
/* const template =  */

/* console.log(html) */

/* fs.readFile(path.join(__dirname, 'components', 'header.html'), (err, data) => {
    return data.toString();
    //console.log(data.toString())
}) */
/*     if (err) throw err;
    return data.toString().replace(/{{header}}/, fs.readFile(path.join(__dirname, 'components', 'header.html'), (err, data) => {
        return data.toString();
        //console.log(data.toString())
    }) ) */
/* setTimeout(()=>{
    console.log(template)
}, 5000) */
/* const header = fs.readFile(path.join(__dirname, 'components', 'header.html'), (err, data) => {
    console.log(data.toString())
});  */
/* fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {});  */
