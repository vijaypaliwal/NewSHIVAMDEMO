'use strict';
app.controller('invoiceController', ['$scope', 'localStorageService', '$location', function ($scope, localStorageService, $location) {

    $("#overlay").hide();
    $scope.isPostingData = false;

    $scope.customercollapse = false;
    $scope.invoicecollapse = false;
    $scope.DeleteVariable = 0;
    $scope.companyinfo = {};
    $scope.ViewModel = {

        tx1: { type: "text", isChecked: true, Name: "Product Name", DefaultValue: "", ColumnMap: "string_1", SortOrder: 1 },
        tx2: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_2", SortOrder: 0 },
        tx3: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_3", SortOrder: 0 },
        tx4: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_4", SortOrder: 0 },
        tx5: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_5", SortOrder: 0 },
        tx6: { type: "text", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "string_6", SortOrder: 0 },

        dd1: { type: "dropdown", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "dropdown_1", ComboValues: ["One", "Two", "Three"], SortOrder: 0 },
        dd2: { type: "dropdown", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "dropdown_1", ComboValues: ["Three", "Two", "One"], SortOrder: 0 },

        N1: { type: "Number", isChecked: true, Name: "Quantity", DefaultValue: "", ColumnMap: "number_1", SortOrder: 2 },
        N2: { type: "Number", isChecked: true, Name: "Price", DefaultValue: "", ColumnMap: "number_2", SortOrder: 3 },
        N3: { type: "Number", isChecked: true, Name: "Sub Total", DefaultValue: "", ColumnMap: "number_2", SortOrder: 4 },

        dt1: { type: "date", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "date_1", SortOrder: 0 },
        dt2: { type: "date", isChecked: false, Name: "", DefaultValue: "", ColumnMap: "date_2", SortOrder: 0 },

    };

    $scope.ActiveList = [];

    $scope.ColumnList = [];


    $scope.editmode = true;

    $scope.editinvoice = false;

    $scope.Columnlist = [];
    $scope.ColumnObj = { Id: 0, Column1: "", Column2: "", Column3: "", Column4: "", Column5: "" };
    var _obj = { Id: 0, Column1: "", Column2: "", Column3: "", Column4: "", Column5: "" };

    $scope.LocalBillObject = {};

    function CalculateTax() {
        if ($.trim($scope.InvoiceData.taxapplied) != "") {

            $scope.InvoiceData.totalamount = 0;
            var _tax = parseFloat($scope.InvoiceData.taxapplied) / 100;
            $scope.InvoiceData.totalamount = $scope.InvoiceData.subtotal + _tax * $scope.InvoiceData.subtotal;

            $scope.$apply();
        }
    }
    $scope.$watch("InvoiceData.subtotal", function () {
        CalculateTax();
    });

    $scope.$watch("InvoiceData.taxapplied", function () {
        CalculateTax();
    });

    $scope.$watch("InvoiceData.totalamount", function () {

        $scope.InvoiceData.paidamount = $scope.InvoiceData.totalamount;
        $scope.$apply();
    })


    $scope.InvoiceData = { userid: "", name: "", email: "", address: "", contact: "", invoiceno: randomString(5, "0123456789"), invoicedate: moment(new Date()).format("YYYY-MM-DD"), tinno: "", notes: "", subtotal: "", totalamount: "", paidamount: "", taxapplied: 0, invoicerows: [] }

    function CheckPrinterInv() {
        cordova.plugins.printer.check(function (available, count) {
            alert(available ? 'Found ' + count + ' services' : 'Printer Not found');
            return available;
        });
    }

    $scope.PrintDataInv = function () {

        if (CheckPrinterInv() == true) {

            try {


                var page = location.href;

                cordova.plugins.printer.print(page, 'Document.html');

            }
            catch (err) {
                alert(err.message);
            }
        }
        else {
            alert("Please connect with printer.")
        }

    }
    $scope.AddRow = function () {
        //var _obj = { Id: 0, Column1: "", Column2: "", Column3: "", Column4: "", Column5: "" };
        //$scope.Columnlist.push(_obj);
        $scope.DeleteVariable = $scope.DeleteVariable + 1;


        //$scope.ActiveList.push({ id: randomString(5, '0123456789'), columnData: angular.copy($scope.ColumnData) });

        

        $scope.LocalBillObject = { id: randomString(5, '0123456789'), columnData: angular.copy($scope.ColumnData)};
        $("#myModal").modal("show");
        $scope.$apply();
    }


    $scope.AddInvoiceItem = function () {
        
        var _objectData = angular.copy($scope.LocalBillObject);
        $scope.ActiveList.push(_objectData);
        $scope.CalculatePrice(_objectData, _objectData.id);
        $scope.$apply();
        console.log($scope.ActiveList);
        $("#myModal").modal("hide");
    }
    var _objindex = -1;
    $scope.Editrow=function(obj)
    {
        _objindex = $scope.ActiveList.indexOf(obj);
        $scope.LocalBillObject = angular.copy(obj);
        $scope.CalculatePrice(obj, obj.id);
        $("#myModalEdit").modal("show");
    }

    $scope.UpdateInvoiceItem=function()
    {
        $scope.ActiveList[_objindex] = $scope.LocalBillObject;

        $scope.$apply();
        $("#myModalEdit").modal("hide");
    }


    $scope.Deleterow = function (item) {
        //var index = parseInt(i);
        //$scope.ActiveList.forEach(function (object, i) {
        //    if (object.id.id == item.id.id)
        //    {
        //        var index = i;
        //    }
        //})

        var index = $scope.ActiveList.indexOf(item);
        $scope.ActiveList.splice(index, 1);
        $scope.$apply();

        $scope.calculateSubtotal();
    }



    $scope.getCompanyData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $scope.userid = authData.userid;
        }

        $.ajax({
            url: serviceBase + 'api/CompanyDetails?userid=' + $scope.userid,
            method: 'GET',

            contentType: "application/json",
            processData: false,
            success: function (response) {

                $scope.companyinfo = response;

                if ($.trim($scope.companyinfo.imagePath) != "") {
                    var _Path = serviceBase + "Logos/" + $scope.companyinfo.imagePath;
                    $("#logodata").attr("src", _Path);

                }

                $scope.InvoiceData.tinno = $scope.companyinfo.registrationNo;


                $scope.$apply();
            },
            error: function (jqXHR) {
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });


    }

    $scope.calculateSubtotal = function () {
        var _total = 0;
        for (var i = 0; i < $scope.ActiveList.length; i++) {


            for (var j = 0; j < $scope.ActiveList[i].columnData.length; j++) {
                var object = $scope.ActiveList[i].columnData[j];
                if (object.columnname == "Price") {
                    _total = _total + parseFloat(object.value);


                }
            }
        }
        $scope.InvoiceData.subtotal = _total;
    };

    $scope.getColumnData = function () {
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
                $scope.ColumnData = data;
                $scope.ActiveList.push({ id: randomString(5, '0123456789'), columnData: angular.copy($scope.ColumnData) });

                $scope.$apply();
                //alert("Successful");
            },
            error: function (jqXHR) {
                alert(jqXHR.responseText);
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
    }


    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    $scope.postdata = function () {

        $scope.isPostingData = true;
        $("#overlay").show();
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $scope.InvoiceData.userid = authData.userid;
        }

        $scope.InvoiceData.invoicerows = $scope.ActiveList;
        $.ajax({
            url: serviceBase + '/api/Invoice',
            method: 'POST',
            data: JSON.stringify($scope.InvoiceData),
            contentType: "application/json",
            processData: false,
            success: function () {
                $scope.isPostingData = false;
                $("#overlay").hide();

                toastr.success("invoice created success fully");
                $scope.$apply();
            },
            error: function (jqXHR) {
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });

    }

    $scope.CheckSaveDisabled = function () {
        if ($scope.InvoiceData.name == "" || $scope.ActiveList.length == 0) {
            return true;
        }
        return false;
    }

    $scope.GetColumnValue = function (columnName, id) {
        for (var i = 0; i < $scope.ActiveList.length; i++) {
            var _id = $scope.ActiveList[i].id;
            if (_id == id) {


                for (var j = 0; j < $scope.ActiveList[i].columnData.length; j++) {
                    var object = $scope.ActiveList[i].columnData[j];
                    if (object.columnname == columnName) {

                        return parseFloat(object.value);
                    }
                }
            }
        }
        return 0;
    }

    $scope.CalculatePrice = function (object, id) {
        var _qty = 0;
        var _up = 0;
        var _p = 0;

        

        for (var i = 0; i < $scope.ActiveList.length; i++) {
            var _id = $scope.ActiveList[i].id;
            if (_id == id) {

                for (var j = 0; j < $scope.ActiveList[i].columnData.length; j++) {
                    var object = $scope.ActiveList[i].columnData[j];
                    _qty = $scope.GetColumnValue("Quantity", id);
                    _up = $scope.GetColumnValue("UnitPrice", id);
                    if (object.columnname == "Price") {
                        if (!isNaN(_qty) && !isNaN(_up)) {
                            object.value = parseFloat(_qty * _up);

                        }
                        else {
                            object.value = 0;
                        }
                    }
                }

            }
        }
        $scope.calculateSubtotal();
    }


    $scope.billinginfo = { Payer: "Stephen Fleming", Contact1: 1236547890, Contact2: 987654321, Email: "Stephen.fleming@gmail.com", Pin: "313301", City: "Welington", Country: "Newzealand" }

    function Init() {
        // $scope.Columnlist.push($scope.PrintObj);
        $scope.getCompanyData();
        $scope.getColumnData();

    };
    Init();


    $scope.createNewInvoice = function () {
        location.reload();
    }


    $scope.getCombovValues = function (comboValues) {

        var comboArray = comboValues.split("\n");
        return comboArray;
    }

}]);