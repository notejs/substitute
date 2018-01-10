# substitute.js

A javascript micro template, reference [Dojo](http://dojotoolkit.org)

## Usage

### Basic

```javascript
    import substitute from 'substitute.js';

    const template = "<div>${name}</div><div>${age}</div>";

	const map = {
        name : "Linus Wang",
        age: 23
	};

	const string = substitute(template, map);
```

### Use format

```javascript
    const template = "${name:nameFmt} ${age:ageFmt}";

	const map = {
		name : "Linus Wang"
	};

	const thisObject = {
		nameFmt : function(value, key){
			return key + " is: " + value;
		}, 
		ageFmt : function(value, key){
			return key + " is: " + value;
		},
		transform : function(value, key){
			return value;
		}
	}

	const string = substitute(template, map, null, thisObject);
```