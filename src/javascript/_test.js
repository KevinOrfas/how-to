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
            assert.equal(getDisplayProperty(element), 'none');

            // reset
            //remove test element
            removeElement(element);
        });
        
    });

    function getDisplayProperty(element) {
        var styles =  getComputedStyle(element);
        return styles.getPropertyValue('display');
    }

    function addElement(tagName){
        var element = document.createElement(tagName);
        document.body.appendChild(element);
        return element;
    }

    function removeElement(element) {
        element.parentNode.removeChild(element);
    }


   


    
})();