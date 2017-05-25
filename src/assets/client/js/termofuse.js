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

    function getPolicyAndTerms(){
        var dataDic = {
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }
        postData("/server/getpolicyandterms/",dataDic,function(data){
            data = $.parseJSON(data);
            if(data.success){
                $(".termsobj").val(data.data[0].term_use);
                $(".policyobj").val(data.data[0].privacy);
            }
            else{
                alertify.error(data.log);
            }
        });
    }

    getPolicyAndTerms();

    $(".saveobj").click(function(){
        if($(this).html() == "Editar"){
            $(".termsobj").prop("readonly",false);
            $(".policyobj").prop("readonly",false);
            $(this).html("Guardar cambios");
        }
        else{
            var terms = $(".termsobj").val();
            var policy = $(".policyobj").val();
            if(terms.length > 0 && policy.length > 0){
                var dic = {
                    "terms": terms,
                    "policy":policy,
                    "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
                }
                postData("/server/savepolicyandterms/",dic,function(data){
                    data = $.parseJSON(data);
                    if(data.success){
                        alertify.success("Información almacenada con exíto.");
                        $(".termsobj").prop("readonly",true);
                        $(".policyobj").prop("readonly",true);
                        $(".saveobj").html("Editar");
                    }
                    else{
                        alertify.error(data.log);
                    }
                });
            }
            else{
                alertify.error("Debe introducir los terminos y policas...");
            }
        }
        
    });

});