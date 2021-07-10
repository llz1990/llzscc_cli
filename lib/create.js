const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const Generator = require('./generator');

module.exports = async function (name, options) {
    const cwd = process.cwd(); // 选择目录
    const targetAir = path.join(cwd, name); // 需要创建的目录地址

    // 目录是否已经存在：
    if (fs.existsSync(targetAir)) {
        if (options.force) {
            await fs.remove(targetAir);
        } else {
            // 在终端输出询问用户是否覆盖：
            const inquirerParams = [{
                name: 'action',
                type: 'list',
                message: '目标文件目录已经存在，请选择如下操作：',
                choices: [
                    { name: '替换当前目录', value: 'replace'},
                    { name: '移除已有目录', value: 'remove' }, 
                    { name: '取消当前操作', value: 'cancel' }
                ]
            }];
            let inquirerData = await inquirer.prompt(inquirerParams);
            if (!inquirerData.action) {
                return;
            } else if (inquirerData.action === 'remove') {
                // 移除已存在的目录
                console.log(`\r\nRemoving...`)
                await fs.remove(targetAir)
            }
        }
    }

    // 创建项目：
    const generator = new Generator(name, targetAir);

    // 开始创建项目：
    generator.create();

}