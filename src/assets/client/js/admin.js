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

    function getComplaints(callback){
        var dataDic = {
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }
        postData("/server/getcomplaints/",dataDic,callback);
    }

    function setTableComplaintValues(){
        
        var bodyTable = $(".complaints.body-table");
        getComplaints(function(data){
            data = $.parseJSON(data);
            console.log(data);
            if(data.success){
                data = data.data;
                data.forEach(function(element,i) {
                    bodyTable.append(`
                    <tr>
                        <td>`+(i+1)+`</td>
                        <td>`+element.complaintType+`</td>
                        <td>`+element.address+`</td>
                        <td>`+element.location+`</td>
                        <td style="max-width:100px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">`+element.description+`</td>
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
                location.assign("/client/admin/complaint?id="+$(this).val());
            });

            }else{
                alertify.error(data.log);
            }
        });
    }

    setTableComplaintValues();

});