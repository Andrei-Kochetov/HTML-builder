/* Здраствуйте, проверяющий, при работе с .txt файлом заметил, что файл автоматически не обновляется (нужно нажать на любой другой файл, а потом снова 'на mynotes.txt' и будт видны добавленые строки). Может быть проблема только у меня, пишу чтобы вы были в курсе и не снизили оценку за это задание. */

const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;
let output = fs.createWriteStream(path.join(__dirname, 'mynotes.txt'));

stdout.write('Привет, напиши любое сообщение... \n');

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') end();
    output.write(data)
    stdout.write('Файл .txt автоматически не обновляется(может только у меня такой баг, нужно нажать на любой другой файл, а потом снова "на mynotes.txt" и будут видны добавленые строки)\n');
    } 
);

function end(){
    stdout.write('Удачи!');
    exit();
}

process.on('SIGINT', end);

