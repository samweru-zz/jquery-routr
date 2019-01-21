jQuery routr
============

## Quick Start

Why another javascript router? The more the merrier :)

```js
var routr = new Routr();

routr.add("user/{int}", function(id){

	console.log("User::id->".concat(id));
})

routr.add("user/add", function(){

	console.log("User::add");
})

routr.run();
```

## Usage

Adding route
```js
routr.add("user/{string}", function(username){})
```
Removing route
```js
routr.remove("user/{string}")
```
Manually execute route
```js
routr.execute("user/add")
```
Start listening for routes (uses ***hashchangestate***)
```js
routr.run();
```

## Route Parameters

1. **int** - positive numbers
2. **float** - signed numbers
3. **date** - format *yyyy-mm-dd*
4. **string** - alpha numeric characters
5. **bool** - *true* or *false*