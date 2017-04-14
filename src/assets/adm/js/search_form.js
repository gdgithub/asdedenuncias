$(document).ready(function(){

	defaults();

$(".ui.form").submit(function(e){
	e.preventDefault();
});

$(".button.add-condition").click(function(e){
	e.preventDefault();

	$(".search-conditions-div").append(condition_element());

	$(".button.add-condition:last").click(function(e){
		e.preventDefault();

		$(".search-conditions-div").append(condition_element());
		
	});
});

$(".button.search").click(function(){
	$(".result-div").show(300);
	$(".search-div").hide(300);
});

$(".button.new-search").click(function(){
	$(".result-div").hide(300);
	$(".search-div").show(300);
});

$(".button.new-search").click(function(){
	$(".result-div").hide(300);
	$(".search-div").show(300);
});

$(".table-options.row-details").click(function(){
	$(".result-div").hide(200);
	$(".result-details-div").show(400);
});

$(".close-details-result").click(function(){
	$(".result-div").show(400);
	$(".result-details-div").hide(300);
});

$(".print").click(function(){

	var divContents = $(".result-details-div > .doc-content").html();
            
    var printWindow = window.open('', '', '');
    printWindow.document.write('<html><head><title>Herbario UNPHU</title>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="/static/3rd_party/semantic/semantic.css"/>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="/static/adm/css/search_form.css"/>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

	setTimeout(function() {printWindow.print();}, 100);
});

function condition_element(){
	return `	
		<div class="two fields">
				    <div class="field">
				       	<select class="ui search dropdown">
				       		<option value="">Seleccione un campo</option>
						    <option value="p">Planta</option>
						    <option value="t">Tratamiento</option>
						    <option value="a">Aplicacion</option>
						    <option value="AL">Lugar</option>
						    <option value="AL">Enfermedad</option>
						</select>
				    </div>
				    <div class="field">
				       	<input type="text" placeholder="Valor">
				    </div>
				    <div class="field">
				       	<a class="ui button add-condition">+</a>
				    </div>
			</div>
		`;
}

function defaults(){
	$(".result-div").hide();
	$(".result-details-div").hide();
}

});