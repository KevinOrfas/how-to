/* globals jake:false, desc:false, task:false, complete:false, fail:false, directory:false */
(function(){
    'use strict';

    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    var karma = require('simplebuild-karma');
    var shell = require('shelljs');

    var KARMA_CONFIG = 'karma.conf.js';
    var DIST_DIR = 'generated/dist';
    
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
    task('run', ['build'], function(){
        console.log('Running http server');
        jake.exec('node node_modules/http-server/bin/http-server ' + DIST_DIR, { interactive: true }, complete);
    }, { async : true});

    desc('Erase all gnerated files');
    task('clean', function(){
        console.log('Erasing all gnerated files');
        shell.rm('-rf', 'generated');
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
            files: ['jakefile.js', 'src/javascript/**/*.js'],
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, {async: true});

    desc('Run tests');
    task('test', function(){
        console.log('Testing JavaScript:');
        karma.run({
            configFile: KARMA_CONFIG,
            exprectedBrowsers: [
                "Firefox 40.0.0 (Mac OS X 10.10.0)",
				"Chrome 45.0.2454 (Mac OS X 10.10.5)",
				"IE 11.0.0 (Windows 7 0.0.0)",
				"IE 9.0.0 (Windows 7 0.0.0)",
				"Safari 9.0.0 (Mac OS X 10.10.5)",
				"Mobile Safari 8.0.0 (iOS 8.4.0)",
				"Chrome Mobile 44.0.2403 (Android 6.0.0)"
                ],
            strict: !process.env.loose
        }, complete, fail);
    }, { async : true });

    desc('Building dist: ');
    task('build', [DIST_DIR], function(){
        console.log('Building distribution directory:');
        shell.rm('-rf', DIST_DIR + '/*');
        shell.cp('src/content/*', DIST_DIR);
        jake.exec(
            'node node_modules/browserify/bin/cmd.js src/javascript/app.js -o ' + DIST_DIR + '/bundle.js', 
            { interactive: true }, 
            complete
        );
    }, { async : true});

    directory(DIST_DIR);


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
            afterEach: false,
        };
    }
})();