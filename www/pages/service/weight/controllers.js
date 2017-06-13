angular.module('app.controllers')

.controller("weightCtrl", function($scope, $ionicTabsDelegate, $state, $ionicHistory, ServiceService, $ionicScrollDelegate, $interval) {
    $scope.canSelectMore = false;
    $ionicTabsDelegate.showBar(false);
    
	$scope.datapoints = [];

    $scope.list = function(){
		$scope.showLoad();
        ServiceService.datapoints().success(function(data) {
			$scope.hideLoad();
			if(data.Status === true){
				var datapoints = JSON.parse(data.MyObject);
				angular.forEach(datapoints.data.datastreams, function(key, index, datapoints){
					if(datapoints[index].id === "WEIGHT"){
						$scope.datapoints = datapoints[index].datapoints;
					}
				});
			}
        }).error(function(data) {
            $scope.showToast(data.Message);
        });
    };
	$scope.list();
	
    $scope.doRefresh = function () {
        ServiceService.datapoints().success(function(data) {
			if(data.Status === true){
				var datapoints = JSON.parse(data.MyObject);
				angular.forEach(datapoints.data.datastreams, function(key, index, datapoints){
					if(datapoints[index].id === "WEIGHT"){
						$scope.datapoints = datapoints[index].datapoints;
					}
				});
            }
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function (data) {
            $scope.hideLoad();
            $scope.showToast(data.msg);
        });
    }
	
    $scope.back = function(){
        $ionicHistory.goBack(-1);
    };

})
