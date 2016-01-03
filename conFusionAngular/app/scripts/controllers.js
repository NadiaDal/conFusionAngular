/**
 * Created by nadia on 22.12.15.
 */
'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.showMenu = false;
        $scope.message = "Loading ...";
        $scope.dishes = {};
        menuFactory.getDishes()
            .then(
                function (response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        $scope.select = function (setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

    }])

    .controller('ContactController', ['$scope', function ($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        $scope.channels = [{value: "tel", label: "Tel."},
            {value: "Email", label: "Email"}];

        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };

    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory',
        function ($scope, $stateParams, menuFactory) {
            $scope.dish = {};
            menuFactory.getDish(parseInt($stateParams.id, 10))
                .then(
                    function (response) {
                        $scope.dish = response.data;
                        $scope.showDish = true;
                    }
                );
            $scope.userComment = {
                rating: "5",
                comment: "",
                author: "",
                date: ""
            };
            $scope.submit = function () {
                $scope.userComment.date = new Date(); // add property date
                //console.log($scope.userComment);
                $scope.userComment.rating = parseInt($scope.userComment.rating);
                $scope.userComentClone = angular.copy($scope.userComment); // save current comment to var
                $scope.dish.comments.push($scope.userComentClone); // add to array to the and current comment
                //console.log($scope.dish.comments);
                $scope.reset = function () {
                    $scope.userComment = {
                        rating: "5",
                        comment: "",
                        author: "",
                        date: ""
                    }
                };
                $scope.reset();
                $scope.commentForm.$setPristine();
            };
        }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
        function ($scope, menuFactory, corporateFactory) {

            $scope.dish = {};

            var promise = menuFactory.getDish(0);
            promise.then(
                function (response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                }
            );
            $scope.leader = {};
            corporateFactory.getLeader(3)
                .then(function (response) {
                    $scope.leader = response.data;
                });
            $scope.promos = {};
            menuFactory.getPromotion()
                .then(function (response) {
                    $scope.promos = response.data;
                });
        }])

    .controller('AboutController', ['$scope', 'corporateFactory',
        function ($scope, corporateFactory) {
            $scope.corporates = {};
            corporateFactory.getLeaders()
                .then(function (response) {
                    $scope.corporates = response.data;
                });


        }])
;
