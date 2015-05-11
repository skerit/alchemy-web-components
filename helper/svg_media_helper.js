module.exports = function HawkejsMedia(Hawkejs, Blast) {

	Blast.on({type: 'extended', descendant: 'MediaHelper'}, function gotMedia(parent, Media) {

		/**
		 * Output an x-svg element
		 *
		 * @author   Jelle De Loecker   <jelle@codedor.be>
		 * @since    1.0.0
		 * @version  1.0.0
		 *
		 * @param    {String}   image
		 * @parma    {Object}   options
		 *
		 */
		Media.setMethod(function svg(src, options) {

			var url;

			if (!options) {
				options = {};
			}

			// Make sure the url ends with .svg
			if (src.indexOf('.svg') == -1) {
				src += '.svg';
			}

			if (src.indexOf('/') == 0) {
				url = src;
			} else {
				url = this.parseURL('/media/static/' + src);
			}

			this.print('<x-svg class="' + (options.class || options.className || '') + '" data-src="' + url + '"></x-svg>');
		});
	});
};