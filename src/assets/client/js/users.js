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

    function getUsers(callback){
        var dataDic = {
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }
        postData("/server/getusers/",dataDic,callback);
    }

    function setTableUsersValues(){
        
        var bodyTable = $(".complaintsTypes.body-table");
        bodyTable.html("");
        getUsers(function(data){
            data = $.parseJSON(data);
            if(data.success){
                data = data.data;
                $(".actions").pagination({
                    dataSource: data,
                    pageSize: 10,
                    showGoInput: true,
                    showGoButton: true,
                    goButtonText:"Ir",
                    callback: function(data, pagination) {
                        var total = parseInt(pagination.pageSize);
                        var currentPage = parseInt(pagination.pageNumber);
                        bodyTable.html("");
                        data.forEach(function(element,i) {
                            bodyTable.append(`
                            <tr>
                                <td>`+(i+1)+`</td>
                                <td class="email_col">`+element.email+`</td>
                                <td>`+element.name+`</td>
                                <td><a class="changePassword" value="`+element.password+`">Restablecer</a></td>
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
                                    setTableUsersValues();
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
                                    setTableUsersValues();
                                }
                            });
                            
                        }, function() {
                        });
                    });

                    $(".changePassword").click(function(){
                        var email = $(this).parent().parent().find(".email_col").html();
                        var pwd = $(this).val();
                        if(email.length == 0){
                            alertify.error("Error: No se ha podido determinar el ID del usuario.");
                            return false;
                        }
                        else{
                            // restablecer contrasena
                            alertify.confirm("¿Desea restablecer la contraseña de: "+email+"?", function () {

                                var dataDic = {
                                    "email":email,
                                    "pwd":pwd,
                                    "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
                                }
                                postData("/server/restorepassword/",dataDic,function(data){
                                    data = $.parseJSON(data);
                                    if(data.success){
                                        setTableUsersValues();
                                    }
                                });
                                
                            }, function() {
                            });
                        }
                    });

                    }
                });
            }
            else{
                alertify.error(data.log);
            }
        });
    }

    setTableUsersValues();

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
                    setTableUsersValues();
                }
            });
            }, function(ev) {

            // The click event is in the event variable, so you can use it here.
            ev.preventDefault();
            }
        );
    
    });

});