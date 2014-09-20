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
            $rootScope.selectedMenu = "buy";
            $scope.items = $firebase(ref.child("buy")).$asArray();
            $scope.newItem = {};

            $scope.addItem = function() {
                $('#buy')
                    .modal('setting', {
                        closable: true,
                        onDeny: function() {
                            $scope.newItem = {};
                        },
                        onHidden: function() {
                            $scope.newItem = {};
                        },
                        onApprove: function() {
                            $scope.newItem.pic = $scope.selectedPic;
                            $scope.newItem.user = $rootScope.auth.user.id;
                            $scope.items.$add($scope.newItem);
                            $scope.newItem = {};
                        }
                    })
                    .modal('show');


            };

            $scope.selectedImage = function(pic) {
                $scope.selectedPic = pic;
            };

            $scope.selectItem = function(item) {
                $scope.selectedItem = item;
                var userId = item.user;
                var userSyn = $firebase(ref.child("user/" + userId));
                $scope.user = userSyn.$asObject();

                $('.overlay.sidebar').sidebar({
                    overlay: true
                }).sidebar('toggle');

                $('#userInfo')
                    .popup({
                        on: 'click'
                    });
            };


            $scope.$watch("newItem.name", loadImages);

            function loadImages() {
                DuckduckImage.query($scope.newItem.name).success(function(data) {
                    var topics = data["RelatedTopics"];
                    $scope.pics = []
                    for (var i in topics) {
                        if (topics[i]["Icon"] && $scope.pics.indexOf(topics[i]["Icon"]["URL"]) == -1) {
                            $scope.pics.push(topics[i]["Icon"]["URL"]);
                        }
                    }
                })
            }
        }
    ])
    .controller('SellCtrl', ["$scope", "$rootScope", "$firebase", "DuckduckImage",
        function($scope, $rootScope, $firebase, DuckduckImage) {
            $rootScope.selectedMenu = "sell";
            $scope.items = $firebase(ref.child("sell")).$asArray();
            $scope.newItem = {};

            $scope.addItem = function() {
                $('#sell')
                    .modal('setting', {
                        closable: true,
                        onDeny: function() {
                            $scope.newItem = {};
                        },
                        onHidden: function() {
                            $scope.newItem = {};
                        },
                        onApprove: function() {
                            $scope.newItem.pic = $scope.selectedPic;
                            $scope.newItem.user = $rootScope.auth.user.id;
                            $scope.items.$add($scope.newItem);
                            $scope.newItem = {};
                        }
                    })
                    .modal('show');

            };

            $scope.selectedImage = function(pic) {
                $scope.selectedPic = pic;
            };

            $scope.selectItem = function(item) {
                $scope.selectedItem = item;
                var userId = item.user;
                var userSyn = $firebase(ref.child("user/" + userId));
                $scope.user = userSyn.$asObject();

                $('.overlay.sidebar').sidebar({
                    overlay: true
                }).sidebar('toggle');

                $('#userInfo')
                    .popup({
                        on: 'click'
                });
            };

            $scope.$watch("newItem.name", loadImages);

            function loadImages() {
                DuckduckImage.query($scope.newItem.name).success(function(data) {
                    var topics = data["RelatedTopics"];
                    $scope.pics = []
                    for (var i in topics) {
                        if (topics[i]["Icon"] && $scope.pics.indexOf(topics[i]["Icon"]["URL"]) == -1) {
                            $scope.pics.push(topics[i]["Icon"]["URL"]);
                        }
                    }
                })
            }
        }
    ])
    .controller('UserCtrl', ["$scope", "$rootScope", "$firebase",
        function($scope, $rootScope, $firebase) {
            $rootScope.selectedMenu = "user";
            var userId = null;
            var userSyn = null;
            $rootScope.$watch("auth.user", function() {
                userId = $rootScope.auth.user.id;
                userSyn = $firebase(ref.child("user/" + userId));
                $scope.user = userSyn.$asObject();
            })

            $scope.saveUser = function() {
                $scope.user.$save().then(function() {
                    $scope.success = true;
                });
            }

            $scope.dismissMessage = function() {
                $scope.success = false;
            }

        }
    ]);