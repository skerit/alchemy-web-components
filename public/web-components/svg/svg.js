// Require the svginjector
hawkejs.require('svginjector');

(function() {

	var XSvg;

	function applyToElement(element, src) {

		var svg;

		// Apply svginjector when data-src changes
		hawkejs.require('svginjector', function() {

			// Clear the element internals
			element.innerHTML = '';

			// Create new element
			svg = document.createElement('div');

			// Add attribute
			svg.setAttribute('data-src', src);

			// Add it to the x-svg element
			element.appendChild(svg);

			SVGInjector(svg);
		});
	}

	XSvg = xtag.register('x-svg', {
		lifecycle:{
			attributeChanged: function(key, old_value, new_value){
				if (key == 'data-src') {
					applyToElement(this, new_value);
				}
			}
		},
		accessors: {
			dataSrc: {
				attribute: {name: 'data-src'},
				set: function(src) {
					applyToElement(this, src);
				}
			}
		}
	});

}());