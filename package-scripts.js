const { series, concurrent } = require("nps-utils");

module.exports = {
    scripts: {
        default: 'docker-compose up --build -d',
        postinstall: series('npm install -C client', 'npm install -C server'),
        build: {
            default: concurrent.nps('build.server', 'build.client'),
            server: 'npm start build -C server',
            client: 'npm start build -C client'
        },
        serve: {
            default: 'npm start serve -C server'
        },
        debug: {
            default: concurrent.nps('debug.server', 'debug.client'),
            server: 'npm start debug -C server',
            client: 'npm start debug -C client'
        },
        test: {
            default: concurrent.nps('test.client', 'test.server'),
            server: 'npm test -C server',
            client: 'npm test -C client'
        }
    }
};