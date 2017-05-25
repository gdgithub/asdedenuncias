$(document).ready(function() {

    $(".termsobj").prop("readonly",true);
    $(".policyobj").prop("readonly",true);
    $(".saveobj").html("Editar");

    alertify.logPosition("bottom right");

    // functions
    function postData(url, vars, callback) {
        $.ajax({
            type: "POST",
            url: url,
            data: vars,
            success: callback
        });
    }

    function currentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10)
            dd='0'+dd;
        if(mm<10)
            mm='0'+mm;
        
        var today = dd+'/'+mm+'/'+yyyy;
        return today;
    }

    $(".save").click(function(e){
        e.preventDefault();

        var title = $(".titulo").val().trim();
        var link = $(".enlace").val().trim();
        var description = $(".descripcion").val().trim();

        if(title.length > 0){
            var dic = {
                "titulo":title,
                "link":link,
                "descripcion":description,
                "fecha":currentDate(),
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }

            postData("/server/savenews/",dic,function(data){
                data = $.parseJSON(data);
                if(data.success){
                    $(".rowId").val(data.data);
                    alertify.success("La noticia se ha registrado con exíto.");
                    $(".formnew").submit();
                }
                else{
                    alertify.error(data.log);
                }
            });
        }
        else{
            alertify.error("Introduzca el título de la noticia.");
        }
    });


    $(".deleteAll").click(function(e){
        e.preventDefault();
        
        alertify
        .okBtn("Si")
        .cancelBtn("No")
        .confirm("¿Desea eliminar todas las noticias publicadas?", function (ev) {

            var dic = {
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }
            postData("/server/deletenews/",dic,function(data){
                data = $.parseJSON(data);
                if(data.success){
                    alertify.success("Noticias eliminadas.");
                }
                else{
                    alertify.error(data.log);
                }
            });

        }, function(ev) {
        });

    });

  

});