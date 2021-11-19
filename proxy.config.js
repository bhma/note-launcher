const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:10110/api',
        secure: true,
        logLevel: 'debug',
        pathRewrite: {
            '^/api': ''
        }
    }
];

module.exports = PROXY_CONFIG;
