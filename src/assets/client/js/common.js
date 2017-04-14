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
        location.assign("/client/login");
    });

    function hasNewRequest(){
        var dataDic = {
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }
        postData("/server/getcomplaints/",dataDic,function(data){
            data = $.parseJSON(data);
            if(data.data.length > 0){
                if(getCookie("ccount").length > 0){
                    if(data.data.length > getCookie("ccount")){
                        createCookie("ccount",data.data.length,3000);
                        alertify.log("Nueva solicitud recibida. #"+data.data[data.data.length-1].id);
                    }
                }
                else{
                    createCookie("ccount",data.data.length,3000);
                }
            }
            hasNewRequest();
        });
    }

    hasNewRequest();
    
});
