(function() {

	var template = xtag.createFragment('<div class="x-panel-header"></div><div class="x-panel-actions"></div><div class="x-panel-content"></div>'),
	    XPanel,
	    XCard;

	XPanel = xtag.register('x-panel', {
		// extend existing elements
		lifecycle:{
			created: function(){

				console.log('Created panel', this);
				window.p = this;
				
			},
			inserted: function(){
				// fired each time a component
				// is inserted into the DOM
				console.log('Inserted', this);
			},
			removed: function(){
				// fired each time an element
				// is removed from DOM
			},
			attributeChanged: function(){
				// fired when attributes are set
			}
		},
		events: {
			'click:delegate(x-toggler)': function(){
				// activate a clicked toggler
			}
		},
		accessors: {
			'togglers': {
				get: function(){
					// return all toggler children
				},
				set: function(value){
					// set the toggler children
				}
			}
		},
		methods: {
			nextToggler: function(){
				// activate the next toggler
			},
			previousToggler: function(){
				// activate the previous toggler
			}
		}
	});

	xtag.register('x-card', {
		prototype: XPanel.prototype,
		lifecycle: {
			created: function() {
				console.log('Created card')
			}
		}
	});
}());