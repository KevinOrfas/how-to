/* globals jake:false, desc:false, task:false, complete:false, fail:false */
(function(){
    'use strict';

    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    
    //**** Gebral purpose tasks 
    desc('Default build');
    task('default', ['version', 'lint'], function(){
        console.log('\n\nBuild OK');
    });

    desc('Run localhost server');
    task('run', function(){
        jake.exec('node node_modules/http-server/bin/http-server src', {interactive: true}, complete);
        console.log('Run http server');
    });

    //***** Supporting task 
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

    desc('Lint JavaScript code');
    task('lint', function(){
        process.stdout.write('Linting JavaScript: ');
        
        jshint.checkFiles({
            files: ['jakefile.js', 'src/**/*.js'],
            options: {
                bitwise: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                futurehostile: true,
                latedef: true,
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                strict: true,
                undef: true,
                node: true,
                browser: true,
            },
            globals: {}
        }, complete, fail);
    }, {async: true});

})();