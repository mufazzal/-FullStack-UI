const { exec } = require('child_process')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const paths = require('./paths')
var spawn = require('child_process').spawn

const getCopyAssetPlugin = (env) => {
  return new CopyPlugin({
    patterns: [
      { from: path.join(paths.ROOT, 'i18n', 'locales'), to: path.join(paths.DIST, env, 'locales') }
    ]
  })
}

const getCopyExpressServer = (env) => {
  return new CopyPlugin({
    patterns: [
      { from: path.join(paths.ROOT, 'express'), to: path.join(paths.DIST, env, 'express') },
      { from: path.join(paths.ROOT, 'build'), to: path.join(paths.DIST, env, 'build') },
      { from: path.join(paths.ROOT, 'package.json'), to: path.join(paths.DIST, env, 'package.json') },
      { from: path.join(paths.ROOT, 'package-lock.json'), to: path.join(paths.DIST, env, 'package-lock.json') }
    ]
  })
}

const installProdDependenciesOnly = (env) => {
  return {
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        
        const cmd = spawn('npm', ['i', '--only=prod'], {cwd: path.join(paths.DIST, env), shell: true});
        cmd.stdout.once('data', data => console.log('Installing prod dependencies for packaging'));
        cmd.stdout.on('data', data => console.log('stdout: ' + data.toString()));
        cmd.stderr.on('data', data =>  console.log('stderr: ' + data.toString()));        
        cmd.on('exit', code => console.log('child process AfterEmitPlugin exited with code ' + code.toString()));
              
      });      
    }
  }
}

module.exports = {
  getCopyAssetPlugin, getCopyExpressServer, installProdDependenciesOnly
}
