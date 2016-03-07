(function() {

	var button_template,
	    bar_template;

	button_template = __Protoblast.parseHTML('<span role="button" class="x-hold-label"></span>');
	bar_template = __Protoblast.parseHTML('<span class="x-hold-bar"></span>');

	hawkejs.registerElement('x-hold', {
		createdCallback: function created() {

			// Get the initial content
			var that = this,
			    hold_timer,
			    button = button_template.cloneNode(true),
			    duration,
			    count = 0,
			    start,
			    input,
			    bar = bar_template.cloneNode(true);

			// Insert the fragment into the document
			this.appendChild(button);
			this.appendChild(bar);

			// Get the wanted duration of holding in ms
			duration = Number(this.getAttribute('duration')) || 1000;

			// Set the button title
			button.innerHTML = this.getAttribute('title');

			this.addEventListener('mousedown', function onDown(e) {
				// Get the start timer
				start = Date.now();

				hold_timer = setInterval(function updateBar() {

					var new_event,
					    elapsed,
					    pct;

					// Calculate how much time has elapsed
					elapsed = Date.now() - start;

					// Calculate the percentage
					pct = ~~((elapsed / duration) * 100);

					if (pct <= 100) {
						// Set the style
						bar.style.width = pct + '%';
					}

					if (pct > 99) {
						clearInterval(hold_timer);

						// Create a new custom event called "longclick"
						new_event = new CustomEvent('longclick');
						that.dispatchEvent(new_event);
					}
				}, 10);
			});

			this.addEventListener('mouseup', function onUp(e) {

				// Clear the interval
				clearInterval(hold_timer);

				// Reset the width
				bar.style.width = '0%';
			});
		}
	});
}());