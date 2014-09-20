'use strict';

/* Controllers */

var url = "https://iwana.firebaseio.com";
var ref = new Firebase(url);
angular.module('myApp.controllers', ['firebase'])
    .controller('userCtrl', ["$scope", "$rootScope", "$firebase", "$firebaseSimpleLogin",
        function($scope, $rootScope, $firebase, $firebaseSimpleLogin) {

            //use for user logining 
            $rootScope.auth = $firebaseSimpleLogin(ref);

            //function to run when user logout 
            $scope.logout = function() {
                $rootScope.auth.$logout();
                $location.path("");
            }
            //upload user information when first visit and create message listener 
        }
    ])
    .controller('BuyCtrl', ["$scope", "$rootScope", "$firebase", "DuckduckImage",
        function($scope, $rootScope, $firebase, DuckduckImage) {
            var buy = $firebase(ref.child("buy"));
            $scope.items = buy.$asObject();
            $scope.newItem = {};

            $scope.addItem = function() {
                $('#buy')
                    .modal('setting', {
                        closable: true,
                        onDeny: function() {
                        	$scope.newItem = {};
                        },
                        onHidden : function() {
                        	$scope.newItem = {};
                        },
                        onApprove: function() {
                        	$scope.newItem.pic = $scope.selectedPic;
                        	$scope.items.$push($scope.newItem);
                        	$scope.newItem = {};
                        }
                    })
                    .modal('show');
            };

            $scope.selectedImage = function(pic){
            	$scope.selectedPic = pic;
            }

            $scope.$watch("newItem.name", loadImages);

            function loadImages() {
                DuckduckImage.query($scope.newItem.name).success(function(data) {
                    var topics = data["RelatedTopics"];
                    $scope.pics = []
                    for (var i in topics) {
                    	if (topics[i]["Icon"] && $scope.pics.indexOf(topics[i]["Icon"]["URL"])==-1){
                    		$scope.pics.push(topics[i]["Icon"]["URL"]);
                    	}
                    }
                    console.log($scope.pics);
                })
            }
        }
    ]);