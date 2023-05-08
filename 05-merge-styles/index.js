const fs = require('fs');
const path = require('path');

let bundleCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, data) => {
    data.forEach(item => {
        fs.stat(path.join(__dirname, 'styles', item.name), (err, stats) => {
            if(stats.isFile() && path.extname(path.join(__dirname, 'styles', item.name)) === '.css') {
                let readableFile = fs.createReadStream(path.join(__dirname, 'styles', item.name));
                readableFile.on('data', (text) => {
                    bundleCss.write(text.toString());
                    bundleCss.write('\n')
                });
            }
        });
    })
});