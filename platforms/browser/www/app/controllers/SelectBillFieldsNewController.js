'use strict';
app.controller('SelectBillFieldsNewController', ['$scope', function ($scope) {
    $scope.message = "Hello World !!";



    $scope.ViewModel = {

        tx1: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_1", SortOrder: 0 },
        tx2: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_2", SortOrder: 0 },
        tx3: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_3", SortOrder: 0 },
        tx4: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_4", SortOrder: 0 },
        tx5: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_5", SortOrder: 0 },
        tx6: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_6", SortOrder: 0 },

        dd1: { type: "dropdown", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "dropdown_1", ComboValues: ["One", "Two", "Three"], SortOrder: 0 },
        dd2: { type: "dropdown", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "dropdown_1", ComboValues: ["Three", "Two", "One"], SortOrder: 0 },

        N1: { type: "Number", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "number_1", SortOrder: 0 },
        N2: { type: "Number", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "number_2", SortOrder: 0 },
        N3: { type: "Number", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "number_2", SortOrder: 0 },

        dt1: { type: "date", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "date_1", SortOrder: 0 },
        dt2: { type: "date", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "date_2", SortOrder: 0 },

    }





    //$scope.ViewModel = [

    //     { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_1" },
    //     { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_2" },
    //     { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_3" },
    //     { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_4" },
    //     { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_5" },
    //     { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_6" },

    //     { type: "dropdown", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "dropdown_1", ComboValues: ["One", "Two", "Three"] },
    //     { type: "dropdown", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "dropdown_1", ComboValues: ["Three", "Two", "One"] },

    //     { type: "Number", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "number_1" },
    //     { type: "Number", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "number_2" },

    //     { type: "date", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "date_1" },
    //     { type: "date", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "date_2" },

    //]




    $scope.CreateBill = function () {

        var Model = $scope.ViewModel;
        console.log(Model);
        //$.ajax({
        //    url: 'http://localhost:26264/api/Customer',
        //    method: 'POST',
        //    data: JSON.stringify(Model),
        //    contentType: "application/json",
        //    processData: false,
        //    success: function () {
        //        alert("Successful");
        //    },
        //    error: function (jqXHR) {
        //        $("#divError").show('fade');
        //        $("#divErrorText").text(jqXHR.responseText);
        //    }
        //});
    }


    $scope.ResetFields = function () {


        for (var elem in $scope.ViewModel) {
            $scope.ViewModel[elem].isChecked = false;
            $scope.ViewModel[elem].Name = "";
            $scope.ViewModel[elem].DefaultValue = "";
        }
    }

}]);