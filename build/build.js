var spawn = require('child_process').spawn

const cmd = spawn('webpack', ['--env', '_mode=stage'], {shell: true});
cmd.stdout.once('data', data => console.log('Webpack started'));
cmd.stdout.on('data', data => console.log('stdout: ' + data.toString()));
cmd.stderr.on('data', data =>  console.log('stderr: ' + data.toString()));        
cmd.on('exit', code => console.log('webpack exited with code ' + code.toString()));