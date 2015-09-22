(function() {

	var template,
	    XSwitch,
	    proto,
	    html;

	html = '<label class="x-switch-label">'
	     + '<input type="checkbox" class="x-switch-checkbox"></input>'
	     + '<span class="x-switch-span"></span>'
	     + '</label>';

	template = __Protoblast.parseHTML(html);

	hawkejs.registerElement('x-switch', {
		createdCallback: function created() {

			// Get the initial content
			var cloned = template.cloneNode(true),
			    input,
			    old = document.createElement('span');

			old.setAttribute('class', 'x-switch-text');

			while (this.hasChildNodes()) {
				old.appendChild(this.firstChild);
			}

			// Insert the fragment into the document
			this.appendChild(cloned);

			// Add the old content to the lavel element
			this.getElementsByClassName('x-switch-label')[0].appendChild(old);

			// Set the checkbox input
			this.checkbox_input = this.getElementsByClassName('x-switch-checkbox')[0];

			this.addEventListener('click', function onClick(e) {
				this.checked = this.checkbox_input.checked;
			});
		}, checked: {
			attribute: true,
			get: function getValue() {
				return this.checkbox_input.checked;
			},
			set: function setValue(val) {
				val = !!val;
				this.checkbox_input.checked = val;
			}
		}, value: {
			attribute: true,
			get: function getValue() {
				return this.checkbox_input.checked;
			},
			set: function setValue(val) {
				val = !!val;
				this.checkbox_input.checked = val;
			}
		}
	});
}());