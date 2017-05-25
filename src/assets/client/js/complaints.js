$(document).ready(function() {

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

    $(".inProcess.abtn").click(function(){
        var id = $(this).attr("id");
        alertify.confirm("¿Desea cambiar el estado de la denuncia? se le notificara por correo al municipe solicitante.", function () {
            var dataDic = {
                "id":id,
                "status":"inProcess",
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }
            postData("/server/updatecomplaintstatus/",dataDic,function(data){
                data = $.parseJSON(data);
                if(data.success){
                    alertify.success("El estado de la denuncia ha cambiado a 'En Proceso' y fue notificado al municipe.");
                }
                else{
                    alertify.error(data.log);
                }
            });               
            }, function() {
        });
    }); 

    $(".accept").click(function(){
        var id = $(this).attr("id");

        var dataDic = {
            "id":id,
            "status":"checked",
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }
        postData("/server/updatecomplaintstatus/",dataDic,function(data){
            data = $.parseJSON(data);
            location.assign("/client/admin");
        }); 
    });

    $(".cancel").click(function(){
        location.assign("/client/admin");
    });

});