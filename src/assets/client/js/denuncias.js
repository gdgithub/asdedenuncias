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

    function createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    function deleteCookie(name)
    {
        createCookie(name,"",3000);
    }

    $(".logOut").click(function(){
        deleteCookie("email");
        deleteCookie("pwd");
        deleteCookie("rol");
        location.assign("/client/login");
    });

    function getComplaintTypes(){
        var dic = {
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }

        postData("/server/getcomplainttypes/",dic,function(data){
            data = $.parseJSON(data);
            if(data.success){
                $(".dropdown.type").html("");
                data.data.forEach(function(element) {
                    $(".dropdown.type").append(`
                        <option value="`+element.description+`">`+element.description+`</option>
                    `);
                }, this);
                $('.ui.dropdown.type').dropdown();
            }   
            else{
                alertify.error(data.log);
            }
        });
    }

    getComplaintTypes();

    $(".sendComplaint").click(function(){
        var tipo = $(".dropdown.type").dropdown("get value");
        var direccion = $(".address").val();
        var descripcion = $(".description").val();
        var ubicacion = $(".location").val();
        var dic = {
            "userId":getCookie("email"),
            "complaintType":tipo,
            "description":descripcion,
            "address":direccion,
            "location":ubicacion,
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }

        postData("/server/newComplaint/",dic,function(data){
            data = $.parseJSON(data);
            if(data.success){
                alertify.success("Hemos recibido su denuncia, la mísma será atendida en los horarios de lunes a viernes de 08:00am a 04:00pm. Número de caso: "+data.objId);
            }   
            else{
                alertify.error(data.log);
            }
        });

    });

});

