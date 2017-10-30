'use strict';
app.controller('SelectFieldsController', ['$scope', 'localStorageService', function ($scope, localStorageService) {
    $scope.message = "Hello World !!";


    $scope.myComboValues = [];

    $scope.AddNew = false;
    $scope.AddStringField = false;
    $scope.AddNumberField = false;
    $scope.AddDateField = false;
    $scope.AddDropDownField = false;

    $scope.ShowStringFields = true;
    $scope.ShowNumberFields = true;
    $scope.ShowDateFields = true;
    $scope.ShowDropDownFields = true;


    $scope.ShowStringList = false;
    $scope.ShowNumberList = false;
    $scope.ShowDateList = false;
    $scope.ShowDropDownList = false;


    $scope.currentDatatype = "string";


    $scope.AddNewField = function ()
    {
        $scope.AddNew = true;

    }

    $scope.Showlist = function (dataType)
    {
        $scope.currentDatatype = dataType;
        $scope.$apply();
    }


    $scope.AddNewDateField = function () {
        $scope.AddDateField = true;

        $scope.ViewModel.DefaultValue = moment(new Date()).format("DD/MM/YYYY");




        $scope.ShowStringFields = false;
        $scope.ShowNumberFields = false;
        $scope.ShowDateFields = true;
        $scope.ShowDropDownFields = false;

        $scope.AddNew = true;

    }
    $scope.AddNewDropDownField = function () {

        $scope.AddNew = true;
        $scope.AddDropDownField = true;

        $scope.ShowStringFields = false;
        $scope.ShowNumberFields = false;
        $scope.ShowDateFields = false;
        $scope.ShowDropDownFields = true;

    }
    
    $scope.AddNewNumberField = function () {

        $scope.AddNew = true;
        $scope.AddNumberField = true;

        $scope.ShowStringFields = false;
        $scope.ShowNumberFields = true;
        $scope.ShowDateFields = false;
        $scope.ShowDropDownFields = false;
    }

    $scope.AddNewStringField = function () {

        $scope.AddNew = true;
        $scope.AddStringField = true;

        $scope.ShowStringFields = true;
        $scope.ShowNumberFields = false;
        $scope.ShowDateFields = false;
        $scope.ShowDropDownFields = false;
    };



    $scope.GoBack = function () {
        debugger;
        $scope.AddNew = false;
        $scope.AddStringField = false;
        $scope.AddNumberField = false;
        $scope.AddDateField = false;
        $scope.AddDropDownField = false;

        $scope.ShowStringFields = true;
        $scope.ShowNumberFields = true;
        $scope.ShowDateFields = true;
        $scope.ShowDropDownFields = true;
       


    }

    function ResetModel()
    {

        $scope.ViewModel = {
            ID: 0,
            UserID: 0,
            columnname: "",
            datatype: "",
            columnlabel: "",
            columnmap: "",
            defaultvalue: "",
            Combovalues: "",
            sort: 0,
            createddate: "",
            updateddate: "",
            notes: "",
        }
    }


   

    $scope.ViewModel = {
         ID : 0,
         UserID : 0,
         columnname : "",
         datatype :"",
         columnlabel :"",
         columnmap :"",
         defaultvalue :"",
         Combovalues :"",
         sort :0,
         createddate :"",
         updateddate:"",
         notes :"",
    }


    $scope.ResetFields = function () {


        for (var elem in $scope.ViewModel) {
            $scope.ViewModel[elem].isChecked = false;
            $scope.ViewModel[elem].Name = "";
            $scope.ViewModel[elem].DefaultValue = "";
        }
    }



    $scope.saveField = function (Model,type) {

        
        var ViewModel = Model;
        ViewModel.datatype = type;
        ViewModel.active = true;
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $scope.userid = authData.userid;
        }
        ViewModel.createddate = new Date();
        ViewModel.updateddate = new Date();
        ViewModel.UserID = $scope.userid;

        $.ajax({
            url: serviceBase+'/api/AddField',
            method: 'POST',
            data: JSON.stringify(Model),
            contentType: "application/json",
            processData: false,
            success: function () {
                $scope.currentDatatype = type;
                toastr.success("Field Created Successsfully");
                init();
            },
            error: function (jqXHR) {
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
        $scope.AddNew = false;
        $scope.ShowStringFields = true;
        $scope.ShowNumberFields = true;
        $scope.ShowDateFields = true;
        $scope.ShowDropDownFields = true;
        $scope.AddStringField = false;
        $scope.AddNumberField = false;
        $scope.AddDateField = false;
        $scope.AddDropDownField = false;
        init();
    }

    $scope.GetData = [];


    

    $scope.GetColumns = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $scope.userid = authData.userid;
        }
        $.ajax({
            url: serviceBase + '/api/AddField?userid=' + $scope.userid,
            method: 'GET',
            //data: JSON.stringify(Model),
            contentType: "application/json",
            //processData: false,
            success: function (data) {
                $scope.GetData = data;

                console.log("Get Data");
                console.log($scope.GetData);

                $scope.$apply()
                $scope.Showlist($scope.currentDatatype);
                //alert("Successful");
            },
            error: function (jqXHR) {
                alert(jqXHR.responseText);
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
    }


    $scope.GetCount=function(dataType)
    {
        var _Counter = 0;
        for (var i = 0; i < $scope.GetData.length; i++) {
            if ($scope.GetData[i].datatype == dataType)
            {
                _Counter = _Counter + 1;
            }

        }

        return _Counter;
    }
    $scope.ShowStringFieldsList = function () {


        $scope.ShowStringList = true;        
        $scope.ShowNumberList = false;
        $scope.ShowDateList = false;
        $scope.ShowDropDownList = false;

        //$.ajax({
        //    url: 'http://localhost:26264/api/AddField' + '/string',
        //    method: 'GET',
        //    //data: JSON.stringify(Model),
        //    contentType: "application/json",
        //    //processData: false,
        //    success: function (data) {
        //        $scope.GetData = data;
        //        console.log("GetData");
        //        console.log($scope.GetData);
        //        console.log("data");
        //        console.log(data);
        //        //alert("Successful");
        //    },
        //    error: function (jqXHR) {
        //        alert(jqXHR.responseText);
        //        $("#divError").show('fade');
        //        $("#divErrorText").text(jqXHR.responseText);
        //    }
        //});

        //debugger;
        //    $("#myTable").DataTable({
        //        "processing": true, // for show progress bar
        //        "serverSide": true, // for process server side
        //        "filter": true, // this is for disable filter (search box)
        //        "orderMulti": false, // for disable multiple column at once
        //        "ajax": {
        //            "url": 'http://localhost:26264/api/AddField',
        //            "type": "GET",
        //            "datatype": "json"
        //        },
        //        "columns": [
        //                { "data": "Name", "name": "Name", "autoWidth": true },
        //                { "data": "FirmName", "name": "FirmName", "autoWidth": true },

        //                { "data": "ContactNumber", "name": "ContactNumber", "autoWidth": true },
        //                { "data": "Description", "name": "Description", "autoWidth": true },
        //                { "data": "Address", "name": "Address", "autoWidth": true },
                        
        //        ],
        //        "fnDrawCallback": function () {


        //        }
        //    });
    }


    $scope.ShowNumberFieldsList = function () {
        $scope.ShowNumberList = true;
        $scope.ShowStringList = false;        
        $scope.ShowDateList = false;
        $scope.ShowDropDownList = false;
    }


    $scope.ShowDateFieldsList = function () {
        $scope.ShowDateList = true;
        $scope.ShowStringList = false;
        $scope.ShowNumberList = false;        
        $scope.ShowDropDownList = false;
    }


    $scope.ShowdropDownFieldsList = function () {
        $scope.ShowDropDownList = true;
        $scope.ShowStringList = false;
        $scope.ShowNumberList = false;
        $scope.ShowDateList = false;
        
    }

    function init()
    {
        ResetModel();

        $scope.GetColumns();
    }

    init();




    $scope.RemoveField = function (id) {
       
        debugger;
        $.ajax({
            url: serviceBase + '/api/AddField?id=' + id,
            method: 'Delete',
            data: JSON.stringify(id),
            contentType: "application/json",
            processData: false,
            success: function (data) {
                toastr.success("Field Removed Successfully");
                init();
            },
            error: function (jqXHR) {
                alert(jqXHR.responseText);
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
        
            
    }


    

    $scope.ChangeStatus = function (id, Object, status) {

        if (status) {
            Object.active = true;
        }
        else { Object.active = false; }

        debugger;
        $.ajax({
            url: serviceBase + '/api/AddField?id=' + id,
            method: 'PUT',
            data: JSON.stringify(Object),
            contentType: "application/json",
            processData: false,
            success: function () {
                
                toastr.success("Status Changed Successfully");
                init();
            },
            error: function (jqXHR) {
                //alert(jqXHR.responseText);
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });

    }



    $scope.getCombovValues = function (comboValues) {
        debugger;
        var comboArray = comboValues.split("\n");
        return comboArray;
    }

}]);