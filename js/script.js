
        var app = angular.module('app', []);
        //var url = "http://localhost:2462/api/People/";

        var url = "http://AngularPro.shivamitconsultancy.com/api/People/";


       


        app.controller('mainController', function ($scope, $http) {
            $scope.message = 'Home';
            $scope.searchText = '';
            $scope.People = {};
            $scope.Person = {};
            $scope.IsEditMode = false;
			$scope.messageDisplay=toastr;

            //Methods

            //cancel
            $scope.Cancel = function () {
                $scope.Person = {};
                $scope.IsEditMode = false;
            }

            //get method
            $scope.getPeople = function () {
                $http.get(url).success(function (data) {
                    $scope.People = data;

                });
            };

            //post method
            $scope.addPerson = function () {
			
		   if($("#personName").val() !="")
		   {
                $http.post(url, $scope.Person).success(function () {                    
					$scope.messageDisplay.success('Patient Saved Successfully.','Patient Success', false);
                    $scope.getPeople();
                    $scope.Cancel();
                });
				}
				else
				{
				   $scope.messageDisplay.error('Please enter atleast patient name.','Patient data', false);
				}

            }

            //put method
            $scope.activeEditMode = function (Person) {
                $scope.IsEditMode = true;
                $scope.Person = Person;
            }

            $scope.updatePerson = function (Person) {
                $http.put(url + Person.Id, Person).success(function () {                    
					$scope.messageDisplay.success('Patient updated successfully.','Patient Update', false);
                    $scope.getPeople();
                    $scope.Cancel();
                }).error(function (data, status, headers, config) {
						$scope.messageDisplay.error('Server Error'+ data.message,'Patient data', false);
                });
            }

            //delete person
            $scope.deletePerson = function (Person) {
				if(confirm('Really want to delete this patient?'))
				 {
					$http.delete(url + Person.Id).success(function () {
						$scope.getPeople();
						$scope.messageDisplay.success('Patient deleted successfully.','Patient Delete', false);
						$scope.Cancel();
					}).error(function (data, status, headers, config) {
							$scope.messageDisplay.error('Server Error'+ data.message,'Patient data', false);
					});
				 }
            }


            $scope.getPeople();



        });
