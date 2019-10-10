const args = ['start'];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };

try {
    require('child_process').spawn('npm', args, opts)
    console.log('客户端已经启动')
} catch (ex) {
    console.error('碰到错误：', ex)
    process.exit(1)
}