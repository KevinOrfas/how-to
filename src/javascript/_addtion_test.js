(function(){
    'use strict';
    var assert = require('../vendor/chai-4.0.0.js').assert;
    var addition = require('./addition.js');

    describe('Addition', function(){
        it('adds positive numbers', function(){
            assert.equal(addition.add(3,4), 7);
        });
        it('uses IEEE 754 floating point', function(){
            assert.equal(addition.add(0.1,0.2), 0.30000000000000004);
        });
    });
    
})();