'use strict';

app.controller('CompanyDetailsController', ['$scope', 'localStorageService', function ($scope, localStorageService) {
    $scope.isSAving = false;

    $("#overlay").hide();


    $scope.companyinfo = { userid: "", companyName: "", registrationNo: "", contact1: "", contact2: "", address: "", notes: "", imagePath: "", imageData: null, bgColor: "", termsNConditions: "", footerText: "" }

    function removePaddingCharacters(bytes) {
        bytes = bytes.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

        return bytes;
    }
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    $scope.handleFileSelect = function (evt) {


        var files = evt.target.files;
       var StreamData = "";
        var _ImgObj = { ImageID: 0, FileName: "", bytestring: "", Size: 0 }
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {

                var id = randomString(5, '0123456789');
                _ImgObj.ImageID = id;



                return function (e) {
                    // Render thumbnail.
                    StreamData = e.target.result;
                    _ImgObj.bytestring = e.target.result;
                    _ImgObj.Size = theFile.size;


                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }

        setTimeout(function () {

            $("#blah").attr("src", StreamData)
            $scope.companyinfo.imageData = removePaddingCharacters(StreamData);
            console.log($scope.companyinfo);
            $scope.$apply();

        }, 100);

    }
    $("#file").on('change', function (event) {
        $scope.handleFileSelect(event);
    });
    $scope.getinfo = function () {
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

                if ($.trim($scope.companyinfo.imagePath) != "")
                {
                    var _Path = serviceBase + "Logos/" + $scope.companyinfo.imagePath;
                    $("#blah").attr("src", _Path);

                }
                $scope.$apply();
            },
            error: function (jqXHR) {
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
    }


    $("#fileChoose").click(function () {

        $("#file").trigger("click");
    });
    $scope.saveinfo = function () {

        $scope.isSAving = true;

        $("#overlay").show();

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $scope.userid = authData.userid;
        }
        var _copyObj = angular.copy($scope.companyinfo);
        var _tempCopy = { userid: _copyObj.userid, CompanyName: _copyObj.companyName, RegistrationNo: _copyObj.registrationNo, Contact1: _copyObj.contact1, Contact2: _copyObj.contact2, Address: _copyObj.address, Notes: _copyObj.notes, imagePath: _copyObj.imagePath, imageData: _copyObj.imageData, BGColor: _copyObj.bgColor, TermsNConditions: _copyObj.termsNConditions, FooterText: _copyObj.footerText }
        $.ajax({
            url: serviceBase + 'api/CompanyDetails',
            method: 'POST',
            data: JSON.stringify(_tempCopy),
            contentType: "application/json",
            processData: false,
            success: function (response) {
                $scope.$apply();

                $("#overlay").hide();
                toastr["success"]("Company Created Successsfully");
                $scope.isSAving = false;
                window.location.href = '#/SelectFields';
            },
            error: function (jqXHR) {
                $("#divError").show('fade');
                $("#divErrorText").text(jqXHR.responseText);
            }
        });
      
    }
    function init() {
        $scope.getinfo();
    }

    init();
}]);