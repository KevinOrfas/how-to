(function(){
    'use strict';
    
    

    desc('Default build');
    task('default', ['version'], function(){
        console.log('\n\nBuild OK');
    });

    desc('Check NodeJS version');
    task('version', function(){
        console.log('Checking NodeJS version: .');
       
        let packageJson = require('./package.json');
        let expectedVersion = 'v' + packageJson.engines.node;
        let actualVersion = process.version;
        if(actualVersion !== expectedVersion) {
            fail('Incorrect Node version does not match ' + expectedVersion + ', but was ' +actualVersion);
        }
        console.log(process.version);
    });

})();