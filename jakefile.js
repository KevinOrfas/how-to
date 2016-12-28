(function(){
    'use strict';
    
    const EXPECTED_NODE_VERSION = 'v4.2.6';

    desc('Default build');
    task('default', ['version'], function(){
        console.log('\n\nBuild OK');
    });

    desc('Check NodeJS version');
    task('version', function(){
        console.log('Checking NodeJS version: .');

        const actualVersion = process.version;
        if(actualVersion !== EXPECTED_NODE_VERSION) {
            fail('Incorrect Node version does not match ' + EXPECTED_NODE_VERSION + ', but was ' +actualVersion);
        }
        console.log(process.version);
    });

})();