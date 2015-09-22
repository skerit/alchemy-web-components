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

	/*
	 * The x-button-group element
	 *
	 * @author      Jelle De Loecker   <jelle@develry.be>
	 * @since       1.0.0
	 * @version     1.0.0
	 */
	hawkejs.registerElement('x-button-group', {
		createdCallback: function created() {

			var that = this;

			// Listen to the click event
			this.addEventListener('click', function onClick(e) {

				var all_buttons,
				    button,
				    i;

				// Get the clicked button
				button = e.target.closest('button');

				if (that.radio) {
					// Get all the buttons
					buttons = that.getElementsByTagName('button');

					// Remove the "selected" class from all of them
					for (i = 0; i < buttons.length; i++) {
						buttons[i].classList.remove('selected');
					}
				}

				// Add the "selected" class to this button
				button.classList.add('selected');
			});
			window.bg = this;
		}, radio: {
			attribute: true
		}, value: {
			get: function getValue() {

				var value   = '',
				    buttons = this.querySelectorAll('button.selected'),
				    button,
				    i;

				for (i = 0; i < buttons.length; i++) {
					button = buttons[i];

					if (button.value) {
						if (value) value += ',';
						value += button.value;
					}
				}

				return value;
			}
		}
	});

	var db_template = __Protoblast.parseHTML('<button class="x-dropdown-default">Dropdown</button>'),
	    dw_template = __Protoblast.parseHTML('<x-button-group class="x-dropdown-wrapper" vertical></x-button-group>');

	/*
	 * The x-button-dropdown element
	 *
	 * @author      Jelle De Loecker   <jelle@develry.be>
	 * @since       1.0.0
	 * @version     1.0.0
	 */
	hawkejs.registerElement('x-button-dropdown', {
		createdCallback: function created() {

			var that = this,
			    toggle_button,
			    dropdown_wrapper,
			    last_button = null,
			    is_split = true,
			    button,
			    li,
			    i;

			// Look for the toggle button
			toggle_button = this.getElementsByClassName('x-dropdown-toggle')[0];

			// If there is no toggle button, look for a default one
			if (!toggle_button) {
				is_split = false;
				toggle_button = this.getElementsByClassName('x-dropdown-default')[0];
			}

			if (!toggle_button) {
				toggle_button = db_template.cloneNode(true);
				this.insertBefore(toggle_button, this.firstChild || null);
			}

			// Set the aria attribute on the button
			toggle_button.setAttribute('aria-haspopup', 'true');

			// Get the dropdown wrapper
			dropdown_wrapper = this.getElementsByClassName('x-dropdown-wrapper')[0];

			if (!dropdown_wrapper) {
				dropdown_wrapper = dw_template.cloneNode(true);
				this.insertBefore(dropdown_wrapper, toggle_button.nextSibling || null);
			}

			// Start putting the buttons in their right place
			for (i = this.children.length - 1; i > -1; i--) {
				button = this.children[i];

				// As soon as we reach a toggle button, we stop
				if (button.matches('button.x-dropdown-toggle')) {
					break;
				}

				if (!button.matches('button:not(.x-dropdown-default)')) {
					continue;
				}

				dropdown_wrapper.insertBefore(button, last_button);

				last_button = button;
			}

			window.bd = this;
		}, radio: {
			attribute: true
		}, value: {
			get: function getValue() {

				var value   = '',
				    buttons = this.querySelectorAll('button.selected'),
				    button,
				    i;

				for (i = 0; i < buttons.length; i++) {
					button = buttons[i];

					if (button.value) {
						if (value) value += ',';
						value += button.value;
					}
				}

				return value;
			}
		}
	});
}());