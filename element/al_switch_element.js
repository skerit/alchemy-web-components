module.exports = function SwitchElement(Hawkejs, Blast) {

	/**
	 * The Colour Slider element
	 *
	 * @author   Jelle De Loecker   <jelle@develry.be>
	 * @since    0.2.1
	 * @version  0.2.1
	 */
	var Switch = Function.inherits('Hawkejs.Element', function AlSwitch() {

		var that = this;

		// Get the label, should be first descendant
		this.label_element = this.grab('label', 'al-switch-label');

		// Get the input checkbox
		this.checkbox_element = this.grab('input', 'al-switch-checkbox');
		this.checkbox_element.setAttribute('type', 'checkbox');

		// Get the span element
		this.span_element = this.grab('span', 'al-switch-span');

		// Put the elements in order
		this.label_element.appendChild(this.checkbox_element);
		this.label_element.appendChild(this.span_element);

		// Stop the checkbox change event
		this.checkbox_element.addEventListener('change', function onChange(e) {
			e.stopPropagation();
		});

		// Listen to the click event
		this.checkbox_element.addEventListener('click', function onClick(e) {
			that.checked = this.checked;
		});

		AlSwitch.super.call(this);
	});

	/**
	 * CSS file to use
	 *
	 * @author   Jelle De Loecker <jelle@develry.be>
	 * @since    0.2.1
	 * @version  0.2.1
	 */
	Switch.setProperty('css_file', 'switch/switch');

	/**
	 * Add the checked attribute property setter
	 *
	 * @author   Jelle De Loecker <jelle@develry.be>
	 * @since    0.2.1
	 * @version  0.2.1
	 */
	Switch.setAttribute('checked', null, function setChecked(value) {

		var change_event;

		value = !!value;

		// Emit the change event only when the new value differs
		// from the previous value
		if (this.checked !== value) {
			change_event = new CustomEvent('change');
			this.dispatchEvent(change_event);
		}

		// Set this value on the checkbox
		// The checkbox will fire an event that will buble up
		this.checkbox_element.checked = value;

		return value;
	}, {boolean: true});

	/**
	 * Link the 'value' property to 'checked'
	 *
	 * @author   Jelle De Loecker <jelle@develry.be>
	 * @since    0.2.1
	 * @version  0.2.1
	 */
	Switch.setProperty(function value() {
		return this.checked;
	}, function setValue(val) {
		return this.checked = val;
	});
};