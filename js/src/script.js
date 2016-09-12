(function($){

	$.routr.add("home", function(id){

		$(".west")
			.empty()
			.html("<h1>Hello World!</h1>")
    })

    $.routr.add("user", function(id){

		$(".west")
			.empty()
			.html("<h1>User</h1>")
    })

	$.routr.add("user/{int}", function(id){

		$(".west")
			.empty()
			.html("<h1>User.id(".concat(id)+")</h1>")
    })

    $.routr.add("user/add", function(){

        $(".west")
			.empty()
			.html("<h1>User.add</h1>")
    })

    $.routr.add("logout", function(){

        if(window.confirm("Logout?"))
        	$.routr.execute("logged/out");
        else
        	$.routr.execute("aborted/logout");	
    })

    $.routr.add("logged/out", function(){

    	$(".west")
    		.empty()
    		.html("<h1>Whoops! Cannot log out!</h1>");
    })

    $.routr.add("aborted/logout", function(){

    	$(".west")
    		.empty()
    		.html("<h1>Decided not to logout.</h1>");
    })

    $.routr.run();

})(jQuery)