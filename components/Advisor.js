/* jshint undef: false*/
define([], function() {


	
	function Advisor() {	
	}

	Advisor.prototype.find = function(needle) {
		return navigator.userAgent.toLowerCase().indexOf(needle) !== -1;
	};

	Advisor.prototype.android = function() {
		return this.find('android');
	};

	Advisor.prototype.androidPhone = function() {
		return this.android() && this.find('mobile');
	};

	Advisor.prototype.androidTablet = function() {
		return this.android() && !this.find('mobile');
	};

	Advisor.prototype.blackberry = function() {
		return this.find('blackberry') || this.find('bb10') || this.find('rim');
	};

	Advisor.prototype.blackberryPhone = function() {
		return this.blackberry() && !this.find('tablet');
	};

	Advisor.prototype.blackberryTablet = function() {
		return this.blackberry() && this.find('tablet');
	};

	Advisor.prototype.firefoxOs = function() {
		return (this.find('(mobile;') || this.find('(tablet;')) && this.find('; rv:');
	};

	Advisor.prototype.firefoxOsPhone = function() {
		return this.firefoxOs() && this.find('mobile');
	};

	Advisor.prototype.firefoxOsTablet = function() {
		return this.firefoxOs() && this.find('tablet');
	};

	Advisor.prototype.ios = function() {
		return this.iphone() || this.ipod() || this.ipad();
	};

	Advisor.prototype.ipad = function() {
		return this.find('ipad');
	};

	Advisor.prototype.iphone = function() {
		return this.find('iphone');
	};

	Advisor.prototype.ipod = function() {
		return this.find('ipod');
	};

	Advisor.prototype.meego = function() {
		return this.find('meego');
	};

	Advisor.prototype.windows = function() {
		return this.find('windows');
	};

	Advisor.prototype.windowsPhone = function() {
		return this.windows() && this.find('phone');
	};

	Advisor.prototype.windowsTablet = function() {
		return this.windows() && this.find('touch');
	};

	Advisor.prototype.isOs = function() {
		return this.android() || this.ios() || this.windows() || this.blackberry() || this.firefoxOs() || this.meego();
	};

	Advisor.prototype.isPalm = function() {
		return this.androidPhone() || this.iphone() || this.ipod() || this.windowsPhone() || this.blackberryPhone() || this.firefoxOsPhone() || this.meego()? 'palm': false;
	};

	Advisor.prototype.isLap = function() {
		return this.ipad() || this.androidTablet() || this.blackberryTablet() || this.windowsTablet() || this.firefoxOsTablet()? 'lap': false;
	};

	Advisor.prototype.getDeviceType = function(){

		return this.isLap() || this.isPalm() || '';
	};

	return new Advisor();
});
