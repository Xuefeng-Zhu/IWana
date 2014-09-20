'use strict';

/* Controllers */

var url = "https://iwana.firebaseio.com";
angular.module('myApp.controllers', ['firebase'])
.controller('userCtrl', ["$scope", "$rootScope", "$firebase", "$firebaseSimpleLogin", function($scope, $rootScope, $firebase,$firebaseSimpleLogin) {
	
	//use for user logining 
	var ref = new Firebase(url + "/Users");
	$rootScope.auth = $firebaseSimpleLogin(ref);

	//function to run when user logout 
	$scope.logout = function(){
		$rootScope.auth.$logout();
		$location.path("");
	}
	//upload user information when first visit and create message listener 
}])
.controller('BuyCtrl', ["$scope", "$rootScope", "$firebase", function($scope, $rootScope, $firebase){
	
}]);