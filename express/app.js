const express = require('express')
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
const paths = require('../build/paths');
const { DEV } = require('../build/_mode');
const { logger, requestLogger } = require('./loggers')
const path = require('path')

const { expressjwt: expressJwt } = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtScope = require('express-jwt-scope')
const jwt_decode = require("jwt-decode");
const helmet = require("helmet");
const cors = require('cors')

const isDevServer = process.env.NODE_ENV === "development"

console.log("running for " + process.env.NODE_ENV)

const express_ = new express()

const checkJwt = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-muf-school.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://mufreact',
    issuer: 'https://dev-muf-school.auth0.com/',
    algorithms: ['RS256']
})
//.unless({path: ['/', /\/*-bundle.js/, /\/*.json/, /\/public*/, /\/*.ttf/, /\/*__webpack_hmr/, /\/*hot-update.js/, /\/*.png/]})     

// express_.use(checkJwt)   


helmetConfig = {
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": [...helmet.contentSecurityPolicy.getDefaultDirectives()["script-src"], "dev-muf-school.auth0.com"],
             connectSrc: ["'self'", 'dev-muf-school.auth0.com']
        },
    },
}
const whiteListeCorsOrigins =  ['http://localhost:3100', 'http://127.0.0.1:8887', 'http://127.0.0.1:8856']

// console.log(helmetConfig)

express_.use(helmet(helmetConfig));

const corsOptions = {
    origin: function(origin, callback) {

        if(!origin) return callback(null, true); // this is for same origin, postman and mobile app

        if(whiteListeCorsOrigins.indexOf(origin) === -1) {
            logger.error(`Malicious origin <> ${origin}`)
            return callback(new Error(`CORS Error origin ${origin} is not recognized`), false);
        }
        return callback(null, true);
      },
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    optionsSuccessStatus: 200,
    credentials: true,
    maxAge: 1000
}
 express_.use(cors(corsOptions))

// express_.use('/', express.static('dist/stage'))
// express_.use('/public', express.static('dist/stage'))


const getApiProxiConfig = () => {
    const target = "http://localhost:3010/"
    return {
        target,
        onProxyReq: (proxyReq, req, res) => {
            const jwtData = jwt_decode(req.headers.authorization.split(' ')[1])
            logger.info(`REQUEST <> ${req.method}:${req.url} <> ${jwtData.email}|${jwtData.sub} <> MOVED TO <> ${req.method}:${target}${req.url}`)
        },
        onProxyRes: (proxyRes, req, res) => {
            requestLogger.info('handled request', { req, res })
            const jwtData = jwt_decode(req.headers.authorization.split(' ')[1])
            logger.info(`RESPONSE <> ${jwtData.email}|${jwtData.sub} <> ${req.method}:${req.url} `)
        },
        onError: (err, req, res, target) => {
            logger.error(`REQUEST <> ${req.method}:${req.url} <> ${err}`)
            requestLogger.error('handled request', err)
           
        },
        changeOrigin: true
    }
}
express_.use('/api', checkJwt, jwtScope('apiAccessViaFrontEnd'), createProxyMiddleware(getApiProxiConfig()));



// WEBPACK
if(isDevServer) {
    var webpackConfig = require(paths.ROOT + "/webpack.config")({ _mode: DEV });
    var webpackMiddlewareConfig = {
        publicPath: '/',
        writeToDisk: true
    };
    const webpackCompiler = webpack(webpackConfig);
    express_.use(middleware(webpackCompiler, webpackMiddlewareConfig));
    express_.use(webpackHotMiddleware(webpackCompiler));    
} else {
    express_.use('/', express.static(paths.ROOT))
    express_.use('/public', express.static(paths.ROOT))    
}

// END WEBPACK



module.exports = express_
