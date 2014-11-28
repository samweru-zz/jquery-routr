/*
 * jQuery routr - v0.9 beta
 * Javascript Router
 *
 * Copyright (c) 2014 Samuel Weru
 * Released under the MIT license
 */
String.prototype.test = function(expr) {
    
    return (new RegExp(expr)).test(this.toString());
};

(function ($){
 
    $.routr = $.extend({}, {routes:[], aliases:[], current:""});

    $.routr.add = function(route, alias, callback){

        if(typeof alias === "function") {

            callback = alias; 
            alias = undefined
        }

        if(alias === undefined) 
            alias = "route".concat(Object.keys($.routr.routes).length);

        if($.routr.routes[route] === undefined)
            $.routr.routes[route] = [];

        var parts = [];
        var pattern = [];
        if(route.match(/\{/)){

            parts = route.split("/");
            $.each(parts, function(i,e){

                var shards = e.match(/\{(\w+)(?:\:(int|float|date|string|bool)\}|\})/i);
                if(shards)
                    switch(shards[1]||shards[2]){

                        case "int":
                            pattern.push("[0-9]+")
                        break;
                        case "float":
                            pattern.push("[+-]?\d+(\.\d+)?")
                        break;
                        case "date":
                            //yyyy-mm-dd
                            pattern.push("[0-9]{4}-(1[0-2]|0[1-9]|[1-9])-([0-9]|0[1-9]|[1-2][0-9]|3[0-1])")
                        break;
                        case "string":
                            pattern.push("[A-Za-z0-9]+")
                        break;
                        case "bool":
                            pattern.push("(true|false)")
                        break;
                    }
                else
                    pattern.push(e)
            });
        }

        $.routr.aliases[alias] = route;
        $.routr.routes[route] = {"route":route, 
                                    "callback":callback,
                                    "alias":alias,
                                    "pattern":pattern.join("/")};
    }

    $.routr.remove = function(route){

        var alias = $.routr.routes[route].alias;
        delete $.routr.aliases[alias]
        delete $.routr.routes[route]
    }

    $.routr.execute = function(route){

        $.routr.current = route;
        if($.routr.routes[route] === undefined)
            $.each(Object.keys($.routr.routes), function(i,e){

                var params = [];
                var pattern = $.routr.routes[e].pattern;
                if(route.test("^".concat(pattern.concat("$")))){

                    var parts = e.split("/"), 
                        _parts = route.split("/"),
                        x;

                    for(x in parts)
                        if(parts[x] != _parts[x])
                            params.push(_parts[x]);

                    if(params.length)    
                        $.routr.routes[e].callback.apply(this, params);
                       
                    return false;
                }
            });
        else
            $.routr.routes[route].callback();
    }

    $.routr.run = function(){

        if(Object.keys($.routr.routes).length)
            $(window).bind('hashchange', function() {

                $.routr.execute(window.location.hash.replace(/#\/|#/g,""));
            });

        var hashurl = window.location.hash.replace(/#\/|#/g,"");
        if(hashurl)
            $.routr.execute(hashurl);
    }
 
}(jQuery));