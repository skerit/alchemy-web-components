(function() {

	var template = __Protoblast.parseHTML('<div class="x-panel-header"></div><div class="x-panel-actions"></div><div class="x-panel-content"></div>');

	hawkejs.registerElement('x-panel', {
		created: function onCreate() {

			var that = this,
			    is_tabbed = this.hasAttribute('tabs'),
			    all_content = this.getElementsByTagName('x-panel-body'),
			    active_content = this.getElementsByClassName('active'),
			    tabs;

			if (!is_tabbed) {
				return;
			}

			tabs = this.querySelector('x-panel-tabs');

			// Listen to the click on the panel
			tabs.addEventListener('click', switchTab);

			// Make sure at least 1 content element is active
			if (active_content.length != 2 && all_content.length) {
				setElementActive();
			}

			/**
			 * Listen to hash changes
			 *
			 * @author   Jelle De Loecker <jelle@develry.be>
			 * @since    1.0.0
			 * @version  1.0.0
			 */
			hawkejs.scene.on('hashchange', function onHashChange(new_hash, old_hash) {

				var element;

				if (!new_hash) {
					return;
				}

				element = that.querySelector('[id="' + new_hash.slice(1) + '"]');

				if (element) {
					setElementActive(element);
				}
			});

			/**
			 * Set the given content element as active, and its anchor too
			 * If no element is given, it looks for the most suitable one
			 *
			 * @author   Jelle De Loecker <jelle@develry.be>
			 * @since    1.0.0
			 * @version  1.0.0
			 */
			function setElementActive(content_element) {

				var anchor,
				    hash,
				    i;

				// No element is given, find one
				if (!content_element) {
					if (location.hash) {
						hash = location.hash;
					} else if (active_content.length) {
						if (active_content[0].tagName == 'A') {
							hash = active_content[0].getAttribute('href');
						} else if (active_content[0].tagName == 'X-PANEL-BODY') {
							hash = '#' + active_content[0].getAttribute('id');
							if (hash.length == 1) hash = '';
						}
					}

					if (hash) {
						content_element = that.querySelector('[id="' + hash.slice(1) + '"]');
					}
				}

				if (!content_element) {
					content_element = all_content[0];
				}

				// Remove all the other active classes
				while (active_content.length) {
					active_content[0].classList.remove('active');
				}

				// Set the content element as active
				content_element.classList.add('active');

				// Set the tab anchor as active, too
				anchor = that.querySelector('[href="#' + content_element.getAttribute('id') + '"]');

				if (anchor) {
					anchor.classList.add('active');
				}
			}

			/**
			 * Switch tab on click
			 *
			 * @author   Jelle De Loecker <jelle@develry.be>
			 * @since    1.0.0
			 * @version  1.0.0
			 */
			function switchTab(e) {

				var anchor,
				    target,
				    content,
				    i;

				// Ignore clicks on the element itself
				if (e.target === this) {
					return;
				}

				// Get the clicked anchor
				anchor = e.target.closest('a');

				// Get the target id
				target = anchor.getAttribute('href').slice(1);

				// Get the content
				content = that.querySelector('[id="' + target + '"]');

				setElementActive(content);
			}
		}
	});
}());