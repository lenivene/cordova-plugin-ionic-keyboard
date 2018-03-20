cordova.define("cordova-plugin-ionic-keyboard.keyboard", function(require, exports, module) {
var argscheck = require('cordova/argscheck'),
	utils = require('cordova/utils'),
	exec = require('cordova/exec'),
	channel = require('cordova/channel');


function Keyboard(){}

Keyboard.prototype.fireOnShow = function (height) {
	Keyboard.isVisible = true;
	cordova.fireWindowEvent('keyboardDidShow', {
		'keyboardHeight': height
	});
};

Keyboard.prototype.fireOnHide = function () {
	Keyboard.isVisible = false;
	cordova.fireWindowEvent('keyboardDidHide');
};

Keyboard.prototype.fireOnHiding = function () {
	cordova.fireWindowEvent('keyboardWillHide');
};

Keyboard.prototype.fireOnShowing = function (height) {
	cordova.fireWindowEvent('keyboardWillShow', {
		'keyboardHeight': height
	});
};

Keyboard.prototype.hideKeyboardAccessoryBar = function (hide) {
	exec(null, null, "Keyboard", "hideKeyboardAccessoryBar", [hide]);
};

Keyboard.prototype.close = function () {
	exec(null, null, "Keyboard", "close", []);
};

Keyboard.prototype.show = function () {
	exec(null, null, "Keyboard", "show", []);
};

Keyboard.prototype.disableScroll = function (disable) {
	console.warn("Keyboard.disableScroll() was removed");
};

channel.onCordovaReady.subscribe(function () {
	exec(success, null, 'Keyboard', 'init', []);

	function success(msg) {
		var action = msg.charAt(0);
		if (action === 'S') {
			var keyboardHeight = parseInt(msg.substr(1));
			Keyboard.fireOnShowing(keyboardHeight);
			Keyboard.fireOnShow(keyboardHeight);

		} else if (action === 'H') {
			Keyboard.fireOnHiding();
			Keyboard.fireOnHide();
		}
	}
});

Keyboard.prototype.isVisible = false;

Keyboard.install = function () {
	if (!window.plugins) {
		window.plugins = {};
	}

	window.plugins.Keyboard = new Keyboard();

	return window.plugins.Keyboard;
};

cordova.addConstructor(Keyboard.install);
});
