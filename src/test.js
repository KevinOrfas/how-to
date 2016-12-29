(function(){
    'use strict';
    var assert = require('chai').assert;

    function add(a,b) {
        return a + b;
    }

    describe('Addition', function(){
        it('adds positive numbers', function(){
            assert.equal(add(3,4), 7);
        });
        it('uses IEEE 754 floating point', function(){
            assert.equal(add(0.1,0.2), 0.30000000000000004);
        });
    });
    
})();