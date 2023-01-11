const {PROD, DEV, STAGE } =  require('./build/_mode')

module.exports = (env, argv) => {
    console.log(env, argv)            
    if (env.WEBPACK_SERVE === true && env._mode === DEV) {
        return require('./build/webpack.devserver.config')
    } else if(env._mode === DEV) {
        return require('./build/webpack.expdevserver.config')
    }
    else {
        if (env._mode === STAGE) {
            return require('./build/webpack.stage.config')
        } else if (env._mode === PROD) {
            return require('./build/webpack.prod.config')
        }
    }
};
