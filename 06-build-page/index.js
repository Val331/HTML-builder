const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

async function createProjectDist() {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
        if (err) throw err;
    });
}

async function createIndexHtml() {
    createProjectDist();
    let templateFile = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    let arrComponentsFile = await fsPromises.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
    for (let file of arrComponentsFile) {
        let nameOfComponentsFile = file.name.slice(0, file.name.indexOf('.'));
        let textOfComponentsFile = await fsPromises.readFile(path.join(__dirname, 'components', file.name), 'utf-8');
        templateFile = templateFile.replace(`{{${nameOfComponentsFile}}}`, textOfComponentsFile);
    }
    await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateFile);

}

async function createStyleFile() {
    let bundleCss = await fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    let arrOfStyleFiles = await fsPromises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
    for (let styleFile of arrOfStyleFiles) {
        let textOfStyleFile = await fsPromises.readFile(path.join(__dirname, 'styles', styleFile.name), 'utf-8');
        bundleCss.write(textOfStyleFile + '\n')
    }
}

async function createAssets() {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
        if (err) throw err;
    });
    let arrOfAssets = await fsPromises.readdir(path.join(__dirname, 'assets'), {withFileTypes: true});
    for (let assetsFile of arrOfAssets) {
        if(assetsFile.isFile()) {
            await fsPromises.copyFile(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets', assetsFile.name));
        } else {
            await fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets', assetsFile.name), { recursive: true }, err => {
                if (err) throw err;
            });
            let arrOfAssetsinFolder = await fsPromises.readdir(path.join(__dirname, 'assets', assetsFile.name), {withFileTypes: true});
            for (let fileInAssetsFolder of arrOfAssetsinFolder) {
                if(fileInAssetsFolder.isFile()) {
                    await fsPromises.copyFile(path.join(__dirname, 'assets', assetsFile.name, fileInAssetsFolder.name), path.join(__dirname, 'project-dist', 'assets', assetsFile.name, fileInAssetsFolder.name));
                }
            }
        }
    }
}

async function createPage() {
    await createIndexHtml();
    await createStyleFile();
    await createAssets();
}

createPage();
