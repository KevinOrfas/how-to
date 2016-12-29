(function(){
    'use strict';

    function add(a,b) {
        return a + b;
    }


    var actual = add(3,4);
    var expected = 8;

    // try {
    //     if(actual !== expected) throw new Error('Expected ' + expected + ' but got ' + actual );    
    // } catch (error) {
    //     console.log('Caught exception ' + error);
    // }

    function assertEqual(actual, expected) {
        if(actual !== expected) throw new Error('Expected ' + expected + ' but got ' + actual );   
    }

    assertEqual(actual, expected);

    

    
})();