(function(){
    'use strict';

    var semver = require('semver');
    

    desc('Default build');
    task('default', ['version', 'lint'], function(){
        console.log('\n\nBuild OK');
    });

    desc('Check NodeJS version');
    task('version', function(){
        console.log('Checking NodeJS version: .');
       
        var packageJson = require('./package.json');
        var expectedVersion = 'v' + packageJson.engines.node;
        var actualVersion = process.version;
        if(semver.neq(expectedVersion, actualVersion)) {
            fail('Incorrect Node version does not match ' + expectedVersion + ', but was ' +actualVersion);
        }
        console.log(process.version);
    });

    desc('Lint the code');
    task('lint', function(){
        console.log('Linting JavaScript: .');

        jake.exec('node node_modules/jshint/bin/jshint jakefile.js', {interactive: true}, complete);

    }, {async: true});

})();