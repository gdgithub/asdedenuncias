$(document).ready(function(){

	$(".ui.primary.button").click(function(e){
		e.preventDefault();
		//sweetAlert("Campos en blanco", "Favor completar los campos requeridos.", "error");
        var existfieldempty = false;

        $(".mainform").find('input').each(function(){
          
            if($(this).val().length == 0){
              existfieldempty = true
              //sweetAlert("Campos en blanco", "Favor completar los campos requeridos.", "error");
              return false;
            }
       });

        $(".mainform").find('textarea').each(function(){
          
            if($(this).val().length == 0){
            	existfieldempty = true
              //sweetAlert("Campos en blanco", "Favor completar los campos requeridos.", "error");
              return false;
            }
       });

        	if (existfieldempty == true){
        		sweetAlert("Campos en blanco", "Favor completar los campos requeridos.", "error");
        		return false
        	}

            var _titulos = [];
                var _universidades = [];
                var _anos = [];
                var _investigaciones = [];

                $(".titulos").each(function(){
                    _titulos.push($(this).val());
                });
                $(".universidades").each(function(){
                    _universidades.push($(this).val());
                });
                $(".anos").each(function(){
                    _anos.push($(this).val());
                });
                $(".investigaciones").each(function(){
                    _investigaciones.push($(this).val());
                });


                var dic = {
                  nombres: $("#nombres").val(),
                  apellidos: $("#apellidos").val(),
                  telefono: $("#telefono").val(),
                  correo: $("#correo").val(),
                  titulos: _titulos.join("|"),
                  universidades: _universidades.join("|"),
                  anos: _anos.join("|"),
                  investigaciones: _investigaciones.join("|"),
                  publicaciones: $("#publicaciones").val(),
                  otrasInfo: $("#otrasInfo").val(),
                }

                postData("/form/saveForm/",dic,function(d){
                	d = $.parseJSON(d);

                	if (d.userExist){
                    	sweetAlert("", "El correo asociado al formulario existe.", "error");
                	}
                	else{
                		if (d.success) {
                    		sweetAlert("", "Se ha enviado el formulario.", "success");
                  		}
                  		else{
                    		sweetAlert("", "Ha habido un error al enviar el formulario, intente de nuevo.", "error");
                  		}
                	}
                  
                });

	});

$(".newInv").click(function(e){
  e.preventDefault();
    $(".invetigaciones_sec").append(`
        <div class="four wide field">
            <label>`+(parseInt($(".investigaciones").length)+1)+`</label>
            <input type="text" name="investigacion1" class="investigaciones" placeholder="Linea de investigacion `+(parseInt($(".investigaciones").length)+1)+`">
          </div>
      `);
});

$(".newEducacion").click(function(e){
  e.preventDefault();
    $(".educación_div").append(`
        <div class="fields">
          <div class="four wide field">
              <input type="text" name="titulo4" class="titulos"  placeholder="Titulo">
            </div>
          <div class="four wide field">
              <input type="text" name="universidad4" class="universidades" placeholder="Universidad">
            </div>
          <div class="field">
              <input type="text" name="ano4" class="anos" maxlength="4" placeholder="Año">
          </div>
        </div>
      `);
});




function postData(url,vars,callback)
{
  $.ajax({
      type:"POST",
          url:url,
          data: vars,
          success: callback
  });
}

});
