const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

exports.isProd = function() {
    return process.env.NODE_ENV === 'production';
};

exports.getComponentsEntry = function() {
    const entry = {};
    const cmpsFilename = 'mb-sui.common';
    const pattern = path.join(__dirname, '../components/**/index.ts');
    try {
        console.log(chalk.green('Begin scan components...'));
        glob.sync(pattern).forEach((filePath) => {
            if (filePath.indexOf('components/index.ts') >= 0)  {
                entry[cmpsFilename] = filePath;
                console.log(chalk.green(`Get file ${cmpsFilename}: ${filePath}`))
            } else {
                const pathArr = filePath.split('/');
                const key = pathArr[pathArr.length - 2];
                entry[key] = filePath;
                console.log(chalk.green(`Get file ${key}: ${filePath}`))
            }
        });
        console.log(chalk.green('Scan components success!'));
        return entry;
    } catch(err) {
        console.log(chalk.red('Scan components error!'));
        console.log(chalk.red(err.message));
        throw new Error(err.message);
    }
};