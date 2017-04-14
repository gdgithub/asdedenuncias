$(document).ready(function() {

    // Functions

    function postData(url, vars, callback) {
        $.ajax({
            type: "POST",
            url: url,
            data: vars,
            success: callback
        });
    }

    function getPagButtonCounts(records_count, rowsShowing) {
        var total = 0;
        if (records_count % rowsShowing == 0)
            total = records_count / rowsShowing;
        else if (records_count % rowsShowing != 0)
            total = records_count / (rowsShowing + 1);

        return Math.round(total);
    }

    function getForm(id, range = { "init": 0, "end": 10 }) {

        var dic = {
            "formId": id,
            "init": range.init,
            "end": range.end,
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }

        postData("getforms/", dic, function(response) {
            response = $.parseJSON(response);
            var showing = 0;
            if (response.success) {
                var parent = $(".table-body.quiz-management.search-result").html("");
                // parsing html
                for (var i = 0; i < response.data.length; i++) {
                    showing++;
                    var row = `<tr>
                        <td>` + response.data[i].id + `</td>
                        <td>` + response.data[i].interviewerId + `</td>
                        <td>` + response.data[i].interviewedId + `</td>
                        <td>` + response.data[i].diseaseId + `</td>
                        <td>` + response.data[i].date + `</td>
                        <td>` + response.data[i].mainForm + `</td>
                        <td>
                        <div class="ui small basic icon buttons">
                            <button class="ui button get_edit" id=` + response.data[i].id + ` title="Ver/Editar"><i class="file icon"></i></button>
                            <button class="ui button delete" id=` + response.data[i].id + `  title="Eliminar"><i class="delete icon"></i></button>
                        </div>
                        </td>
                    </tr>`;
                    parent.append(row);
                }
                $(".get_edit").click(get_edit);
                $(".delete").click(delete_form);

                $(".noDisplay").fadeTo(600, 1);
            } else {
                alert(response.msg);
            }

            $(".info_section").html("Mostrando " + showing + " de " + response.rows_count + " registros.");
            console.log(getPagButtonCounts(parseInt(response.rows_count), parseInt(showing)));

            /*
            $('.pagcontrol').pagination({
                dataSource: response.data,
                pageSize: 3,
                showPrevious: false,
                showNext: false,
                callback: function(data, pagination) {
                    // template method of yourself
                    console.log(data);
                }
            });
            */

        });
    }

    function get_edit(e) {
        e.preventDefault();
        var formId = $(this).attr("id");

        location.assign("/adm/form/survey?id=" + formId);
    }

    function delete_form(e) {
        e.preventDefault();

    }


    // Initial
    getForm("all", { "init": 4000, "end": 5000 });






});