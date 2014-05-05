define(['../component', '../Advisor', 'css!./navigation.css'], 
       function (UIComponent, Advisor) {
	var navigationType = {
		primary: 'ui-button--primary'
	},

		template = null,
		deviceType,

		Navigation =  function(attributes) {
			if(Advisor){
				deviceType = Advisor.getDeviceType()? '.' + Advisor.getDeviceType() : '';
			}

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

		return curl(['hbs!./components/navigation/navigation_bar' + deviceType], 
		     function (adaptiveTemplate){
					return adaptiveTemplate;
			});
	};

	return Navigation;
});
