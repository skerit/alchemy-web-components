(function() {

	var template = __Protoblast.parseHTML('<div class="x-panel-header"></div><div class="x-panel-actions"></div><div class="x-panel-content"></div>');

	hawkejs.registerElement('x-panel', {
		created: function onCreate() {
			console.log('Created panel', this);
		}
	});
}());