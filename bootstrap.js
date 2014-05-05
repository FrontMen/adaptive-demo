curl.config({
	"paths": {
		"curl/plugin/": "lib/curl/src/curl/plugin",
		"handlebars" : "lib/handlebars/handlebars.amd"
	},
	"packages": {
	    "hbs": {
	        "location": "lib/curl-adaptive-handlebars/src",
	        "main": "hbs.js"
	    }
	},
    pluginPath: 'lib/curl/src/curl/plugin'
});

curl(['components/navigation/navigation.bar'], function (NavigationBar) {
    var navigation = new NavigationBar({"logo": 'img/logo_white.png'});

   
    document.querySelector('[data-navigation]').appendChild(navigation.element);
});