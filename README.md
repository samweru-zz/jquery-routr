jQuery routr
============

## Quick Start

Why another javascript router? The more the merrier :)

```js
	$.routr.add("user/{int}", function(id){

		console.log("User::id->".concat(id));
	})

	$.routr.add("user/add", function(){

		console.log("User::add");
	})

	$.routr.run();
```

The above functions would be accessed through:

1. **localhost/app#user/1**
2. **localhost/app#user/add**

## Usage

a) Adding route
```js
$.routr.add("user/{string}", function(username){})
```
b) Removing route
```js
$.routr.remove("user/{string}")
```
c) Execute route
```js
$.routr.execute("user/add")
```
d) Start listening for routes (uses ***hashchange*** state)
```js
$.routr.run();
```

## Route Parameters

1. **int** - positive numbers
2. **float** - signed numbers
3. **date** - format *yyyy-mm-dd*
4. **string** - alpha numeric characters
5. **bool** - *true* or *false*

## License

Copyright (c) 2014 Samuel Weru,
Licensed under the MIT license.