/* globals jake:false, desc:false, task:false, complete:false, fail:false */
(function(){
    'use strict';

    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    var karma = require('simplebuild-karma');

    var KARMA_CONFIG = 'karma.conf.js';
    
    //**** General-purpose tasks 

    desc('Start the Karma server (run this first)');
    task('karma', function(){
        console.log('Starting the Karma server');
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, {async : true });

    desc('Default build');
    task('default', ['version', 'lint', 'test'], function(){
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
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, {async: true});

    desc('Run tests');
    task('test', function(){
        console.log('Testing JavaScript:');
        karma.run({
            configFile: KARMA_CONFIG,
            exprectedBrowsers: ['Opera 42.0.2393 (Mac OS X 10.11.5)', 'Chrome 55.0.2883 (Mac OS X 10.11.5)']
        }, complete, fail);
    }, { async : true });


    function lintOptions(){
        return {
            bitwise: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            futurehostile: true,
            latedef: 'nofunc',
            noarg: true,
            nocomma: true,
            nonbsp: true,
            nonew: true,
            strict: true,
            undef: true,
            node: true,
            browser: true,
        };
    }

    function lintGlobals(){
        return {
            //Mocha
            describe: false,
            it: false,
            before: false,
            beforeEach: false,
            afterEach: false
        };
    }
})();