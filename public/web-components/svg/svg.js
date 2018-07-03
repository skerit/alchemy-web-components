// Require the svginjector
hawkejs.require('svginjector');

(function registerSVG() {

	function applyToElement(element, src) {

		var svg;

		// Apply svginjector when data-src changes
		hawkejs.require('svginjector', function gotSvgInjector() {

			// Clear the element internals
			element.innerHTML = '';

			// Create new element
			svg = document.createElement('div');

			if (src[0] !== '/' && src.indexOf('http') == -1) {
				src = '/media/static/' + src;
			}

			if (src.indexOf('.svg') === -1) {
				src += '.svg';
			}

			// Add attribute
			svg.setAttribute('data-src', src);

			// Add it to the x-svg element
			element.appendChild(svg);

			SVGInjector(svg, {each: function injected(svg) {
				// Fix scaling bug
				//svg.setAttribute('width', '100');
				//svg.setAttribute('height', '100');
			}});
		});
	}

	if (hawkejs.constructor.elementHasBeenRegistered('x-svg')) {
		return;
	}

	hawkejs.registerElement('x-svg', {
		attributeChanged: function onChange(key, old_value, new_value) {
			if (key == 'data-src') {
				applyToElement(this, new_value);
			}
		}
	});

}());