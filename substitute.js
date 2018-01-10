
(function(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root);
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["substitute"] = factory(root);
	else
		root["substitute"] = factory(root);
})(typeof self !== 'undefined' ? self : this, function(root) {
	return function(template, map, transform, thisObject){
		/*
		 * summary:
		 *		Performs parameterized substitutions on a string. Throws an
		 *		exception if any parameter is unmatched.
		 * template:
		 *		a string with expressions in the form `${key}` to be replaced or
		 *		`${key:format}` which specifies a format function. keys are case-sensitive.
		 * map:
		 *		hash to search for substitutions
		 * transform:
		 *		a function to process all parameters before substitution takes
		 *		place, e.g. mylib.encodeXML
		 * thisObject:
		 *		where to look for optional format function; default to the global
		 *		namespace
		 */
		
		thisObject = thisObject || root;
		transform = transform || thisObject["transform"] || function(v){ return v; };

		return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(match, key, format){
			var value = map[key] || ("undefined" === typeof map[key] ? match : map[key]);
			format && (value = thisObject[format](value, key));
			return transform(value, key).toString();
		});
	}
});

