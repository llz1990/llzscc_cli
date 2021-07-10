#! /usr/bin/env node
const program = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');
const downLoad = require('download-git-repo');
console.log('----------以下执行commander命令---------');
// 通过conmand 自定义命令行消息指令：
// 创建项目
program
    .command('create [name]')
    .description('create a new project')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 验证能否取到create.js的值
        require('../lib/create.js')(name, options);
        // 打印执行结果
        console.log('name:', name)
    })

// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log('自定义config 命令：', value);
    })

// 配置 ui 命令
program
    .command('ui [value]')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((name, options) => {
        console.log('自定义ui命令：', value);
    })

// 打印一个有趣的 help
program
    .on('--help', () => {
        // 使用 figlet 绘制 Logo
        console.log('\r\n' + figlet.textSync('llzscc', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }));
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
    })

// 配置版本号信息
program
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv);    