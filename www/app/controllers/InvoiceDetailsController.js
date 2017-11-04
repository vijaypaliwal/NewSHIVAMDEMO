'use strict';

app.controller('InvoiceDetailsController', ['$scope', 'localStorageService', function ($scope, localStorageService) {





    $scope.showBillDetailArea = false;
    $scope.InvoiceData = [];

    $scope.renderingArray = [];

    $scope.companyinfo = {};
    $scope.startDate = "";
    $scope.endDate = "";

    $scope.GetInvoiceDetails = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $scope.userid = authData.userid;
        }
        $.ajax({
            url: serviceBase + '/api/InvoiceDetails?userid=' + $scope.userid,
            method: 'GET',
            //data: JSON.stringify(Model),
            contentType: "application/json",
            //processData: false,
            success: function (data) {
                $scope.InvoiceData = data;

                $scope.renderingArray = data;
                console.log("Data");
                console.log($scope.InvoiceData);
                $scope.$apply();


                for (var i = 0 ; i < $scope.InvoiceData.length ; i++)
                {
                    debugger;
                    $scope.InvoiceData[i].invoiceDetail = JSON.parse($scope.InvoiceData[i].invoiceDetail);
                    $scope.InvoiceData[i].createddate = moment($scope.InvoiceData[i].createddate).format("YYYY-MM-DD");
                    $scope.InvoiceData[i].invoiceDate = moment($scope.InvoiceData[i].invoiceDate).format("YYYY-MM-DD");
                    //$scope.InvoiceData[i].createddate = new Date($scope.InvoiceData[i].createddate);
                    //$scope.InvoiceData[i].createddate = $scope.InvoiceData[i].createddate.toISOString().slice(0, 10);
                }

                console.log("Data after parsing");
                console.log($scope.InvoiceData);
                
                //$scope.Showlist($scope.currentDatatype);
                //alert("Successful");
            },
            error: function (jqXHR) {
                alert(jqXHR.responseText);
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
    }

    $scope.PrintData=function()
    {
        try {

            pdf.htmlToPDF({
                data: "<html> <h1>  Hello World  </h1> </html>",
                documentSize: "A4",
                landscape: "portrait",
                type: "base64"
            }, alert("success"), alert("fail to download"));

            pdf.htmlToPDF({
                data: $("#BillSection").html(),
                documentSize: "A4",
                landscape: "portrait",
                type: "base64"
            }, alert("success 1"), alert("fail to download 1"));

        } catch (e) {

        }
       
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
    function init() {
        debugger;
        $scope.getCompanyData();
        $scope.GetInvoiceDetails();
    }

    init();

    $scope.BillDetails = function (billObject) {
        $scope.showBillDetailArea = true;


        $scope.ColumnDataArray = [];
        $scope.Header = [];

        $scope.DetailBillObject = billObject;

        for (var i = 0; i < billObject.invoiceDetail.length ; i++)
        {
            $scope.ColumnDataArray.push(billObject.invoiceDetail[i].columnData);
        }


        $scope.Header = $scope.ColumnDataArray[0]
        console.log("ColumnDataArray");
        console.log($scope.ColumnDataArray);

        console.log($scope.DetailBillObject);
        console.log("$scope.DetailBillObject");

    }




    $scope.filterBillDetails = function () {

        debugger;
        $scope.renderingArray = [];
        var startDate = new Date($scope.startDate);
        var endDate = new Date($scope.endDate);

        for (var i = 0 ; i < $scope.InvoiceData.length ; i++) {
            var datevalue = new Date($scope.InvoiceData[i].createddate);

            if (datevalue >= startDate && datevalue <= endDate)
            {
                $scope.renderingArray.push($scope.InvoiceData[i]);
            }
        }

        console.log("newArray");
        console.log($scope.renderingArray);

     
    }


    $("#from, #to").datepicker({
       
        onSelect: function (selectedDate) {
            if (this.id == 'from') {
                var dateMin = $('#from').datepicker("getDate");
                var rMin = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 1); // Min Date = Selected + 1d
                var rMax = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 31); // Max Date = Selected + 31d
                $('#to').datepicker("option", "minDate", rMin);
              //  $('#to').datepicker("option", "maxDate", rMax);
            }

            $(this).trigger("input");

        }
    });
    $scope.ClearFilter = function () {
        $scope.startDate = "";
        $scope.endDate = "";
        $scope.renderingArray = $scope.InvoiceData;
    }

}]);