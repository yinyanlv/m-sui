const fs = require('fs');
const { getRealPath } = require('./utils');
const {prefixCls} = require('../config');


const needHandleFilePaths = [
    getRealPath('../dist/es/components/hooks/index.js')
];

const replaceMap = {
    'PREFIX_CLS': prefixCls
};

function handleFiles() {
    needHandleFilePaths.forEach((path) => {
        const isExist = fs.existsSync(path);

        if (isExist) {
            let content = fs.readFileSync(path, {encoding: 'utf-8'});
           
            Object.keys(replaceMap).forEach((key) => {
                content = content.replace(new RegExp(key, 'g'), JSON.stringify(replaceMap[key]));
            });
            fs.writeFileSync(path, content);
            console.log(`自定义 Define Plugin 处理完成：${path}`);
        }
    });
}

handleFiles();
