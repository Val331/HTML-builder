const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) => {
  data.forEach((item) => {
    fs.stat(path.join(__dirname, 'secret-folder', item.name), (err, stats) => {
      if(stats.isFile()) {
        let weightFile = stats.size;
        console.log(`${item.name.slice(0, item.name.lastIndexOf('.'))} - ${path.extname(path.join(__dirname, 'secret-folder', item.name))} - ${weightFile}`);
      }
    });
  });
});