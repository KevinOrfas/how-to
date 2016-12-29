(function(){
    'use strict';
    var assert = require('chai').assert;

    function add(a,b) {
        return a + b;
    }

    var actual = add(3,4);
    var expected = 7;

    function assertEqual(actual, expected) {
        if(actual !== expected) throw new Error('Expected ' + expected + ' but got ' + actual );   
        // try {
        //  if(actual !== expected) throw new Error('Expected ' + expected + ' but got ' + actual );
        // } catch (error) {
        //     console.log('Caught exception ' + error);
        // }
    }

    // assertEqual(actual, expected);

    assert.equal(actual, expected);
    // expect(actual).to.equal(7);
    // add(3,4).should.equal(7);

    
})();