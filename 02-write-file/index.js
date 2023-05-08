const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let outputInFile = fs.createWriteStream(path.join(__dirname, 'outputText.txt'));

stdout.write('Привет. Ввод:\n');
stdin.on('data', (text) => {
  if (String(text).trim() === 'exit') process.exit();
  else outputInFile.write(text);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => stdout.write('Ну всё, пока'));
