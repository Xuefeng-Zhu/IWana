'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory('DuckduckImage', ['$http', function($http){
	return {
		query: function(item){
			return $http.get("http://iwana.herokuapp.com/image/" + item);
		}
		
	};
}])
 
