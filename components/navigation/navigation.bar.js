define(['../component', 'hbs!./navigation_bar','css!./navigation.css'], 
       function (UIComponent, template) {
	var navigationType = {
		primary: 'ui-button--primary'
	},

		Navigation =  function(attributes) {
			UIComponent.call(this, attributes || Navigation.attributes);
		};

	Navigation.prototype	= Object.create(UIComponent.prototype);

	Navigation.attributes	= {'content': 'Not provided'};

	Navigation.prototype.set = function(name, value) {
		var object = name;
		if (typeof object !== 'object') {
			object = {};

			if(name === 'content') {
				object.content = value;
			}
		}

		if(object.content) {
			this.element.textContent = object.content;
		}

		UIComponent.prototype.set.call(this, object);
	};

	Navigation.prototype.toHtmlString = function(options) {
		var attributes = UIComponent.prototype.extendAttributes.call(this, options);

		return template(attributes);
	};

	return Navigation;
});
