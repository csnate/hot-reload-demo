const { series, concurrent } = require('nps-utils');

module.exports = {
    scripts: {
        default: series.nps('build', 'serve'),
        clean: 'rimraf dist/*',
        build: {
            default: series.nps('clean', 'build.compile'),
            compile: 'tsc',
        },
        serve: {
            default: 'node -r module-alias/register dist/server/src/server.js'
        },
        debug: {
            default: series.nps('clean', 'debug.compile'),
            serve: 'node -r module-alias/register --inspect=0.0.0.0:9229 dist/server/src/server.js',
            compile: 'tsc-watch --onSuccess "nps debug.serve" --onFailure "echo WHOOPSY! Server compilation failed"',
        },
        test: {
            default: 'echo \'nothing\'',
        }
    }
}