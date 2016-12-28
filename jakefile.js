(function(){
    'use strict';

    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    

    desc('Default build')
    task('default', ['version', 'lint'], function(){
        console.log('\n\nBuild OK');
    });

    desc('Check NodeJS version');
    task('version', function(){
        process.stdout.write('Checking NodeJS version: ');
       
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
        process.stdout.write('Linting JavaScript: ');
        jshint.checkFiles({
            files: 'jakefile.js',
            options: {},
            globals: {}
        }, complete, fail);
    }, {async: true});

})();