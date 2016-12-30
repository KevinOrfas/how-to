(function(){
    'use strict';
    
    var arithmetic = require('./arithmetic.js');
    var assert = require('./assert.js');

    describe('Addition', function(){
        it('adds positive numbers', function(){
            assert.equal(arithmetic.add(3,4), 7);
        });
        it('uses IEEE 754 floating point', function(){
            assert.equal(arithmetic.add(0.1,0.2), 0.30000000000000004);
        });
    });


    describe('Subtraction', function(){
        it('subtracts positive number', function(){
            //arrange
            var expectedResult = 7;

            //act
            var actualResult = arithmetic.subtract(10,3);

            //assert
            assert.equal(actualResult,expectedResult);
        });
        
    });


    
})();