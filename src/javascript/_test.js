(function(){
    'use strict';
   
    var assert = require('./assert.js');
    var tabs = require('./tabs.js');

    describe('Tabs', function() {
        it('hiddes an elament', function() {
            //arrange 
            //create the lement
            var element = addElement('div');
            //act
            tabs.initialize(element);

            //assert element is not vivisble
            var styles =  getComputedStyle(element);
            var display = styles.getPropertyValue('display');
           
            assert.equal(display, 'none');

            // reset
            //remove test element
        });
        
    });

    function addElement(tagName){
        var element = document.createElement(tagName);
        document.body.appendChild(element);
        return element;
    }


   


    
})();