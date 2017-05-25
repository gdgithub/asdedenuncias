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

    function autoLogin(){
        if(getCookie("email").length > 0 && getCookie("pwd").length > 0){
            var dataDic = {
                "email":getCookie("email"),
                "password":getCookie("pwd"),
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }
            postData("/server/authentication/",dataDic,function(data){
                data = $.parseJSON(data);
                if(data.authenticated){
                    if(data.rol == "admin" && (window.location.pathname != "/client/admin" && window.location.pathname != "/client/denuncias"))
                        location.assign("/client/admin");
                    else if (data.rol == "user" && window.location.pathname != "/client/denuncias")
                        location.assign("/client/denuncias");
                }
            });
        }
    }

    autoLogin();


    function logIn(){
        var email = $(".email").val();
        var password = $(".password").val();
        if(email.length > 0 && password.length > 0){
            var dataDic = {
                "email":email,
                "password":password,
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }
            postData("/server/authentication/",dataDic,function(data){
                data = $.parseJSON(data);
                if(data.authenticated){
                    createCookie("email",email,3000);
                    createCookie("pwd",password,3000);
                    createCookie("rol",data.rol,3000);

                    //console.log(data.rol);
                    if(data.rol == "admin")
                        location.assign("/client/admin");
                    else if (data.rol == "user")
                        location.assign("/client/denuncias");
                    //location.assign("/client/admin");
                }
                else{
                    if(!data.userExist){
                        alertify.error("Usuario no registrado");
                    }
                    else{
                        alertify.error("Usuario y/o contraseña incorrectos.");
                    }
                    deleteCookie("email");
                    deleteCookie("pwd");
                }
            });
        }
        else{
            alertify.error("Debe introducir su cuenta de correos y contraseña para la autenticacion");
        }
        
    }

    $(".logins").click(function(e){
        e.preventDefault();
        logIn();
    });
});