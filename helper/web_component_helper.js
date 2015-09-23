module.exports = function HawkejsWebComponent(Hawkejs, Blast) {

	var WC = Hawkejs.Helper.extend(function WebComponentHelper(view) {
		Hawkejs.Helper.call(this, view);
	});

	/**
	 * Import a webcomponent
	 *
	 * @author   Jelle De Loecker   <jelle@kipdola.be>
	 * @since    1.0.0
	 * @version  1.0.0
	 *
	 * @param    {String}   name
	 */
	WC.setMethod(function load(name) {
		this.view.script(['/public/web-components/' + name + '/' + name + '.js']);
		this.view.style('web-components/' + name + '/' + name);
	});

};