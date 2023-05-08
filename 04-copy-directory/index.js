const fs = require('fs');
const path = require('path');

fs.access(path.join(__dirname, 'files-copy'), err => {
    if (!err) {
      fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
        if (err) throw err;
        copyDir();
      });
    } else {
        copyDir();
    }
});


function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
        if (err) throw err;
        fs.readdir(path.join(__dirname, 'files'), (err, data) => {
          console.log(data);
          data.forEach(item => {
            console.log(item);
            fs.copyFile(path.join(__dirname, 'files', item), path.join(__dirname, 'files-copy', item), err => {
              if (err) throw err;
            });
          });
        });
    });
}
