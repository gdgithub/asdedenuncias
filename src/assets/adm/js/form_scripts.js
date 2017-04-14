$(document).ready(function() {

    // initial
    $('.reqform .item').tab();
    $('.checkbox').checkbox();
    $(".interviewed-gender").dropdown();

    defaults(); // default form configuration
    initializeDropsControlTable(false, false); // main form objects
    loader();

    //plant-uses-div optional qnine

    // Enfermedades - medidas tomadas
    $(".checkbox-illness-mt").click(function() {
        if ($(this).find("input").hasClass("chhometraitment")) {
            if ($(this).find("input").is(':checked')) {
                $(".plant-uses-div.optional.qnine").show(500);
                $(".ui.dividing.header.optional.autohide").hide();
                $(".grouped.fields.optional.mot").hide(500);
                $(".radio-illness-mot").find("input").attr("checked", false);
            } else {
                $(".plant-uses-div.optional.qnine").hide(500);
                $(".ui.dividing.header.optional.autohide").show();
                $(".grouped.fields.optional.mot").show(500);
            }
        }
    });

    // Conoce tratamiento - enfermedad?
    $(".radio-illness-mot").click(function() {
        if ($(this).find("input").is(':checked')) {
            if ($(this).find("input").val() == "true") {
                $(".plant-uses-div.optional.qnine").show(500);
                $(".ui.dividing.header.optional.autohide").hide();
            } else {
                $(".plant-uses-div.optional.qnine").hide(500);
                $(".ui.dividing.header.optional.autohide").show();
            }
        }
    });

    function construct_newForm(form) {
        if ($(".other-illness-single-treatment-form." + form.class).length == 0) {
            // appending form (questions 10 - 25)
            $(".other-illness.other-treatments-form.div").append(form.form);

            function initialize_otf_qnine() {
                if ($(".other-illness-single-treatment-form." + form.class).length == 1) {
                    $(".other-illness-single-treatment-form." + form.class)
                        .find('.plant-uses.plant')
                        .dropdown({
                            apiSettings: {
                                url: 'fetchdataquery/plants-commonname/{query}'
                            },
                            saveRemoteData: false,
                            filterRemoteData: false
                        });

                    // initializing form-checkboxes
                    $(".other-illness-single-treatment-form." + form.class)
                        .find(".checkbox").checkbox();

                    console.log("init");
                } else {
                    initialize_otf_qnine();
                }
            }

            // initializing plant dropdown control table for other diseases form (other-treatments-form).
            // srd: false, frd: false (default configuration)
            // initializing form-checkboxes
            initialize_otf_qnine();
        }

        $(".other-illness-single-treatment-form." + form.class).show(500);
    }

    // Otras enfermedades - tratamientos (other-treatments-form)
    $(".checkbox-other-treatments.open-form").click(function() {

        if ($(this).find("input").is(':checked')) { // Open form
            if ($(this).find("input").val() != undefined) {

                var form = new_treatment_form($(this).find("input").val());
                construct_newForm(form);

            } else {
                console.log("error opening other-treatments-form (qnine form).");
            }
        } else { // Close form
            if ($(this).find("input").val() != undefined) {

                var form_name = $(this).find("input").val();
                var form_class = form_name.split(' ').join("");
                $(".other-illness-single-treatment-form." + form_class + "").hide(500);
            } else {
                console.log("error closing other-treatments-form (qnine form).");
            }
        }
    });


    function defaults() {
        $(".plant-uses-div.optional.qnine").hide();
        alertify.logPosition("bottom right");
    }

    function new_treatment_form(illness_name) {

        var plant_uses_form = $(".plant-uses-default-pattern.form-content").html();

        var form_class = illness_name.split(' ').join("");

        var treatment_form = `
        <div class="other-illness-single-treatment-form ` + form_class + `">
            <div class="illness-form-divider"></div>
            <h3 class="ui non-dividing header">Tratamiento para: ` + illness_name + `</h3>
            ` + plant_uses_form + `
        </div>
        `;
        var dic = { "form": treatment_form, "class": form_class };

        return dic;
    }

    // Functions

    function postData(url, vars, callback) {
        $.ajax({
            type: "POST",
            url: url,
            data: vars,
            success: callback
        });
    }

    function initializeDropsControlTable(srd = false, frd = false) {

        $('.interviewer-name').dropdown({
            apiSettings: {
                url: 'fetchdataquery/interviewer/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });

        $('.interviewed-province').dropdown({
            apiSettings: {
                url: 'fetchdataquery/province/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });

        $('.interviewed-village').dropdown({
            apiSettings: {
                url: 'fetchdataquery/village/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });

        $('.person-diseases').dropdown({
            apiSettings: {
                url: 'fetchdataquery/diseases/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });

        $('.person-symptom').dropdown({
            apiSettings: {
                url: 'fetchdataquery/diseases/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });

        $('.plant-uses.plant').dropdown({
            apiSettings: {
                url: 'fetchdataquery/plants-commonname/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });

        $('.other-diseases.other-plant').dropdown({
            apiSettings: {
                url: 'fetchdataquery/plants-commonname/{query}'
            },
            saveRemoteData: srd,
            filterRemoteData: frd
        });
    }

    function getSelectedCheckboxValues(iter_element) {
        var values = new Array();
        $(iter_element).each(function(i, ele) {
            if ($(this).attr("type") == "checkbox") {
                if ($(this).is(':checked'))
                    values.push($(this).val());
            } else if ($(this).attr("type") == "text") {
                if ($(this).val().trim().length > 0)
                    values.push($(this).val());
            }
        });
        return values;
    }

    function findSelectedCheckboxValues(iter_element, parent) {
        var values = new Array();
        $(parent).find(iter_element).each(function(i, ele) {
            if ($(this).attr("type") == "checkbox") {
                if ($(this).is(':checked'))
                    values.push($(this).val());
            } else if ($(this).attr("type") == "text") {
                if ($(this).val().trim().length > 0)
                    values.push($(this).val());
            }
        });
        return values;
    }

    function setSelectedCheckbox(iter_element, value) {
        if (value.length == 0) return false;
        var hasText = false;

        var values = value.split(",");
        $(iter_element).each(function(i, ele) {
            if ($(this).attr("type") == "checkbox") {
                var index = values.indexOf($(this).val());
                if (index != -1) {
                    // setting false to set true when execute the click event
                    $(this).prop("checked", false).click();
                    values.splice(index, 1);
                }
            } else if ($(this).attr("type") == "text") {
                hasText = true;
            }
        });

        if (hasText) {
            $(iter_element + ".other").each(function(i, ele) {
                if ($(this).attr("type") == "text") {
                    $(this).val(values.join());
                }
            });
        }
    }

    function findAndSetSelectedCheckbox(iter_element, value, parent) {
        if (value.length == 0) return false;
        var hasText = false;

        var values = value.split(",");
        $(parent).find(iter_element).each(function(i, ele) {
            if ($(this).attr("type") == "checkbox") {
                var index = values.indexOf($(this).val());
                if (index != -1) {
                    $(this).prop("checked", false).click();
                    values.splice(index, 1);
                }
            } else if ($(this).attr("type") == "text") {
                hasText = true;
            }
        });

        if (hasText) {
            $(parent).find(iter_element + ".other").each(function(i, ele) {
                if ($(this).attr("type") == "text") {
                    $(this).val(values.join());
                }
            });
        }
    }

    function treatmentsData(disease_description = "") {

        // array forms
        var treatment_forms = new Array(".plant-uses-div.main-form-traitment"); // initialized with the main treatment form.
        var diseases = new Array(disease_description); // initialized with the disease in main form.
        var main_t = new Array($(".isMainForm").is(':checked')); // initialized with the main treatment form.

        var other_diseases = getSelectedCheckboxValues(".checkbox-other-treatments-form");

        var single_form = new Array();
        for (var i = 0; i < other_diseases.length; i++) {
            single_form.push(".other-illness-single-treatment-form." + other_diseases[i].split(' ').join(""));
            diseases.push("(@!?@)|" + other_diseases[i]);
            main_t.push(false);
        }

        var treatment_forms = treatment_forms.concat(single_form);
        var treatments = new Array();

        for (var i = 0; i < treatment_forms.length; i++) {

            // treatment
            // uso de la planta - section
            var plant_uses_plant = $(treatment_forms[i]).find(".plant-uses.plant").dropdown('get value');
            var plant_uses_othername = $(treatment_forms[i]).find(".plant-uses.othername").val();
            var plant_uses_treatment = $(treatment_forms[i]).find(".plant-uses.treatment-description").val();
            var plant_uses_used_parts = findSelectedCheckboxValues(".plant-uses.used-parts", treatment_forms[i]);
            var plant_uses_application = findSelectedCheckboxValues(".plant-uses.application", treatment_forms[i]);
            var plant_uses_dose = $(treatment_forms[i]).find(".plant-uses.dose").val();
            var plant_uses_dose_children = $(treatment_forms[i]).find(".plant-uses.dose-children").val();
            var plant_uses_dose_pregnant = $(treatment_forms[i]).find(".plant-uses.dose-pregnant").val();
            //historia uso de la planta
            var history_use_results = $(treatment_forms[i]).find(".history.use-results").val();
            var history_treatment_origin = findSelectedCheckboxValues(".history.treatment-origin", treatment_forms[i]);
            // etnobotanica
            var ethnobotany_plant_origin = findSelectedCheckboxValues(".ethnobotany.plant-origin", treatment_forms[i]);
            var ethnobotany_plant_existence = $(treatment_forms[i]).find(".ethnobotany.plant-existence").val();
            var ethnobotany_plant_picking = findSelectedCheckboxValues(".ethnobotany.plant-picking", treatment_forms[i]);

            var dic = {
                "disease": diseases[i],
                "plant_uses_plant": plant_uses_plant,
                "plant_uses_othername": plant_uses_othername,
                "plant_uses_treatment": plant_uses_treatment,
                "plant_uses_used_parts": plant_uses_used_parts.join(),
                "plant_uses_application": plant_uses_application.join(),
                "plant_uses_dose": plant_uses_dose,
                "plant_uses_dose_children": plant_uses_dose_children,
                "plant_uses_dose_pregnant": plant_uses_dose_pregnant,
                "history_use_results": history_use_results,
                "history_treatment_origin": history_treatment_origin.join(),
                "ethnobotany_plant_origin": ethnobotany_plant_origin.join(),
                "ethnobotany_plant_existence": ethnobotany_plant_existence,
                "ethnobotany_plant_picking": ethnobotany_plant_picking.join(),
                "main": main_t[i]
            }

            treatments.push(dic);
        }
        // async
        return treatments;
    }

    function saveForm() {

        // The control table records take the id value of it. New records will contain the prefix (new.) Before the value, which indicates the registration of the same

        // form date
        var date = $(".date").val().length > 0 ? $(".date").val() : "None";

        var interviewer = $('.interviewer.interviewer-name').dropdown('get value'); // control
        var interviewed_name = $(".interviewed-name").val();
        var interviewed_lastname = $(".interviewed-lastname").val();
        var interviewed_occupation = $(".interviewed-occupation").val();
        var interviewed_gender = $('.interviewed.interviewed-gender').dropdown('get value');
        var interviewed_province = $('.interviewed.interviewed-province').dropdown('get value'); // control
        var interviewed_village = $('.interviewed.interviewed-village').dropdown('get value'); // control
        var interviewed_education = getSelectedCheckboxValues(".interviewed.interviewed-education");
        // enfermedades - section
        var sick_person = $(".diseases.sick-person").val();
        var person_disease = $(".diseases.person-diseases").dropdown('get value');
        var person_symptom = $(".diseases.person-symptom").dropdown('get value');
        var person_mt = getSelectedCheckboxValues(".diseases.person-mt");
        var knowabaout_other_plant = $(".other-diseases.other-plant").dropdown('get value');

        var dataDic = {
            "main_form": $(".isMainForm").is(':checked'),
            "form_date": date,
            "interviewer": interviewer,
            "interviewed_name": interviewed_name,
            "interviewed_lastname": interviewed_lastname,
            "interviewed_occupation": interviewed_occupation,
            "interviewed_gender": interviewed_gender,
            "interviewed_province": interviewed_province,
            "interviewed_village": interviewed_village,
            "interviewed_education": interviewed_education.join(),
            "sick_person": sick_person,
            "person_disease": person_disease,
            "person_symptom": Array.isArray(person_symptom) ? person_symptom.join() : person_symptom,
            "person_mt": person_mt.join(),
            "knowabaout_other_plant": knowabaout_other_plant,
            "treatments": JSON.stringify(treatmentsData(person_disease)), // serialization
            "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
        }

        try {
            $(".loader-animation.form-datafetch-loading").show();

            postData("saveform/", dataDic, function(response) {
                response = $.parseJSON(response);
                if (response.success) {
                    alertify.success("El formulario ha sido guardado.");
                    window.setTimeout(function() {
                        $(".loader-animation.form-datafetch-loading").hide();
                    }, 1500);
                } else {
                    alertify.error(response.msg);
                    window.setTimeout(function() {
                        $(".loader-animation.form-datafetch-loading").hide();
                    }, 3000);
                }
            });
        } catch (error) {
            alertify.error("Error: " + error);
            window.setTimeout(function() {
                $(".loader-animation.form-datafetch-loading").hide();
            }, 3000);
            //throw "Error: " + error;
        }
    }

    $(".save_form").click(function() {
        saveForm();
    });


    function loader() {
        var formId = $(".formId").html() != "None" && $(".formId").html().length > 0 ? parseInt($(".formId").html()) : null;

        if (formId != null) {
            //$(".ui.form").css('filter',"blur(0.5px)");
            $(".loader-animation.form-datafetch-loading").show();

            var dic = {
                "formId": formId,
                "csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
            }

            postData("getform", dic, function(response) {
                response = $.parseJSON(response);
                console.log(response);
                if (response.success) {
                    if (response.data.length > 1) {
                        console.log("error: multiples resultados de la consulta.");
                        return false;
                    } else {
                        var data = response.data[0];
                        // setting form controls value
                        $(".isMainForm").prop("checked", data.mainForm == "1" ? true : false);
                        $(".date").val(data.date != "None" ? data.date : null);
                        $('.interviewer.interviewer-name').dropdown('set value', data.interviewer_id);
                        $('.interviewer.interviewer-name').dropdown('set text', data.interviewer_name);
                        $('.interviewed.interviewed-name').val(data.interviewed_name);
                        $('.interviewed.interviewed-lastname').val(data.interviewed_lastname);
                        $('.interviewed.interviewed-occupation').val(data.interviewed_occupation);
                        $('.interviewed.interviewed-gender').dropdown('set value', data.interviewed_gender);
                        $('.interviewed.interviewed-gender').dropdown('set text', data.interviewed_gender == "M" ? "Masculino" : "Femenino");
                        $('.interviewed.interviewed-province').dropdown('set value', data.interviewed_province_id);
                        $('.interviewed.interviewed-province').dropdown('set text', data.interviewed_province_desc);
                        $('.interviewed.interviewed-village').dropdown('set value', data.interviewed_village_id);
                        $('.interviewed.interviewed-village').dropdown('set text', data.interviewed_village_desc);
                        setSelectedCheckbox(".interviewed.interviewed-education", data.interviewed_education);
                        $('.diseases.sick-person').val(data.sick_person);
                        $(".diseases.person-diseases").dropdown('set value', data.disease_id);
                        $(".diseases.person-diseases").dropdown('set text', data.disease_desc);
                        setSelectedCheckbox(".diseases.person-mt", data.measures_taken);
                        $(".other-diseases.other-plant").dropdown('set value', data.knowabaout_other_plant_id);
                        $(".other-diseases.other-plant").dropdown('set text', data.knowabaout_other_plant_desc);

                        $('.diseases.person-symptom').dropdown('set selected', data.symptoms);
                        $('.diseases.person-symptom').dropdown('set text', data.symptoms);
                        //var person_symptom = $(".diseases.person-symptom").dropdown('get value');

                        for (var j = 0; j < data.treatments.length; j++) {
                            var treatment = data.treatments[j];
                            var parent_form = treatment.disease_id == data.disease_id ? ".plant-uses-div.main-form-traitment" : ".other-illness-single-treatment-form." + treatment.disease_desc.split(' ').join("");

                            if (treatment.disease_id != data.disease_id) {
                                setSelectedCheckbox(".checkbox-other-treatments-form", new Array(treatment.disease_desc).join());
                                construct_newForm(new_treatment_form(treatment.disease_desc));
                            } else {

                            }

                            $(parent_form).find(".plant-uses.plant").dropdown('set value', treatment.plant_id);
                            $(parent_form).find(".plant-uses.plant").dropdown('set text', treatment.plant_name);
                            $(parent_form).find(".plant-uses.othername").val(treatment.plant_other_name);
                            $(parent_form).find(".plant-uses.treatment-description").val(treatment.treatment);
                            findAndSetSelectedCheckbox(".plant-uses.used-parts", treatment.plant_used_parts, parent_form);
                            findAndSetSelectedCheckbox(".plant-uses.application", treatment.applications.join(), parent_form);
                            $(parent_form).find(".plant-uses.dose").val(treatment.dose);
                            $(parent_form).find(".plant-uses.dose-children").val(treatment.dose_children);
                            $(parent_form).find(".plant-uses.dose-pregnant").val(treatment.dose_pregnant);
                            $(parent_form).find(".history.use-results").val(treatment.plant_use);
                            findAndSetSelectedCheckbox(".history.treatment-origin", treatment.treatment_origin, parent_form);
                            findAndSetSelectedCheckbox(".ethnobotany.plant-origin", treatment.plant_origin, parent_form);
                            $(parent_form).find(".ethnobotany.plant-existence").val(treatment.plant_existence);
                            findAndSetSelectedCheckbox(".ethnobotany.plant-picking", treatment.plant_picking, parent_form);
                        }

                        //$(".ui.form").css('filter',"blur(0px)");
                        window.setTimeout(function() {
                            $(".loader-animation.form-datafetch-loading").hide();
                        }, 1500);
                    }
                } else {
                    alertify.error(response.msg);
                    window.setTimeout(function() {
                        $(".loader-animation.form-datafetch-loading").hide();
                    }, 3000);
                }

            });
        }

    }

    /*************************************************************/

});