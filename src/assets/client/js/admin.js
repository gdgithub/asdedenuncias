$(document).ready(function() {

    alertify.logPosition("bottom right");
    
    $('.ui.dropdown').dropdown();

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
        
        //var bodyTable = $(".complaints.body-table");
        getComplaints(function(data){
            data = $.parseJSON(data);
            if(data.success){
                data = data.data;
                tableComplaint(data);
            }else{
                alertify.error(data.log);
            }
        });
    }

    setTableComplaintValues();

    function tableComplaint(data){
        var bodyTable = $(".complaints.body-table");
        $(".actions").pagination({
                    dataSource: data,
                    pageSize: 10,
                    showGoInput: true,
                    showGoButton: true,
                    goButtonText:"Ir",
                    callback: function(data, pagination) {
                        var total = parseInt(pagination.pageSize);
                        var currentPage = parseInt(pagination.pageNumber);
                        //<td>`+((total*(currentPage-1))+(i+1))+`</td>
                        bodyTable.html("");
                        data.forEach(function(element,i) {
                                bodyTable.append(`
                                <tr>
                                    <td>`+element.id+`</td>
                                    <td>`+element.complaintType+`</td>
                                    <td>`+element.address+`</td>
                                    <td>`+element.location+`</td>
                                    <td style="max-width:100px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">`+element.description+`</td>
                                    <td>`+element.date+`</td>
                                    <td>
                                        <div class="ui small basic icon buttons">
                                            <button class="ui button edit" value=`+element.id+`><i class="file icon"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                `);
                            }, this);
                            
                        $(".edit").click(function(){
                            location.assign("/client/admin/complaint?id="+$(this).val());
                        });
                    }
                });
    }

    $(".orderBy").change(function(){
        var value = $(this).dropdown("get value");
        
        var dataDic = {
            "order":value,
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }
        postData("/server/getcomplaints_orderby/",dataDic,function(data){
            data = $.parseJSON(data);
            if(data.success){
                data = data.data;
                tableComplaint(data);
            }else{
                alertify.error(data.log);
            }
        });
    });

});