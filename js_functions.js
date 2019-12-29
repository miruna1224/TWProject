

function Hide() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function AddToCart ( a ){
    alert ( "star " + a + " " + "Added to cart");
    $.get("ItemView.php", { id: a });
}



 function LogoutJS() {
 	alert ( "deci ajunge aici ");
 	$("button").click(function(){
		$.ajax({
			type: "POST",
			url: 'php_functions.php',
			data:{
				action:'Logout'
			},
			success:function(output) {
				alert("success");
			}
			error: function(outpuy){
				alert("error");
			}

		});
 	}
 }
