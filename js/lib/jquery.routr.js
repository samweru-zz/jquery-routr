/*
 * jQuery routr - v1.0.1-alpha1
 * Javascript Router
 *
 * Copyright (c) 2016 Samuel Weru
 * Released under the MIT license
 */
String.prototype.test = function(expr) {
    
    return (new RegExp(expr)).test(this.toString());
};

(function ($){

    window.Routr = function(){

        this.options = $.extend({}, {

            routes:[], 
            aliases:[], 
            current:"",
            _useHashStateChange:false
        });
    }

    window.Routr.prototype = {

        constructor:Routr,
        add:function(route, alias, callback){

            if(typeof alias === "function") {

                callback = alias; 
                alias = undefined
            }

            if(alias === undefined) 
                alias = "route".concat(Object.keys(this.options.routes).length);

            if(this.options.routes[route] === undefined)
                this.options.routes[route] = [];

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

            this.options.aliases[alias] = route;
            this.options.routes[route] = {

                "route":route, 
                "callback":callback,
                "alias":alias,
                "pattern":pattern.join("/")
            };
        },
        remove:function(route){

            var alias = this.options.routes[route].alias;

            delete this.options.aliases[alias]
            delete this.options.routes[route]
        },
        execute:function(route){

            this.options.current = route;
            if(this.options.routes[route] === undefined){

                var _options = this.options;
                $.each(Object.keys(_options.routes), function(i,e){

                    var params = [];
                    var pattern = _options.routes[e].pattern;
                    if(route.test("^".concat(pattern.concat("$")))){

                        var parts = e.split("/"), 
                            _parts = route.split("/"),
                            x;

                        for(x in parts)
                            if(parts[x] != _parts[x])
                                params.push(_parts[x]);

                        if(params.length)    
                            _options.routes[e].callback.apply(this, params);
                           
                        return false;
                    }
                });
            }
            else
                this.options.routes[route].callback();

            if(this.options._useHashStateChange)
                window.location.hash = this.options.current;
        },
        run:function(){

            this.options._useHashStateChange=true;
            if(Object.keys(this.options.routes).length){

                var _this = this;
                $(window).bind('hashchange', function(){

                    _this.execute(window.location.hash.replace(/#\/|#/g,""));
                });
            }

            var hashurl = window.location.hash.replace(/#\/|#/g,"");
            if(hashurl)
                this.execute(hashurl);
        }
    }

}(jQuery));
