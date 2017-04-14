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

    function getComplaintTypes(callback){
        var dataDic = {
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }
        postData("/server/getcomplainttypes/",dataDic,callback);
    }

    function setTableComplaintValues(){
        
        var bodyTable = $(".complaintsTypes.body-table");
        bodyTable.html("");
        getComplaintTypes(function(data){
            data = $.parseJSON(data);
            console.log(data);
            if(data.success){
                data = data.data;
                data.forEach(function(element,i) {
                    bodyTable.append(`
                    <tr>
                        <td>`+(i+1)+`</td>
                        <td>`+element.description+`</td>
                        <td>
                            <div class="ui small basic icon buttons">
                                <button class="ui button edit" value=`+element.id+`><i class="file icon"></i></button>
                                <button class="ui button remove" value=`+element.id+`><i class="delete icon"></i></button>
                            </div>
                        </td>
                    </tr>
                    `);
                }, this);
                
            $(".edit").click(function(){
                var id = $(this).val();
                alertify
                .defaultValue("")
                .prompt("Introduzca el nuevo valor",
                    function (val, ev) {
                    ev.preventDefault();

                    var dataDic = {
                        "id":id,
                        "description":val,
                        "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
                    }
                    postData("/server/updatecomplainttypes/",dataDic,function(data){
                        data = $.parseJSON(data);
                        if(data.success){
                            setTableComplaintValues();
                        }
                    });
                    }, function(ev) {

                    ev.preventDefault();
                    }
                );
            });

            $(".remove").click(function(){
                var id = $(this).val();
                alertify.confirm("¿Desea eliminar este valor?", function () {
                var dataDic = {
                        "id":id,
                        "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
                    }
                    postData("/server/deletecomplainttypes/",dataDic,function(data){
                        data = $.parseJSON(data);
                        if(data.success){
                            setTableComplaintValues();
                        }
                    });
                    
                }, function() {
                });
            });

            }else{
                alertify.error(data.log);
            }
        });
    }

    setTableComplaintValues();

    $(".new").click(function(){
        
        alertify
        .defaultValue("")
        .prompt("Introduzca el valor",
            function (val, ev) {
            ev.preventDefault();

            var dataDic = {
                "description":val,
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }
            postData("/server/savecomplainttypes/",dataDic,function(data){
                data = $.parseJSON(data);
                if(data.success){
                    setTableComplaintValues();
                }
            });
            }, function(ev) {

            // The click event is in the event variable, so you can use it here.
            ev.preventDefault();
            }
        );
    
    });

});