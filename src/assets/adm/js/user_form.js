$(document).ready(function(){

	// initial
	$('.reqform .item').tab();
 	$('.ui.dropdown.entrevistador').dropdown();
  	$('.checkbox').checkbox();

  	$('.ui.search').search({type: 'category'});

  	defaults();

$(".setpermisions-buttom").click(function(){
	$(".user-form").hide(300);
	$(".userpermision-form").show(300);
});

$(".save-user-permisions").click(function(){
	$(".user-form").show(800);
	$(".userpermision-form").hide(200);
});

$(".create-user").click(function(){
	$(".user-form").hide(300);
	$(".user-registration-form").show(300);
});

$(".save-user").click(function(){
	$(".user-form").show(800);
	$(".user-registration-form").hide(300);
});

$(".discard-user").click(function(){
	$(".user-form").show(800);
	$(".user-registration-form").hide(300);
});

function defaults(){
	$(".userpermision-form").hide();
	$(".user-registration-form").hide();
}

});
