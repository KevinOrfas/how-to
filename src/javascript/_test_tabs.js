/*jshint esversion: 6 */
(function(){
    'use strict';
   
    var assert = require('./assert.js');
    var tabs = require('./tabs.js');

    describe('Tabs', function() {

        const ACTIVE_TAB = 'activeClass';
        const HIDDEN_CONTENT = 'hideClass';
        const IRRELEVANT = 'irrelevant';
        var container;

        beforeEach(function(){
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(function(){
            removeElement(container);
        });

        it('use a class to hide all content elements except the default upon initialization', function() {
            var defaultTab = createTab();
            
            var content1 = createTabContent();
            var defaultContent = createTabContent();
            var content3 = createTabContent();

            tabs.initialize({
                tabs: [createTab(), defaultTab, createTab()],
                content: [content1, defaultContent, content3],
                defaultTab: defaultTab,
                activeTabClass: IRRELEVANT,
                hiddenContentClass: HIDDEN_CONTENT
            });
            
          
            assertContentHidden(content1, 'element1');
            assertContentVisible(defaultContent, 'default element');
            assertContentHidden(content3, 'element3');
           
        });

        function assertContentHidden(element, elementName) {
            assert.equal(getClasses(element), HIDDEN_CONTENT, elementName + ' should be hidden');
        }

        function assertContentVisible(element, elementName) {
            assert.equal(getClasses(element), '', elementName + ' should not be hidden');
        }

        it('styles the default tab  with a class upon initialization', function(){
            var tab1 = createTab();
            var defaultTab = createTab();
            var tab3 = createTab();

            var defaultContent = createTabContent();

            tabs.initialize({
                tabs: [tab1, defaultTab, tab3],
                content: [ createTabContent(), defaultContent, createTabContent() ],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: IRRELEVANT
            });

            assertTabInactive(tab1, 'tab 1');
            assertTabActive(defaultTab, 'defaultTab');
            assertTabInactive(tab3, 'tab 3');
            assert.equal(getClasses(defaultTab), ACTIVE_TAB);
        });

        function assertTabActive(element, elementName) {
            assert.equal(getClasses(element), ACTIVE_TAB, elementName + ' defaultTab should be active');
        }

        function assertTabInactive(element, elementName) {
            assert.equal(getClasses(element), null,  elementName + ' should not be styled');
        }

        it('switch content when tab is clicked ', function(){
            var tab1 = createTab();
            var tab2 = createTab();
            var tab3 = createTab();

            var content1 = createTabContent();
            var content2 = createTabContent();
            var content3 = createTabContent();

            tabs.initialize({
                tabs: [tab1, tab2, tab3],
                content: [ content1, content2, content3 ],
                defaultTab: tab1,
                activeTabClass:ACTIVE_TAB,
                hiddenContentClass: HIDDEN_CONTENT
            });

            tab2.click();
            assertContentVisible(content2, 'content 2');
            assertContentHidden(content1, 'content 1');
            // assertContentHidden(content3, 'content 3');

            tab3.click();
            assertContentVisible(content3, 'content 3');

        });

        it('preserves existing classes when adding new classes', function() {
            var defaultTab = createTab();
            defaultTab.setAttribute('class', 'existingTabClass');

            var defaultContent = createTabContent();
            var hiddenContent = createTabContent();
			hiddenContent.setAttribute('class', 'existingContentClass');

             tabs.initialize({
                tabs: [defaultTab, createTab()],
                content: [ defaultContent, hiddenContent ],
                defaultTab: defaultTab,
                activeTabClass: 'activeTab',
                hiddenContentClass: 'hiddenContent'
            });

            assert.equal(getClasses(defaultTab), 'existingTabClass activeTab', 'tab should preserve existing classes');
			assert.equal(getClasses(hiddenContent), 'existingContentClass hiddenContent', 'content element should preserve existing classes');
		});

        
        

		function getClasses(element) {
			return element.getAttribute('class');
		}

        function createTab() {
            var tab = addElement('div');
            tab.innerHTML = 'tab';
            return tab;
        }

        function createTabContent() {
            var content = addElement('div');
            content.innerHTML = 'content';
            return content;
        }

		function addElement(tagName) {
			var element = document.createElement(tagName);
			container.appendChild(element);
			return element;
		}

		function removeElement(element) {
			element.parentNode.removeChild(element);
		}

	});

   


    
})();