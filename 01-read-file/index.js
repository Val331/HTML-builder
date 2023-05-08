const fs = require('fs');
const path = require('path');

let streamForFile = fs.createReadStream(path.join(__dirname, 'text.txt'));

streamForFile.on('data', data => console.log(data.toString()));