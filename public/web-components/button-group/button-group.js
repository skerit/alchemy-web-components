(function() {

	/*
	 * The x-button-group element
	 *
	 * @author      Jelle De Loecker   <jelle@develry.be>
	 * @since       1.0.0
	 * @version     1.0.0
	 */
	var ButtonGroup = hawkejs.registerElement('x-button-group', {
		createdCallback: function created() {

			var that = this,
			    is_toggle = this.hasAttribute('toggle');

			// Listen to the click event
			this.addEventListener('click', function onClick(e) {

				var all_buttons,
				    new_event,
				    button,
				    state,
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

				if (is_toggle && button.classList.contains('selected')) {
					button.classList.remove('selected');
					state = false;
				} else {
					// Add the "selected" class to this button
					button.classList.add('selected');
					state = true;
				}

				// Create a new custom event called "change"
				new_event = new CustomEvent('change');
				that.dispatchEvent(new_event);

				if (is_toggle) {
					new_event = new CustomEvent('toggled', {
						detail: {
							state: state,
							button: button,
							value: button.value
						}
					});

					that.dispatchEvent(new_event);
				}
			});
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
	    dw_template = __Protoblast.parseHTML('<x-button-group class="x-dropdown-wrapper" vertical radio></x-button-group>'),
	    split_template = __Protoblast.parseHTML('<button class="x-dropdown-toggle">&#x25BE;</button>');

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
			    default_button,
			    last_button = null,
			    is_split,
			    button,
			    temp,
			    li,
			    i;

			// Is this a split dropdown?
			is_split = this.hasAttribute('split');

			// Look for the toggle button
			toggle_button = this.getElementsByClassName('x-dropdown-toggle')[0];

			// If there is no toggle button, look for a default one
			if (!toggle_button) {
				if (is_split) {
					// Clone the toggle button template with a caret
					toggle_button = split_template.cloneNode(true);

					// Get the first button
					default_button = this.children[0];

					if (default_button && default_button.className) {
						toggle_button.className += ' ' + default_button.className;
					}

					// Get the element where we want to insert it
					temp = this.children[1];

					this.insertBefore(toggle_button, temp || null);
				} else {
					toggle_button = this.getElementsByClassName('x-dropdown-default')[0];
				}
			}

			if (!toggle_button) {
				toggle_button = db_template.cloneNode(true);
				default_button = toggle_button;
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

			// Listen to the change event on the wrapper
			dropdown_wrapper.addEventListener('change', function onChange(e) {
				that.value = this.value;
			});

			// Now attach the event listener to the default button
			if (default_button) {
				default_button.addEventListener('click', function onClick(e) {

					var new_event;

					that.value = this.value;

					// Create a new event
					new_event = document.createEvent('Event');

					// The event name is 'change'
					new_event.initEvent('change', true, true);

					that.dispatchEvent(new_event);
				});
			}
		}, radio: {
			attribute: true
		}
	});
}());