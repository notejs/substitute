(function(window, undefined){
  // reference dojo/string( dojotoolkit.org )
	
	window.substitute = function(
		/*String*/		template,
		/*Object|Array*/map,
		/*Function?*/	transform,
		/*Object?*/		thisObject){
		
		// summary:
		//		Performs parameterized substitutions on a string. Throws an
		//		exception if any parameter is unmatched.
		// template:
		//		a string with expressions in the form `${key}` to be replaced or
		//		`${key:format}` which specifies a format function. keys are case-sensitive.
		// map:
		//		hash to search for substitutions
		// transform:
		//		a function to process all parameters before substitution takes
		//		place, e.g. mylib.encodeXML
		// thisObject:
		//		where to look for optional format function; default to the global
		//		namespace
		
		thisObject = thisObject || window;
		transform = transform || thisObject["transform"] || function(v){ return v; };

		return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(match, key, format){
				var value = map[key] || match;
				format && (value = thisObject[format](value, key));
				return transform(value, key).toString();
			}); // String
	}
}(window));
