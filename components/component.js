/* jshint undef: false*/
define([], function() {
	function UIComponent(attributes) {
		Object.defineProperty(this, 'attributes', { value : attributes || {}, enumerable:true });
		Object.defineProperty(this, 'handlers', { value : {}, enumerable:true });
		
		var fragment = document.createDocumentFragment(),
			div = document.createElement('div');

			fragment.appendChild(div);

			Object.defineProperty(this, 'element', { value : fragment.firstChild, enumerable:false});

			div.innerHTML = this.toString(this.attributes).then(function(string){
				this.element.innerHTML = string(this.attributes);
			}.bind(this));

		
	}

	// Attributes handling
	UIComponent.prototype.set	= function(name, value) {
		if (typeof name === 'object') {
			Object.keys(name).forEach(function(key) {
				this.attributes[key] = name[key];
			}.bind(this));
		} else {
			this.attributes[name] = value;
		}
	};

	UIComponent.prototype.get	= function(name) {
		return this.attributes[name];
	};

	// Events handling
	UIComponent.prototype.on	= function(event, handler) {
		if (!(event in this.handlers)){
			this.handlers[event] = [];
		}

		this.handlers[event].push(handler);
	};

	UIComponent.prototype.off	= function(event, handler) {
		if (!(event in this.handlers)){
			return;
		}

		this.handlers[event] = this.handlers[event].filter(function(item) {
			return item === handler;
		});

		if (!this.handlers[event].length){
			delete this.handlers[event];
		}
	};

	UIComponent.prototype.trigger = function(event, data) {
		if (!(event in this.handlers)){
			return;
		}
		this.handlers[event].forEach(function(handler) {
			handler.call(this, data);
		}.bind(this));
	};

	UIComponent.prototype.toString = function() {
		return this.toHtmlString(this.attributes);
	};

	UIComponent.prototype.extendAttributes = function(options){
		var attributes = options,
			hashKeys = (options.hash) ? Object.keys(options.hash) : [],
			pattern = new RegExp('^data-'),
			dataAttributesString = '';

		//execute contents when inside {{#ui:helper}}content{{/ui:helper}}
		if(options.hash && options.fn && options.fn(this)){
			attributes = options.hash;
			attributes.content = options.fn(this);
		}

		//extract data-attributes from hash and add them to the `data` string
		hashKeys.forEach(function(key){
			if(pattern.test(key)){
				dataAttributesString += key + '="' + options.hash[key] +'" ';
				delete options.hash[key];
			}
		}.bind(this));

		if(dataAttributesString.length > 0){
			attributes.dataAttributes = dataAttributesString.trim();
		}
		return attributes;
	};

	return UIComponent;
});
