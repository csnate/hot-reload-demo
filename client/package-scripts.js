const { series } = require("nps-utils");

module.exports = {
    scripts: {
        default: 'ng serve',
        build: {
            default: series.nps('build.angular', 'build.copy-client'),
            angular: 'ng build --prod',
            'copy-client': 'cp -R dist/. ../server/client-dist',
        },
        debug: {
            default: 'ng serve --host 0.0.0.0 --disable-host-check --poll=100'
        },
        test: {
            default: 'ng test --watch=false'
        }
    }
}