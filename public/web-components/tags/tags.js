(function() {

	var wrap_template,
	    text_template;

	wrap_template = __Protoblast.parseHTML('<div class="x-tags-input"></div>');
	text_template = __Protoblast.parseHTML('<input type="text" autocomplete="off" class="x-tags-text"></input>');

	hawkejs.registerElement('x-tags', {
		createdCallback: function created() {

			// Get the initial content
			var that = this,
			    init_values,
			    wrap = wrap_template.cloneNode(true),
			    text = text_template.cloneNode(true),
			    i;

			// Insert the fragment into the document
			this.appendChild(wrap);
			wrap.appendChild(text);

			// Store the elements
			this.wrap = wrap;
			this.text = text;

			init_values = this.getAttribute('value').split(',');

			for (i = 0; i < init_values.length; i++) {
				this.addItem(init_values[i]);
			}
		},
		addItem: function addItem(id) {
			var element = __Protoblast.parseHTML('<div data-value="' + id + '">' + id + '</div>');
			this.wrap.insertBefore(element, this.text);
		}
	});
}());